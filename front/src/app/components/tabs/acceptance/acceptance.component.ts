import {
  AccountDto,
  AccountIssueGetDto,
  Application,
  ApplicationDto,
  BaseFormField,
  CommentDto,
  CreditInfo,
  Dir,
  DirAbsCode,
  EInputType,
  OptionListNames,
  StageType,
  TableData,
  UserDto,
  ValueType,
  VerificationGetDto
} from '@app/_models';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';

import { ApplicationControllerService } from '@app/api';
import { ChatCradminManagerControllerService } from '@app/api/chat-cradmin-manager-controller.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { untilDestroyed } from '@app/core';
import {
  ACCEPTANCE_ACCOUNT_NAME,
  ACCEPTANCE_ADDITIONAL_PARAMETERS,
  ACCEPTANCE_RESULT,
  ACCEPTANCE_TITLES,
  AcceptanceGroupKeys,
  LOAN_AGREEMENT_INFO
} from '@app/components/tabs/acceptance/constants/acceptance.config';
import { FormGroupService } from '@app/services/form-group.service';
import { ProductToPaymentDay } from '@app/_models/api-models/product-to-payment-day';
import { CREDIT_INFO_NAME_PROPS_ACCEPT } from '@app/components/tabs/data-form/constants/data-form-constants';
import * as HEADERS from '@app/components/tabs/final-decision/constants/final-decision.constants';
import { CHOSEN_ACCOUNT_HEADERS } from '@app/components/tabs/final-decision/constants/final-decision.constants';
import { ELanguageType } from '@app/constants/language';
import { AppCommonRequestService, ChatServicesEnum } from '@app/services/app-common-request.service';
import { DeclineReasonModalComponent } from '@app/shared/components/modals/decline-reason-modal/decline-reason-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AbsExpenseSettingControllerService } from '@app/api/abs-expense-setting-controller.service';
import { ContractDataDto } from '@app/_models/api-models/contract-data-dto';
import { TranslateService } from '@ngx-translate/core';
import { HistoryModalComponent } from '@app/shared/components/modals/history-modal/history-modal.component';
import { VerificationControllerService } from '@app/api/verification-controller.service';
import { BorrowersGroupKeys } from '@app/components/tabs/borrowers/constants/borrowers.config';

type Options = DirAbsCode | Dir | ProductToPaymentDay;

@Component({
  selector: 'ng-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.scss']
})
export class AcceptanceComponent implements OnInit, OnDestroy {
  acceptanceForm: FormGroup;
  isLoading: boolean = false;
  footerConfigSource = 'common.acceptance';

  titles: Record<string, string> = ACCEPTANCE_TITLES;
  AcceptanceGroupKeys = AcceptanceGroupKeys;
  additionalParametersConfig: BaseFormField[] = ACCEPTANCE_ADDITIONAL_PARAMETERS;
  accountNameConfig: BaseFormField[] = ACCEPTANCE_ACCOUNT_NAME;
  resultConfig: BaseFormField[] = ACCEPTANCE_RESULT;
  loanAgreement: BaseFormField[] = LOAN_AGREEMENT_INFO;
  EInputType = EInputType;
  ValueType = ValueType;
  absContractData: ContractDataDto;
  isSubmitting: boolean = false;

  chosenAccountData: TableData<AccountDto> = new TableData(HEADERS.CHOSEN_ACCOUNT_HEADERS, []);

  isVisiblePaymentDay: boolean;
  isVisibleSecondPaymentDay: boolean;
  isVisibleCalculationDay: boolean;

  public optionsList: Record<string, Options[]> = {
    [OptionListNames.ScheduleTypes]: [],
    [OptionListNames.ScheduleFrequencies]: [],
    [OptionListNames.EnsureTypes]: [],
    [OptionListNames.IssueTypes]: [],
    [OptionListNames.ProductToPaymentDay]: [],
    [OptionListNames.AccepterDecisionList]: [],
    [OptionListNames.DeclineReasons]: []
  };
  @Input() applicationData: Application;
  @Input() accountIssue: AccountIssueGetDto;
  @Input() readonlyForm: boolean = false;
  @Input() language: string;

  finalCreditInfoColTableData: TableData<any> = new TableData(CREDIT_INFO_NAME_PROPS_ACCEPT, []);

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private dirScheduleTypes$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirScheduleTypes)));
  private dirScheduleFrequency$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.dirScheduleFrequency))
  );
  private dirEnsureType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirEnsureType)));
  private dirIssueType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirIssueType)));
  private productToPaymentDay$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.productToPaymentDay))
  );
  private declineReasons$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.declineReasons)));
  private accepterDecisionList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.accepterDecisionList))
  );

  private chosenCard: AccountDto;
  private currentVerificationData: VerificationGetDto;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private appService: ApplicationControllerService,
    private chatCradminManagerService: ChatCradminManagerControllerService,
    private readonly verificationControllerService: VerificationControllerService,
    private routerURLService: RouterURLService,
    private formGroupService: FormGroupService<any, any>,
    private applicationControllerService: ApplicationControllerService,
    private absExpenseSettingControllerService: AbsExpenseSettingControllerService,
    private readonly appCommonRequestService: AppCommonRequestService
  ) {}

  get footerButtonsVisible(): boolean {
    if (this.applicationData) {
      return [StageType.ACCEPTANCE].some(el => el === this.applicationData.stage.id);
    }
  }

  get userData(): UserDto {
    return this.appCommonRequestService.userData;
  }

  get chatList(): CommentDto[] {
    return this.appCommonRequestService.getChatList();
  }

  get isNewMessageExists(): boolean {
    return this.appCommonRequestService.isNewMessageExists;
  }

  get historyButtonVisible() {
    return this.routerURLService.isqQueues();
  }

  get accepterDecisionControl() {
    return this.acceptanceForm.get('result.accepterDecision') as FormControl;
  }

  getAbsContract(applicantId: any) {
    if (applicantId) {
      this.absExpenseSettingControllerService.getAbsContract(applicantId).subscribe(value => {
        this.absContractData = value;
        this.acceptanceForm.get(AcceptanceGroupKeys.loanAgreement).patchValue(this.absContractData);
      });
    }
  }

  ngOnInit() {
    this.getDirectories();
    this.createForm();
    this.getAbsContract(this.applicationData.applicant.applicationId);
    this.checkVisibilitySelect();
    this.checkReadonly();

    this.appCommonRequestService.setChatInfo(true);
    this.setFinCreditInfoTable();
    this.setInitialChosenAccountData();
    this.translateService.onLangChange.subscribe(value => {
      this.language = value.lang;
      this.setInitialChosenAccountData();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkVisibilitySelect() {
    this.acceptanceForm
      .get('additionalParameters.dirScheduleFrequencyId')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(value => {
        if (value === 2) {
          this.isVisibleSecondPaymentDay = true;
        } else {
          this.isVisibleSecondPaymentDay = false;
        }
      });
    if (this.applicationData.finalCreditInfo && this.applicationData.finalCreditInfo.product) {
      if (
        this.applicationData.finalCreditInfo.product.isOverdraft === false &&
        this.applicationData.finalCreditInfo.product.forCard === false
      ) {
        this.isVisiblePaymentDay = true;
        this.isVisibleCalculationDay = false;
      }
      if (
        this.applicationData.finalCreditInfo.product.isOverdraft === true ||
        this.applicationData.finalCreditInfo.product.forCard === true
      ) {
        this.isVisiblePaymentDay = false;
        this.isVisibleCalculationDay = true;
      }
    }
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      case 'processHistory': {
        this.openHistoryPanel();
        break;
      }
      case 'delay': {
        this.delayApp();
        break;
      }
      case 'decline': {
        this.openDeclineReasonModal();
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

  validationOfCommentFields(val: any) {
    const commentConfig = this.resultConfig.find(el => el.code === 'comment');

    if (val === 'ACCEPT') {
      commentConfig.required = false;
      this.acceptanceForm.get('result.comment').clearValidators();
    } else {
      commentConfig.required = true;
      this.acceptanceForm.get('result.comment').setValidators(Validators.required);
    }
    this.acceptanceForm.get('result.comment').updateValueAndValidity();
  }

  submitForm() {
    if (this.isSubmitting) {
      return;
    }

    if (this.acceptanceForm.valid) {
      this.isLoading = true;
      this.isSubmitting = true;

      this.appService
        .setAccepterDecision(this.applicationData.id, this.acceptanceForm.get('result.accepterDecision').value)
        .pipe(
          switchMap(_ =>
            this.verificationControllerService.saveVerificationAcceptance({
              id: !!this.currentVerificationData ? this.currentVerificationData.id : null,
              comment: this.acceptanceForm.get('result.comment').value,
              applicantId: this.applicationData.applicant.id,
              applicationId: this.applicationData.id
            })
          ),
          switchMap(_ => this.appService.acceptApp(this.applicationData.id.toString(), this.language)),
          catchError(err => {
            this.isLoading = false;
            this.isSubmitting = false;
            return throwError(err);
          }),
          finalize(() => {
            this.isSubmitting = false;
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

  private setFinCreditInfoTable() {
    if (this.applicationData.finalCreditInfo) {
      this.applicationData.finalCreditInfo.maxLimit = this.applicationData.finalCreditInfo.creditAmount;
      this.finalCreditInfoColTableData = new TableData(CREDIT_INFO_NAME_PROPS_ACCEPT, [
        this.setTermsToCreditInfo(this.applicationData.finalCreditInfo)
      ]);
    }
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

  private onCommentClick() {
    this.appCommonRequestService.onCommentClick(this.readonlyForm);
  }

  private loadCommentToSopiokChat(comment: string) {
    this.appCommonRequestService.loadCommentToSopiokChat(comment, true);
  }

  private checkReadonly() {
    if (this.readonlyForm) {
      this.acceptanceForm.disable();
    }
  }

  private navigateToDashboard() {
    this.routerURLService.navigateToDashboard();
  }

  private createForm() {
    this.acceptanceForm = this.formBuilder.group({});
    const additionalParametersControls: FormGroup = this.formGroupService.createForm(
      this.applicationData.finalCreditInfo,
      this.additionalParametersConfig,
      this.optionsList
    );
    const accountNameControls: FormGroup = this.formGroupService.createForm(
      this.accountIssue,
      this.accountNameConfig,
      null
    );
    const resultControls: FormGroup = this.formGroupService.createForm(
      this.applicationData,
      this.resultConfig,
      this.optionsList
    );

    const loanAgreementControls: FormGroup = this.formGroupService.createForm(
      this.absContractData,
      this.loanAgreement,
      null
    );

    this.acceptanceForm.addControl(AcceptanceGroupKeys.AdditionalParameters, additionalParametersControls);
    this.acceptanceForm.addControl(AcceptanceGroupKeys.AccountName, accountNameControls);
    this.acceptanceForm.addControl(AcceptanceGroupKeys.Result, resultControls);
    this.acceptanceForm.addControl(AcceptanceGroupKeys.loanAgreement, loanAgreementControls);
  }

  private getDirectories() {
    combineLatest([
      this.dirScheduleTypes$,
      this.dirScheduleFrequency$,
      this.dirEnsureType$,
      this.dirIssueType$,
      this.productToPaymentDay$,
      this.accepterDecisionList$,
      this.declineReasons$,
      this.verificationControllerService.getVerification(this.applicationData.applicant.id, this.applicationData.id)
    ])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          scheduleTypes,
          scheduleFrequencies,
          ensureTypes,
          issueTypes,
          productToPaymentDay,
          accepterDecisionList,
          declineReasons,
          verificationData
        ]) => {
          this.optionsList[OptionListNames.ScheduleTypes] = getOnlyActiveItems<DirAbsCode>(scheduleTypes);
          this.optionsList[OptionListNames.ScheduleFrequencies] = getOnlyActiveItems<Dir>(scheduleFrequencies);
          this.optionsList[OptionListNames.EnsureTypes] = getOnlyActiveItems<Dir>(ensureTypes);
          this.optionsList[OptionListNames.IssueTypes] = getOnlyActiveItems<Dir>(issueTypes);
          this.optionsList[OptionListNames.ProductToPaymentDay] = productToPaymentDay || null;
          this.optionsList[OptionListNames.AccepterDecisionList] = getOnlyActiveItems<Dir>(accepterDecisionList);
          this.optionsList[OptionListNames.DeclineReasons] = getOnlyActiveItems<Dir>(declineReasons);

          if (verificationData) {
            this.currentVerificationData = verificationData.find(el => el && el.stageId === StageType.ACCEPTANCE);
            if (this.currentVerificationData) {
              this.acceptanceForm.get('result.comment').setValue(this.currentVerificationData.comment);
            }
          }
        }
      );
  }

  private setInitialChosenAccountData(): void {
    if (this.accountIssue) {
      const nameAccount = !!this.accountIssue.accountName
        ? this.accountIssue.accountName
        : !!this.accountIssue.dirPaymentCard
        ? this.accountIssue.dirPaymentCard[ELanguageType[this.language]]
        : !!this.accountIssue.dirAccountType
        ? this.accountIssue.dirAccountType[ELanguageType[this.language]]
        : null;

      this.chosenCard = {
        accountBalance: this.accountIssue.accountBalance,
        accountNumber: this.accountIssue.accNum,
        id: this.accountIssue.id,
        accountName: nameAccount,
        currency:
          !!this.accountIssue.dirCurrency && typeof this.accountIssue.dirCurrency === 'object'
            ? this.accountIssue.dirCurrency.id
            : this.accountIssue.dirCurrency,
        accountType: this.accountIssue.dirAccountType,
        applicantId: this.accountIssue.applicantId,
        applicationId: this.accountIssue.applicationId
      } as any;
      this.chosenAccountData = new TableData(CHOSEN_ACCOUNT_HEADERS, [this.chosenCard]);
    }
  }

  // deprecated
  private openDeclineReasonModal() {
    const dialogRef = this.dialog.open(DeclineReasonModalComponent, {
      width: '40vw',
      maxWidth: '40vw',
      height: '30vh',
      data: { declineReasons: this.optionsList[OptionListNames.DeclineReasons], language: this.language }
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: string | number) => {
        if (result && typeof result !== 'string') {
          this.cancelApp(result);
        }
      });
  }

  // deprecated
  private delayApp() {
    this.isLoading = true;
    const data: Partial<ApplicationDto> = {};
    this.saveApplicationData(data)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(res => {
        this.isLoading = false;
        this.toastService.viewMsg('SuccessMessage.Saved', 'success');
        this.navigateToDashboard();
      });
  }

  private cancelApp(dirManagerDeclineReasonId: number) {
    this.isLoading = true;

    const data: Partial<ApplicationDto> = { dirManagerDeclineReasonId };

    this.saveApplicationData(data)
      .pipe(
        switchMap(_ => this.appService.declineApp(this.applicationData.id.toString())),
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe(res => {
        this.isLoading = false;
        this.toastService.viewMsg('SuccessMessage.Denied', 'success');
        this.navigateToDashboard();
      });
  }

  private saveApplicationData(data: Partial<ApplicationDto>): Observable<ApplicationDto> {
    const appData: ApplicationDto = new ApplicationDto(this.applicationData);
    return this.appService.update({
      ...appData,
      ...data
    });
  }

  private setTermsToCreditInfo = (creditInfo: CreditInfo | any): CreditInfo => {
    const creditTerm = creditInfo.creditTerm;

    creditInfo.creditTermWithType = {
      nameRu:
        creditTerm +
        ` ${
          creditInfo.productCondition && creditInfo.productCondition.dirLoanTermType
            ? creditInfo.productCondition.dirLoanTermType
            : 'мес.'
        }`,
      nameAm:
        creditTerm +
        ` ${
          creditInfo.productCondition && creditInfo.productCondition.dirLoanTermType
            ? creditInfo.productCondition.dirLoanTermType
            : 'Ամիս.'
        }`
    };

    return creditInfo;
  };
}
