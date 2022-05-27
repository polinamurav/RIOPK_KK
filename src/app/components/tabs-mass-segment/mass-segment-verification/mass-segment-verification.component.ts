import * as HEADERS from './constants/verification-constants';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Application,
  CommentDto,
  CreditInfo,
  Decision,
  Directory,
  DirectoryVal,
  EditableTableHeader,
  ProgressBar,
  StageType,
  TableContent,
  TableData,
  TableDataHeader,
  UserDto,
  VerificationDto,
  VerificationFrontDtoPost,
  VerificationPhone
} from '@app/_models';
import {
  ApplicationControllerService,
  Brms3ResponseRulesFrontControllerService,
  ChatUnderLimitOwnerControllerService
} from '@app/api';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, combineLatest, throwError } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, finalize, switchMap, take } from 'rxjs/operators';

import { BRMS3ResponseRules } from '@app/_models/api-models/brms';
import { ChatUnderManagerControllerService } from '@app/api/chat-under-manager-controller.service';
import { ComparisonPanelModalComponent } from '@app/components/tabs/verification/comparison-panel-modal/comparison-panel-modal.component';
import { DecisionId } from '@app/constants/decision-id';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { HistoryModalComponent } from '@app/shared/modals/history-modal/history-modal.component';
import { IAppState } from '@app/store/state/app.state';
import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';
import { MatDialog } from '@angular/material';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { VerificationChecklist } from './../../../_models/api-models/verification';
import { VerificationControllerService } from '@app/api/verification-controller.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectMassSegmentDirectory } from '@app/store/selectors/mass-segment-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-mass-segment-verification',
  templateUrl: './mass-segment-verification.component.html',
  styleUrls: ['../../common-tabs-scss/verification-common.component.scss']
})
export class MassSegmentVerificationComponent implements OnInit, OnDestroy {
  phoneNumberEditableTableHeaders: EditableTableHeader[] = HEADERS.PHONE_NUMBERS_HEADERS;
  verificationPhoneNumberProps: TableDataHeader[] = HEADERS.VERIFICATION_PHONE_NUMBERS_PROPS;
  verificationPhoneNumberPropsView: TableDataHeader[] = HEADERS.VERIFICATION_PHONE_NUMBERS_PROPS_VIEW;
  chosenCreditColNameProps: TableDataHeader[] = HEADERS.CHOSEN_CREDIT_PROPS;
  verifiedIncomeTermsColNameProps: TableDataHeader[] = HEADERS.VERIFIED_INCOME_PROPS;
  negativeInformationColNameProps: TableDataHeader[] = HEADERS.NEGATIVE_INFO_PROPS;
  visualAssessmentColNameProps: TableDataHeader[] = HEADERS.VISUAL_ASSESSMENT_PROPS;

  addButtonName = 'Добавить телефонные номера';

  chosenCreditInfoData: TableData<CreditInfo> = new TableData(this.chosenCreditColNameProps, []);
  verificationPhoneNumberData: TableData<VerificationPhone> = new TableData(this.verificationPhoneNumberProps, []);
  negativeInformationInfoData: TableData<BRMS3ResponseRules> = new TableData(this.negativeInformationColNameProps, []);
  footerConfigSource = 'massSegment.guarantorVerification';
  itemLimit: number = 20;
  totalCount: number = 1;

  statusData: Directory[] = [];
  editableTableRows: VerificationPhone[] = [];
  tableRows: VerificationPhone[] = [];
  verificationChecklists: VerificationChecklist[] = [];

  tableToggle: boolean = true;
  isLoading: boolean = false;
  isCommentToSopiokChatExists: boolean = false;

  dirDecisionMakerDeclineReasonList: DirectoryVal[] = [];
  dirDecisionMakerDecisionList: Decision[] = [];
  isNewMessageExists: boolean = false;
  isVisualAssessmentVisible: boolean = false;

  form: FormGroup;

  userData: UserDto;

  chatUnderManagerList: CommentDto[];
  chatUnderLimitOwnerList: CommentDto[];

  @Input() applicationData: Application;
  @Input() verificationData: VerificationDto;
  @Input() progressStages: ProgressBar[];
  @Input() readonlyForm: boolean = false;
  @Input() isAppInQueues: boolean = false;
  @Input() language: string;

  private selectUserData$ = this.store.pipe(select(selectUserData));
  private statusData$ = this.store.pipe(select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.statusData)));
  private stopListAbsStatusList$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.stopListAbsStatusList))
  );
  private dirDecisionMakerDecisionList$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.dirVerifierDecisionList))
  );
  private dirDecisionMakerDeclineReasonList$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.dirDecisionMakerDeclineReasonList))
  );

  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastService: ToastService,
    private verificationControllerService: VerificationControllerService,
    private brms3ResponseRulesFrontService: Brms3ResponseRulesFrontControllerService,
    private chatUnderLimitOwnerService: ChatUnderLimitOwnerControllerService,
    private chatUnderManagerService: ChatUnderManagerControllerService,
    private applicationControllerService: ApplicationControllerService,
    private routerURLService: RouterURLService
  ) {}

  ngOnInit() {
    this.setVisualAssessmentStatus();
    this.getDirectories();

    this.selectUserData$.pipe(untilDestroyed(this)).subscribe(res => {
      if (!!res) {
        this.userData = res;
      }
    });

    this.form = this.fb.group({
      verifForm: this.fb.group({
        dirVerifierDecisionId: [
          {
            value:
              !!this.applicationData && !!this.applicationData.dirVerifierDecision
                ? this.applicationData.dirVerifierDecision.id
                : '',
            disabled: this.readonlyForm
          },
          Validators.required
        ],
        comment: [
          {
            value:
              !!this.verificationData && !!this.verificationData.verification
                ? this.verificationData.verification.comment
                : '',
            disabled: this.readonlyForm
          },
          [Validators.maxLength(500)]
        ],
        verificationDone: [
          {
            value:
              !!this.verificationData && !!this.verificationData.verification
                ? this.verificationData.verification.verificationDone
                : '',
            disabled: this.readonlyForm
          }
        ]
      })
    });

    if (
      this.form.get('verifForm').get('dirVerifierDecisionId').value === 'DECLINE' &&
      !!this.verificationData &&
      this.verificationData.verification &&
      this.verificationData.verification.dirDecisionMakerDeclineReasonId
    ) {
      this.form
        .get('verifForm')
        .get('dirDecisionMakerDeclineReasonId')
        .setValue(this.verificationData.verification.dirDecisionMakerDeclineReasonId.id);
      this.setReqValidator(this.form.get('verifForm').get('dirDecisionMakerDeclineReasonId'));
    }

    this.form
      .get('verifForm')
      .get('dirVerifierDecisionId')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((val: string) => {
        if (!this.readonlyForm) {
          if (val === 'DECLINE') {
            this.form
              .get('verifForm')
              .get('dirDecisionMakerDeclineReasonId')
              .setValue('');
            this.setReqValidator(this.form.get('verifForm').get('dirDecisionMakerDeclineReasonId'));
          } else {
            this.form
              .get('verifForm')
              .get('dirDecisionMakerDeclineReasonId')
              .setValue('');
            this.clearReqValidator(this.form.get('verifForm').get('dirDecisionMakerDeclineReasonId'));
          }
        }
      });

    if (!!this.applicationData) {
      if (!!this.applicationData.brms3Response) {
        this.brms3ResponseRulesFrontService
          .getWarningBrmsRules(this.applicationData.brms3Response.id)
          .subscribe(res => {
            this.negativeInformationInfoData = new TableData(this.negativeInformationColNameProps, res);
          });
      }

      this.chosenCreditInfoData = new TableData(this.chosenCreditColNameProps, [this.applicationData.chosenCreditInfo]);

      this.chatUnderLimitOwnerService.getAllByApplicationId(this.applicationData.id.toString()).subscribe(res => {
        this.chatUnderLimitOwnerList = res;
      });

      this.chatUnderManagerService.getAllByApplicationId(this.applicationData.id.toString()).subscribe(res => {
        this.chatUnderManagerList = res;
      });
    }

    if (!!this.verificationData) {
      this.verificationPhoneNumberData = new TableData(
        this.verificationPhoneNumberProps,
        this.verificationData.verificationPhones
      );
    }

    if (this.verificationData && this.verificationData.verificationChecklists) {
      this.verificationChecklists = this.verificationData.verificationChecklists.filter(
        (item: VerificationChecklist) => item.dirChecklist.active === true
      );
    }

    this.isNewMessageExists = this.applicationData.newMessageUMChat || this.applicationData.newMessageULChat;
  }

  ngOnDestroy(): void {}

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submittedForm();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      case 'delay': {
        this.delayApp();
        break;
      }
      case 'openComparison': {
        this.openComparisonPanel();
        break;
      }
      case 'processHistory': {
        this.openHistoryPanel();
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
      case 'loadToOwner': {
        this.loadCommentToOwnerChat(event.event as string);
        break;
      }
      default: {
        break;
      }
    }
  }

  delayApp() {
    this.sendReq().subscribe(_ => {
      this.navigateToDashboard();
    });
  }

  navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
  }

  submittedForm() {
    if (this.isValidForm()) {
      this.sendReq()
        .pipe(
          switchMap(_ =>
            this.applicationControllerService.acceptApp(this.applicationData.id.toString(), this.language)
          ),
          catchError(err => {
            this.isLoading = false;
            return throwError(err);
          })
        )
        .subscribe((res: any) => {
          if (!res) {
            this.toastService.viewMsg('SuccessMessage.SentForProcessing', 'success');
            this.navigateToDashboard();
          } else {
            this.isLoading = false;
            this.toastService.viewMsg(res.message, 'warning');
          }
        });
    }
  }

  isValidForm(): boolean {
    if (!!this.verificationData) {
      if (!this.verificationData || this.form.get('verifForm').invalid || !this.tableToggle) {
        this.scrollToFirstInvalid();
        return false;
      } else if (this.verificationData.verificationPhones.some(val => !val.callStatusId)) {
        this.scrollToInvalidTable();
        this.toastService.viewMsg('Необходимо заполнить статусы звонков в телефонной верификации', 'error');
        return false;
      } else if (
        this.verificationData.verificationChecklists.some(val => val.result) &&
        this.form.get('verifForm').get('dirVerifierDecisionId').value !== DecisionId.decline
      ) {
        this.toastService.viewMsg('Недопустимое Решение с учетом выявленной Негативной информации', 'error');
        return false;
      } else if (
        this.form.get('verifForm').get('dirVerifierDecisionId').value === DecisionId.approve &&
        !this.form.get('verifForm').get('verificationDone').value
      ) {
        this.toastService.viewMsg('Требуется верифицировать данные', 'error');
        return false;
      } else if (
        !this.isCommentToSopiokChatExists &&
        this.form.get('verifForm').get('dirVerifierDecisionId').value === 'RETURN'
      ) {
        this.toastService.viewMsg('Необходимо оставить комментарий в чате с СОПИОК/КЦ', 'error');
        return false;
      }

      return true;
    }
  }

  sendReq(): Observable<VerificationFrontDtoPost> {
    if (!!this.verificationData) {
      this.isLoading = true;

      const verification: VerificationFrontDtoPost = {
        ...this.verificationData,
        verification: {
          ...this.verificationData.verification,
          ...this.form.getRawValue().verifForm
        }
      };

      verification.verificationPhones = verification.verificationPhones.concat(
        this.editableTableRows.map(val => {
          return {
            ...val,
            applicationId: this.verificationData.verification.applicationId,
            applicantId: this.verificationData.verification.applicantId
          };
        })
      );

      return this.verificationControllerService
        .saveVerification(verification)
        .pipe(finalize(() => (this.isLoading = false)));
    }
  }

  openComparisonPanel() {
    const dialogRef = this.dialog.open(ComparisonPanelModalComponent, {
      width: '1000px',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: { applicationId: this.applicationData.id, pin: this.applicationData.applicant.identityCard.pin }
    });

    dialogRef.afterClosed().subscribe();
  }

  openHistoryPanel() {
    this.dialog.open(HistoryModalComponent, {
      width: '90vw',
      maxWidth: '90vw',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: { applicationId: this.applicationData.id }
    });
  }

  saveItems(event: TableContent<VerificationPhone>[]) {
    this.tableToggle = !this.tableToggle;
    if (this.tableToggle) {
      this.tableRows = event.map(val => val.tableCell as VerificationPhone);
    }
  }

  savedRowEditableTable(event: VerificationPhone) {
    this.editableTableRows.push(event);
  }

  removedRowEditableTable(event: VerificationPhone) {
    this.editableTableRows = this.editableTableRows.filter(row => row !== event);
  }

  setVisualAssessmentStatus() {
    let wasDecisionFinal = false;

    this.progressStages.forEach((elem: ProgressBar) => {
      if (elem.stage.id === StageType.DECISION_FINAL && !!elem.isPassed) {
        wasDecisionFinal = true;
      }
    });

    this.isVisualAssessmentVisible = wasDecisionFinal;
  }

  loadCommentToSopiokChat(comment: string) {
    if (!!comment) {
      this.isCommentToSopiokChatExists = true;
    }

    this.chatUnderManagerService
      .save({
        applicationId: this.applicationData.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .subscribe();
  }

  loadCommentToOwnerChat(comment: string) {
    this.chatUnderLimitOwnerService
      .save({
        applicationId: this.applicationData.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .subscribe();
  }

  onCommentClick() {
    if (!!this.isNewMessageExists && !this.readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.applicationData.id)
        .pipe(untilDestroyed(this))
        .subscribe(_ => (this.isNewMessageExists = false));
    }
  }

  private getDirectories() {
    combineLatest([
      this.selectUserData$,
      this.stopListAbsStatusList$,
      this.dirDecisionMakerDecisionList$,
      this.dirDecisionMakerDeclineReasonList$,
      this.statusData$
    ])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          selectedUserData,
          stopListAbsStatusList,
          dirDecisionMakerDecisionList,
          dirDecisionMakerDeclineReasonList,
          statusData
        ]) => {
          this.userData = selectedUserData || null;
          this.dirDecisionMakerDecisionList = dirDecisionMakerDecisionList;
          this.dirDecisionMakerDeclineReasonList = getOnlyActiveItems<DirectoryVal>(dirDecisionMakerDeclineReasonList);
          this.statusData = getOnlyActiveItems<Directory>(statusData);
        }
      );
  }

  private scrollToFirstInvalid() {
    const firstElementWithError = document.querySelector('form').querySelector('.ng-invalid');
    if (!!firstElementWithError) {
      firstElementWithError.scrollIntoView();
    }
  }

  private scrollToInvalidTable() {
    const firstElementWithError = document.querySelector('nv-editable-table');
    if (!!firstElementWithError) {
      firstElementWithError.scrollIntoView();
    }
  }

  private clearReqValidator(fc: AbstractControl) {
    fc.clearValidators();
    fc.updateValueAndValidity();
  }

  private setReqValidator(fc: AbstractControl) {
    fc.setValidators([Validators.required]);
    fc.updateValueAndValidity();
  }

  private getDirectoryObjById<T>(id: number, directoryList: T[]): T {
    return directoryList.find((item: any) => item.id === id);
  }
}
