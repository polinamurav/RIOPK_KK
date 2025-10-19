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
  PrintFormModalEmit,
  PrintingFormDownloadRq,
  PrintingFormDto,
  StageType,
  TableData,
  UserDto,
  ValueType
} from '@app/_models';
import { ApplicationControllerService, PrintingFormControllerService } from '@app/api';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { catchError, switchMap, take, takeUntil, finalize } from 'rxjs/operators';

import { AdditionalPrintFormService } from '@app/services/additional-print-form.service';
import { DeclineReasonModalComponent } from '@app/shared/components/modals/decline-reason-modal/decline-reason-modal.component';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { PrintFormModalComponent } from '@app/shared/components/modals/print-form-modal/print-form-modal.component';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { untilDestroyed } from '@app/core';
import {
  PAPERWORK_ACCOUNT_NAME,
  PAPERWORK_ADDITIONAL_PARAMETERS,
  PAPERWORK_RESULT,
  PAPERWORK_TITLES,
  PaperworkGroupKeys
} from '@app/components/tabs/paperwork/constants/paperwork.config';
import { ProductToPaymentDay } from '@app/_models/api-models/product-to-payment-day';
import { FormGroupService } from '@app/services/form-group.service';
import * as HEADERS from '@app/components/tabs/final-decision/constants/final-decision.constants';
import { CHOSEN_ACCOUNT_HEADERS } from '@app/components/tabs/final-decision/constants/final-decision.constants';
import { ELanguageType } from '@app/constants/language';
import { CREDIT_INFO_NAME_PROPS_ACCEPT } from '@app/components/tabs/data-form/constants/data-form-constants';
import { AppCommonRequestService, ChatServicesEnum } from '@app/services/app-common-request.service';
import { TranslateService } from '@ngx-translate/core';
import { HistoryModalComponent } from '@app/shared/components/modals/history-modal/history-modal.component';
import {AcceptanceGroupKeys, LOAN_AGREEMENT_INFO} from "@app/components/tabs/acceptance/constants/acceptance.config";
import {ContractDataDto} from "@app/_models/api-models/contract-data-dto";
import {AbsExpenseSettingControllerService} from "@app/api/abs-expense-setting-controller.service";

type Options = DirAbsCode | Dir | ProductToPaymentDay;

@Component({
  selector: 'ng-paperwork',
  templateUrl: './paperwork.component.html',
  styleUrls: ['./paperwork.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaperworkComponent implements OnInit, OnChanges, OnDestroy {
  paperworkForm: FormGroup;
  footerConfigSource = 'common.paperwork';
  isLoading: boolean = false;
  isSubmitting: boolean = false;

  titles: Record<string, string> = PAPERWORK_TITLES;
  PaperworkGroupKeys = PaperworkGroupKeys;

  additionalParametersConfig: BaseFormField[] = PAPERWORK_ADDITIONAL_PARAMETERS;
  accountNameConfig: BaseFormField[] = PAPERWORK_ACCOUNT_NAME;
  resultConfig: BaseFormField[] = PAPERWORK_RESULT;
  loanAgreement: BaseFormField[] = LOAN_AGREEMENT_INFO;
  EInputType = EInputType;
  ValueType = ValueType;

  chosenAccountData: TableData<AccountDto> = new TableData(HEADERS.CHOSEN_ACCOUNT_HEADERS, []);

  disabledButtons: { [key: string]: boolean } = {};

  isVisiblePaymentDay: boolean;
  isVisibleSecondPaymentDay: boolean;
  isVisibleCalculationDay: boolean;

  public optionsList: Record<string, Options[]> = {
    [OptionListNames.ScheduleTypes]: [],
    [OptionListNames.ScheduleFrequencies]: [],
    [OptionListNames.EnsureTypes]: [],
    [OptionListNames.IssueTypes]: [],
    [OptionListNames.ProductToPaymentDay]: [],
    [OptionListNames.PaperworkDecisionList]: [],
    [OptionListNames.DeclineReasons]: []
  };

  finalCreditInfoColTableData: TableData<any> = new TableData(CREDIT_INFO_NAME_PROPS_ACCEPT, []);

  public chosenCard: AccountDto;

  @Input() applicationData: Application;
  @Input() accountIssue: AccountIssueGetDto;
  @Input() readonlyForm: boolean = false;

  @Input() language: string;

  private absContractData: ContractDataDto;
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
  private paperworkDecisionList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.paperworkDecisionList))
  );

  private declineReasons$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.declineReasons)));

  constructor(
    private router: Router,
    private toastService: ToastService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private _store: Store<IAppState>,
    private appService: ApplicationControllerService,
    private printingFormService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private additionalPrintFormService: AdditionalPrintFormService,
    private routerURLService: RouterURLService,
    private absExpenseSettingControllerService: AbsExpenseSettingControllerService,
    private cd: ChangeDetectorRef,
    private formGroupService: FormGroupService<any, any>,
    private applicationControllerService: ApplicationControllerService,
    private readonly appCommonRequestService: AppCommonRequestService
  ) {}

  ngOnInit() {
    this.getDirectories();
    this.createForm();
    this.checkReadonly();

    this.getAbsContract(this.applicationData.applicant.applicationId);

    this.appCommonRequestService.setChatInfo();
    this.setFinCreditInfoTable();
    this.translateService.onLangChange.subscribe(value => {
      this.language = value.lang;
      this.setInitialChosenAccountData();
    });

    this.appCommonRequestService.isSubmitBlocked$
      .pipe(untilDestroyed(this))
      .subscribe(isBlocked => {
        this.disabledButtons = {
          ...this.disabledButtons,
          submit: isBlocked
        };
      });
  }

  ngOnChanges(){
    this.setInitialChosenAccountData();
  }

  get historyButtonVisible() {
    return this.routerURLService.isqQueues();
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

  get footerButtonsVisible(): boolean {
    if (this.applicationData) {
      return [StageType.PAPERWORK, StageType.PAPERWORK_RETURN].some(el => el === this.applicationData.stage.id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'print': {
        this.printForm();
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

  submitForm() {
    if (this.isSubmitting) {
      return;
    }

    if (this.paperworkForm.valid) {
      this.isSubmitting = true;
      this.isLoading = true;
      if (this.applicationData.isSmsSign) this.appCommonRequestService.setIsOtpConfirmed(true);
      this.appService
        .setPaperworkDecision(this.applicationData.id, this.paperworkForm.get('result.paperworkDecision').value)
        .pipe(
          switchMap(_ => this.appService.acceptApp(
            this.applicationData.id.toString(),
            this.language,
            this.appCommonRequestService.isOtpConfirmed
            )),
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
            this.appCommonRequestService.setIsOtpConfirmed(false);
            this.navigateToDashboard();
          } else {
            this.isLoading = false;
            this.toastService.viewMsg(res.message, 'warning');
          }
        });
    }
  }

  printForm() {
    this.additionalPrintFormService
      .getPrintFormsWithSigners(this.applicationData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: PrintingFormDto[]) => {
        if (res) {
          this.openPrintFormModal(res);
        }
      });
  }

  openPrintFormModal(modalData: PrintingFormDto[]) {
    const dialogRef = this.dialog.open(PrintFormModalComponent, {
      height: 'auto',
      width: '40vw',
      data: { modalData, language: this.language }
    });

    (dialogRef.componentInstance as PrintFormModalComponent).emitData
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PrintFormModalEmit) => {
        const agreementFormParams: PrintingFormDownloadRq = new PrintingFormDownloadRq(
          this.applicationData.id,
          data.form.code
        );
        this.printingFormService.fillExternal(agreementFormParams);
      });
  }

  navigateToDashboard() {
    this.routerURLService.navigateToDashboard();
  }

  openDeclineReasonModal() {
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

  cancelApp(dirManagerDeclineReasonId: number) {
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


  private getAbsContract(applicantId: any) {
    if (applicantId) {
      this.absExpenseSettingControllerService.getAbsContract(applicantId).subscribe(value => {
        this.absContractData = value;
        this.paperworkForm.get(AcceptanceGroupKeys.loanAgreement).patchValue(this.absContractData);
      });
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
      this.paperworkForm.disable();
    }
  }

  private createForm() {
    this.paperworkForm = this.formBuilder.group({});
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

    this.paperworkForm.addControl(PaperworkGroupKeys.AdditionalParameters, additionalParametersControls);
    this.paperworkForm.addControl(PaperworkGroupKeys.AccountName, accountNameControls);
    this.paperworkForm.addControl(PaperworkGroupKeys.Result, resultControls);
    this.paperworkForm.addControl(AcceptanceGroupKeys.loanAgreement, loanAgreementControls);
    this.cd.markForCheck();
  }

  private getDirectories() {
    combineLatest([
      this.dirScheduleTypes$,
      this.dirScheduleFrequency$,
      this.dirEnsureType$,
      this.dirIssueType$,
      this.productToPaymentDay$,
      this.paperworkDecisionList$,
      this.declineReasons$
    ])
      .pipe(
        take(15),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          scheduleTypes,
          scheduleFrequencies,
          ensureTypes,
          issueTypes,
          productToPaymentDay,
          paperworkDecisionList,
          declineReasons
        ]) => {
          this.optionsList = {};
          this.optionsList[OptionListNames.ScheduleTypes] = getOnlyActiveItems<DirAbsCode>(scheduleTypes);
          this.optionsList[OptionListNames.ScheduleFrequencies] = getOnlyActiveItems<Dir>(scheduleFrequencies);
          this.optionsList[OptionListNames.EnsureTypes] = getOnlyActiveItems<Dir>(ensureTypes);
          this.optionsList[OptionListNames.IssueTypes] = getOnlyActiveItems<Dir>(issueTypes);
          this.optionsList[OptionListNames.ProductToPaymentDay] = productToPaymentDay || null;
          this.optionsList[OptionListNames.PaperworkDecisionList] = getOnlyActiveItems<Dir>(paperworkDecisionList);
          this.optionsList[OptionListNames.DeclineReasons] = getOnlyActiveItems<Dir>(declineReasons);
          this.cd.markForCheck();
        }
      );
  }

  private saveApplicationData(data: Partial<ApplicationDto>): Observable<ApplicationDto> {
    const appData: ApplicationDto = new ApplicationDto(this.applicationData);
    return this.appService.update({
      ...appData,
      ...data
    });
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
      this.cd.detectChanges();
    }
  }

  private setFinCreditInfoTable() {
    if (this.applicationData.finalCreditInfo) {
      this.applicationData.finalCreditInfo.maxLimit = this.applicationData.finalCreditInfo.creditAmount;
      this.finalCreditInfoColTableData = new TableData(CREDIT_INFO_NAME_PROPS_ACCEPT, [
        this.setTermsToCreditInfo(this.applicationData.finalCreditInfo)
      ]);
      this.cd.detectChanges();
    }
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
