import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  ApplicantIncomeGetDto,
  Application,
  BaseFormField,
  CommentDto,
  Decision,
  Dir,
  DirCountry,
  DirectoryVal,
  DirStatus,
  EditableTableHeader,
  EInputType,
  OptionListNames,
  StageType,
  TableData,
  UserDto,
  ValueType,
  VerificationFrontDtoPost,
  VerificationGetDto
} from '@app/_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BorrowersGroupKeys, BORROWERS_TITLES, BORROWER_FORM } from './constants/borrowers.config';
import { FormGroupService } from '@app/services/form-group.service';
import {
  BLACK_LIST_INFO_PROPS,
  CUSTOMER_REQUESTS_INFO_PROPS,
  EMPLOEYR_APPLICATIONS_INFO_PROPS,
  JOB_POSITION_INFO_PROPS,
  LAST_WORK_EXPIRENCE_INFO_PROPS,
  MANAGMENT_INFO_PROPS
} from './constants/borrowers.constants';
import {
  OPZFacadeGetDto,
  OPZFacadePostDto,
  OPZIncomeGetDto,
  OPZIncomePostDto,
  OPZJobTitleDto,
  OPZWorkExperienceDto
} from '@app/_models/api-models/opzfacade-get-dto';
import { combineLatest, forkJoin, throwError } from 'rxjs';
import { catchError, finalize, mergeMap, skip, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { IAppState } from '@app/store/state/app.state';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { BorrowersDataService } from '@app/components/tabs/borrowers/borrowers-data.service';
import { YES_NO_TYPES, YesOrNoType } from '@app/constants/yes-or-no-type';
import {
  IntegrationAbsParallelApplicationsDto,
  SummaryIndividualsDataDto
} from '@app/_models/api-models/inner-information';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { ApplicationControllerService, DirectoriesService } from '@app/api';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { AppCommonRequestService, ChatServicesEnum } from '@app/services/app-common-request.service';
import { OpzDecisionDto } from '@app/_models/api-models/opz-decision-dto';
import { VerificationControllerService } from '@app/api/verification-controller.service';
import { OpzApplicationsFacadeDto } from '@app/_models/api-models/opz-applications-facade-dto';
import { BlacklistBasedOnAbsResults } from '@app/_models/api-models/blacklist-based-on-abs-results';
import { untilDestroyed } from '@app/core';
import { HistoryModalComponent } from '@app/shared/components/modals/history-modal/history-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatUnderManagerControllerService } from '@app/api/chat-under-manager-controller.service';

type Options = Dir | DirStatus | Decision | YesOrNoType | DirectoryVal;
type TableDataOptions = any;

@Component({
  selector: 'ng-borrowers',
  templateUrl: './borrowers.component.html',
  styleUrls: ['./borrowers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorrowersComponent implements OnInit {
  borrowersInfoform: FormGroup;
  borrowerFormConfig: BaseFormField[] = BORROWER_FORM;
  BorrowersGroupKeys = BorrowersGroupKeys;
  eInputType = EInputType;
  titles: Record<string, string> = BORROWERS_TITLES;
  ValueType = ValueType;
  isLoading: boolean;
  test: string;
  isSubmitting: boolean = false;

  managementInfoTableHeaders: EditableTableHeader[] = MANAGMENT_INFO_PROPS; // * Управление
  lastWorkExpirenceTableHeaders: EditableTableHeader[] = LAST_WORK_EXPIRENCE_INFO_PROPS; // * Стаж на последнем месте работы
  jobPositionTableHeaders: EditableTableHeader[] = JOB_POSITION_INFO_PROPS; // * Должность

  managementInfoDto: OPZIncomeGetDto[] = [];
  lastWorkExpirenceDto: OPZWorkExperienceDto[] = [];
  jobPositionDto: OPZJobTitleDto[] = [];

  customerRequestsTableHeaders: TableData<IntegrationAbsParallelApplicationsDto> = new TableData( // * Заявки клиента
    CUSTOMER_REQUESTS_INFO_PROPS,
    []
  );
  emploeyrApplicationsTableHeaders: TableData<OpzApplicationsFacadeDto> = new TableData(
    EMPLOEYR_APPLICATIONS_INFO_PROPS,
    []
  ); // * Заявки работодателя
  blackListTableHeaders: TableData<any> = new TableData(BLACK_LIST_INFO_PROPS, []); // * Чёрный список

  optionsList: Record<string, Options[]> = {
    [OptionListNames.JobPositionType]: [],
    [OptionListNames.IncomeType]: [],
    [OptionListNames.YesOrNoTypes]: YES_NO_TYPES,
    [OptionListNames.VerifierDecisionList]: [],
    [OptionListNames.VerifierDeclineReasons]: []
  };

  footerConfigSource = 'common.opz';
  @Input() applicationData: Application;
  @Input() applicationsAppTheOPZTab: IntegrationAbsParallelApplicationsDto[];
  @Input() applicantIncomeInfoDM: ApplicantIncomeGetDto[];
  @Input() borrowersInfo: OPZFacadeGetDto;
  @Input() emploeyrApplications: OpzApplicationsFacadeDto[];
  @Input() emploeyrBlackList: BlacklistBasedOnAbsResults[];
  @Input() readonlyForm: boolean = false;
  @Input() language: string;

  private jobPositionType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.jobPositionType)));
  private incomeType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeType)));

  private verificationData: VerificationGetDto[];
  private currentVerificationData: VerificationGetDto;
  private decisionMakerDeclineReasonList: DirectoryVal[];

  constructor(
    private readonly borrowersDataService: BorrowersDataService,
    private readonly routerURLService: RouterURLService,
    private readonly directoriesService: DirectoriesService,
    private readonly toastService: ToastService,
    private readonly dialog: MatDialog,
    private readonly appCommonRequestService: AppCommonRequestService,
    private readonly applicationControllerService: ApplicationControllerService,
    private readonly verificationControllerService: VerificationControllerService,
    private _store: Store<IAppState>,
    private fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
    private formGroupService: FormGroupService<any, any>,
    private chatUnderManagerService: ChatUnderManagerControllerService,
  ) {}

  get historyButtonVisible() {
    return this.routerURLService.isqQueues();
  }

  get footerButtonsVisible(): boolean {
    if (this.applicationData) {
      return [StageType.MANUAL_CHECKS].some(el => el === this.applicationData.stage.id);
    }
  }

  get opzForm(): FormGroup {
    return this.borrowersInfoform.get(BorrowersGroupKeys.BlackList) as FormGroup;
  }

  get userData(): UserDto {
    return this.appCommonRequestService.userData;
  }

  get chatUnderManagerList(): CommentDto[] {
    return this.appCommonRequestService.getChatList();
  }

  get isNewMessageExists(): boolean {
    return this.appCommonRequestService.isNewMessageExists;
  }

  get verifierDecisionId() {
    const control = this.borrowersInfoform.get(BorrowersGroupKeys.BlackList).get('verifierDecisionId');
    return control.value;
  }

  get isVerifierDeclineReasonVisible(): boolean {
    const control = this.borrowersInfoform.get(BorrowersGroupKeys.BlackList).get('verifierDecisionId');
    return !!control.value && control.value === 'DECLINE';
  }

  get isPosProduct(): boolean {
    return this.applicationData.isPos === true;
  }

  get isClientMilitary(): boolean {
    return this.applicationData.applicant.isClientMilitary === true;
  }

  get isSoleTrader(): boolean {
    return this.applicationData.applicant.isSoleTrader === true;
  }


  shouldDisableInnAndName(opz: OPZWorkExperienceDto): boolean {
    return !((this.isClientMilitary || this.isSoleTrader) && this.isPosProduct
      && (opz.incomeSource && opz.incomeSource.toLowerCase() === 'manual'));
  }

  lastWorkExpirenceHeaders() {
    this.lastWorkExpirenceTableHeaders = LAST_WORK_EXPIRENCE_INFO_PROPS.map(header => {
      if (header.code === 'inn' || header.code === 'name') {
        return {
          ...header,
          setDisableIf: (opz: OPZWorkExperienceDto) => this.shouldDisableInnAndName(opz),
        };
      }
      return header;
    });
  }

  ngOnInit(): void {
    //  this.readonlyForm = false;
    this.lastWorkExpirenceHeaders();
    this.createForm();
    this.getDirectories();
    this.setTablesData();
    this.appCommonRequestService.setChatInfo();
  }

  saveRow(rowValue: TableDataOptions, groupName: string) {
    this.saveTablesRows(groupName, rowValue);
  }

  editedRow(rowValue: TableDataOptions, groupName: string) {
    this.saveTablesRows(groupName, rowValue);
  }

  removeRow(rowValue: TableDataOptions, groupName: string) {
    // this.saveTablesRows(groupName, rowValue);
  }

  public validationOfCommentFields(e: any) {
    if (e === 'RETURN') {
      this.borrowersInfoform
        .get(BorrowersGroupKeys.BlackList)
        .get('comment')
        .setValidators([Validators.required]);
      this.borrowersInfoform
        .get(BorrowersGroupKeys.BlackList)
        .get('comment')
        .updateValueAndValidity();
    } else {
      this.borrowersInfoform
        .get(BorrowersGroupKeys.BlackList)
        .get('comment')
        .clearValidators();
      this.borrowersInfoform
        .get(BorrowersGroupKeys.BlackList)
        .get('comment')
        .updateValueAndValidity();
    }
  }

  private createForm() {
    this.borrowersInfoform = this.fb.group({});
    this.borrowerFormConfig.forEach(control => {
      control.disabled = this.readonlyForm;
    });

    const verifierDecisionId = this.applicationData.dirVerifierDecision
      ? this.applicationData.dirVerifierDecision.id
      : null;

    const verifierDeclineReasonId = this.applicationData.dirVerifierDeclineReason
      ? this.applicationData.dirVerifierDeclineReason.id
      : null;

    const borrowersInfo = {
      comment: this.currentVerificationData ? this.currentVerificationData.comment : null,
      verifierDecisionId,
      verifierDeclineReasonId
    };

    const borrowersInfoControls: FormGroup = this.formGroupService.createForm(
      borrowersInfo,
      this.borrowerFormConfig,
      this.optionsList
    );
    this.borrowersInfoform.addControl(BorrowersGroupKeys.BlackList, borrowersInfoControls);

    this.borrowersInfoform
      .get(BorrowersGroupKeys.BlackList)
      .get('verifierDecisionId')
      .valueChanges.pipe(
        skip(1),
        tap(val => {
          this.borrowersInfoform
            .get(BorrowersGroupKeys.BlackList)
            .get('verifierDeclineReasonId')
            .reset();
        })
      )
      .subscribe();
  }

  private setTablesData() {
    this.remapAppStatusAbsOrRkk(this.applicationsAppTheOPZTab);

    if (this.borrowersInfo) {
      this.managementInfoDto = this.reMapOpzIncomeGetDtoList(this.borrowersInfo.opzIncomeGetDtoList);
      this.lastWorkExpirenceDto = this.borrowersInfo.opzWorkExperienceDtoList.map(el => ({
        ...el,
        isOPZ: el.continuousLosOPZ ? el.isOPZ : true
      }));
      this.jobPositionDto = this.borrowersInfo.opzJobTitleDtoList.map(el => ({
        ...el,
        // isBoss: el.jobPositionId ? el.isBoss : false,
        isBossOPZ: el.isOPZ && el.isBoss ? true : el.isBossOPZ,
        isOPZ: el.jobPositionId ? el.isOPZ : true
      }));
    }

    if (this.applicationsAppTheOPZTab) {
      this.customerRequestsTableHeaders = new TableData(CUSTOMER_REQUESTS_INFO_PROPS, this.applicationsAppTheOPZTab);
    }
    if (this.emploeyrApplications) {
      this.emploeyrApplicationsTableHeaders = new TableData(
        EMPLOEYR_APPLICATIONS_INFO_PROPS,
        this.emploeyrApplications
      );
    }
    if (this.emploeyrBlackList) {
      this.blackListTableHeaders = new TableData(BLACK_LIST_INFO_PROPS, this.emploeyrBlackList);
    }

    this.cd.markForCheck();
  }

  private remapAppStatusAbsOrRkk(appData: any[]) {
    return appData.forEach(el => {
      el.applicationTypeLoanView = {};
      el.applicationStatusForView = {};

      if (!!el.applicationStatusFromABS) {
        el.applicationStatusForView = {
          nameAm: el.applicationStatusFromABS.nameAm,
          nameRu: el.applicationStatusFromABS.nameRu,
          nameEn: el.applicationStatusFromABS.nameEn
        };
      } else if (!!el.applicationStatusfromRKK) {
        el.applicationStatusForView = {
          nameAm: el.applicationStatusfromRKK.nameAm,
          nameRu: el.applicationStatusfromRKK.nameRu,
          nameEn: el.applicationStatusfromRKK.nameEn
        };
      }

      if (!!el.loanTypeFromABS) {
        el.applicationTypeLoanView = {
          nameAm: el.loanTypeFromABS.nameAm,
          nameRu: el.loanTypeFromABS.nameRu,
          nameEn: el.loanTypeFromABS.nameEn
        };
      } else if (!!el.loanTypeFromRKK) {
        el.applicationTypeLoanView = {
          nameAm: el.loanTypeFromRKK.nameAm,
          nameRu: el.loanTypeFromRKK.nameRu,
          nameEn: el.loanTypeFromRKK.nameEn
        };
      }
    });
  }

  private getDirectories() {
    combineLatest([
      this.jobPositionType$,
      this.incomeType$,
      this.directoriesService.getVerifierDecisionsList(),
      this.directoriesService.getVerifierDeclineReasons(),
      this.verificationControllerService.getVerification(this.applicationData.applicant.id, this.applicationData.id),
      this.directoriesService.getDecisionMakerDeclineReasonList()
    ])
      .pipe(
        take(30),
        tap(
          ([
            jobPositionType,
            incomeType,
            verifierDecisionsList,
            verifierDeclineReasons,
            verificationData,
            decisionMakerDeclineReasonList
          ]) => {
            this.optionsList = {};
            this.optionsList[OptionListNames.VerifierDecisionList] = verifierDecisionsList;
            this.optionsList[OptionListNames.VerifierDeclineReasons] = verifierDeclineReasons;
            this.optionsList[OptionListNames.JobPositionType] = getOnlyActiveItems<DirCountry>(jobPositionType);
            this.optionsList[OptionListNames.IncomeType] = getOnlyActiveItems<DirCountry>([
              { id: 1, nameRu: 'Доход после налогообложения', active: true, code: null },
              ...incomeType
            ]);

            this.decisionMakerDeclineReasonList = decisionMakerDeclineReasonList;

            this.verificationData = verificationData;
            if (verificationData) {
              this.currentVerificationData = this.verificationData.find(
                el => el && el.stageId === StageType.MANUAL_CHECKS
              );
            }
            this.setFormData();
            this.cd.detectChanges();
          }
        )
      )
      .subscribe();
  }

  private saveTablesRows = (rowValue?: TableDataOptions, groupName?: string): void => {
    this.lastWorkExpirenceDto.forEach(item => {
      const jobItem = this.jobPositionDto.find(j => j.id === item.id);
      if (jobItem) {
        jobItem.inn = item.inn;
        jobItem.name = item.name;
      }
    });
    this.lastWorkExpirenceDto = [...this.lastWorkExpirenceDto];
    this.jobPositionDto = [...this.jobPositionDto];

    this.cd.detectChanges();

    const opzData: OPZFacadePostDto = {
      opzIncomePostDtoList: this.prepareOpzIncomeForSave(),
      opzWorkExperienceDtoList: this.lastWorkExpirenceDto,
      opzJobTitleDtoList: this.jobPositionDto
    };
    this.borrowersDataService.setOpzData(opzData);
  };

  private reMapOpzIncomeGetDtoList = (data: OPZIncomeGetDto[]): OPZIncomePostDto[] => {
    const firstElementIncome = this.getOpzIncomeFirstItem(data);
    const filteredIncomeList = data.filter(el => el.dirIncomeType && !el.dirIncomeType.isSum);
    if (firstElementIncome) {
      filteredIncomeList.unshift(firstElementIncome);
    }
    filteredIncomeList.forEach(el => {
      el.isOPZ = el.opzIncome ? el.isOPZ : true;
    });
    return this.remapOpzIncome(filteredIncomeList);
  };

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'delay': {
        this.delayApp();
        break;
      }
      case 'decline': {
        this.decline();
        break;
      }
      case 'processHistory': {
        this.openHistoryPanel();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      case 'openComments': {
        this.onCommentClick();
        break;
      }
      case 'loadToSopiok': {
        this.loadCommentToSopiokChat(event.event as string);
        break;
      }
      default: {
        break;
      }
    }
  }

  private submitForm(): void {
    if (this.isSubmitting) {
      return;
    }

    const form = this.borrowersInfoform.get(BorrowersGroupKeys.BlackList);
    if (!!this.verifierDecisionId && !this.isVerifierDeclineReasonVisible) {
      form.get('verifierDeclineReasonId').disable();
    }
    if (form.valid) {
      this.isLoading = true;
      this.isSubmitting = true;

      this.setVerifierDeclineReason()
        .pipe(
          switchMap(() =>
            this.applicationControllerService
              .acceptApp(this.applicationData.id.toString(), this.language)
              .pipe(tap(this.onSuccessResponse))
          ),
          catchError(err => {
            this.isSubmitting = false;
            this.isLoading = false;
            return throwError(err);
          }),
          finalize(() => {
            this.isSubmitting = false;
             this.fireLoaded();
          })
        )
        .subscribe();
    }
  }

  private navigateToDashboard() {
    this.routerURLService.navigateToDashboard();
  }

  private decline(): void {
    const form = this.borrowersInfoform.get(BorrowersGroupKeys.BlackList);
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.setVerifierDeclineReason()
      .pipe(
        switchMap(() =>
          this.applicationControllerService
            .declineApp(this.applicationData.id.toString())
            .pipe(tap(this.onDeniedResponse))
        ),
        finalize(this.fireLoaded)
      )
      .subscribe();
  }

  private delayApp(): void {
    this.isLoading = true;
    this.setVerifierDeclineReason()
      .pipe(
        tap(() => {
          this.navigateToDashboard();
        }),
        finalize(this.fireLoaded)
      )
      .subscribe();
  }

  private onCommentClick() {
    this.appCommonRequestService.onCommentClick(this.readonlyForm);
  }

  private loadCommentToSopiokChat(comment: string) {
    this.appCommonRequestService.loadCommentToSopiokChat(comment);
  }

  private openHistoryPanel() {
    this.dialog.open(HistoryModalComponent, {
      width: '90vw',
      maxWidth: '90vw',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: { applicationId: this.applicationData.id }
    });
  }

  private setVerifierDeclineReason() {
    const formValue = this.borrowersInfoform.get(BorrowersGroupKeys.BlackList).value;
    const decisionData: OpzDecisionDto = {
      ...formValue,
      verifierId: this.userData.id
    };

    if (this.currentVerificationData && this.currentVerificationData.dirDecisionMakerDeclineReason) {
      delete this.currentVerificationData.dirDecisionMakerDeclineReason;
    }

    const saveVerify: VerificationFrontDtoPost = {
      verification: {
        ...this.currentVerificationData,
        dirVerifierDecisionId: null, // formValue.verifierDecisionId,
        dirDecisionMakerDeclineReasonId: this.getDecisionMakerDeclineReason(),
        comment: formValue.comment,
        stageId: this.applicationData.stage.id,
        decisionMaker: this.userData
      }
    };
    return forkJoin([
      this.applicationControllerService
        .setVerifierDeclineReason(this.applicationData.id, decisionData)
        .pipe(
          mergeMap(() => this.verificationControllerService.saveVerification(saveVerify)),
          tap(() => {
            this.chatUnderManagerService.triggerChatUpdate().subscribe();
          })
        )
    ]);
  }

  private onDeniedResponse = (res): void => {
    this.isLoading = false;
    this.toastService.viewMsg('SuccessMessage.Denied', 'success');
    this.navigateToDashboard();
  };

  private onSuccessResponse = (res): void => {
    if (!res) {
      this.toastService.viewMsg('SuccessMessage.SentForProcessing', 'success');
      this.navigateToDashboard();
    } else {
      this.isLoading = false;
      this.toastService.viewMsg(res.message, 'warning');
    }
  };

  private getOpzIncomeFirstItem = (data: OPZIncomeGetDto[]): OPZIncomeGetDto => {
    const isSumIncomeList = data.find(el => !el.dirIncomeType);
    if (!isSumIncomeList) {
      return null;
    }

    return {
      id: isSumIncomeList.id,
      comment: isSumIncomeList.comment,
      applicationId: this.applicationData.id,
      opzIncome: isSumIncomeList.opzIncome,
      isOPZ: isSumIncomeList.isOPZ,
      dirIncomeType: { id: 1, nameRu: 'Доход после налогообложения' },
      income: isSumIncomeList.income,
      isDefaultRow: true
    } as any;
  };

  private prepareOpzIncomeForSave = (): OPZIncomePostDto[] => {
    this.managementInfoDto.forEach(el => {
      if (el.isDefaultRow) {
        el.dirIncomeType = null;
      }
    });
    return this.remapOpzIncome(this.managementInfoDto);
  };

  private remapOpzIncome = (list: OPZIncomeGetDto[]): OPZIncomePostDto[] => {
    return list.map(el => ({
      ...el,
      dirIncomeTypeId: el.dirIncomeType ? el.dirIncomeType.id : null
    }));
  };

  private fireLoaded = (): void => {
    this.isLoading = false;
  };

  private getDecisionMakerDeclineReason = (): number => {
    const vReason = this.optionsList[OptionListNames.VerifierDeclineReasons].find(
      el => el.id === this.opzForm.value.verifierDeclineReasonId
    ) as any;
    if (vReason) {
      const decisionMakerDeclineReason = this.decisionMakerDeclineReasonList.find(el => el.code === vReason.code);
      return decisionMakerDeclineReason ? decisionMakerDeclineReason.id : null;
    }
    return null;
  };

  private setFormData = (): void => {
    const verifierDecisionId = this.applicationData.dirVerifierDecision
      ? this.applicationData.dirVerifierDecision.id
      : this.currentVerificationData && this.currentVerificationData.dirVerifierDecisionId
      ? this.currentVerificationData.dirVerifierDecisionId.id
      : null;

    const verifierDeclineReasonId = this.applicationData.dirVerifierDeclineReason
      ? this.applicationData.dirVerifierDeclineReason.id
      : (this.currentVerificationData
        ? this.currentVerificationData.dirDecisionMakerDeclineReason
        : null)
      ? this.currentVerificationData
        ? this.currentVerificationData.dirDecisionMakerDeclineReason.id
        : null
      : null;

    const data = {
      comment: this.currentVerificationData ? this.currentVerificationData.comment : null,
      verifierDecisionId,
      verifierDeclineReasonId
    };

    this.opzForm.patchValue(data, { emitEvent: false });

    this.cd.detectChanges();
  };
}
