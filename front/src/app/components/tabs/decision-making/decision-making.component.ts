import * as HEADERS from '@app/components/tabs/decision-making/constants/decision-making.constants';
import * as _ from 'lodash';

import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import {
  ApplicantIncomeGetDto,
  ApplicantLoanDto,
  Application,
  BaseFormField,
  CommentDto,
  Company,
  CompanyDto,
  CompanyStatus,
  Dir,
  DirAbsCode,
  DirCountry,
  DirStatus,
  Directory,
  EInputType,
  EditableTableHeader,
  OptionListNames,
  ProductDto,
  StopListAbsStatusDto,
  TableData,
  UserDto,
  VerificationEmployment,
  VerificationFrontDtoGet,
  VerificationPostDto,
  User,
  VerificationEmploymentDto,
  ApplicantIncomePostDto,
  StageType,
  VerificationFrontDtoPost,
  VerificationGetDto,
  CreditInfo
} from '@app/_models';
import {
  ApplicantLoanControllerService,
  ApplicationControllerService,
  Brms2MatrixFrontControllerService,
  Brms4MatrixFrontControllerService,
  ChatUnderLimitOwnerControllerService
} from '@app/api';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  DecisionMakingGroupKeys,
  DECISION_MAKING_TITLES,
  DECISION_INFO,
  DECISION_CREDIT_FORM
} from '@app/components/tabs/decision-making/constants/decision-making.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  mergeMap,
  pairwise,
  startWith,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, of, throwError } from 'rxjs';
import { ADD_COMPANY_DECISION_MAKING } from '../data-form/constants/add-company-config';
import { CompanyControllerService } from '@app/api/company-controller.service';
import { DecisionId } from '@app/constants/decision-id';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { FormGroupService } from '@app/services/form-group.service';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { TableDataProcessingService } from '@app/components/tabs/data-form/services/table-data-processing.service';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';
import { VerificationControllerService } from '@app/api/verification-controller.service';
import { validateByPattern } from '@app/validators/validation-by-pattern';
import { InputErrorKeys, PatternsEnum } from '@app/constants/validators-errors';
import { CreditInfoControllerService } from '@app/api/credit-info-controller.service';
import { CredentialsService } from '@app/services/authentication';
import { BRMS4MatrixDto, BRMSMatrixDto } from '@app/_models/api-models/brms';
import { MatrixUtilService } from '@app/components/tabs/data-form/services/matrix-util.service';
import { ChatUnderManagerControllerService } from '@app/api/chat-under-manager-controller.service';
import { ApplicantControllerService } from '@app/api/applicant-controller.service';
import { VerificationEmploymentControllerService } from '@app/api/verification-employment-controller.service';
import { CreditInfoLoanControllerService } from '@app/api/credit-info-loan-controller.service';
import { AppCommonRequestService, ChatServicesEnum } from '@app/services/app-common-request.service';
import { LOAN_TOTAL_INFO } from '@app/components/tabs/decision-making/constants/decision-making.constants';
import { ELanguageType } from '@app/constants/language';
import { ValidateMatrixDataService } from '@app/components/comon-services/validate-matrix-data.service';
import { HistoryModalComponent } from '@app/shared/components/modals/history-modal/history-modal.component';
import { PosProductInfoDataService } from '@app/components/tabs/pos-product-info/pos-product-info-data.service';

type Options =
  | Dir
  | DirStatus
  | Directory
  | ProductDto
  | DirAbsCode
  | DirCountry
  | Company
  | StopListAbsStatusDto
  | CompanyStatus;
type TableDataOptions = ApplicantLoanDto | ApplicantIncomePostDto | ApplicantIncomeGetDto | VerificationEmployment;

interface ApplicantLoanTableTotal {
  monthlyLoanPayment?: number;
  remainder?: number;
  amount?: number;
}

// * Принятие решения
@Component({
  selector: 'ng-decision-making',
  templateUrl: './decision-making.component.html',
  styleUrls: ['./decision-making.component.scss'],
  providers: [TableDataProcessingService, MatrixUtilService]
})
export class DecisionMakingComponent implements OnInit, OnDestroy, OnChanges {
  @Input() applicationData: Application;
  @Input() isAppInQueues: boolean = false;
  @Input() language: string;
  @Input() applicantIncome: ApplicantIncomeGetDto[];
  @Input() applicantLoan: ApplicantLoanDto[];
  @Input() readonlyForm: boolean;

  isLoading: boolean;
  isSubmitting: boolean = false;
  footerConfigSource = 'common.decisionMaking';

  applicantLoanForTable: ApplicantLoanDto[];
  applicantLoanTotal: ApplicantLoanTableTotal = { amount: 0, monthlyLoanPayment: 0, remainder: 0 };
  applicantLoanTotalConfig = LOAN_TOTAL_INFO;

  public titles: Record<string, string> = DECISION_MAKING_TITLES;
  public DecisionMakingGroupKeys = DecisionMakingGroupKeys;

  public basicConditionsFinancingTableData: TableData<any> = new TableData(
    HEADERS.BASIC_CONDITIONS_FINANCING_HEADERS,
    []
  ); // TODO Romanovski: change type

  public recalculateFinancingTableData: TableData<any> = new TableData(
    HEADERS.RECALCULATE_CONDITIONS_FINANCING_HEADERS,
    []
  );

  public applicantLoanTableHeaders: EditableTableHeader[] = HEADERS.SUSPENSIVE_CONDITIONS_HEADERS;
  // public suspensiveConditionsDto: ApplicantLoanDto[] = []; // TODO Romanovski: change type

  public decisionInfoConfig: BaseFormField[] = DECISION_INFO;
  public decisionCreditFormConfig: BaseFormField[] = _.cloneDeep(DECISION_CREDIT_FORM);

  public optionsList: Record<string, Options[]> = {
    [OptionListNames.AcceptedConditionsRM]: [],
    [OptionListNames.TypeOfDecision]: [],
    [OptionListNames.Decision]: [],

    [OptionListNames.StopListAbsStatusList]: [],
    [OptionListNames.Banks]: [],
    [OptionListNames.Currencies]: [],
    [OptionListNames.Companies]: [],
    [OptionListNames.CompanyActivityType]: [],
    [OptionListNames.JobPositionType]: [],
    [OptionListNames.IncomeType]: [],
    [OptionListNames.IncomeFrequency]: [],
    [OptionListNames.DecisionMakerDecisionList]: [],
    [OptionListNames.CompanyStatus]: [],
    [OptionListNames.ProvisionRate]: []
  };

  // applicantIncomePostDto: ApplicantIncomePostDto[] = [];
  // applicantLoanPostDto: ApplicantLoanDto[] = [];
  // applicantGuarantorLoanPostDto: ApplicantLoanDto[] = [];
  // verificationEmployments: VerificationEmployment[] = [];

  // verificationEmploymentsTableHeaders: EditableTableHeader[] = HEADERS.VERIFICATION_EMPLOYMENTS_HEADERS;
  // incomeInformationEditableTableHeaders: EditableTableHeader[] = HEADERS.INCOME_INFORMATION_HEADERS;
  // applicantLoanTableHeaders: EditableTableHeader[] = HEADERS.LOAN_HEADERS;
  // applicantGuarantorLoanTableHeaders: EditableTableHeader[] = HEADERS.GUARANTOR_TABLE_HEADERS;
  // creditConditionsForConfirmedIncomeInfoData: TableData<any> = new TableData(HEADERS.CREDIT_CONDITIONS_HEADERS, []);

  // incomeConfig: BaseFormField[] = DECISION_MAKING_INCOME;
  // creditInfoConfig: BaseFormField[] = DECISION_MAKING_CREDIT_INFO;
  // limitUnderConfig: BaseFormField[] = DECISION_MAKING_LIMIT_UNDER;
  // decisionMakerDecisionConfig: BaseFormField[] = DECISION_MAKING_DECISION_MAKER_DECISION;
  // declineReasonConfig: BaseFormField[] = DECISION_MAKING_DECLINE_REASON;
  // commentConfig: BaseFormField[] = DECISION_MAKING_COMMENT;

  EInputType = EInputType;

  pageForSelect: number;

  itemLimit: number = 20;
  totalCount: number = 1;

  isReCalculate: boolean = false;
  isVisibleDeclineReason: boolean;
  isVisibleProvisionRate: boolean;
  lastValue: string;
  toggleIsBasicChecked: boolean = false;
  isWithRef: boolean = false;
  isWithProduct: number = null;
  approvedMatrix: BRMS4MatrixDto[] = [];

  form: FormGroup;

  private addCompanyFormConfig: BaseFormField[] = ADD_COMPANY_DECISION_MAKING;
  private stopListAbsStatusList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.stopListAbsStatusList))
  );
  private typeOfDecision$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.typeOfDecisions)));
  private decision$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.decisions)));
  private banks$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.bank)));
  private companies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.companies)));
  private jobPositionType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.jobPositionType)));
  private currencies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.currencies)));
  private incomeType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeType)));
  private incomeFrequency$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeFrequency)));
  private companyActivityType$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.employmentActivity))
  );
  private dirDecisionMakerDecisionList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.dirDecisionMakerDecisionList))
  );
  private dirDecisionMakerDeclineReasonList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.dirDecisionMakerDeclineReasonList))
  );
  private companyStatuses$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.companyStatuses)));
  private provisionRate$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.provisionRate)));
  private products$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.productCategories)));

  private trueFalseGuide: Dir[] = HEADERS.TRUE_FALSE_GUIDE;

  private verificationData: VerificationGetDto[];
  private currentVerificationData: VerificationGetDto;

  private selectedMatrix: BRMSMatrixDto | any;

  private minCreditAmount: number = 0;

  constructor(
    private _store: Store<IAppState>,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private applicationControllerService: ApplicationControllerService,
    private chatUnderLimitOwnerService: ChatUnderLimitOwnerControllerService,
    private brms4MatrixFrontService: Brms4MatrixFrontControllerService,
    private routerURLService: RouterURLService,
    private formGroupService: FormGroupService<any, Options>,
    private tableDataProcessingService: TableDataProcessingService,
    private applicantLoanControllerService: ApplicantLoanControllerService,
    private companyService: CompanyControllerService,
    private verificationService: VerificationControllerService,
    private creditInfoService: CreditInfoControllerService,
    private creditInfoLoanService: CreditInfoLoanControllerService,
    private credentialsService: CredentialsService,
    private readonly verificationControllerService: VerificationControllerService,
    private matrixUtilService: MatrixUtilService,
    private chatUnderManagerService: ChatUnderManagerControllerService,
    private applicantControllerService: ApplicantControllerService,
    private brms2MatrixService: Brms2MatrixFrontControllerService,
    private verificationEmploymentService: VerificationEmploymentControllerService,
    private validateMatrixDataService: ValidateMatrixDataService,
    private readonly appCommonRequestService: AppCommonRequestService,
    private readonly posProductInfoDataService: PosProductInfoDataService
  ) {}

  get historyButtonVisible() {
    return this.routerURLService.isqQueues();
  }

  get footerButtonsVisible(): boolean {
    if (this.applicationData) {
      return [StageType.RM, StageType.DECISION_MAKING].some(el => el === this.applicationData.stage.id);
    }
  }

  get isPosCredit() {
    return this.applicationData && this.applicationData.isPos;
  }


  get decisionForm(): FormGroup {
    return this.form.get(DecisionMakingGroupKeys.Decision) as FormGroup;
  }

  get decisionCreditForm(): FormGroup {
    return this.form.get(DecisionMakingGroupKeys.DecisionCreditForm) as FormGroup;
  }

  get isDecisionCreditFormValueFill(): boolean {
    const controls = this.decisionCreditForm.controls;
    return Object.keys(controls).some(key => {
      return controls[key].value;
    });
  }

  get isTopUpProduct() {
    return (
      this.applicationData.chosenCreditInfo &&
      this.applicationData.chosenCreditInfo.brmsMatrix &&
      !!this.applicationData.chosenCreditInfo.brmsMatrix.topUps.length
    );
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

  get chosenCreditInfo() {
    return this.applicationData.chosenCreditInfo;
  }

  get isClientMilitary() {
    return this.applicationData && this.applicationData.applicant.isClientMilitary;
  }

  get isOnlineProduct() {
    return (
      this.applicationData &&
      this.applicationData.chosenCreditInfo &&
      !!this.applicationData.chosenCreditInfo.brmsMatrixOnlineTermId
    );
  }

  get brmsMatrix() {
    return this.applicationData.chosenCreditInfo ? this.applicationData.chosenCreditInfo.brmsMatrix : null;
  }

  ngOnInit() {
    // this.readonlyForm = false; // todo

    const creditTermField = this.decisionCreditFormConfig.find(f => f.code === 'creditTerm');
    if (creditTermField && this.isPosCredit) {
      creditTermField.disabled = true;
    }

    setTimeout(() => {
      if (this.posProductInfoDataService.posRkkDataDto &&
        this.posProductInfoDataService.posRkkDataDto.creditProgram &&
        this.posProductInfoDataService.posRkkDataDto.creditProgram.minAmount) {

        this.minCreditAmount = this.posProductInfoDataService.posRkkDataDto.creditProgram.minAmount;
      }
    }, 100);

    this.getDirectories();
    this.createForm();
    // this.transformApplicantIncomeObj(this.applicantIncome);
    this.transformApplicantLoanObj(this.applicantLoan);
    this.checkReadonly();
    // this.filterConfigsByRoles(['commentConfig', 'incomeConfig']);
    this.appCommonRequestService.setChatInfo();
    // this.getCalculatedMatrix();

    if (this.applicationData) {
      this.setCreditTables();
      this.setDecCalcForm();
    }
  }

  private setDecCalcForm() {
    if (this.applicationData.chosenCreditInfo) {
      this.decisionCreditForm.patchValue({
        creditAmount: Math.ceil(this.applicationData.chosenCreditInfo.creditAmount),
        rate: this.applicationData.chosenCreditInfo.rate,
        creditTerm: this.applicationData.chosenCreditInfo.creditTerm
      });
    }
  }

  ngOnChanges() {
    this.transformApplicantLoanObj(this.applicantLoan);
  }

  ngOnDestroy(): void {}

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
      case 'delay': {
        this.delayApp();
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
      default: {
        break;
      }
    }
  }

  loadCommentToSopiokChat(comment: string) {
    this.appCommonRequestService.loadCommentToSopiokChat(comment);
  }

  submitForm() {
    if (this.isSubmitting) {
      return;
    }

    if (!this.isClientMilitary) {
      this.updateValidatorsCreditForm();
    }

    this.updateValidatorsDecision();

    const creditAmountControl = this.decisionCreditForm.get('creditAmount');
    if (creditAmountControl && creditAmountControl.value !== null) {
      if (!this.applicationData ||
        !this.applicationData.chosenCreditInfo ||
        this.applicationData.chosenCreditInfo.creditAmount == null) {
        return;
      }
      const maxAmount = this.applicationData.chosenCreditInfo.creditAmount;

      if (creditAmountControl.value > maxAmount) {
        this.toastService.viewMsg(`Сумма кредита не может быть больше ${maxAmount}`, 'error');
        this.isLoading = false;
        this.isSubmitting = false;
        return;
      }

      if (creditAmountControl.value < this.minCreditAmount) {
        this.toastService.viewMsg(`Сумма кредита не может быть меньше ${this.minCreditAmount}`, 'error');
        this.isLoading = false;
        this.isSubmitting = false;
        return;
      }
    }

    if (this.form.valid) {
      this.isLoading = true;
      this.isSubmitting = true;

      if (!this.applicationData.id) {
        console.error('appId not found');
        return;
      }

      const currentAmount = this.decisionCreditForm.get('creditAmount').value;
      const initialAmount = this.applicationData.chosenCreditInfo.creditAmount;
      const isAmountChanged = currentAmount !== initialAmount;

      const requestSequence = this.isPosCredit && isAmountChanged
        ? this.saveLimitPos().pipe(
          switchMap(() => this.saveDecisionMakerDecision()),
          switchMap(() => this.applicationControllerService.acceptApp(this.applicationData.id, this.language)))
        : this.saveDecisionMakerDecision().pipe(
          switchMap(() => this.applicationControllerService.acceptApp(this.applicationData.id, this.language)));

      requestSequence.pipe(
        finalize(() => {
          this.isLoading = false;
          this.isSubmitting = false;
        }),
        untilDestroyed(this)
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

  delayApp() {
    this.isLoading = true;
    this.saveDecisionMakerDecision()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe((res: any) => {
        this.toastService.viewMsg('Сохранено', 'success');
        this.navigateToDashboard();
      });
  }

  navigateToDashboard() {
    this.routerURLService.navigateToDashboard();
  }

  onCommentClick() {
    this.appCommonRequestService.onCommentClick(this.readonlyForm);
  }

  applicantLoanFilteredListEvent(list: ApplicantLoanDto[]) {
    Object.keys(this.applicantLoanTotal).forEach(key => {
      this.applicantLoanTotal[key] = this.getTotalForColumn(key, list);
    });
  }

  calculateCredit() {
    if (this.updateValidatorsCreditForm()) {
      this.getPreApprovedMatrix();
    }
  }

  saveRow(rowValue: TableDataOptions, groupName: string) {
    this.tableDataProcessingService
      .saveRow(this.applicationData, rowValue, groupName)

      .pipe(
        switchMap(() => this.saveEditRowPipe(groupName)),
        untilDestroyed(this)
      )
      .subscribe(
        value => this.saveEditRowSuccessCallback(value, groupName),
        err => this.toastService.viewMsg('ErrorMessage.NotAdded', 'error')
      );
  }

  editedRow(rowValue: TableDataOptions, groupName: string) {
    this.applicantLoanControllerService
      .setLoanObligationsOfApplicant(rowValue as any)
      .pipe(
        switchMap(() => this.saveEditRowPipe(groupName)),
        untilDestroyed(this)
      )
      .subscribe(
        value => this.saveEditRowSuccessCallback(value, groupName),
        err => this.toastService.viewMsg('ErrorMessage.NotEdited', 'error')
      );
  }

  removeRow(rowValue: TableDataOptions, groupName: string) {
    this.tableDataProcessingService
      .removeRow(rowValue, groupName)
      .pipe(
        switchMap(() => this.saveEditRowPipe(groupName)),
        untilDestroyed(this)
      )
      .subscribe(
        value => this.saveEditRowSuccessCallback(value, groupName),
        err => this.toastService.viewMsg('ErrorMessage.NotDeleted', 'error')
      );
  }

  saveEditRowPipe(groupName: string): Observable<any> {
    return;
    // if (groupName === DecisionMakingGroupKeys.ApplicantIncome) {
    //   return this.tableDataProcessingService.updateIncomeInfo(this.applicationData, 'DECISION_MAKING');
    // } else {
    //   return this.tableDataProcessingService.updateCreditDetailsInfo(this.applicationData);
    // }
  }

  saveEditRowSuccessCallback(value: [], groupName: string) {
    // this.toastService.viewMsg('SuccessMessage.Added', 'success');
    // if (groupName === DecisionMakingGroupKeys.ApplicantIncome) {
    //   this.transformApplicantIncomeObj(value);
    //   if (!this.toggleIsBasicChecked && value.length) {
    //     this.toastService.viewMsg('ErrorMessage.BasicChecked', 'warning');
    //   }
    // } else {
    //   this.transformApplicantLoanObj(value);
    // }
  }

  reCalculate() {
    // if (this.form.get(DecisionMakingGroupKeys.LimitUnder).invalid) {
    //   return;
    // }
    // this.toastService.viewInfo('InfoMessage.ApplicationProcessed', 'warning');
    // this.isReCalculate = true;
    // this.isLoading = true;
    // this.brms4MatrixFrontService
    //   .calculateMatrix(
    //     this.applicationData.id.toString(),
    //     this.form.get(DecisionMakingGroupKeys.ApplicantIncome).get('decisionMakingIncome').value,
    //     this.form.get(DecisionMakingGroupKeys.LimitUnder).get('limitUnder').value,
    //     null
    //   )
    //   .subscribe(res => {
    //     this.approvedMatrix = res;
    //     this.creditConditionsForConfirmedIncomeInfoData = new TableData(
    //       !this.isWithRef ? HEADERS.CREDIT_CONDITIONS_HEADERS : HEADERS.CREDIT_CONDITIONS_WITH_REF_HEADERS,
    //       this.matrixUtilService.filterMatrix(res, this.isWithRef, this.isWithProduct)
    //     );
    //     this.isLoading = false;
    //     this.isReCalculate = false;
    //     Swal.close();
    //     this.toastService.viewMsg('SuccessMessage.ProcessComplete', 'success');
    //   });
  }

  updateApplicant(): Observable<number> {
    return;
    // const applicantDto: ApplicantDto = new ApplicantDto(this.applicationData.applicant);
    // return this.applicantControllerService.update({
    //   ...applicantDto,
    //   totalJobExp: this.form.getRawValue()[DecisionMakingGroupKeys.ApplicantIncome].totalJobExp,
    //   decisionMakingIncome: this.form.get(DecisionMakingGroupKeys.ApplicantIncome).get('decisionMakingIncome').value
    // });
  }

  updateCreditInfo(): Observable<number> {
    return;
    // const creditInfo = new CreditInfoDto(this.applicationData.chosenCreditInfo);
    // return this.creditInfoService.update({
    //   ...creditInfo,
    //   ...this.form.getRawValue()[DecisionMakingGroupKeys.CreditInfo]
    // });
  }

  saveDecisionMakerDecision() {
    const decisionId = this.decisionForm.get('DecisionId').value;
    const typeOfDecisionId = this.decisionForm.get('TypeOfDecisionId').value;

    const decisionFormValue = this.decisionForm.value;

    const saveVerify: VerificationFrontDtoPost = {
      verification: {
        ...this.decisionCreditForm.value,
        ...this.currentVerificationData,
        comment: decisionFormValue.comment,
        stageId: this.applicationData.stage.id,
        decisionMaker: this.userData,
        brmsMatrixId:
          !!this.selectedMatrix && this.selectedMatrix.brmsMatrix
            ? this.selectedMatrix.brmsMatrix.id
            : this.brmsMatrix
            ? this.brmsMatrix.id
            : null
      }
    };

    return forkJoin([
      this.applicationControllerService
        .setDecisionMakerDecision(
          this.applicationData.id,
          decisionId ? decisionId.id : null,
          typeOfDecisionId ? typeOfDecisionId.id : null
        )
        .pipe(mergeMap(() => this.verificationControllerService.saveVerification(saveVerify)))
    ]);
  }

  private saveLimitPos() {
    const rmLimitPosDto = {
      applicationId: this.applicationData.id,
      maxLimit: this.decisionCreditForm.get('creditAmount').value
    };

    return this.applicationControllerService.saveRmLimitPos(rmLimitPosDto).pipe(
      catchError(error => {
        console.log('Ошибка при сохранении лимита POS', error);
        return throwError(error);
      })
    );
  }

  getPreApprovedMatrix(isWithRef?: boolean) {
    this.isLoading = true;
    this.brms2MatrixService
      .recalculateChosenOffer(this.transformMatrix(), this.isOnlineProduct)
      .pipe(
        tap(matrix => {
          if (!!matrix && !!matrix.brmsMatrix) {
            matrix.brmsMatrix.monthlyPayment = matrix.monthlyPayment;
            this.setFinalProductInfoIfTopUp(matrix.brmsMatrix);
            this.selectedMatrix = matrix.brmsMatrix;
            this.recalculateFinancingTableData = new TableData(
              HEADERS.RECALCULATE_CONDITIONS_FINANCING_HEADERS,
              this.setMatrixTerms([matrix.brmsMatrix])
            );
          } else if (this.isOnlineProduct) {
            this.selectedMatrix = matrix as any;
            this.recalculateFinancingTableData = new TableData(
              HEADERS.RECALCULATE_CONDITIONS_FINANCING_HEADERS,
              this.setMatrixTerms([matrix as any])
            );
          }
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        catchError(err => {
          if (err.error && err.error.message === 'No offer available') {
            this.toastService.viewMsg('Для заданных параметров нет доступных предложений', 'error');
          }
          return throwError(err);
        })
      )
      .subscribe();
  }

  private transformMatrix = (): CreditInfo => {
    const topUpRemain = this.isTopUpProduct
      ? this.applicationData.chosenCreditInfo.brmsMatrix.topUps[0].applicantLoanRemainder
      : null;

    const creditAmount = this.isTopUpProduct
      ? +this.decisionCreditForm.getRawValue()['creditAmount'] + topUpRemain
      : +this.decisionCreditForm.getRawValue()['creditAmount'];
    return {
      ...this.applicationData.chosenCreditInfo,
      ...this.decisionCreditForm.getRawValue(),
      creditAmount,
      brmsMatrixId:
        this.applicationData.chosenCreditInfo && this.applicationData.chosenCreditInfo.brmsMatrix
          ? this.applicationData.chosenCreditInfo.brmsMatrix.id
          : null
    };
  };

  private checkReadonly() {
    if (this.readonlyForm) {
      this.form.disable();
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

  private showDialog(data: AdministrationBaseModalData<Company, Options>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '40%',
      height: '50%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(callback);
  }

  private createForm() {
    this.form = this.fb.group({});

    const decisionInfoControls: FormGroup = this.formGroupService.createForm(
      this.applicationData,
      this.decisionInfoConfig,
      this.optionsList
    );

    const decisionCreditFormControls: FormGroup = this.formGroupService.createForm(
      this.applicationData,
      this.decisionCreditFormConfig,
      this.optionsList
    );

    this.form.addControl(DecisionMakingGroupKeys.Decision, decisionInfoControls);
    this.form.addControl(DecisionMakingGroupKeys.DecisionCreditForm, decisionCreditFormControls);

    setTimeout(() => {
      this.setFormForTopUp();
    });
  }

  private setFormForTopUp = (): void => {
    if (this.isTopUpProduct) {
      const topUpRemainsControl = this.decisionCreditFormConfig.find(el => el.code === 'topUpRemains');
      topUpRemainsControl.isVisible = true;
      const matrix = this.applicationData.chosenCreditInfo.brmsMatrix;
      const decForm = this.form.get(DecisionMakingGroupKeys.DecisionCreditForm) as FormGroup;
      decForm.get('topUpRemains').setValue(Math.ceil(matrix.topUps[0].applicantLoanRemainder));
      const sum = matrix.maxLimit - matrix.topUps[0].applicantLoanRemainder;
      decForm.get('creditAmount').setValue(Math.trunc(sum));
    }
  };

  private updateValidatorsDecision() {
    const decision = this.form.get(DecisionMakingGroupKeys.Decision).get('DecisionId').value;
    const decisionId = !!decision ? decision.id : null;

    if (!decisionId) {
      return;
    }

    if (decisionId === 'RETURN') {
      this.form
        .get(DecisionMakingGroupKeys.Decision)
        .get('comment')
        .setValidators([Validators.required]);
      this.form
        .get(DecisionMakingGroupKeys.Decision)
        .get('comment')
        .updateValueAndValidity();
    } else {
      this.form
        .get(DecisionMakingGroupKeys.Decision)
        .get('comment')
        .clearValidators();
      this.form
        .get(DecisionMakingGroupKeys.Decision)
        .get('comment')
        .updateValueAndValidity();
    }
  }

  private updateOptionsList(propertyName: string, options: Options[]) {
    this.optionsList = {
      ...this.optionsList,
      [propertyName]: options
    };
  }

  private iterationOverConfig<T>(data: T[], tableConfig: EditableTableHeader[]): Options[] {
    let optionsFromSelect: Options[] = [];

    tableConfig.forEach((item: EditableTableHeader) => {
      if (item.selectSearchCodeName) {
        optionsFromSelect = _.union(optionsFromSelect, this.getSearchOptions<T>(data, item.selectSearchCodeName));
      }
    });
    return optionsFromSelect;
  }

  private getSearchOptions<T>(data: T[], propertyName: string): Options[] {
    let options: Options[] = [];

    data.forEach((item: T) => {
      if (item[propertyName]) {
        options = [...options, item[propertyName]];
      }
    });

    return options;
  }

  private updateValidatorsCreditForm(): boolean {
    Object.keys(this.decisionCreditForm.controls)
      .filter((control: string) => control === 'creditAmount' || control === 'rate' || control === 'creditTerm')
      .forEach((control: string) => {
        const controlConfig = this.decisionCreditFormConfig.find(c => c.code === control);
        if (this.isDecisionCreditFormValueFill) {
          if (this.decisionCreditForm.controls[control].value) {
            if (control === 'period') {
              this.decisionCreditForm.controls[control].setValidators(
                validateByPattern(PatternsEnum.OnlyNumbersPattern, InputErrorKeys.OnlyNumbersPattern)
              );
            } else {
              this.decisionCreditForm.controls[control].setValidators(
                validateByPattern(PatternsEnum.Double, InputErrorKeys.Double)
              );
            }
          } else {
            this.decisionCreditForm.controls[control].clearValidators();
          }
        } else {
          this.decisionCreditForm.controls[control].clearValidators();
        }
        this.decisionCreditForm.controls[control].updateValueAndValidity();
      });

    if (!this.isOnlineProduct && !this.isPosCredit) {
      if (
        !this.validateMatrixDataService.validateSumAndTermByProdcat(
          this.applicationData,
          this.applicationData.chosenCreditInfo.brmsMatrix,
          this.transformMatrixInto(this.applicationData.chosenCreditInfo.brmsMatrix),
          this.isTopUpProduct
        )
      ) {
        return false;
      }
    }

    return this.decisionCreditForm.valid;
  }

  private transformMatrixInto(matrix: BRMSMatrixDto): BRMSMatrixDto {
    const assignObj = Object.assign({}, matrix);

    const maxLimit = this.isTopUpProduct
      ? +this.decisionCreditForm.getRawValue()['creditAmount'] +
        this.applicationData.chosenCreditInfo.brmsMatrix.topUps[0].applicantLoanRemainder
      : +this.decisionCreditForm.getRawValue()['creditAmount'];

    return {
      ...assignObj,
      maxLimit,
      topUpRemainAmount: +this.decisionCreditForm.getRawValue()['creditAmount'],
      creditTerm: +this.decisionCreditForm.getRawValue()['creditTerm']
    };
  }

  private getDirectories() {
    combineLatest([
      this.typeOfDecision$,
      this.decision$,
      this.stopListAbsStatusList$,
      this.banks$,
      this.dirDecisionMakerDecisionList$,
      this.dirDecisionMakerDeclineReasonList$,
      this.currencies$,
      this.companies$,
      this.companyActivityType$,
      this.jobPositionType$,
      this.incomeType$,
      this.incomeFrequency$,
      this.companyStatuses$,
      this.provisionRate$,
      this.products$,
      this.verificationControllerService.getVerification(this.applicationData.applicant.id, this.applicationData.id)
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([
          typeOfDecision,
          decision,
          stopListAbsStatusList,
          banks,
          dirDecisionMakerDecisionList,
          dirDecisionMakerDeclineReasonList,
          currencies,
          companies,
          companyActivityTypes,
          jobPositionType,
          incomeType,
          incomeFrequency,
          companyStatuses,
          provisionRate,
          products,
          verificationData
        ]) => {
          this.optionsList = {};
          this.optionsList[OptionListNames.AcceptedConditionsRM] = getOnlyActiveItems<Dir>(this.trueFalseGuide); // TODO Romanovski: moc
          this.optionsList[OptionListNames.TypeOfDecision] = typeOfDecision; // TODO Romanovski: moc
          this.optionsList[OptionListNames.Decision] = decision; // TODO Romanovski: moc

          this.optionsList[OptionListNames.StopListAbsStatusList] = getOnlyActiveItems<StopListAbsStatusDto>(
            stopListAbsStatusList
          );
          this.optionsList[OptionListNames.Banks] = getOnlyActiveItems<Dir>(banks);
          // this.optionsList[OptionListNames.Companies] = companies;
          this.optionsList[OptionListNames.CompanyActivityType] = getOnlyActiveItems<DirCountry>(companyActivityTypes);
          this.optionsList[OptionListNames.JobPositionType] = getOnlyActiveItems<DirCountry>(jobPositionType);
          this.optionsList[OptionListNames.Currencies] = getOnlyActiveItems<Dir>(currencies);
          this.optionsList[OptionListNames.IncomeType] = getOnlyActiveItems<DirCountry>(incomeType);
          this.optionsList[OptionListNames.IncomeFrequency] = getOnlyActiveItems<DirCountry>(incomeFrequency);
          this.optionsList[OptionListNames.DecisionMakerDecisionList] = dirDecisionMakerDecisionList || null;
          this.optionsList[OptionListNames.DecisionMakerDeclineReasonList] = getOnlyActiveItems<Dir>(
            dirDecisionMakerDeclineReasonList
          );
          this.optionsList[OptionListNames.CompanyStatus] = getOnlyActiveItems<CompanyStatus>(companyStatuses);
          this.optionsList[OptionListNames.ProvisionRate] = getOnlyActiveItems<CompanyStatus>(provisionRate);
          this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductDto>(products);

          this.verificationData = verificationData;
          if (this.verificationData) {
            this.currentVerificationData = this.verificationData.find(el => el && el.stageId === StageType.RM);
          }
          this.setFormData();
        }
      );
  }

  private setFormData = (): void => {
    const data = {
      comment: this.currentVerificationData ? this.currentVerificationData.comment : null,
      DecisionId: this.applicationData.dirDecisionMakerDecision ? this.applicationData.dirDecisionMakerDecision : null,
      TypeOfDecisionId: this.applicationData.dirDecisionMakerTypeDecision
        ? this.applicationData.dirDecisionMakerTypeDecision
        : null
    };
    this.decisionForm.patchValue(data);
  };

  private fillCompaniesSearchOptions<T>(data: T[], tableConfig: EditableTableHeader[], optionListName: string) {
    this.updateOptionsList(optionListName, this.iterationOverConfig<T>(data, tableConfig));
  }

  private setCreditTables() {
    setTimeout(() => {
      this.basicConditionsFinancingTableData = new TableData(HEADERS.BASIC_CONDITIONS_FINANCING_HEADERS, [
        this.applicationData.chosenCreditInfo
      ]);
      if (this.applicationData.stage.id !== StageType.RM && !!this.applicationData.chosenCreditInfo) {
        this.applicationData.chosenCreditInfo.maxCreditSum = this.applicationData.chosenCreditInfo.creditAmount;
        this.applicationData.chosenCreditInfo.maxAnnPayment = this.applicationData.chosenCreditInfo.monthlyPayment;

        // this.recalculateFinancingTableData = new TableData(
        //   HEADERS.RECALCULATE_CONDITIONS_FINANCING_HEADERS,
        //   this.setMatrixTerms([this.applicationData.chosenCreditInfo] as any[])
        // );
      }
    });
  }

  private setFinalProductInfoIfTopUp(matrix: BRMSMatrixDto) {
    if (this.isTopUpProduct && matrix) {
      const topUp = matrix.topUps[0];
      matrix.creditTerm = topUp.creditTerm;
      matrix.rate = topUp.rate;
    }
  }

  private setMatrixTerms = (matrix: BRMSMatrixDto[]): BRMSMatrixDto[] => {
    return matrix.map(el => {
      el.creditTermWithType =
        el.creditTerm +
        ` ${
          el.productCondition && el.productCondition.dirLoanTermType
            ? `(${el.productCondition.dirLoanTermType.nameRu})`
            : 'мес.'
        }`;
      el.creditTermWithTypeAm =
        el.creditTerm +
        ` ${
          el.productCondition && el.productCondition.dirLoanTermType
            ? `(${el.productCondition.dirLoanTermType.nameAm})`
            : '(ամիս)'
        }`;
      return el;
    });
  };

  private transformApplicantLoanObj(applicantLoan: ApplicantLoanDto[]) {
    this.applicantLoanForTable = applicantLoan.filter(el => !!el.type);
    this.applicantLoanForTable.forEach(el => {
      this.extendApplicantLoanItem(el);
    });
  }

  private extendApplicantLoanItem = (item: ApplicantLoanDto): void => {
    item.dirCurrencyId = (item.dirCurrency.id as any) || null;
    item.suspensiveConditionsType = item.type ? (item.type[ELanguageType[this.language]] as string) : null;
    item.typeOfLoan = item.dirAbsProductType
      ? item.dirAbsProductType[ELanguageType[this.language]]
      : item.dirLiabilityKind
      ? item.dirLiabilityKind[ELanguageType[this.language]]
      : null;
    item.status = item.dirLiabilityStatus ? item.dirLiabilityStatus[ELanguageType[this.language]] : null;

    item.deposit =
      item.pledgeList && item.pledgeList.length
        ? item.pledgeList
            .map(d => {
              if (d.depositCodeAbs) {
                return d.depositCodeAbs[ELanguageType[this.language]];
              } else if (d.depositCodeAcra) {
                return d.depositCodeAcra[ELanguageType[this.language]];
              }
            })
            .join()
        : null;
  };

  private getTotalForColumn = (prop: string, list: ApplicantLoanDto[]): number => {
    if (list.length) {
      const listNumbers = list.map(el => el[prop]);
      const sum = listNumbers.reduce((partialSum, a) => +partialSum + +a, 0);
      return !!sum && isFloat(sum) ? sum.toFixed(2) : sum || 0;
    }
    return null;
  };
}

function isFloat(n: number) {
  return Number(n) === n && n % 1 !== 0;
}
