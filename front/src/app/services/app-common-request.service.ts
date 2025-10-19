import { Injectable } from '@angular/core';
import { DeclineReasonModalComponent } from '@app/shared/components/modals/decline-reason-modal/decline-reason-modal.component';
import {
  ApplicantIncomeGetDto,
  Application,
  CommentDto,
  Company,
  CompanyStatus,
  Dir,
  DirAbsCode,
  DirCountry,
  Directory,
  DirStatus,
  IdentityCardType,
  OptionListNames,
  ProductDto,
  UserDto
} from '@app/_models';
import { untilDestroyed } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from '@app/services/authentication';
import {BehaviorSubject, combineLatest } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { select, Store } from '@ngrx/store';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { IAppState } from '@app/store/state/app.state';
import { ApplicationControllerService, DirectoriesService } from '@app/api';
import { ChatUnderManagerControllerService } from '@app/api/chat-under-manager-controller.service';
import { ChatCradminManagerControllerService } from '@app/api/chat-cradmin-manager-controller.service';

type Options = Dir | DirStatus | Directory | ProductDto | DirAbsCode | DirCountry | Company | CompanyStatus;

export enum ChatServicesEnum {
  CR_ADMIN = 'chatCradminManagerService',
  UNDER_MANAGER = 'chatUnderManagerService'
}

export interface IChatListBox {
  [key: string]: CommentDto[];
}

@Injectable({
  providedIn: 'root'
})
export class AppCommonRequestService {
  private isSubmitBlockedSubject = new BehaviorSubject<boolean>(false);
  isSubmitBlocked$ = this.isSubmitBlockedSubject.asObservable();

  private isCancelRoleAvail: boolean;
  private declineReasons$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.declineReasons)));
  private declineReasonsCallCenter$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.declineReasonsCallCenter))
  );
  private _applicationData: Application;
  private optionsList: Record<string, Options[]> = {
    [OptionListNames.DeclineReasons]: []
  };
  private _chatList: IChatListBox = {
    [ChatServicesEnum.UNDER_MANAGER]: []
  };

  private _userData: UserDto;
  private _isNewMessageExists: boolean;
  private _isOtpConfirmed: boolean;

  constructor(
    private _store: Store<IAppState>,
    private credentialsService: CredentialsService,
    private directoriesService: DirectoriesService,
    private applicationControllerService: ApplicationControllerService,
    private chatUnderManagerService: ChatUnderManagerControllerService,
    private chatCradminManagerService: ChatCradminManagerControllerService,
    private dialog: MatDialog
  ) {}

  init(): void {
    this.getDirectories();
  }

  getChatList(): CommentDto[] {
    return this._chatList[ChatServicesEnum.UNDER_MANAGER];
  }

  setSubmitBlocked(isBlocked: boolean) {
    this.isSubmitBlockedSubject.next(isBlocked);
  }

  getSubmitBlocked(): boolean {
    return this.isSubmitBlockedSubject.value;
  }

  get isOtpConfirmed(){
    return this._isOtpConfirmed
  }

  get isNewMessageExists(): boolean {
    return this._isNewMessageExists;
  }

  get applicationData(): Application {
    return this._applicationData;
  }

  set applicationData(applicationData: Application) {
    this._applicationData = applicationData;
  }

  get userData(): UserDto {
    return this._userData;
  }

  set userData(userData: UserDto) {
    this._userData = userData;
  }

  setIsOtpConfirmed(res: boolean){
    this._isOtpConfirmed = res;
  }

  setChatInfo(isRMReturn?: boolean) {
    // if (!runRequest) {
    //   return;
    // }

    const service = ChatServicesEnum.UNDER_MANAGER;

    if (!this._chatList[service].length) {
      this[service]
        .getAllByApplicationId(this.applicationData.id.toString())
        .pipe(
          tap(res => {
            res.sort((a, b) => {
              // @ts-ignore
              return new Date(b.createdDate) - new Date(a.createdDate);
            });

            this._chatList[service] = res;
          })
        )
        .subscribe();
    }
    this._isNewMessageExists = this.applicationData.newMessageUMChat;
  }

  clearChatList() {
    this._chatList[ChatServicesEnum.UNDER_MANAGER] = [];
  }

  onCommentClick(readonlyForm: boolean) {
    if (!!this.isNewMessageExists && !readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.applicationData.id)
        .pipe(tap(() => (this._isNewMessageExists = false)))
        .subscribe();
    }
  }

  loadCommentToSopiokChat(comment: string, isCRAdmin?: boolean) {
    const service = ChatServicesEnum.UNDER_MANAGER;

    this[service]
      .save({
        applicationId: this.applicationData.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .pipe(
        tap(() => {
          this.chatUnderManagerService.triggerChatUpdate().subscribe();
        })
      )
      .subscribe();
  }

  // Decline app
  declineApp(language: string, callBack: (res: string | number) => void) {
    console.log('this.optionsList[OptionListNames.DeclineReasons]', this.optionsList[OptionListNames.DeclineReasons]);
    const dialogRef = this.dialog.open(DeclineReasonModalComponent, {
      width: '40vw',
      maxWidth: '40vw',
      height: '30vh',
      data: { declineReasons: this.optionsList[OptionListNames.DeclineReasons], language }
    });

    dialogRef.afterClosed().subscribe((result: string | number) => {
      if (result && typeof result !== 'string') {
        callBack(result);
      }
    });
  }

  private getDirectories(): void {
    combineLatest([this.declineReasons$, this.declineReasonsCallCenter$])
      .pipe(
        tap(([declineReasons, declineReasonsCallCenter]) => {
          // this.declineReasonsManager = getOnlyActiveItems<Dir>(declineReasons);
          // this.declineReasonsCallCenter = getOnlyActiveItems<Dir>(declineReasonsCallCenter);
          this.setDeclineReasons(declineReasons, declineReasonsCallCenter);
        })
      )
      .subscribe();
  }

  private setDeclineReasons(declineReasons: Directory[], declineReasonsCallCenter: Directory[]) {
    this.isCancelRoleAvail =
      !!this.credentialsService.isCreditManager ||
      !!this.credentialsService.isCallCenter ||
      !!this.credentialsService.isVideoBank ||
      !!this.credentialsService.isDSA;

    if (this._applicationData) {
      if (!!this.credentialsService.isCallCenter || !!this._applicationData.dirCallCentreDeclineReason) {
        this.optionsList[OptionListNames.DeclineReasons] = declineReasonsCallCenter;
      } else if (this.isCancelRoleAvail) {
        this.optionsList[OptionListNames.DeclineReasons] = declineReasons;
      }
    }
  }
}
