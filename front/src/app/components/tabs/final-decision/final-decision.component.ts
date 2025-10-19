import * as HEADERS from './constants/final-decision.constants';
import { CHOSEN_ACCOUNT_HEADERS } from './constants/final-decision.constants';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AcbLiabilityDto,
  AccountDto,
  AccountIssueGetDto,
  AccountIssuePostDto,
  ApplicantLoanDto,
  Application,
  ApplicationDto, AttachmentDto,
  BaseFormField,
  CommentDto,
  CreditInfo,
  CreditInfoDto,
  Dir,
  DirAbsCode,
  DirBranch,
  DirectoryVal,
  EditableTableHeader,
  EInputType,
  ELocalNames,
  FilledCardApplicationDto,
  InsuranceCompany,
  InsuranceInfo,
  InsuranceInfoDto,
  InsuranceProductFrontDto,
  IntegrationInterfaceDto,
  OptionListNames,
  PrintFormModalEmit,
  PrintingFormDownloadRq,
  PrintingFormDto,
  ProductDto,
  StageType,
  StaticDirectory,
  SuspensiveConditionsType,
  TableData,
  UserDto,
  ValueType
} from '@app/_models';
import {
  AbsSearchClientControllerService,
  AccountIssueControllerService,
  ApplicantLoanControllerService,
  ApplicationControllerService, BpmFrontControllerService,
  Brms2MatrixFrontControllerService,
  BrmsFinalMatrixFrontControllerService,
  DirBankControllerService,
  DirCommunicationTypeControllerService,
  InsuranceProductControllerService,
  PrintingFormControllerService,
  ProductCategoryControllerService
} from '@app/api';
import { ICardTermOption } from './constants/newCardForm';
import { BRMSFinalMatrixDto, BRMSMatrixDto, RefAcbLiability, RefAcbLiabilityId } from '@app/_models/api-models/brms';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { combineLatest, forkJoin, Observable, of, Subject } from 'rxjs';
import { PrintFormsId } from '@app/constants/upload-document-id';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  pairwise,
  startWith,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import { AdditionalPrintFormService } from '@app/services/additional-print-form.service';
import { ApplicantDto } from '@app/_models/api-models/applicant';
import { DeclineReasonModalComponent } from '@app/shared/components/modals/decline-reason-modal/decline-reason-modal.component';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { InsuranceInfoControllerService } from '@app/api/insurance-info-controller.service';
import { InsuranceService } from './services/insurance/insurance.service';
import { MatDialog } from '@angular/material/dialog';
import { PrintFormModalComponent } from '@app/shared/components/modals/print-form-modal/print-form-modal.component';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { TABS_TITLES } from '@app/components/constants/tab-titles';
import { TabNames } from '@app/components/constants/tab-names';
import { ToastService } from '@app/services/toast.service';
import { ValidateTabsStateService } from '@app/services/validate-tabs-state.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { throwError } from 'rxjs/internal/observable/throwError';
import { FormGroupService } from '@app/services/form-group.service';
import {
  ACCOUNT_FORM,
  ADDITIONAL_PARAMETERS_CONFIG,
  CALCULATE_FORM_CONFIG,
  CommunicationAddressOptions,
  EAccountNameColumn,
  EInsuranceFieldGroup,
  FAMILY_INFO_FORM_CONFIG,
  FINAL_DECISION_TITLES,
  FinalDecisionGroupKeys,
  GRACE_INTEREST,
  IInsuranceField,
  initialCommunicationConfig,
  INSURANCE_FORM,
  INSURANCE_NEW_ACCOUNT_FORM
} from '@app/components/tabs/final-decision/constants/final-decision.config';
import { untilDestroyed } from '@app/core';
import { ProductToPaymentDay } from '@app/_models/api-models/product-to-payment-day';
import { MaritalStatus } from '@app/_models/api-models/martial-status';
import { ApplicantContactPerson, ApplicantContactPersonDto } from '@app/_models/api-models/applicant-contact-person';
import { CreditInfoControllerService } from '@app/api/credit-info-controller.service';
import { ApplicantControllerService } from '@app/api/applicant-controller.service';
import { TableDataProcessingService } from '@app/components/tabs/data-form/services/table-data-processing.service';
import { MatrixUtilService } from '@app/components/tabs/data-form/services/matrix-util.service';
import { CredentialsService } from '@app/services/authentication';
import { validateByPattern } from '@app/validators/validation-by-pattern';
import { InputErrorKeys } from '@app/constants/validators-errors';
import { ELanguage, ELanguageType } from '@app/constants/language';
import { ChatManagerVerificatorControllerService } from '@app/api/chat-manager-verificator-controller .service';
import { SuspensiveConditionsTypeControllerService } from '@app/api/suspensive-conditions-type-controller';
import {
  APPLICANT_LOAN_TABLE_HEADERS,
  CREDIT_INFO_NAME_PROPS,
  POSSIBLE_CREDIT_PROPS,
  PRODUCT_NAME_PROPS,
  SUSPENSIVE_CONDITIONS_TABLE_HEADERS
} from '@app/components/tabs/data-form/constants/data-form-constants';
import { AppCommonRequestService, ChatServicesEnum } from '@app/services/app-common-request.service';
import {
  Communication,
  CommunicationDto,
  CommunicationOwnerType,
  CommunicationPostDto,
  CommunicationType,
  DirCommunicationMethod
} from '@app/_models/api-models/communication-get-dto';
import { AbsExpenseSettingControllerService } from '@app/api/abs-expense-setting-controller.service';
import { YES_NO_TYPES } from '@app/constants/yes-or-no-type';
import * as _ from 'lodash';
import { AbsFirstPayDateModalComponent } from '@app/components/tabs/final-decision/abs-first-pay-date-modal/abs-first-pay-date-modal.component';
import moment from 'moment';
import Swal from 'sweetalert2';
import { ValidateMatrixDataService } from '@app/components/comon-services/validate-matrix-data.service';
import { MatrixProcessDataService } from '@app/components/tabs/final-decision/services/matrix-process-data.service';
import { FullFormGroupKeys } from '@app/components/tabs/data-form/constants/data-form-config';
import { SuspensiveConditionsValidationService } from '@app/components/tabs/final-decision/services/suspensive-conditions-validation.service';
import { BooleanFilterType } from '@app/shared/components/table-sort/table-sort.component';
import { AcraLoanFilterDto } from '@app/_models/api-models/integration-acra';
import { HistoryModalComponent } from '@app/shared/components/modals/history-modal/history-modal.component';
import {
  OtpVerificationModalComponent
} from '@app/components/tabs/final-decision/opt-verification-modal/otp-verification-modal.component';
import { OtpDataService, OtpType } from '@app/components/otp/otp-data.service';
import { IInfoModalConfig, InfoModalComponent, InfoModalResult } from '@app/components/modals/info-modal/info-modal.component';
import {
  BiometricModalComponent,
  IBiometricModalConfig
} from '@app/pages/dashboard/dashboard-page/tabs/credit-app/biometric-modal/biometric-modal.component';
import { applicationTypesEnum } from '@app/pages/dashboard/dashboard-page/tabs/credit-app/constants/short-form-config';
import { AttachmentControllerService } from '@app/api/attachment-controller.service';

type Options =
  | StaticDirectory
  | Dir
  | InsuranceCompany
  | DirAbsCode
  | DirBranch
  | ProductToPaymentDay
  | DirCommunicationMethod
  | any
  | ApplicantLoanDto
  | MaritalStatus
  | InsuranceProductFrontDto;
type FinalProduct = CreditInfo | BRMSFinalMatrixDto | any;

const trimmer = (val: string | null) => (!!val ? val.trim() : '');

// * Окончательный выбор
@Component({
  selector: 'ng-final-decision',
  templateUrl: './final-decision.component.html',
  styleUrls: ['../../common-tabs-scss/final-decision-common.component.scss'],
  providers: [
    InsuranceService,
    SuspensiveConditionsValidationService,
    TableDataProcessingService,
    MatrixUtilService,
    MatrixProcessDataService
  ]
})
export class FinalDecisionComponent implements OnChanges, OnInit, OnDestroy {
  finalDecForm: FormGroup;
  itemLimit: number = 20;
  totalCount: number = 0;
  footerConfigSource = 'common.finalDecision';

  public titles: Record<string, string> = FINAL_DECISION_TITLES;
  public FinalDecisionGroupKeys = FinalDecisionGroupKeys;
  public CommunicationOwnerType = CommunicationOwnerType;

  suspensiveConditionsMatrixHeaders: EditableTableHeader[] = SUSPENSIVE_CONDITIONS_TABLE_HEADERS;
  suspensiveConditionsListFiltered: ApplicantLoanDto[] = [];

  public chosenCreditInfoData: TableData<CreditInfo> = new TableData(HEADERS.CHOSEN_CREDIT_INFO_HEADERS, []); // * Предварительно выбранные условия кредитования
  public applicantObligationsTableHeaders: TableData<ApplicantLoanDto> = new TableData(
    HEADERS.APPLICANT_OBLIGATIONS_TABLE_HEADERS,
    []
  ); // * Обязательства

  public applicantObligationsDto: ApplicantLoanDto[]; // TODO Romanovski: change name and type
  public applicantObligationsDtoWithTypes: ApplicantLoanDto[]; // TODO Romanovski: change name and type

  public approvedCreditConditionsColInfoData: TableData<BRMSMatrixDto> = new TableData(
    HEADERS.POSSIBLE_CREDIT_PROPS,
    []
  ); // * Утвержденные условия кредитования
  public calculateFormConfig: BaseFormField[] = CALCULATE_FORM_CONFIG; // * Калькулятор предложения
  public calculatedCreditConditionsData: TableData<BRMSFinalMatrixDto> = new TableData(PRODUCT_NAME_PROPS, []); // * Рассчитанные условия кредитования
  public approvedCreditConditionsData: TableData<BRMSMatrixDto | CreditInfo> = new TableData(
    CREDIT_INFO_NAME_PROPS,
    []
  ); // * Выбранные условия кредитования
  public suspensiveConditionsTableHeaders: EditableTableHeader[] = HEADERS.SUSPENSIVE_CONDITIONS_TABLE_HEADERS; // * Отлагательные условия
  public suspensiveConditionsDto: any[]; // TODO Romanovski: change name and type
  public selectingCardAccountData: TableData<AccountDto> = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, []); // * Выбор счёта/карты
  public selectingCurrentAccountData: TableData<AccountDto> = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, []); // * Выбор текущего счета
  public chosenAccountData: TableData<AccountDto> = new TableData(HEADERS.CHOSEN_ACCOUNT_HEADERS, []);
  public chosenCard: AccountDto; // * Выбранная карта/Выбранный счет
  public insuranceFormConfig: IInsuranceField[] = INSURANCE_FORM; // * Страхование
  public newAccountFormConfig: IInsuranceField[] = INSURANCE_NEW_ACCOUNT_FORM; // * новый счет

  newAccount = new FormControl();

  selectedCreditConditionsData: TableData<BRMSFinalMatrixDto | CreditInfo> = new TableData(
    HEADERS.SELECTED_CREDIT_TERMS_HEADERS,
    []
  );

  contactPersonsTableHeaders: EditableTableHeader[] = HEADERS.CONTACT_PERSONS_HEADERS;

  availableRefinancingOptionsData: TableData<AcbLiabilityDto> = new TableData(
    HEADERS.AVAILABLE_REFINANCING_OPTIONS_HEADERS,
    []
  );

  graceInterestConfig: BaseFormField[] = GRACE_INTEREST;
  additionalParametersConfig: BaseFormField[] = ADDITIONAL_PARAMETERS_CONFIG;
  familyInfoFormConfig: BaseFormField[] = FAMILY_INFO_FORM_CONFIG;
  accountFormConfig: BaseFormField[] = ACCOUNT_FORM;

  isNewCardOrderChecked: boolean = false;
  isNewAccOrderChecked: boolean = false;
  isRefAcbLiabilityExists: boolean = false;
  isLoading: boolean = false;
  isAcceptButtonDisabled: boolean = true;
  isCalculateButtonDisabled: boolean = true;
  isChangesAccepted: boolean = false;
  isWithRef: boolean = false;
  isGraceInterest: boolean;
  isVisibleSecondPaymentDay: boolean;
  isConsumerCredit: boolean;
  isCreditCard: boolean;
  isOverdraft: boolean;
  isNewInstantCardOrderChecked: boolean;
  isGamingUsage: boolean;
  isStandardSchedule: boolean;
  isCardOrOverdraftSchedule: boolean;
  showSuspensiveConditionsTable: boolean;
  suspensiveConditionsListFilteredScroll: boolean;
  isCalculate: boolean = false;
  theSelectedProductId: number;
  theSelectedProductDir: BRMSMatrixDto;

  insuranceProducts: InsuranceProductFrontDto[] = [];
  chosenRefinanceList: AcbLiabilityDto[] = [];
  chatManagerVerificatorList: CommentDto[];
  finalProduct: FinalProduct[] = [];
  approvedMatrix: any[] = [];
  applicantContactPersonsDto: ApplicantContactPersonDto[];
  isWithProduct: number = null;

  accountIssuePost: AccountIssuePostDto;
  paymentCards: DirectoryVal[];
  cardTermOptions: ICardTermOption[] = [{ id: 1, name: '36', value: 36 }, { id: 2, name: '60', value: 60 }];
  insuranceInfoDto: InsuranceInfoDto;
  newCardForm: FormGroup;
  EInputType = EInputType;
  ValueType = ValueType;
  TabTitles = TABS_TITLES;
  ELocalNames = ELocalNames;

  optionsList: Record<string, Options[]> = {
    [OptionListNames.SuspensiveConditionsTypes]: [],
    [OptionListNames.ScheduleTypes]: [],
    [OptionListNames.AccountType]: [],
    [OptionListNames.ScheduleFrequencies]: [],
    [OptionListNames.EnsureTypes]: [],
    [OptionListNames.IssueTypes]: [],
    [OptionListNames.FeeTermType]: [],
    [OptionListNames.YesOrNoTypes]: YES_NO_TYPES,
    [OptionListNames.CommunicationMethodsBank]: [],
    [OptionListNames.CommunicationMethodsConnect]: [],
    [OptionListNames.ProductToPaymentDay]: [],
    [OptionListNames.MaritalStatuses]: [],
    [OptionListNames.Relationships]: [],
    [OptionListNames.InsuranceProduct]: [],
    [OptionListNames.InsuranceCompanies]: [],
    [OptionListNames.InsuranceProductName]: [],
    [OptionListNames.DeclineReasons]: [],
    [OptionListNames.CommunicationAddressType]: CommunicationAddressOptions,
    [OptionListNames.Currencies]: [],
    [OptionListNames.DeclineReasons]: [],
    [OptionListNames.Product]: [],
    [OptionListNames.PaymentCards]: [],
    SuspensiveConditionsTypesFiltered: [],
    [OptionListNames.Branches]: []
  };

  @Input() appDto: Application;
  @Input() readonlyForm: boolean = false;

  @Input() applicantLoanObligationsInfo: ApplicantLoanDto[];
  @Input() applicantLoanFilterDto: any;
  @Input() integrationInterface: IntegrationInterfaceDto;
  @Input() accountIssue: AccountIssueGetDto;
  @Input() applicantContactPersons: ApplicantContactPerson[] = [];
  @Input() language: string;

  CommunicationType = CommunicationType;
  appCommunication: Communication[];
  communicationConfig = _.cloneDeep(initialCommunicationConfig);
  filterParams: AcraLoanFilterDto;

  triggerSubmit = new Subject();

  private communicationObject = {
    [CommunicationOwnerType.APPLICATION]: {
      [CommunicationType.BANK]: null,
      [CommunicationType.STATEMENT]: null
    },
    [CommunicationOwnerType.ACCOUNT]: {
      [CommunicationType.BANK]: null,
      [CommunicationType.STATEMENT]: null
    }
  };

  private isAdditionalParametersValidation$: Subject<boolean> = new Subject();
  private isFamilyInfoValidation$: Subject<boolean> = new Subject<boolean>();
  private isNewInstantCardFieldsValidation$: Subject<boolean> = new Subject<boolean>();
  private isNameOnCardValidation$: Subject<boolean> = new Subject<boolean>();
  private isInsuranceTypedValidation$: Subject<boolean> = new Subject<boolean>();
  private isInsuranceCompaniesValidation$: Subject<boolean> = new Subject<boolean>();
  private isInsuranceProductNameValidation$: Subject<boolean> = new Subject<boolean>();

  private isAmlTabValid: boolean;
  private chosenMatrix: BRMSMatrixDto;
  private isBiometricPassed: boolean;
  private showInfoBiometricOpened: boolean;
  private biometricPassed: boolean;
  biometricDisabled: boolean;
  private isOtpSelected: boolean = false;

  private dirScheduleTypes$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirScheduleTypes)));
  private dirScheduleFrequency$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.dirScheduleFrequency))
  );
  private dirEnsureType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirEnsureType)));
  private dirIssueType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirIssueType)));
  private maritalStatuses$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.maritalStatuses)));
  private relationships$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.relationships)));
  private declineReasons$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.declineReasons)));
  private insuranceType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.insuranceType)));
  private currencies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.currencies)));
  private products$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.productCategories)));
  private paymentCards$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.paymentCards)));
  private dirInsuranceType: DirAbsCode[] = [];
  private selectedDeclineReasonId: number;

  private CARD_ACCOUNT_TYPE: string = '200';
  private ACCOUNT_TYPE: string = '100';
  private biometricRejected: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _store: Store<IAppState>,
    private brmsFinalService: BrmsFinalMatrixFrontControllerService,
    private formBuilder: FormBuilder,
    private applicationControllerService: ApplicationControllerService,
    private toastService: ToastService,
    private accountService: AccountIssueControllerService,
    private validateTabsStateService: ValidateTabsStateService,
    private insuranceInfoService: InsuranceInfoControllerService,
    private printingFormService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private additionalPrintFormService: AdditionalPrintFormService,
    private routerURLService: RouterURLService,
    private translateService: TranslateService,
    private validateMatrixDataService: ValidateMatrixDataService,
    private formGroupService: FormGroupService<any, Options>,
    private creditInfoControllerService: CreditInfoControllerService,
    private absExpenseSettingControllerService: AbsExpenseSettingControllerService,
    private applicantControllerService: ApplicantControllerService,
    private tableDataProcessingService: TableDataProcessingService,
    private chatManagerVerificatorService: ChatManagerVerificatorControllerService,
    private applicantLoanControllerService: ApplicantLoanControllerService,
    private insuranceProductControllerService: InsuranceProductControllerService,
    private matrixUtilService: MatrixUtilService,
    private absSearchClientControllerService: AbsSearchClientControllerService,
    private credentialsService: CredentialsService,
    private matrixProcessDataService: MatrixProcessDataService,
    private brms2MatrixService: Brms2MatrixFrontControllerService,
    private dirBankControllerService: DirBankControllerService,
    private suspensiveConditionsTypeService: SuspensiveConditionsTypeControllerService,
    private suspensiveConditionsValidationService: SuspensiveConditionsValidationService,
    private productCategoryControllerService: ProductCategoryControllerService,
    private readonly appCommonRequestService: AppCommonRequestService,
    private readonly communicationTypeControllerService: DirCommunicationTypeControllerService,
    private readonly bpmFrontControllerService: BpmFrontControllerService,
    private readonly attachmentControllerService: AttachmentControllerService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(value => {
      value.lang === 'ru' ? (this.language = 'ru') : (this.language = 'am');
    });
    this.isOtpSelected = this.appDto.isOtp || false;

    this.createTabValidationSubscription();
    this.createForm();

    this.transformApplicantContactPersons(this.applicantContactPersons);
    this.transformInsuranceInfoData(this.appDto.insuranceInfo);
    this.setChosenCreditInfoData();
    this.setFinalMatrixData();
    this.getCommunications();
    this.getIsBiometricPassed();
    this.getDirectories();

    this.setProductToPaymentOptions(this.appDto.finalCreditInfo);

    this.transformAccountIssueData(this.accountIssue);

    this.setSelectedCreditConditionsData();
    this.setSetSecondPaymentDayVisibility();
    this.setValidationsSub();
    this.checkOnReadonly();

    this.getAccountData();
    this.checkOtpPhone();

    this.transformApplicantLoanObj(
      this.applicantLoanFilterDto.credits,
      this.typeOfLoanFiltersRemap(this.applicantLoanFilterDto.filters)
    );
    this.translateServiceSubscription(
      this.applicantLoanFilterDto.credits,
      this.typeOfLoanFiltersRemap(this.applicantLoanFilterDto.filters)
    );

    this.getPreApprovedMatrix(this.isWithRef);

    this.appCommonRequestService.setChatInfo();
  }

  get historyButtonVisible() {
    return this.routerURLService.isqQueues();
  }

  get userData(): UserDto {
    return this.appCommonRequestService.userData;
  }

  get isFinalProductExist() {
    return !!this.finalProduct.length;
  }

  get footerButtonsVisible(): boolean {
    if (this.appDto) {
      return [StageType.DECISION_FINAL, StageType.DECISION_FINAL_RETURN].some(el => el === this.appDto.stage.id);
    }
  }

  get isNewAccount(): boolean {
    return !!this.newAccount.value;
  }

  get chatUnderManagerList(): CommentDto[] {
    return this.appCommonRequestService.getChatList();
  }

  get calculatorForm(): FormGroup {
    return this.finalDecForm.get(FinalDecisionGroupKeys.Calculator) as FormGroup;
  }

  get isNewMessageExists(): boolean {
    return this.appDto.newMessageUMChat;
  }

  get newAccountForm(): FormGroup {
    return this.finalDecForm.get(FinalDecisionGroupKeys.NewAccount) as FormGroup;
  }

  get firstPaymentDate() {
    const date = this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).get('firstPaymentDate').value as Date;
    return moment(date).format('YYYY-MM-DD');
  }

  ngOnDestroy(): void {}

  translateServiceSubscription(applicantLoanDto: ApplicantLoanDto[], applicantLoanFilters?: any) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.transformApplicantLoanObj(applicantLoanDto, applicantLoanFilters);
    });
  }

  typeOfLoanFiltersRemap = (applicantLoanFilterDto: any) => {
    return { ...applicantLoanFilterDto };
  };

  filterEvent(event: any) {
    this.applicantLoanControllerService
      .getLoanObligationsOfApplicant(this.appDto.applicant.applicationId, this.setFilterParams(event))
      .subscribe(applicantLoan => {
        this.transformApplicantLoanObj(
          applicantLoan.credits as any,
          this.typeOfLoanFiltersRemap(applicantLoan.filters)
        );
        this.translateServiceSubscription(
          applicantLoan.credits as any,
          this.typeOfLoanFiltersRemap(applicantLoan.filters)
        );
      });
  }

  setFilterParams = (params?: any): any => {
    return (this.filterParams = {
      applicationId: this.applicantLoanFilterDto.credits ? this.applicantLoanFilterDto.credits[0].applicationId : null,
      ...params,
      kpzz: params && params.isKPZZ ? params.isKPZZ : params && params.isKPZZ === false ? params.isKPZZ : null,
      isReviewed: params && params.numberOfLoanClassReviews
    });
  };

  emitCommunicationEvent(communication: CommunicationDto, communicationType: string, owner: string) {
    this.communicationObject[owner][communicationType] = communication;
  }

  acceptChanges(): void {
    this.isChangesAccepted = true;
    this.isAcceptButtonDisabled = true;
    this.isCalculateButtonDisabled = true;
    this.showSuspensiveConditionsTable = true;
    this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).disable();

    this.finalProduct[0]['creditAmount'] = this.finalProduct[0].maxCreditSum;
    this.finalProduct[0]['monthlyPayment'] = this.finalProduct[0].maxAnnPayment;

    this.approvedCreditConditionsData = new TableData(
      CREDIT_INFO_NAME_PROPS,
      this.setMatrixTerms(this.finalProduct as any[])
    );
    this.suspensiveConditionsValidationService.updateObligationsList(this.applicantObligationsDtoWithTypes);
    this.getProductsFrequency(this.theSelectedProductId);

    // this.selectedCreditConditionsData = new TableData(HEADERS.CALCULATED_CREDIT_CONDITIONS_HEADERS, this.finalProduct);
    // this.isGraceInterestShown(this.finalProduct[0]);
    // this.defineProductType(this.finalProduct[0]);
    // this.setProductToPaymentOptions(this.finalProduct[0]);
    // this.setInitialValuesForAdditionalParams();
    // this.fillAccountTablesAccordingToProduct();
    // this.enableOrDisableProductInsuranceForm(this.finalProduct[0]);
  }

  checkOtpPhone(isOtpModalShowFinally: boolean = false): void {
    const shouldShowPhoneVerification =
      !this.appDto.applicant.mobilePhone || (!this.appDto.applicant.isMobilePhoneConfirmed);
    const isPosOrOnline = this.appDto.isPos || this.appDto.isOnline;
    const isQueue = this.historyButtonVisible;
    // this.appDto.applicationType === applicationTypesEnum.PRELIMINARY_REQUEST &&
    // (!this.appDto.applicant.isMobilePhoneConfirmed);

    if (shouldShowPhoneVerification && !isPosOrOnline && !isQueue) {
      const dialogRef = this.dialog.open(OtpVerificationModalComponent, {
        height: 'auto',
        width: '40vw',
        data: {
          mode: OtpType.SMS,
          appDto: this.appDto,
          initialPhone: this.appDto.applicant.mobilePhone
        },
      });

      (dialogRef.componentInstance as OtpVerificationModalComponent).emitData
        .pipe(untilDestroyed(this))
        .subscribe((result: any) => {
          this.appDto.applicant.isMobilePhoneConfirmed = true;

          if (result && result.mobilePhone) {
            this.appDto.applicant.mobilePhone = result.mobilePhone;
          }

          if (result && result.isOtp !== undefined) {
            this.isOtpSelected = result.isOtp;
          }

          if (isOtpModalShowFinally) {
            this.accept()
          }
        });
    }
  }

  cancelChanges(): void {
    this.isChangesAccepted = false;
    this.isCalculateButtonDisabled = true;
    this.isAcceptButtonDisabled = true;
    this.showSuspensiveConditionsTable = false;

    this.matrixProcessDataService.setRecalculatedMatrix(null, this.calculatorForm);

    this.finalProduct = [];
    this.suspensiveConditionsListFiltered = [];
    this.approvedCreditConditionsData = new TableData(CREDIT_INFO_NAME_PROPS, []);
    const fields = ['matrixProduct', 'preapproveCalcCreditSum', 'preapproveCalcCreditTerm'];
    fields.forEach(code => {
      this.finalDecForm
        .get(FinalDecisionGroupKeys.Calculator)
        .get(code)
        .reset();
    });
    this.theSelectedProductDir = null;
    this.setCurrencyToAccount(null);
    this.calculatedCreditConditionsData = new TableData(PRODUCT_NAME_PROPS, []);
  }

  transformInsuranceInfoData(insuranceInfo: InsuranceInfo) {
    if (insuranceInfo) {
      this.insuranceInfoDto = new InsuranceInfoDto(insuranceInfo);
    }
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.accept();
        break;
      }
      case 'delay': {
        this.delayApp();
        break;
      }
      case 'cancel': {
        this.navigateToBack();
        break;
      }
      case 'decline': {
        this.openDeclineReasonModal();
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
        this.loadCommentToVerificatorChat(event.event as string);
        break;
      }
      default: {
        break;
      }
    }
  }

  delayApp() {
    this.isLoading = true;
    this.requestsPipe()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.toastService.viewMsg('Заявка отложена', 'success');
        this.navigateToDashboard();
      });
    //
    // this.requestsPipe()
    //   .pipe(untilDestroyed(this))
    //   .subscribe(res => {
    //     this.toastService.viewMsg('Заявка отложена', 'success');
    //     this.navigateToDashboard();
    //   });
  }

  navigateToBack() {
    const url = this.router.url;
    this.router.navigate([url.slice(0, url.indexOf('/stages'))]);
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

  cancelApp(dirManagerDeclineReasonId: number): void {
    this.isLoading = true;
    this.selectedDeclineReasonId = dirManagerDeclineReasonId;

    this.requestsPipe()
      .pipe(
        switchMap(_ => this.applicationControllerService.declineApp(this.appDto.id.toString())),
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.isLoading = false;
        this.toastService.viewMsg('SuccessMessage.Denied', 'success');
        this.navigateToBack();
      });
  }

  printForm(): void {
    this.additionalPrintFormService
      .getPrintFormsWithSigners(this.appDto)
      .pipe(untilDestroyed(this))
      .subscribe((res: PrintingFormDto[]) => {
        if (res) {
          this.openPrintFormModal(res);
        }
      });
  }

  chooseApprovedCredit(matrix: BRMSMatrixDto): void {
    this.theSelectedProductDir = matrix;
    this.isCalculateButtonDisabled = false;
    this.matrixProcessDataService.onChooseMatrix(matrix);
    this.matrixProcessDataService.setVisibleByType(this.calculateFormConfig);

    this.setCurrencyToAccount(matrix.dirCurrency.id);

    if (!!matrix.product) {
      this.theSelectedProductId = matrix.product.id;
      const control = this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('matrixProduct');
      control.setValue(this.language === ELanguage.Am ? matrix.product.nameAm : matrix.product.nameRu);
    }

    if (!!matrix.creditTerm) {
      const control = this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('preapproveCalcCreditTerm');
      control.setValue(matrix.creditTerm);
      control.enable();
    }

    this.matrixProcessDataService.onChangeProduct(this.finalDecForm.get(
      FinalDecisionGroupKeys.Calculator
    ) as FormGroup);

    this.isAcceptButtonDisabled = true;

    this.chosenMatrix = Object.assign({}, matrix);

    this.finalProduct = [];
    this.approvedCreditConditionsData = new TableData(CREDIT_INFO_NAME_PROPS, []);
    this.calculatedCreditConditionsData = new TableData(PRODUCT_NAME_PROPS, []);

    this.isChangesAccepted = true;
    this.clearAndFetchApplicantLoan(() => {
      this.setSuspensiveConditionsTable();
    });
  }

  editSuspensiveConditions(rowValue: Partial<ApplicantLoanDto>) {
    // FinalDecisionGroupKeys.Calculator

    if (rowValue.typeId) {
      const neededId = this.matrixProcessDataService.getSuspensiveConditionsTypeId();
      rowValue.type = (this.optionsList[OptionListNames.SuspensiveConditionsTypes] as Array<any>).find(
        el => el.id === neededId
      );

      // @ts-ignore
      rowValue.typeId = rowValue.type.id;
    } else {
      rowValue.typeId = null;
    }

    this.matrixProcessDataService.addNewSuspensiveType(this.calculatorForm, rowValue, () => {
      this.tableDataProcessingService
        .editedRow(rowValue, FullFormGroupKeys.CreditDetails)
        .pipe(
          tap(data => {
            this.fetchApplicantLoanFiltered();
            this.toastService.viewMsg('SuccessMessage.Added', 'success');
            this.isCalculateButtonDisabled = false;
            this.calculatedCreditConditionsData = new TableData(PRODUCT_NAME_PROPS, []);
          }),
          untilDestroyed(this)
        )
        .subscribe(() => {}, err => this.matrixProcessDataService.onErrorProcess(rowValue));
    });
  }

  calculatePreapproveCredit() {
    if (!this.matrixProcessDataService.validateCalculateProduct(this.calculatorForm) || !this.calculatorForm.valid) {
      return;
    }

    if (
      !this.validateMatrixDataService.validateSumAndTermByProdcat(
        this.appDto,
        this.theSelectedProductDir,
        this.getMatrixForRequest(),
        this.matrixProcessDataService.isTopUp
      )
    ) {
      return;
    }

    if (this.chosenMatrix) {
      const calc = this.calculatorForm.getRawValue() as any;

      const requestMatrix = this.getMatrixForRequest();
      this.isCalculateButtonDisabled = true;
      this.isAcceptButtonDisabled = true;
      this.brms2MatrixService
        .recalculateOffer(requestMatrix)
        .pipe(
          tap(matrix => {
            if (!!matrix) {
              this.matrixProcessDataService.setRecalculatedMatrix(matrix, this.calculatorForm);

              this.setFinalProductInfoIfTopUp(matrix);
              this.setMatrixTerms([matrix]);
              this.chosenMatrix = this.setTotUpsNaming([matrix])[0];
            } else {
              this.chosenMatrix = null;
            }

            this.getEffectiveRateForMatrix(this.chosenMatrix);
            Swal.close();
            this.toastService.viewMsg('SuccessMessage.ProcessComplete', 'success');
          }),
          catchError(err => {
            this.isCalculateButtonDisabled = false;
            if (err.error.message === 'No offer available') {
              this.toastService.viewMsg('Для заданных параметров нет доступных предложений', 'error');
            }
            return throwError(err);
          }),
          untilDestroyed(this)
        )
        .subscribe();
    }
  }

  chooseValidCard(card: AccountDto) {
    this.chosenCard = card;
    this.chosenAccountData = new TableData(CHOSEN_ACCOUNT_HEADERS, [card]);
  }

  insuranceSelectChanged(selectEmittedValue: number | InsuranceProductFrontDto, group: EInsuranceFieldGroup): void {
    const insuranceForm: FormGroup = this.finalDecForm.get(FinalDecisionGroupKeys.Insurance) as FormGroup;
    const insuranceTypeControl: AbstractControl = insuranceForm.get('insuranceTypeId');
    const companyNameControl: AbstractControl = insuranceForm.get('companyName');
    const insuranceProductNameControl: AbstractControl = insuranceForm.get('productName');
    const insuranceBrokerageControl: AbstractControl = insuranceForm.get('insuranceBrokerage');

    if (group === EInsuranceFieldGroup.Options) {
      this.setInsuranceCompaniesOptionList(selectEmittedValue as number);

      companyNameControl.reset();
      companyNameControl.enable();

      insuranceProductNameControl.reset();
      insuranceProductNameControl.disable();

      insuranceBrokerageControl.reset();
      insuranceBrokerageControl.disable();
    }

    if (group === EInsuranceFieldGroup.Company) {
      insuranceProductNameControl.reset();
      insuranceProductNameControl.disable();

      insuranceBrokerageControl.reset();
      insuranceBrokerageControl.disable();

      this.setInsuranceProductNameOptionList(
        insuranceTypeControl.value,
        (selectEmittedValue as InsuranceProductFrontDto).companyName
      );
    }

    if (group === EInsuranceFieldGroup.ProductName) {
      insuranceBrokerageControl.reset();
      insuranceBrokerageControl.disable();

      const insuranceProduct: InsuranceProductFrontDto = this.insuranceProducts.find(
        (product: InsuranceProductFrontDto) => {
          return (
            product.dirInsuranceType.id === insuranceTypeControl.value &&
            (product.companyName === companyNameControl.value.companyName ||
              product.companyName === companyNameControl.value) &&
            product.insuranceProductName === (selectEmittedValue as InsuranceProductFrontDto).insuranceProductName
          );
        }
      );

      if (insuranceProduct) {
        insuranceBrokerageControl.enable();
        insuranceBrokerageControl.setValue((insuranceProduct as InsuranceProductFrontDto).rateTo);
        this.setInsuranceBrokerageValidation(insuranceProduct as InsuranceProductFrontDto);
      }
    }
  }

  filterMatrix() {
    //   this.approvedCreditConditionsData = new TableData(
    //     !this.isWithRef ? APPROVED_CREDIT_CONDITIONS_HEADERS : APPROVED_CREDIT_CONDITIONS_WITH_REF_HEADERS,
    //     this.matrixUtilService.filterMatrix(this.approvedMatrix, this.isWithRef, this.isWithProduct)
    //   );
  }

  changeIsWithRef(isWithRef: boolean) {
    this.isWithRef = isWithRef;
    this.isWithProduct = null;

    this.filterMatrix();
  }

  changeIsWithProduct(isWithProduct: number) {
    this.isWithProduct = isWithProduct;

    this.filterMatrix();
  }

  saveRow(rowValue: Partial<ApplicantContactPersonDto>, groupName: string) {
    this.tableDataProcessingService
      .saveRow<Partial<ApplicantContactPersonDto>>(this.appDto, rowValue, groupName)
      .pipe(
        switchMap(() => this.tableDataProcessingService.updateContactPersonInfo(this.appDto)),
        untilDestroyed(this)
      )
      .subscribe(
        (contactPersons: ApplicantContactPerson[]) => {
          this.transformApplicantContactPersons(contactPersons);
          this.toastService.viewMsg('SuccessMessage.Added', 'success');
        },
        () => this.toastService.viewMsg('ErrorMessage.NotEdited', 'error')
      );
  }

  editedRow(rowValue: Partial<ApplicantContactPersonDto>, groupName: FinalDecisionGroupKeys) {
    const contactPerson: Partial<ApplicantContactPersonDto> = {
      ...rowValue,
      applicantId: this.appDto.applicant.id,
      applicationId: this.appDto.id
    };

    return;
    this.tableDataProcessingService
      .editedRow(contactPerson, groupName)
      .pipe(
        switchMap(() => this.tableDataProcessingService.updateContactPersonInfo(this.appDto)),
        untilDestroyed(this)
      )
      .subscribe(
        (contactPersons: ApplicantContactPerson[]) => {
          this.transformApplicantContactPersons(contactPersons);
          this.toastService.viewMsg('SuccessMessage.Added', 'success');
        },
        () => this.toastService.viewMsg('ErrorMessage.NotEdited', 'error')
      );
  }

  editedLoanRow(rowValue: ApplicantLoanDto) {
    const fields = ['loanAgreementNumber', 'clientAccount', 'creditCode', 'accountYKO'];
    fields.forEach(field => {
      rowValue[field] = trimmer(rowValue[field]);
      if (rowValue[field] != null && trimmer(rowValue[field]) === '') {
        rowValue[field] = null;
      }
    });

    const type = (this.optionsList[OptionListNames.SuspensiveConditionsTypes] as Array<SuspensiveConditionsType>).find(
      el => +el.id === +rowValue.type
    );
    // 247007634642Z001

    this.suspensiveConditionsValidationService.updateObligationsList(this.applicantObligationsDtoWithTypes);

    this.applicantLoanControllerService
      .setLoanObligationsOfApplicant({
        ...rowValue,
        type
      })
      .subscribe();
  }

  removeRow(rowValue: Partial<ApplicantContactPersonDto>, groupName: FinalDecisionGroupKeys) {
    this.tableDataProcessingService
      .removeRow(rowValue, groupName)
      .pipe(
        switchMap(() => this.tableDataProcessingService.updateContactPersonInfo(this.appDto)),
        untilDestroyed(this)
      )
      .subscribe(
        (contactPersons: ApplicantContactPerson[]) => {
          this.transformApplicantContactPersons(contactPersons);
          this.toastService.viewMsg('SuccessMessage.Added', 'success');
        },
        () => this.toastService.viewMsg('ErrorMessage.NotEdited', 'error')
      );
  }

  chooseNewCard(flag: boolean) {
    this.isNameOnCardValidation$.next(flag);
    this.isNewCardOrderChecked = flag;
    this.isGamingUsage = flag;
    this.resetChosenAccountTable(flag);
    this.resetControlValue(FinalDecisionGroupKeys.AccountForm, 'isGamingSite');
    this.resetControlValue(FinalDecisionGroupKeys.AccountForm, 'nameOnCard');
  }

  chooseNewInstantCard(flag: boolean) {
    this.isNewInstantCardFieldsValidation$.next(flag);
    this.isNameOnCardValidation$.next(flag);
    this.isNewInstantCardOrderChecked = flag;
    this.isGamingUsage = flag;
    this.resetChosenAccountTable(flag);
    this.resetControlValue(FinalDecisionGroupKeys.AccountForm, 'isGamingSite');
    this.resetControlValue(FinalDecisionGroupKeys.AccountForm, 'cardNumber');
    this.resetControlValue(FinalDecisionGroupKeys.AccountForm, 'nameOnCard');
    this.resetControlValue(FinalDecisionGroupKeys.AccountForm, 'cardAccNum');
  }

  chooseNewAccOrder(flag: boolean): void {
    this.isNameOnCardValidation$.next(flag);
    this.isNewAccOrderChecked = flag;
    this.resetChosenAccountTable(flag);
    this.resetControlValue(FinalDecisionGroupKeys.AccountForm, 'nameOnCard');
  }

  /* ------ GETTING PRINT FORMS  ------ */

  private checkOnReadonly(): void {
    if (this.readonlyForm) {
      this.finalDecForm.disable();
    }
  }

  private setValidationsSub(): void {
    this.isAdditionalParametersValidation$.pipe(untilDestroyed(this)).subscribe((isNeedValidation: boolean) => {
      isNeedValidation ? this.setAdditionalParametersValidation() : this.clearAdditionalParametersValidation();
    });

    this.isFamilyInfoValidation$.pipe(untilDestroyed(this)).subscribe((isNeedValidation: boolean) => {
      isNeedValidation ? this.setFamilyInfoValidation() : this.clearFamilyInfoValidation();
    });

    this.isNewInstantCardFieldsValidation$.pipe(untilDestroyed(this)).subscribe((isNeedValidation: boolean) => {
      isNeedValidation ? this.setNewInstantCardFieldsValidation() : this.clearNewInstantCardFieldsValidation();
    });

    this.isNameOnCardValidation$.pipe(untilDestroyed(this)).subscribe((isNeedValidation: boolean) => {
      isNeedValidation ? this.setNameOnCardValidation() : this.clearNameOnCardValidation();
    });

    this.isInsuranceTypedValidation$.pipe(untilDestroyed(this)).subscribe((isNeedValidation: boolean) => {
      isNeedValidation ? this.setInsuranceTypeValidation() : this.clearInsuranceTypeValidation();
    });

    this.isInsuranceCompaniesValidation$.pipe(untilDestroyed(this)).subscribe((isNeedValidation: boolean) => {
      isNeedValidation ? this.setInsuranceCompaniesValidation() : this.clearInsuranceCompaniesValidation();
    });

    this.isInsuranceProductNameValidation$.pipe(untilDestroyed(this)).subscribe((isNeedValidation: boolean) => {
      isNeedValidation ? this.setInsuranceProductNameValidation() : this.clearInsuranceProductNameValidation();
    });
  }

  private setInitialChosenAccountData(): void {
    if (!!this.accountIssuePost && this.accountIssue) {
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

  private setProductToPaymentOptions(product: any): void {
    if (!!product && !!product.product && !!product.product.paymentDays) {
      this.optionsList[OptionListNames.ProductToPaymentDay] = product.product.paymentDays.sort(
        (dayA: ProductToPaymentDay, dayB: ProductToPaymentDay) => dayA.paymentDay - dayB.paymentDay
      );
    }
  }

  private setCustomValidatorToControl(
    form: FormGroup,
    controlName: string,
    pattern: string,
    errorText: InputErrorKeys
  ): void {
    form
      .get(controlName)
      .valueChanges.pipe(
      distinctUntilChanged(),
      startWith(''),
      pairwise(),
      untilDestroyed(this)
    )
      .subscribe(([prev, next]: [string, string]) => {
        if (!prev && next) {
          form.get(controlName).setValidators(validateByPattern(pattern, errorText));
        }

        if (!next) {
          form.get(controlName).clearValidators();
        }

        form.get(controlName).updateValueAndValidity();
      });
  }

  private setInitialValuesForAdditionalParams(): void {
    this.enableAdditionalParametersForm();
    this.setInitialEnsureType();
    this.setInitialScheduleType();
  }

  private getCommunications(): void {
    this.communicationTypeControllerService
      .getCommunicationByAppId(this.appDto.id)
      .pipe(
        tap(data => {
          this.appCommunication = data;
          this.setCommunicationForm(data);
        })
      )
      .subscribe();
  }

  private getIsBiometricPassed(): void {
    this.bpmFrontControllerService
      .isBiometricPassed(this.appDto.id)
      .pipe(
        tap(data => {
          this.isBiometricPassed = data;
        })
      )
      .subscribe();
  }

  private setCommunicationForm(communication: Communication[]) {
    const appCommunication = communication.filter(
      el => (el.dirCommunicationMethodOwner.id as any) === CommunicationOwnerType.APPLICATION
    );
    const accCommunication = communication.filter(
      el => (el.dirCommunicationMethodOwner.id as any) === CommunicationOwnerType.ACCOUNT
    );

    const ownerComm = {
      [CommunicationOwnerType.APPLICATION]: appCommunication,
      [CommunicationOwnerType.ACCOUNT]: accCommunication
    };
    for (const owner in this.communicationConfig) {
      this.communicationConfig[owner].forEach(el => {
        if (el.communicationType === CommunicationType.BANK) {
          let commData = ownerComm[owner].find(
            comm => (comm.dirCommunicationMethod.dirCommunicationMethodType.id as any) === CommunicationType.BANK
          );
          if (commData) {
            commData = { ...commData, value: this.formatPhoneNumber(commData.value) };
          }
          el.data = commData;
          this.communicationObject[owner][CommunicationType.BANK] = this.remapCommunication(el.data);
        } else {
          let commData = ownerComm[owner].find(
            comm => (comm.dirCommunicationMethod.dirCommunicationMethodType.id as any) === CommunicationType.STATEMENT
          );
          if (commData) {
            commData = { ...commData, value: this.formatPhoneNumber(commData.value) };
          }
          el.data = commData;
          this.communicationObject[owner][CommunicationType.STATEMENT] = this.remapCommunication(el.data);
        }
      });
    }
  }

  private formatPhoneNumber(phone: string): string {
    if (!phone) return phone;

    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('374') && cleaned.length === 11) {
      const operatorCode = cleaned.substring(3, 5);
      const numberPart = cleaned.substring(5);

      return `+374 (${operatorCode}) ${numberPart.substring(0, 2)} ${numberPart.substring(2, 4)} ${numberPart.substring(4)}`;
    }

    return phone;
  }

  private cleanPhoneNumber(phone: string): string {
    if (!phone) return phone;

    return phone.replace(/\D/g, '');
  }

  private setScheduleFrequencyType(): void {
    const oncePerMonthCode: string = '001';
    const scheduleFrequencyControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AdditionalParameters)
      .get('dirScheduleFrequencyId');

    const scheduleFrequency: Dir = (this.optionsList[OptionListNames.ScheduleFrequencies] as Dir[]).find(
      (scheduleFrequency: Dir) => scheduleFrequency.code === oncePerMonthCode
    );
    if (scheduleFrequency) {
      scheduleFrequencyControl.setValue(scheduleFrequency.id);
    }

    scheduleFrequencyControl.disable();
  }

  private setInitialEnsureType(): void {
    const ensureTypeControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AdditionalParameters)
      .get('dirEnsureTypeId');

    if (!ensureTypeControl.value) {
      const blankEnsureTypeCode: string = '001';
      const blankEnsureType: DirAbsCode = (this.optionsList[OptionListNames.ScheduleFrequencies] as DirAbsCode[]).find(
        (scheduleFrequency: DirAbsCode) => scheduleFrequency.code === blankEnsureTypeCode
      );

      if (blankEnsureType) {
        ensureTypeControl.setValue(blankEnsureType.id);
      }
    }
  }

  private setInitialScheduleType(): void {
    const scheduleTypeControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AdditionalParameters)
      .get('dirScheduleTypeId');

    // Потребительский кредит
    if (this.isConsumerCredit) {
      const standardScheduleCode: string = '001';
      const scheduleType: DirAbsCode = (this.optionsList[OptionListNames.ScheduleTypes] as DirAbsCode[]).find(
        (scheduleType: DirAbsCode) => scheduleType.code === standardScheduleCode
      );

      this.isStandardSchedule = true;

      if (!scheduleTypeControl.value && scheduleType) {
        scheduleTypeControl.setValue(scheduleType.id);
      }

      scheduleTypeControl.disable();
    }

    // Карта или овердрафт
    if (this.isCreditCard || this.isOverdraft) {
      const creditCardOrOverdraftScheduleCode: string = '002';

      const scheduleType: DirAbsCode = (this.optionsList[OptionListNames.ScheduleTypes] as DirAbsCode[]).find(
        (scheduleType: DirAbsCode) => scheduleType.code === creditCardOrOverdraftScheduleCode
      );

      if (!scheduleTypeControl.value && scheduleType) {
        scheduleTypeControl.setValue(scheduleType.id);
      }

      this.isCardOrOverdraftSchedule = true;
      this.setScheduleFrequencyType();

      scheduleTypeControl.disable();
    }
  }

  private defineProductType(creditInfo: any): void {
    if (creditInfo.product) {
      if (!creditInfo.product.forCard && !creditInfo.product.isOverdraft) {
        this.isConsumerCredit = true;
      }

      if (creditInfo.product.forCard && !creditInfo.product.isOverdraft) {
        this.isCreditCard = true;
      }

      if (creditInfo.product.isOverdraft) {
        this.isOverdraft = true;
      }
    }
  }

  private get isAccounts(): boolean {
    return (
      !!this.integrationInterface &&
      !!this.integrationInterface.absClientInfoResponseDto &&
      !!this.integrationInterface.absClientInfoResponseDto.accounts &&
      !!this.integrationInterface.absClientInfoResponseDto.accounts.length
    );
  }

  private fillCardAccountsTable(): void {
    const cardAccounts: AccountDto[] = this.integrationInterface.absClientInfoResponseDto.accounts.filter(
      (account: AccountDto) =>
        (account.type === this.CARD_ACCOUNT_TYPE && !account.isCreditCard && !account.isSalaryCard) ||
        (account.type === this.CARD_ACCOUNT_TYPE && account.isSalaryCard)
    );

    if (cardAccounts.length) {
      this.selectingCardAccountData = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, cardAccounts);
    }
  }

  private fillCurrentAccountsTable(): void {
    if (this.integrationInterface) {
      let currentAccounts: AccountDto[] = this.integrationInterface.absClientInfoResponseDto.accounts.filter(
        (account: AccountDto) => account.type === this.ACCOUNT_TYPE && !account.isCreditCard && !account.isSalaryCard
      );

      if (currentAccounts.length) {
        currentAccounts = currentAccounts.map((account: AccountDto) => {
          if (
            !account.descriptionEn ||
            account.descriptionEn === EAccountNameColumn.AM ||
            account.descriptionEn === EAccountNameColumn.RU
          ) {
            account.descriptionEn = this.language === ELanguage.Am ? EAccountNameColumn.AM : EAccountNameColumn.RU;
          }

          return { ...account };
        });

        this.selectingCurrentAccountData = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, currentAccounts);
      }
    }
  }

  private setConsumerCreditData(): void {
    if (this.isAccounts) {
      this.fillCardAccountsTable();
      this.fillCurrentAccountsTable();
    }
  }

  private onlyUnique(value, index, self): boolean {
    return self.indexOf(value) === index;
  }

  private setInsuranceTypeOptionList(insuranceProducts: InsuranceProductFrontDto[]): void {
    const typeAbsCodesArr = insuranceProducts.map((product: InsuranceProductFrontDto) => product.typeAbsCode);
    const uniqTypeAbsCodesArr = typeAbsCodesArr.filter(this.onlyUnique);

    this.optionsList[OptionListNames.InsuranceProduct] = this.dirInsuranceType.filter((insuranceType: DirAbsCode) => {
      return uniqTypeAbsCodesArr.some((typeAbsCode: number) => +insuranceType.absCode === typeAbsCode);
    });

    if (this.optionsList[OptionListNames.InsuranceProduct].length && !this.readonlyForm && this.isChangesAccepted) {
      const insuranceTypeControl: AbstractControl = this.finalDecForm
        .get(FinalDecisionGroupKeys.Insurance)
        .get('insuranceTypeId');

      insuranceTypeControl.enable();
      this.isInsuranceTypedValidation$.next(true);
    }
  }

  private getInsuranceProduct(creditInfo: any): void {
    this.isLoading = true;

    if (creditInfo.product && creditInfo.product.id) {
      this.insuranceProductControllerService
        .getAll(creditInfo.product.id.toString())
        .pipe(
          catchError(err => {
            this.isLoading = false;
            return throwError(err);
          }),
          untilDestroyed(this)
        )
        .subscribe((insuranceProducts: InsuranceProductFrontDto[]) => {
          this.isLoading = false;

          this.insuranceProducts = insuranceProducts;

          if (this.insuranceProducts.length) {
            const insuranceTypeControl: AbstractControl = this.finalDecForm
              .get(FinalDecisionGroupKeys.Insurance)
              .get('insuranceTypeId');

            const companyNameControl: AbstractControl = this.finalDecForm
              .get(FinalDecisionGroupKeys.Insurance)
              .get('companyName');

            const insuranceProductNameControl: AbstractControl = this.finalDecForm
              .get(FinalDecisionGroupKeys.Insurance)
              .get('productName');

            const insuranceBrokerageControl: AbstractControl = this.finalDecForm
              .get(FinalDecisionGroupKeys.Insurance)
              .get('insuranceBrokerage');

            this.setInsuranceTypeOptionList(this.insuranceProducts);

            if (insuranceTypeControl.value) {
              this.setInsuranceCompaniesOptionList(insuranceTypeControl.value);
            }

            if (companyNameControl.value) {
              this.setInsuranceProductNameOptionList(insuranceTypeControl.value, companyNameControl.value);
            }

            if (insuranceTypeControl.value && companyNameControl.value && insuranceProductNameControl.value) {
              const insuranceProduct: InsuranceProductFrontDto = this.insuranceProducts.find(
                (product: InsuranceProductFrontDto) =>
                  product.dirInsuranceType.id === insuranceTypeControl.value &&
                  product.companyName === companyNameControl.value &&
                  product.insuranceProductName === insuranceProductNameControl.value
              );

              if (insuranceProduct && !this.readonlyForm) {
                insuranceBrokerageControl.enable();
                this.setInsuranceBrokerageValidation(insuranceProduct);
              }
            }
          }
        });
    }
  }

  private setChosenCreditInfoData(): void {
    if (!!this.appDto && !!this.appDto.chosenCreditInfo) {
      this.chosenCreditInfoData = new TableData(HEADERS.CHOSEN_CREDIT_INFO_HEADERS, this.setMatrixTerms([
        this.appDto.chosenCreditInfo
      ] as any[]) as any[]);
    }
  }

  private setSelectedCreditConditionsData(): void {
    if (!!this.appDto && !!this.appDto.finalCreditInfo) {
      this.isFamilyInfoValidation$.next(true);
      this.isAdditionalParametersValidation$.next(true);
      this.isChangesAccepted = true;
      this.selectedCreditConditionsData = new TableData(
        HEADERS.SELECTED_CREDIT_TERMS_HEADERS,
        this.setMatrixTerms([this.appDto.finalCreditInfo] as any[])
      );

      this.finalProduct.push(this.appDto.finalCreditInfo);
      this.defineProductType(this.appDto.finalCreditInfo);
      this.isGraceInterestShown(this.appDto.finalCreditInfo);
      this.setInitialValuesForAdditionalParams();
      this.enableOrDisableProductInsuranceForm(this.appDto.finalCreditInfo);
    }
  }

  private loadCommentToVerificatorChat(comment: string) {
    this.appCommonRequestService.loadCommentToSopiokChat(comment);
  }

  private isGraceInterestShown(finalCreditInfo: any): void {
    if (finalCreditInfo.product) {
      this.isGraceInterest = finalCreditInfo.product.isComRestr || finalCreditInfo.product.isForcedRestr;
    }
  }

  private createTabValidationSubscription(): void {
    this.validateTabsStateService.currentTabs.pipe(untilDestroyed(this)).subscribe((tabs: Record<string, boolean>) => {
      this.isAmlTabValid = tabs[this.TabTitles[TabNames.Aml]];
    });
  }

  private getProductsFrequency(productId: number) {
    if (productId) {
      this.productCategoryControllerService.getProductsFrequencyById(productId).subscribe(value => {
        const control = this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).get('dirScheduleFrequency');
        control.setValue(value[0].id);
        this.finalProduct[0]['dirScheduleFrequencyId'] = value[0].id;
        this.finalProduct[0].dirScheduleFrequency = value[0];
        this.updateChosenCreditInfo(this.finalProduct[0]);
      });
    }
  }

  private scrollToFirstInvalidField(): void {
    const firstElementWithError = document.querySelector('.form').querySelector('.ng-invalid');
    const customElementWithError = document.querySelector('.form').querySelector('.errorSuspensive');

    if (!!firstElementWithError) {
      firstElementWithError.scrollIntoView();
    }
    if (!!customElementWithError) {
      customElementWithError.scrollIntoView();
    }
  }

  private saveCardInfo(): Observable<AccountIssueGetDto> {
    let mergedData: AccountIssuePostDto = { ...this.accountIssuePost };

    const newAccFormValue = (this.finalDecForm.get(FinalDecisionGroupKeys.NewAccount) as FormGroup).getRawValue();

    mergedData.isNewAccOrder = this.isNewAccount;

    if (this.isNewAccount) {
      mergedData = {
        ...mergedData,
        ...newAccFormValue,
        accountBalance: null,
        accNum: null
      };
    } else {
      if (this.chosenCard) {
        mergedData = {
          ...mergedData,
          ...this.chosenCard,
          dirAccountTypeId: this.chosenCard.accountType ? this.chosenCard.accountType.id : null,
          dirCurrencyId: this.chosenCard.currency,
          accountBalance: this.chosenCard.balance,
          accNum: this.chosenCard.accountNumber
        } as any;
      }
    }
    mergedData.applicantId = this.appDto.applicant.id;
    mergedData.applicationId = this.appDto.id;
    mergedData.isMarketing = this.getIsMarketing(mergedData.isMarketing);

    return this.accountService.update(mergedData);
  }

  private updateApplicant(): Observable<number> {
    const applicantDto: ApplicantDto = new ApplicantDto(this.appDto.applicant);

    const applicant: ApplicantDto = {
      ...applicantDto,
      ...this.finalDecForm.getRawValue()[this.FinalDecisionGroupKeys.FamilyInfo]
    };

    return this.applicantControllerService.update(applicant);
  }

  private updateApplication(): Observable<ApplicationDto> {
    const insuranceForm = this.finalDecForm.get(FinalDecisionGroupKeys.Insurance);
    const appData: ApplicationDto = new ApplicationDto({
      ...this.appDto,
      firstPaymentDate: insuranceForm.get('firstPaymentDate').value,
      dirManagerDeclineReason: this.selectedDeclineReasonId,
      isOtp: this.isOtpSelected
    });
    return this.applicationControllerService.update(appData);
  }

  private requestsPipe() {
    return forkJoin([
      this.saveCardInfo(),
      // this.updateApplicant(),
      // this.updateCreditInfo(),
      // this.updateInsuranceInfo(),
      this.updateApplication(),
      this.saveCommunication()
      // this.updateChosenCreditInfo(this.finalProduct[0]),
    ]).pipe(
      catchError(err => {
        this.isLoading = false;
        return throwError(err);
      })
    );
  }

  private setFieldsValidation(): void {
    this.isAdditionalParametersValidation$.next(true);
    this.isFamilyInfoValidation$.next(true);
  }

  private accept(): void {
    this.triggerSubmit.next();

    if (!this.isChangesAccepted || !this.isFinalProductExist) {
      this.toastService.viewMsg('ErrorMessage.NoProduct', 'warning');
      return;
    }

    if (!this.checkValidCommunication()) {
      return;
    }

    if (this.finalDecForm.invalid) {
      this.scrollToFirstInvalidField();
      return;
    }

    if (!this.validateChoosenCard()) {
      return;
    }

    if (!this.validateCreditCode()) {
      return;
    }

    if (!this.isAmlTabValid) {
      this.toastService.viewMsg('ErrorMessage.SaveFATCATab', 'warning');
      return;
    }

    this.checkOtpPhone(true);
    if ((!this.appDto.applicant.mobilePhone || !this.appDto.applicant.isMobilePhoneConfirmed)
      && !(this.appDto.isPos || this.appDto.isOnline)) {
      this.toastService.viewMsg('Необходимо верифицировать телефон', 'warning');
      return;
    }

    this.showInfoBiometric();
  }

  private continueAccept(): void {
    this.isLoading = true;
    this.checkFirstPayDate(this.firstPaymentDate, () => {
      this.isLoading = true;
      this.requestsPipe()
        .pipe(
          debounceTime(500),
          tap(this.fireAcceptApp),
          untilDestroyed(this)
        )
        .subscribe();
    });

    // this.updateChosenCreditInfo(this.finalProduct[0]).pipe( tap( this.fireAcceptApp)).subscribe();
  }

  private showInfoBiometric() {
    if (this.isBiometricPassed || this.showInfoBiometricOpened || this.biometricPassed || this.biometricRejected) {
      this.continueAccept();
    } else {
      const config: IInfoModalConfig = {
        title: 'ShortForm.PassBiometry',
        textContent: 'ShortForm.BiometryFasterProcessing',
        btnConfirmName: 'ShortForm.Yes',
        btnCancelName: 'ShortForm.No',
        showClose: false
      };
      const dialog = this.dialog
        .open(InfoModalComponent, {
          data: config,
          width: '40%'
        })
        .afterClosed()
        .pipe(
          tap(result => {
            if (result === InfoModalResult.CONFIRM) {
              this.openBiometricModal();
            } else {
              this.biometricRejected = true;
              this.continueAccept();
            }
          })
        )
        .subscribe();
    }
  }

  private openBiometricModal() {
    this.showInfoBiometricOpened = true;
    const config: IBiometricModalConfig = {
      title: 'ShortForm.PassBiometry',
      shortApplicationId: this.appDto.shortApplicationId,
      applicationId: this.appDto.id
    };
    const dialog = this.dialog
      .open(BiometricModalComponent, {
        data: config,
        width: '35%'
      })
      .afterClosed()
      .pipe(
        tap(result => {

          if (result.result) {
            this.biometricDisabled = true;
            this.biometricPassed = true;
          }

          if (result.passed) {
            this.biometricPassed = result.passed;
          }
            if (this.appDto && this.appDto.applicationId) {
              this.attachmentControllerService
                .getAllByApplicationIdAndApplicantId(
                  this.appDto.id,
                  this.appDto.applicant.id,
                  this.appDto.shortApplicationId
                )
                .pipe(
                  tap((attachments: AttachmentDto[]) => {
                    this.attachmentControllerService.updateDocuments(attachments);
                  })
                )
                .subscribe();
            }
          this.continueAccept();
        })
      )
      .subscribe();
  }

  private openPrintFormModal(modalData: PrintingFormDto[]): void {
    const dialogRef = this.dialog.open(PrintFormModalComponent, {
      height: 'auto',
      width: '40vw',
      data: modalData
    });

    (dialogRef.componentInstance as PrintFormModalComponent).emitData
      .pipe(untilDestroyed(this))
      .subscribe((data: PrintFormModalEmit) => {
        this.isLoading = true;

        data.form.id === PrintFormsId.Card ? this.getCardPrintForm(data) : this.getPrintForm(data);
      });
  }

  private setIndividualCalculatorValueToMatrix(controlName: string, matrix: BRMSFinalMatrixDto): void {
    const controlValue: string = this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get(controlName).value;

    matrix[controlName] = controlValue;
  }

  private setSuspensiveConditionsTable = (): void => {
    this.suspensiveConditionsListFiltered = this.matrixProcessDataService.filterSuspensiveConditionsList(
      this.applicantObligationsDto
    );

    this.optionsList = {
      ...this.optionsList,
      SuspensiveConditionsTypesFiltered: this.matrixProcessDataService.filterOptionsByType(
        this.optionsList[OptionListNames.SuspensiveConditionsTypes]
      )
    };
    this.isChangesAccepted = false;
  };

  private getMatrixForRequest = (): BRMSMatrixDto => {
    const calc = this.calculatorForm.getRawValue() as any;
    return this.matrixProcessDataService.getMatrixForRequest(calc);
  };

  private getEffectiveRateForMatrix(matrix: BRMSMatrixDto) {
    this.absSearchClientControllerService
      .getEffectiveRate(matrix.id)
      .pipe(
        finalize(() => {
          this.isAcceptButtonDisabled = false;
        })
      )
      .subscribe(effectiveRate => {
        this.chosenMatrix.effectiveRate = effectiveRate as any;
        this.calculatedCreditConditionsData = new TableData(PRODUCT_NAME_PROPS, this.setMatrixTerms([matrix]));
        this.finalProduct = this.setTotUpsNaming([matrix]);
        this.isAcceptButtonDisabled = false;
        this.isCalculateButtonDisabled = false;
      });
  }

  private setInsuranceProductNameOptionList(insuranceTypeId: number, companyName: string): void {
    const productNameControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('productName');

    this.optionsList[OptionListNames.InsuranceProductName] = this.insuranceProducts.filter(
      (product: InsuranceProductFrontDto) =>
        product.dirInsuranceType.id === insuranceTypeId && product.companyName === companyName
    );

    if (this.optionsList[OptionListNames.InsuranceProductName].length && !this.readonlyForm) {
      this.isInsuranceProductNameValidation$.next(true);
      productNameControl.enable();
    }
  }

  private setInsuranceCompaniesOptionList(insuranceTypeId: number): void {
    const companyNameControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('companyName');

    this.optionsList[OptionListNames.InsuranceCompanies] = this.insuranceProducts
      .filter((product: InsuranceProductFrontDto) => product.dirInsuranceType.id === insuranceTypeId)
      .map((product: InsuranceProductFrontDto) => product.companyName)
      .filter(this.onlyUnique)
      .reduce((options: InsuranceProductFrontDto[], company: string) => {
        const product: InsuranceProductFrontDto = this.insuranceProducts.find(
          (product: InsuranceProductFrontDto) => product.companyName === company
        );

        options.push(product);
        return options;
      }, []);

    if (this.optionsList[OptionListNames.InsuranceCompanies].length && !this.readonlyForm) {
      this.isInsuranceCompaniesValidation$.next(true);
      companyNameControl.enable();
    }
  }

  private setInsuranceBrokerageValidation(insuranceProduct: InsuranceProductFrontDto): void {
    const brokerageControl = this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).get('insuranceBrokerage');

    brokerageControl.setValidators([
      Validators.min(insuranceProduct.rateFrom),
      Validators.max(insuranceProduct.rateTo),
      Validators.required
    ]);

    brokerageControl.updateValueAndValidity();
  }

  private updateInsuranceInfo(): Observable<number> {
    if (this.finalProduct[0] && this.finalProduct[0].product && this.finalProduct[0].product.isInsurance) {
      const insuranceTypeControlValue: number = this.finalDecForm
        .get(FinalDecisionGroupKeys.Insurance)
        .get('insuranceTypeId').value;

      const companyNameControl = this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).get('companyName');
      let companyNameControlValue: string;
      if (typeof companyNameControl.value === 'string') {
        companyNameControlValue = companyNameControl.value;
      }

      if (companyNameControl.value && companyNameControl.value.companyName) {
        companyNameControlValue = companyNameControl.value.companyName;
      }

      const insuranceProductNameControl = this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).get('productName');
      let insuranceProductNameControlValue: string;
      if (typeof insuranceProductNameControl.value === 'string') {
        insuranceProductNameControlValue = insuranceProductNameControl.value;
      }

      if (insuranceProductNameControl.value && insuranceProductNameControl.value.insuranceProductName) {
        insuranceProductNameControlValue = insuranceProductNameControl.value.insuranceProductName;
      }

      const insuranceBrokerageValue: number = this.finalDecForm
        .get(FinalDecisionGroupKeys.Insurance)
        .get('insuranceBrokerage').value;

      let mergeData: Omit<InsuranceInfoDto, 'id'>;
      let selectedInsuranceType: InsuranceProductFrontDto;
      let insuranceInfo: InsuranceInfoDto;
      let propertyCode: string = null;
      let propertyName: string = null;
      let absInsuranceCompanyCode: number = null;

      if (this.insuranceProducts.length) {
        selectedInsuranceType = this.insuranceProducts.find((product: InsuranceProductFrontDto) => {
          return (
            product.dirInsuranceType.id === insuranceTypeControlValue &&
            product.companyName === companyNameControlValue &&
            product.insuranceProductName === insuranceProductNameControlValue
          );
        });
      }

      if (selectedInsuranceType) {
        propertyCode = selectedInsuranceType.propertyCode;
        propertyName = selectedInsuranceType.propertyName;
        absInsuranceCompanyCode = selectedInsuranceType.companyAbsCode;
      }

      mergeData = {
        insuranceTypeId: insuranceTypeControlValue || null,
        insuranceBrokerage: insuranceBrokerageValue || null,
        companyName: companyNameControlValue || null,
        productName: insuranceProductNameControlValue || null,
        propertyCode,
        propertyName,
        absInsuranceCompanyCode
      };

      if (this.insuranceInfoDto) {
        insuranceInfo = {
          ...this.insuranceInfoDto,
          ...mergeData
        };

        return this.insuranceInfoService.update(insuranceInfo);
      } else {
        insuranceInfo = {
          ...mergeData,
          id: null
        };

        return this.insuranceInfoService.create(insuranceInfo);
      }
    }

    return of(null);
  }

  private updateCreditInfo(): Observable<number> {
    const paymentDayControlValue: number = this.finalDecForm
      .get(FinalDecisionGroupKeys.AdditionalParameters)
      .get('paymentDay').value;
    const secondPaymentDayControlValue: number = this.finalDecForm
      .get(FinalDecisionGroupKeys.AdditionalParameters)
      .get('secondPaymentDay').value;
    const paymentDayDir: ProductToPaymentDay = (this.optionsList[
      OptionListNames.ProductToPaymentDay
      ] as ProductToPaymentDay[]).find((day: ProductToPaymentDay) => day.id === paymentDayControlValue);
    const secondPaymentDayDir: ProductToPaymentDay = (this.optionsList[
      OptionListNames.ProductToPaymentDay
      ] as ProductToPaymentDay[]).find((day: ProductToPaymentDay) => day.id === secondPaymentDayControlValue);
    let paymentDay: number = null;
    let secondPaymentDay: number = null;

    if (paymentDayDir) {
      paymentDay = paymentDayDir.paymentDay;
    }

    if (secondPaymentDayDir) {
      secondPaymentDay = secondPaymentDayDir.paymentDay;
    }

    const additionalParameters =
      this.isVisibleSecondPaymentDay && this.isStandardSchedule
        ? {
          ...this.finalDecForm.getRawValue()[this.FinalDecisionGroupKeys.AdditionalParameters],
          paymentDay,
          secondPaymentDay
        }
        : {
          ...this.finalDecForm.getRawValue()[this.FinalDecisionGroupKeys.AdditionalParameters],
          paymentDay,
          secondPaymentDay: null
        };

    return null;

    // return this.finalProduct[0] !== null &&
    // this.finalProduct[0] !== undefined &&
    // this.finalProduct[0].creditInfoId !== null
    //   ? this.creditInfoControllerService.updateCreditInfo({
    //     ...this.finalDecForm.getRawValue()[this.FinalDecisionGroupKeys.GraceInterest],
    //     ...additionalParameters,
    //     id: this.finalProduct[0].creditInfoId || this.appDto.finalCreditInfo.id
    //   }, this.appDto.id)
    //   : of(null);
  }

  private enableOrDisableProductInsuranceForm(creditInfo: any): void {
    const isInsurance: boolean = creditInfo.product && creditInfo.product.isInsurance;

    if (isInsurance) {
      this.getInsuranceProduct(creditInfo);
    }
  }

  private enableAdditionalParametersForm(): void {
    this.finalDecForm.get(FinalDecisionGroupKeys.AdditionalParameters).enable();
  }

  private clearInsuranceBrokerageValidation(): void {
    const insuranceBrokerageControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('insuranceBrokerage');
    insuranceBrokerageControl.clearValidators();
    insuranceBrokerageControl.updateValueAndValidity();
  }

  private clearInsuranceProductNameValidation(): void {
    const insuranceProductNameControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('productName');
    insuranceProductNameControl.clearValidators();
    insuranceProductNameControl.updateValueAndValidity();
  }

  private clearInsuranceCompaniesValidation(): void {
    const insuranceCompaniesControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('companyName');
    insuranceCompaniesControl.clearValidators();
    insuranceCompaniesControl.updateValueAndValidity();
  }

  private clearInsuranceTypeValidation(): void {
    const insuranceTypeControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('insuranceTypeId');
    insuranceTypeControl.clearValidators();
    insuranceTypeControl.updateValueAndValidity();
  }

  private clearNameOnCardValidation(): void {
    const nameOnCardControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AccountForm)
      .get('nameOnCard');
    nameOnCardControl.clearValidators();
    nameOnCardControl.updateValueAndValidity();
  }

  private clearNewInstantCardFieldsValidation(): void {
    const cardNumberControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AccountForm)
      .get('cardNumber');
    const cardAccountControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AccountForm)
      .get('cardAccNum');

    cardNumberControl.clearValidators();
    cardAccountControl.clearValidators();

    cardNumberControl.updateValueAndValidity();
    cardAccountControl.updateValueAndValidity();
  }

  private clearFamilyInfoValidation(): void {
    const maritalStatusControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.FamilyInfo)
      .get('maritalStatusId');

    maritalStatusControl.clearValidators();
    maritalStatusControl.updateValueAndValidity();
  }

  private clearAdditionalParametersValidation(): void {
    const additionalParametersGroup: FormGroup = this.finalDecForm.get(
      FinalDecisionGroupKeys.AdditionalParameters
    ) as FormGroup;

    Object.keys(additionalParametersGroup.controls).forEach((control: string) => {
      additionalParametersGroup.get(control).clearValidators();
      additionalParametersGroup.get(control).updateValueAndValidity();
    });
  }

  private setInsuranceProductNameValidation(): void {
    const insuranceProductNameControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('productName');
    insuranceProductNameControl.setValidators([Validators.required]);
    insuranceProductNameControl.updateValueAndValidity();
  }

  private setInsuranceCompaniesValidation(): void {
    const insuranceCompaniesControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('companyName');
    insuranceCompaniesControl.setValidators([Validators.required]);
    insuranceCompaniesControl.updateValueAndValidity();
  }

  private setInsuranceTypeValidation(): void {
    const insuranceTypeControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.Insurance)
      .get('insuranceTypeId');
    insuranceTypeControl.setValidators([Validators.required]);
    insuranceTypeControl.updateValueAndValidity();
  }

  private setNameOnCardValidation(): void {
    const nameOnCardControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AccountForm)
      .get('nameOnCard');
    nameOnCardControl.setValidators([Validators.required]);
    nameOnCardControl.updateValueAndValidity();
  }

  private setNewInstantCardFieldsValidation(): void {
    const cardNumberControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AccountForm)
      .get('cardNumber');
    const cardAccountControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.AccountForm)
      .get('cardAccNum');

    cardNumberControl.setValidators([Validators.required]);
    cardAccountControl.setValidators([Validators.required]);

    cardNumberControl.updateValueAndValidity();
    cardAccountControl.updateValueAndValidity();
  }

  private setFamilyInfoValidation(): void {
    const maritalStatusControl: AbstractControl = this.finalDecForm
      .get(FinalDecisionGroupKeys.FamilyInfo)
      .get('maritalStatusId');
    maritalStatusControl.setValidators([Validators.required]);
    maritalStatusControl.updateValueAndValidity();
  }

  private setAdditionalParametersValidation(): void {
    const additionalParametersGroup: FormGroup = this.finalDecForm.get(
      FinalDecisionGroupKeys.AdditionalParameters
    ) as FormGroup;

    Object.keys(additionalParametersGroup.controls).forEach((control: string) => {
      additionalParametersGroup.get(control).setValidators([Validators.required]);
      additionalParametersGroup.get(control).updateValueAndValidity();
    });

    if (!this.isVisibleSecondPaymentDay) {
      additionalParametersGroup.get('secondPaymentDay').clearValidators();
      additionalParametersGroup.get('secondPaymentDay').updateValueAndValidity();
    }
  }

  private setSetSecondPaymentDayVisibility(): void {
    let scheduleFrequency: Dir;
    const frequencyCode = '002';

    const additionalParametersGroup: FormGroup = this.finalDecForm.get(
      FinalDecisionGroupKeys.AdditionalParameters
    ) as FormGroup;

    const frequencyControl: AbstractControl = additionalParametersGroup.get('dirScheduleFrequencyId');
    const secondPaymentDayControl: AbstractControl = additionalParametersGroup.get('secondPaymentDay');

    scheduleFrequency = (this.optionsList[OptionListNames.ScheduleFrequencies] as Dir[]).find(
      (frequency: Dir) => frequency.code === frequencyCode
    );

    if (!!scheduleFrequency) {
      this.isVisibleSecondPaymentDay = frequencyControl.value === scheduleFrequency.id;
    }

    frequencyControl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
      if (!!scheduleFrequency && value === scheduleFrequency.id) {
        this.isVisibleSecondPaymentDay = true;
        secondPaymentDayControl.setValidators(Validators.required);
      } else {
        this.isVisibleSecondPaymentDay = false;
        secondPaymentDayControl.reset();
        secondPaymentDayControl.clearValidators();
      }

      secondPaymentDayControl.updateValueAndValidity();
    });
  }

  private setFinalMatrixData(): void {
    if (!!this.appDto && !!this.appDto.finalCreditInfo) {
      this.showSuspensiveConditionsTable = true;

      const matrix = { ...this.appDto.finalCreditInfo } as any;

      const finalCreditInfo = this.setTotUpsNaming([matrix])[0] as any;
      finalCreditInfo.maxLimit = finalCreditInfo.maxLimit || finalCreditInfo.creditAmount;

      const remappedMatrix = this.setMatrixTerms([finalCreditInfo] as any[]);

      this.approvedCreditConditionsData = new TableData(CREDIT_INFO_NAME_PROPS, remappedMatrix);

      const control = this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).get('dirScheduleFrequency');
      control.setValue(
        this.appDto.finalCreditInfo.dirScheduleFrequency ? this.appDto.finalCreditInfo.dirScheduleFrequency.id : null
      );
    }
  }

  private navigateToDashboard(): void {
    this.routerURLService.navigateToDashboard();
  }

  /* ------ CREATE FORM ------ */

  private createForm(): void {
    this.finalDecForm = this.formBuilder.group({});
    this.createCalculatorForm();
    this.createGraceInterestForm();
    this.createAdditionalParametersForm();
    this.createFamilyInfoForm();
    this.createAccountForm();
    this.createInsuranceForm();
  }

  private createAccountForm(): void {
    const accountForm: FormGroup = this.formGroupService.createForm(
      this.accountIssuePost,
      this.accountFormConfig,
      null
    );
    this.finalDecForm.addControl(FinalDecisionGroupKeys.AccountForm, accountForm);
  }

  private createCalculatorForm(): void {
    this.appDto.isInsuranceAccidentValue = this.setInsuranceAccident(this.appDto.isInsuranceAccident);
    const calculateControls: FormGroup = this.formGroupService.createForm(this.appDto, this.calculateFormConfig, null);
    this.finalDecForm.addControl(FinalDecisionGroupKeys.Calculator, calculateControls);

    // Object.keys(calculateControls.controls)
    //   .filter(
    //     (control: string) =>
    //       control === 'preapproveCalcCreditSum' || control === 'preapproveCalcCreditTerm'
    //   )
    //   .forEach((control: string) =>
    //     this.setCustomValidatorToControl(
    //       calculateControls,
    //       control,
    //       '^(?!$)\\d{0,8}(?:\\.\\d{1,2})?$',
    //       InputErrorKeys.Double
    //     )
    //   );

    this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).disable();
  }

  private createGraceInterestForm(): void {
    const graceInterestControl: FormGroup = this.formGroupService.createForm(
      this.appDto.finalCreditInfo,
      this.graceInterestConfig,
      this.optionsList
    );

    this.finalDecForm.addControl(FinalDecisionGroupKeys.GraceInterest, graceInterestControl);
  }

  private createAdditionalParametersForm(): void {
    const additionalParametersControls: FormGroup = this.formGroupService.createForm(
      this.appDto.finalCreditInfo,
      this.additionalParametersConfig,
      this.optionsList
    );

    this.finalDecForm.addControl(FinalDecisionGroupKeys.AdditionalParameters, additionalParametersControls);
    this.finalDecForm.get(FinalDecisionGroupKeys.AdditionalParameters).disable();
  }

  private createFamilyInfoForm(): void {
    const familyInfoControls: FormGroup = this.formGroupService.createForm(
      this.appDto.applicant,
      this.familyInfoFormConfig,
      this.optionsList
    );

    this.finalDecForm.addControl(FinalDecisionGroupKeys.FamilyInfo, familyInfoControls);
  }

  private createInsuranceForm(): void {
    const insuranceControls: FormGroup = this.formGroupService.createForm(
      this.appDto,
      this.insuranceFormConfig,
      this.optionsList
    );

    const newAccountFormControls: FormGroup = this.formGroupService.createForm(
      this.appDto.insuranceInfo,
      this.newAccountFormConfig,
      this.optionsList
    );

    this.finalDecForm.addControl(FinalDecisionGroupKeys.Insurance, insuranceControls);
    this.finalDecForm.addControl(FinalDecisionGroupKeys.NewAccount, newAccountFormControls);
    this.newAccountForm.disable();
    this.newAccount.valueChanges
      .pipe(
        tap(val => {
          if (!val) {
            if (this.newAccountForm) {
              this.newAccountForm.reset();
              this.newAccountForm.disable();
            }
          } else {
            this.chosenCard = null;
            this.newAccountForm.enable();
            this.chosenAccountData = new TableData(CHOSEN_ACCOUNT_HEADERS, []);
          }
          this.setValidatorsToNewAccount();
        })
      )
      .subscribe();

    this.newAccountForm
      .get('dirAccountTypeId')
      .valueChanges.pipe(tap(this.changeAcTypeForm))
      .subscribe();
    // this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).disable();

    if (!this.appDto.applicant.codeAbs) {
      setTimeout(() => {
        this.newAccount.setValue(true);
      });
    }
  }

  private changeAcTypeForm = (type: number): void => {

    const isBank = type === 1;

    if (type) {
      const option = { emitEvent: false };
      const bank = ['dirAccountTypeId', 'dirCurrencyId', 'isMarketing'];
      const card = ['dirAccountTypeId', 'dirPaymentCardId', 'dirFeeTermTypeId', 'isMarketing'];

      this.newAccountFormConfig.forEach(control => {
        if (type) {
          control.isVisible = isBank ? bank.includes(control.code) : card.includes(control.code);
          control.required = isBank ? bank.includes(control.code) : card.includes(control.code);
        }
      });



      this.newAccountFormConfig.forEach(control => {
        if (control.isVisible) {

          this.newAccountForm.get(control.code).setValidators([Validators.required]);
        } else {
          this.newAccountForm.get(control.code).clearValidators();
          //this.newAccountForm.get(control.code).disable(option);
        }
        this.newAccountForm.get(control.code).updateValueAndValidity(option);
      });

    }

    if(isBank) {
      const currencyId = this.finalProduct.length
        ? this.finalProduct[0].dirCurrency.id
        : this.theSelectedProductDir
          ? this.theSelectedProductDir.dirCurrency.id
          : null;

      this.setCurrencyToAccount(currencyId);
    }

  };

  private resetControlValue(formName: string, controlName: string) {
    this.finalDecForm
      .get(formName)
      .get(controlName)
      .reset();
  }

  private setControlValue(formName: string, controlName: string, value: string | number) {
    this.finalDecForm
      .get(formName)
      .get(controlName)
      .setValue(value);
  }

  private getDirectories(): void {
    combineLatest([
      this.suspensiveConditionsTypeService.getSuspensiveConditionsTypes(),
      this.maritalStatuses$,
      this.dirScheduleTypes$,
      this.dirScheduleFrequency$,
      this.dirEnsureType$,
      this.dirIssueType$,
      this.relationships$,
      this.declineReasons$,
      this.insuranceType$,
      this.currencies$,
      this.products$,
      this.communicationTypeControllerService.getCommunicationMethods(),
      this.accountService.getAccountTypes(),
      this.accountService.getFeeTermType(),
      this.paymentCards$,
      this.dirBankControllerService.getList()
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([
           suspensiveConditionsTypes,
           maritalStatuses,
           scheduleTypes,
           scheduleFrequencies,
           ensureTypes,
           issueTypes,
           relationships,
           declineReasons,
           insuranceType,
           currencies,
           products,
           communicationMethods,
           accountTypes,
           feeTermTypes,
           paymentCards,
           branches
         ]) => {
          this.optionsList = {};
          this.optionsList[OptionListNames.SuspensiveConditionsTypes] = getOnlyActiveItems<DirAbsCode>(
            suspensiveConditionsTypes
          );
          this.optionsList[OptionListNames.MaritalStatuses] = maritalStatuses || null;
          this.optionsList[OptionListNames.ScheduleTypes] = getOnlyActiveItems<DirAbsCode>(scheduleTypes);
          this.optionsList[OptionListNames.ScheduleFrequencies] = getOnlyActiveItems<Dir>(scheduleFrequencies);
          this.optionsList[OptionListNames.IssueTypes] = getOnlyActiveItems<Dir>(issueTypes);
          this.optionsList[OptionListNames.EnsureTypes] = getOnlyActiveItems<Dir>(ensureTypes);
          this.optionsList[OptionListNames.Relationships] = getOnlyActiveItems<Dir>(relationships);
          this.optionsList[OptionListNames.DeclineReasons] = getOnlyActiveItems<Dir>(declineReasons);
          this.optionsList[OptionListNames.Currencies] = getOnlyActiveItems<Dir>(currencies);
          this.dirInsuranceType = getOnlyActiveItems<DirAbsCode>(insuranceType);
          this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductDto>(products);
          this.optionsList[OptionListNames.AccountType] = accountTypes;
          this.optionsList[OptionListNames.FeeTermType] = feeTermTypes;
          this.optionsList[OptionListNames.PaymentCards] = paymentCards;
          this.optionsList[OptionListNames.YesOrNoTypes] = YES_NO_TYPES;
          this.optionsList[OptionListNames.CommunicationAddressType] = CommunicationAddressOptions;
          this.setCommunicationsSelects(communicationMethods);
          this.optionsList[OptionListNames.Branches] = branches;

          if (branches.length) {
            this.suspensiveConditionsValidationService.setSuspensiveConditionsConfig(
              this.suspensiveConditionsTableHeaders,
              this.optionsList[OptionListNames.Branches]
            );
          }
        }
      );
  }

  /* ------ END CREATE FORM ------ */

  /* ------ MATRIX ------ */

  private transformMatrixDtoIntoMatrix(matrix: BRMSFinalMatrixDto): BRMSFinalMatrixDto {
    this.setIndividualCalculatorValueToMatrix('rateParam', matrix);
    this.setIndividualCalculatorValueToMatrix('issueFeeParam', matrix);
    this.setIndividualCalculatorValueToMatrix('overpayPrepaymentRateParam', matrix);

    const assignObj = Object.assign({}, matrix);
    const refObj: RefAcbLiabilityId = this.transformFromLiabilityToLiabilityId(assignObj);
    this.deleteRefLiabilityKeys(assignObj);

    return {
      ...assignObj,
      ...refObj,
      creditSum: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('creditSum').value,
      creditTerm: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('creditTerm').value,
      gracePeriod: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('gracePeriod').value
      // rateParam: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('rateParam').value,
      // issueFee: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('issueFee').value,
      // overpayPrepaymentRate: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('overpayPrepaymentRate').value
    };
  }

  private transformFromLiabilityToLiabilityId(matrix: BRMSFinalMatrixDto): RefAcbLiabilityId {
    return new RefAcbLiabilityId(matrix);
  }

  private deleteRefLiabilityKeys(obj: any): void {
    delete obj.ref1AcbLiability;
    delete obj.ref2AcbLiability;
    delete obj.ref3AcbLiability;
    delete obj.ref4AcbLiability;
    delete obj.ref5AcbLiability;
    delete obj.ref6AcbLiability;
    delete obj.ref7AcbLiability;
    delete obj.ref8AcbLiability;
    delete obj.ref9AcbLiability;
    delete obj.ref10AcbLiability;
  }

  private isNotNullMatrixExist(matrix: BRMSFinalMatrixDto): boolean {
    const calculatedMatrix = this.getTransformedMatrix(matrix);
    let isExist = false;

    for (const key of Object.keys(calculatedMatrix)) {
      if (!!calculatedMatrix[key]) {
        isExist = true;
      }
    }
    return !!isExist;
  }

  private getTransformedMatrix(matrix: BRMSFinalMatrixDto): RefAcbLiability {
    return new RefAcbLiability(matrix);
  }

  private setNotNullMatrixArr(matrix: BRMSFinalMatrixDto) {
    const calculatedMatrix: RefAcbLiability = this.getTransformedMatrix(matrix);
    const calculatedArrNotNull = [];

    for (const key of Object.keys(calculatedMatrix)) {
      if (!!calculatedMatrix[key]) {
        calculatedArrNotNull.push({
          ...calculatedMatrix[key],
          refNumber: key
        });
      }
    }

    return calculatedArrNotNull;
  }

  private calcRefinanceList(arr: AcbLiabilityDto[]): BRMSFinalMatrixDto {
    let assignObj: BRMSFinalMatrixDto = Object.assign({}, this.chosenMatrix);
    this.deleteRefLiabilityKeys(assignObj);

    assignObj = Object.assign(assignObj, this.getTransformedMatrix(assignObj));

    arr.forEach((elem: AcbLiabilityDto) => {
      if (elem.refNumber && elem.selected) {
        assignObj[elem.refNumber] = elem;
      }
    });

    const refObj: RefAcbLiabilityId = this.transformFromLiabilityToLiabilityId(assignObj);
    this.deleteRefLiabilityKeys(assignObj);

    return {
      ...assignObj,
      ...refObj,
      creditSum: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('creditSum').value,
      creditTerm: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('creditTerm').value,
      gracePeriod: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('gracePeriod').value
    } as BRMSFinalMatrixDto;
  }

  private setCommunicationsSelects = (methods: DirCommunicationMethod[]): void => {
    this.optionsList[OptionListNames.CommunicationMethodsBank] = methods.filter(
      el => (el.dirCommunicationMethodType.id as any) === CommunicationType.BANK
    );
    this.optionsList[OptionListNames.CommunicationMethodsConnect] = methods.filter(
      el => (el.dirCommunicationMethodType.id as any) === CommunicationType.STATEMENT
    );
  };

  private getCardPrintForm(data: PrintFormModalEmit): void {
    if (this.isNewCardOrderChecked) {
      const cardApplicationDto: FilledCardApplicationDto = this.prepareCardAppDto();

      this.printingFormService
        .getFilledCardPrintingForm(this.appDto.id, cardApplicationDto)
        .pipe(
          catchError(err => {
            this.isLoading = false;
            return throwError(err);
          }),
          untilDestroyed(this)
        )
        .subscribe(res => {
          this.fileService.downloadFile(res, `${data.form.name}.docx`);
          this.isLoading = false;
        });
      return;
    }

    this.isLoading = false;
    this.toastService.viewMsg(
      'Скачать форму Заявление на выпуск карты, можно после заполнения данных для новой карты',
      'warning'
    );
    return;
  }

  private prepareCardAppDto(): FilledCardApplicationDto {
    const cardInfo: Partial<AccountIssueGetDto> = this.finalDecForm.getRawValue().newCardForm;
    const cardTermOption: ICardTermOption = this.cardTermOptions.find(
      (item: ICardTermOption) => item.id === cardInfo.cardTerm
    );
    const cardTypeOption: DirectoryVal = this.paymentCards.find(
      (item: DirectoryVal) => item.id === cardInfo.dirPaymentCardId
    );
    cardInfo.cardTerm = cardTermOption ? cardTermOption.value : null;
    cardInfo.paymentCardType = cardTypeOption ? cardTypeOption.value : null;

    /* currency = null || 'AZE'; на сервере есть проверка на null, но
      если валюта карты будет изменяться, то нужно определить источник, откуда нужно брать значение валюты
   */
    return new FilledCardApplicationDto(
      cardInfo.cardTerm,
      cardInfo.paymentCardType,
      cardInfo.codeword,
      null,
      cardInfo.isUrgentCard,
      cardInfo.nameOnCard,
      cardInfo.surnameOnCard
    );
  }

  private getPrintForm(data: PrintFormModalEmit): void {
    const agreementFormParams: PrintingFormDownloadRq = new PrintingFormDownloadRq(this.appDto.id, data.form.code);
    this.printingFormService.fillExternal(agreementFormParams);
  }

  private transformAccountIssueData(accountIssue: AccountIssueGetDto) {
    if (accountIssue) {
      this.accountIssuePost = new AccountIssuePostDto(accountIssue);
      this.newAccount.setValue(accountIssue.isNewAccOrder);
      if (accountIssue.isNewAccOrder) {
        accountIssue.isMarketing = this.setIsMarketing(accountIssue.isMarketing);
        this.newAccountForm.setValue({
          dirAccountTypeId: accountIssue.dirAccountType ? accountIssue.dirAccountType.id : null,
          dirCurrencyId: accountIssue.dirCurrency ? accountIssue.dirCurrency.id : null,
          isMarketing: accountIssue.isMarketing,
          dirPaymentCardId: accountIssue.dirPaymentCard ? accountIssue.dirPaymentCard.id : null,
          dirFeeTermTypeId: accountIssue.dirFeeTermType ? accountIssue.dirFeeTermType.id : null
        });
      } else {
        this.setInitialChosenAccountData();
      }
    }
  }

  private transformApplicantContactPersons(applicantContactPersons: ApplicantContactPerson[]) {
    if (applicantContactPersons) {
      this.applicantContactPersonsDto = applicantContactPersons.map(
        (item: ApplicantContactPerson) => new ApplicantContactPersonDto(item)
      );
    }
  }

  private onCommentClick() {
    this.appCommonRequestService.onCommentClick(this.readonlyForm);
  }

  private resetChosenAccountTable(flag: boolean): void {
    if (flag) {
      this.chosenCard = null;
      this.chosenAccountData = new TableData(CHOSEN_ACCOUNT_HEADERS, []);
    }
  }

  private getPreApprovedMatrix(isWithRef: boolean) {
    this.isWithRef = isWithRef;
    this.brms2MatrixService
      .getMatrix(this.appDto.id.toString())
      .pipe(
        map(this.setTotUpsNaming),
        untilDestroyed(this)
      )
      .subscribe((matrix: BRMSMatrixDto[]) => {
        this.approvedMatrix = this.setMatrixTerms(matrix);
        this.approvedCreditConditionsColInfoData = new TableData(POSSIBLE_CREDIT_PROPS, matrix);
      });
  }

  private setMatrixTerms = (matrix: BRMSMatrixDto[]): BRMSMatrixDto[] => {
    return matrix.map(el => {
      const term =
        el.productCondition && el.productCondition.dirLoanTermType ? el.productCondition.dirLoanTermType : null;
      el.creditTermWithType = el.creditTerm + ` ${!!term ? `(${term.nameRu})` : 'мес.'}`;
      el.creditTermWithTypeAm = el.creditTerm + ` ${!!term ? `(${term.nameAm})` : '(ամիս)'}`;
      return el;
    });
  };

  private transformApplicantLoanObj(applicantLoan?: ApplicantLoanDto[], applicantLoanFilters?: any) {
    this.applicantObligationsDto = [];
    this.applicantObligationsDtoWithTypes = [];

    // if (applicantLoan) {
    //   applicantLoan.forEach((item: ApplicantLoanDto) => {
    //     this.applicantObligationsDto.push(new ApplicantLoanDto(item));
    //   });

    if (applicantLoan) {
      applicantLoan.forEach((item: ApplicantLoanDto) => {
        const depositList = item.pledgeList && item.pledgeList.length > 0 ? item.pledgeList : [];

        item.maturityDateRemap = item.maturityDate;
        item.dateOfLastRepaymentRemap = item.dateOfLastRepayment;
        item.issueDateRemap = item.issueDate;
        this.applicantObligationsDto.push(new ApplicantLoanDto(item));
      });
    }
    const applicantLoanDtoMap: any[] = this.applicantObligationsDto.map(el => {
      return {
        ...el,
        creditSubclassRemapRu: el.source === 'ABS' ? el.creditSubclassAbsName : el.creditSubclassRu,
        creditSubclassRemapAm: el.source === 'ABS' ? el.creditSubclassAm : el.creditSubclassAm,
        worstRiskClassRemapRu: el.source === 'ABS' ? el.worstRiskClassAbsName : el.worstRiskClassRu,
        worstRiskClassRemapAm: el.source === 'ABS' ? el.worstRiskClassAm : el.worstRiskClassAm,

        isCreditLine: el.isCreditLine
          ? this.translateService.instant(BooleanFilterType.YES)
          : this.translateService.instant(BooleanFilterType.NO),
        isKPZZ: el.isKPZZ
          ? this.translateService.instant(BooleanFilterType.YES)
          : this.translateService.instant(BooleanFilterType.NO)
      };
    });

    if (
      this.applicantObligationsTableHeaders.tableContentList &&
      !this.applicantObligationsTableHeaders.tableContentList.length
    ) {
      this.applicantObligationsTableHeaders = new TableData(
        APPLICANT_LOAN_TABLE_HEADERS,
        applicantLoanDtoMap,
        applicantLoanFilters
      );
    }

    this.applicantObligationsDtoWithTypes = this.applicantObligationsDto.filter(el => !!el.typeId);
    this.suspensiveConditionsValidationService.updateObligationsList(this.applicantObligationsDtoWithTypes);
  }

  private updateChosenCreditInfo(finalMatrix: BRMSMatrixDto): void {
    let formValues = {};
    if (finalMatrix) {
      formValues = {
        creditAmount: finalMatrix.maxLimit,
        monthlyPayment: finalMatrix.maxAnnPayment,
        productId: finalMatrix.product.id,
        dirCurrencyId: finalMatrix.dirCurrency.id,
        brmsMatrixId: finalMatrix.id
      };
    }
    const credit = new CreditInfoDto({
      ...finalMatrix,
      id: null,
      brmsMatrix: finalMatrix,
      ...(formValues as any)
    });

    if (finalMatrix && finalMatrix.id) {
      this.creditInfoControllerService
        .updateCreditInfo(
          {
            ...finalMatrix,
            ...credit
          },
          this.appDto.id,
          this.appDto.stage.id
        )
        .pipe()
        .subscribe();
    }
  }

  private fireAcceptApp = (): void => {
    this.isLoading = true;
    this.applicationControllerService
      .acceptApp(this.appDto.id.toString(), this.language)
      .pipe(
        tap((res: any) => {
          if (!res) {
            this.toastService.viewMsg('SuccessMessage.SentForProcessing', 'success');
            this.navigateToDashboard();
          } else {
            this.toastService.viewMsg(res.message, 'warning');
            this.getCommunications();
          }
          this.isLoading = false;
        }),
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe();
  };

  private saveCommunication = () => {
    const data: CommunicationPostDto = {
      communications: []
    };
    for (const owner in this.communicationObject) {
      for (const type in this.communicationObject[owner]) {
        const communication = this.communicationObject[owner][type];
        if (communication) {
          const cleanedCommunication = { ...communication };

          if ([3, 6].includes(communication.dirCommunicationMethodId)) {
            cleanedCommunication.value = this.cleanPhoneNumber(communication.value);
          } else {
            cleanedCommunication.value = communication.value;
          }

          data.communications.push(cleanedCommunication);
        }
      }
    }

    return this.communicationTypeControllerService.saveCommunication(data);
  };

  private remapCommunication = (data: Communication): CommunicationDto => {
    if (!data) return null;

    const value = [3, 6].includes(data.dirCommunicationMethod.id)
      ? this.cleanPhoneNumber(data.value)
      : data.value;

    return {
      id: data.id,
      dirCommunicationMethodOwnerId: data.dirCommunicationMethodOwner.id,
      value: value,
      addressType: data.addressType,
      applicationId: data.applicationId,
      dirCommunicationMethodId: data.dirCommunicationMethod.id
    } as any;
  };

  private getAccountData() {
    this.absExpenseSettingControllerService
      .getAbsAccounts(this.appDto.id, this.appDto.applicant.id)
      .pipe(
        tap(data => {
          if (data && data.length) {
            this.selectingCardAccountData = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, data);
          } else {
            this.newAccount.setValue(this.accountIssue.isNewAccOrder);
            this.setInitialChosenAccountData();
          }
        })
      )
      .subscribe();
  }

  private setValidatorsToNewAccount = () => {
    const option = { emitEvent: false };

    if (this.isNewAccount) {
      Object.keys(this.newAccountForm.controls).forEach((control: string) => {
        this.newAccountForm.get(control).setValidators([Validators.required]);
        this.newAccountForm.get(control).updateValueAndValidity(option);
      });
    } else {
      Object.keys(this.newAccountForm.controls).forEach((control: string) => {
        this.newAccountForm.get(control).clearValidators();
        this.newAccountForm.get(control).updateValueAndValidity(option);
      });
    }
  };

  private setInsuranceAccident = (flag: boolean): number => {
    if (flag !== null) {
      return flag ? 1 : 2;
    } else {
      return null;
    }
  };

  private validateChoosenCard = () => {
    if (!this.isNewAccount) {
      if (this.chosenCard && this.chosenCard.accountType) {
        return true;
      } else {
        this.toastService.viewMsg('ErrorMessage.NoAccount', 'warning');
        return false;
      }
    }
    return true;
  };

  private validateCreditCode = () => {
    if (this.applicantObligationsDtoWithTypes.length) {
      const isAllFilled = this.applicantObligationsDtoWithTypes.every(
        e =>
          !_.isEmpty(trimmer(e.creditCode)) ||
          !_.isEmpty(trimmer(e.loanAgreementNumber)) ||
          !_.isEmpty(trimmer(e.clientAccount)) ||
          !_.isEmpty(trimmer(e.accountYKO))
      );

      if (!isAllFilled) {
        this.suspensiveConditionsListFilteredScroll = true;
        this.toastService.viewMsg('ErrorMessage.SuspensiveConditionsError', 'warning');
        return false;
      }

      const isAllPassed = this.applicantObligationsDtoWithTypes.every(e => {
        if (e.creditorOrganizationIsBank) {
          return (
            !_.isEmpty(trimmer(e.creditCode)) ||
            (!_.isEmpty(trimmer(e.clientAccount)) && !_.isEmpty(trimmer(e.loanAgreementNumber)))
          );
        } else {
          return !_.isEmpty(trimmer(e.loanAgreementNumber)) && !_.isEmpty(trimmer(e.accountYKO));
        }
      });

      this.suspensiveConditionsListFilteredScroll = !(isAllPassed && isAllFilled);

      if (this.suspensiveConditionsListFilteredScroll) {
        setTimeout(() => {
          this.scrollToFirstInvalidField();
        });
        this.toastService.viewMsg('ErrorMessage.SuspensiveConditionsError', 'warning');
        return false;
      }
      return true;
    }
    return true;
  };

  private checkFirstPayDate = (firstPaymentDate: string, callBack: () => void): void => {
    this.absSearchClientControllerService
      .firstPay(this.appDto.id, firstPaymentDate)
      .pipe(
        tap(data => {
          if (data.message) {
            this.isLoading = false;
            const dialogRef = this.dialog.open(AbsFirstPayDateModalComponent, {
              height: 'auto',
              width: '40vw',
              data
            });
            (dialogRef.componentInstance as AbsFirstPayDateModalComponent).emitData
              .pipe(untilDestroyed(this))
              .subscribe(res => {
                this.checkFirstPayDate(res, callBack);
              });
          } else {
            this.isLoading = true;
            callBack();
          }
        })
      )
      .subscribe();
  };

  private setTotUpsNaming = (data: BRMSMatrixDto[]): BRMSMatrixDto[] => {
    return data.map(el => {
      this.setTopUpProductName(el);
      return el;
    });
  };

  private setTopUpProductName = (item: BRMSMatrixDto | CreditInfo | any): void => {
    if (
      item.isTopUp ||
      (item.topUps && item.topUps.length) ||
      (!!item.brmsMatrix && !!item.brmsMatrix.topUps && item.brmsMatrix.topUps.length)
    ) {
      item.product.nameRu += ' (Top Up)';
      item.product.nameAm += ' (Top Up)';
    }
  };

  private checkValidCommunication = (): boolean => {
    let result = true;
    for (const key in this.communicationObject) {
      if (this.communicationObject[key]) {
        const communication = this.communicationObject[key];
        if (key === CommunicationOwnerType.ACCOUNT && !this.isNewAccount) {
          break;
        }
        for (const communicationKey in communication) {
          if (communication[communicationKey]) {
            const communicationForm = communication[communicationKey];
            if (result && !communicationForm.isValidForm) {
              result = false;
            }
          }
        }
      }
    }
    return result;
  };

  private clearAndFetchApplicantLoan(callBack?: () => void) {
    this.applicantLoanControllerService
      .clearSuspensive(this.appDto.id)
      .pipe(
        tap(data => {
          this.transformApplicantLoanObj(data);
          this.setSuspensiveConditionsTable();
          if (callBack) {
            callBack();
          }
        })
      )
      .subscribe();
  }

  private setFinalProductInfoIfTopUp(matrix: BRMSMatrixDto) {
    if (this.matrixProcessDataService.isTopUp && matrix) {
      const topUp = matrix.topUps[0];
      matrix.creditTerm = topUp.creditTerm;
      matrix.rate = topUp.rate;
    }
  }

  private openHistoryPanel() {
    this.dialog.open(HistoryModalComponent, {
      width: '90vw',
      maxWidth: '90vw',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: { applicationId: this.appDto.id }
    });
  }

  private fetchApplicantLoanFiltered() {
    this.applicantLoanControllerService
      .applicantLoanFiltered(this.appDto.id)
      .pipe(
        tap(data => {
          this.transformApplicantLoanObj(data);
          this.setSuspensiveConditionsTable();
        })
      )
      .subscribe();
  }

  private setCurrencyToAccount(id: any) {
    const control = this.newAccountForm.get('dirCurrencyId');
    control.setValue(id, {emitEvent: false});
  }

  private setIsMarketing = (flag: boolean): number => {
    if (flag !== null) {
      return flag ? 1 : 2;
    } else {
      return null;
    }
  };

  private getIsMarketing = (val: number | any): boolean => {
    if (val !== null) {
      return val === 1;
    }
    return null;
  };
}
