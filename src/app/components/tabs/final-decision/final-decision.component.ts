import * as HEADERS from './constants/final-decision.constants';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AcbLiabilityDto,
  AccountDto,
  AccountIssueGetDto,
  AccountIssuePostDto,
  Application,
  ApplicationDto,
  CreditInfo,
  Dir,
  DirectoryVal,
  EInputType,
  EditableTableHeader,
  FilledCardApplicationDto,
  InsuranceCompany,
  InsuranceInfo,
  InsuranceInfoDto,
  PrintFormModalEmit,
  PrintingFormDto,
  StaticDirectory,
  TableData,
  OptionListNames,
  BaseFormField,
  DirAbsCode,
  ValueType,
  InsuranceProductFrontDto,
  ELocalNames,
  UserDto,
  CommentDto,
  IntegrationInterfaceDto,
  PrintingFormDownloadRq,
  ProductRes
} from '@app/_models';
import {
  AccountIssueControllerService,
  ApplicationControllerService,
  BrmsFinalMatrixFrontControllerService,
  InsuranceProductControllerService,
  PrintingFormControllerService
} from '@app/api';
import { ICardTermOption } from './constants/newCardForm';
import { BRMSFinalMatrixDto, RefAcbLiability, RefAcbLiabilityId } from '@app/_models/api-models/brms';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, combineLatest, forkJoin, of } from 'rxjs';
import { PrintFormsId } from '@app/constants/upload-document-id';
import { Store, select } from '@ngrx/store';
import { catchError, distinctUntilChanged, startWith, switchMap, take, pairwise } from 'rxjs/operators';

import { AdditionalPrintFormService } from '@app/services/additional-print-form.service';
import { ApplicantDto } from '@app/_models/api-models/applicant';
import { DeclineReasonModalComponent } from '@app/shared/modals/decline-reason-modal/decline-reason-modal.component';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { InsuranceInfoControllerService } from '@app/api/insurance-info-controller.service';
import { InsuranceService } from './services/insurance/insurance.service';
import { MatDialog } from '@angular/material';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { PrintFormModalComponent } from '@app/shared/modals/print-form-modal/print-form-modal.component';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { TABS_TITLES } from '@app/components/constants/tab-titles';
import { TabNames } from '@app/components/constants/tab-names';
import { ToastService } from '@app/services/toast.service';
import { ValidateTabsStateService } from '@app/services/validate-tabs-state.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { throwError } from 'rxjs/internal/observable/throwError';
import { FormGroupService } from '@app/services/form-group.service';
import {
  ACCOUNT_FORM,
  EAccountNameColumn,
  ADDITIONAL_PARAMETERS_CONFIG,
  CALCULATE_FORM_CONFIG,
  FAMILY_INFO_FORM_CONFIG,
  FINAL_DECISION_TITLES,
  FinalDecisionGroupKeys,
  GRACE_INTEREST,
  IInsuranceField,
  INSURANCE_FORM,
  EInsuranceFieldGroup
} from '@app/components/tabs/final-decision/constants/final-decision.config';
import { untilDestroyed } from '@app/core';
import {
  APPROVED_CREDIT_CONDITIONS_HEADERS,
  APPROVED_CREDIT_CONDITIONS_WITH_REF_HEADERS,
  CALCULATED_CREDIT_CONDITIONS_HEADERS,
  CHOSEN_ACCOUNT_HEADERS,
  SELECTING_ACCOUNT_HEADERS
} from './constants/final-decision.constants';
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
import { ELanguage } from '@app/constants/language';
import { ChatManagerVerificatorControllerService } from '@app/api/chat-manager-verificator-controller .service';
import Swal from "sweetalert2";

type Options =
  | StaticDirectory
  | Dir
  | InsuranceCompany
  | DirAbsCode
  | ProductToPaymentDay
  | MaritalStatus
  | InsuranceProductFrontDto;
type FinalProduct = CreditInfo | BRMSFinalMatrixDto;

@Component({
  selector: 'ng-final-decision',
  templateUrl: './final-decision.component.html',
  styleUrls: ['../../common-tabs-scss/final-decision-common.component.scss'],
  providers: [InsuranceService, TableDataProcessingService, MatrixUtilService]
})
export class FinalDecisionComponent implements OnChanges, OnInit, OnDestroy {
  finalDecForm: FormGroup;
  itemLimit: number = 20;
  totalCount: number = 0;
  footerConfigSource = 'common.finalDecision';

  FinalDecisionGroupKeys = FinalDecisionGroupKeys;
  titles: Record<string, string> = FINAL_DECISION_TITLES;
  calculateFormConfig: BaseFormField[] = CALCULATE_FORM_CONFIG;
  graceInterestConfig: BaseFormField[] = GRACE_INTEREST;
  additionalParametersConfig: BaseFormField[] = ADDITIONAL_PARAMETERS_CONFIG;
  familyInfoFormConfig: BaseFormField[] = FAMILY_INFO_FORM_CONFIG;
  accountFormConfig: BaseFormField[] = ACCOUNT_FORM;
  insuranceFormConfig: IInsuranceField[] = INSURANCE_FORM;

  isNewCardOrderChecked: boolean = false;
  isNewAccOrderChecked: boolean = false;
  isRefAcbLiabilityExists: boolean = false;
  isLoading: boolean = false;
  isAcceptButtonDisabled: boolean = true;
  isCalculateButtonDisabled: boolean = true;
  isChangesAccepted: boolean = false;
  isWithRef: boolean = false;
  isGraceInterest: boolean;
  isNewMessageExists: boolean = false;
  isVisibleSecondPaymentDay: boolean;
  isConsumerCredit: boolean;
  isCreditCard: boolean;
  isOverdraft: boolean;
  isNewInstantCardOrderChecked: boolean;
  isGamingUsage: boolean;
  isStandardSchedule: boolean;
  isCardOrOverdraftSchedule: boolean;
  isCalculate: boolean = false;

  contactPersonsTableHeaders: EditableTableHeader[] = HEADERS.CONTACT_PERSONS_HEADERS;
  chosenCreditInfoData: TableData<CreditInfo> = new TableData(HEADERS.CHOSEN_CREDIT_INFO_HEADERS, []);
  approvedCreditConditionsData: TableData<BRMSFinalMatrixDto> = new TableData(
    HEADERS.APPROVED_CREDIT_CONDITIONS_HEADERS,
    []
  );
  availableRefinancingOptionsData: TableData<AcbLiabilityDto> = new TableData(
    HEADERS.AVAILABLE_REFINANCING_OPTIONS_HEADERS,
    []
  );
  calculatedCreditConditionsData: TableData<BRMSFinalMatrixDto> = new TableData(
    HEADERS.CALCULATED_CREDIT_CONDITIONS_HEADERS,
    []
  );
  selectedCreditConditionsData: TableData<BRMSFinalMatrixDto | CreditInfo> = new TableData(
    HEADERS.SELECTED_CREDIT_TERMS_HEADERS,
    []
  );
  selectingCardAccountData: TableData<AccountDto> = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, []);
  selectingCurrentAccountData: TableData<AccountDto> = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, []);
  chosenAccountData: TableData<AccountDto> = new TableData(HEADERS.CHOSEN_ACCOUNT_HEADERS, []);

  insuranceProducts: InsuranceProductFrontDto[] = [];
  chosenRefinanceList: AcbLiabilityDto[] = [];
  chatManagerVerificatorList: CommentDto[];
  userData: UserDto;
  finalProduct: BRMSFinalMatrixDto[] = [];
  approvedMatrix: BRMSFinalMatrixDto[] = [];
  applicantContactPersonsDto: ApplicantContactPersonDto[];
  isWithProduct: number = null;

  accountIssuePost: AccountIssuePostDto;
  chosenCard: AccountDto;
  paymentCards: DirectoryVal[];
  cardTermOptions: ICardTermOption[] = [{ id: 1, name: '36', value: 36 }, { id: 2, name: '60', value: 60 }];
  insuranceInfoDto: InsuranceInfoDto;
  newCardForm: FormGroup;
  EInputType = EInputType;
  ValueType = ValueType;
  TabTitles = TABS_TITLES;
  ELocalNames = ELocalNames;

  optionsList: Record<string, Options[]> = {
    [OptionListNames.ScheduleTypes]: [],
    [OptionListNames.ScheduleFrequencies]: [],
    [OptionListNames.EnsureTypes]: [],
    [OptionListNames.IssueTypes]: [],
    [OptionListNames.ProductToPaymentDay]: [],
    [OptionListNames.MaritalStatuses]: [],
    [OptionListNames.Relationships]: [],
    [OptionListNames.InsuranceProduct]: [],
    [OptionListNames.InsuranceCompanies]: [],
    [OptionListNames.InsuranceProductName]: [],
    [OptionListNames.DeclineReasons]: [],
    [OptionListNames.Currencies]: [],
    [OptionListNames.DeclineReasons]: [],
    [OptionListNames.Product]: []
  };

  @Input() appDto: Application;
  @Input() readonlyForm: boolean = false;
  @Input() integrationInterface: IntegrationInterfaceDto;
  @Input() accountIssue: AccountIssueGetDto;
  @Input() applicantContactPersons: ApplicantContactPerson[] = [];
  @Input() language: string;

  private isAdditionalParametersValidation$: Subject<boolean> = new Subject();
  private isFamilyInfoValidation$: Subject<boolean> = new Subject<boolean>();
  private isNewInstantCardFieldsValidation$: Subject<boolean> = new Subject<boolean>();
  private isNameOnCardValidation$: Subject<boolean> = new Subject<boolean>();
  private isInsuranceTypedValidation$: Subject<boolean> = new Subject<boolean>();
  private isInsuranceCompaniesValidation$: Subject<boolean> = new Subject<boolean>();
  private isInsuranceProductNameValidation$: Subject<boolean> = new Subject<boolean>();

  private isAmlTabValid: boolean;
  private chosenMatrix: BRMSFinalMatrixDto;

  private selectUserData$ = this._store.pipe(select(selectUserData));
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
  private dirInsuranceType: DirAbsCode[] = [];
  private selectedDeclineReasonId: number;

  private CARD_ACCOUNT_TYPE: string = '200';
  private ACCOUNT_TYPE: string = '100';

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
    private formGroupService: FormGroupService<any, Options>,
    private creditInfoControllerService: CreditInfoControllerService,
    private applicantControllerService: ApplicantControllerService,
    private tableDataProcessingService: TableDataProcessingService,
    private chatManagerVerificatorService: ChatManagerVerificatorControllerService,
    private insuranceProductControllerService: InsuranceProductControllerService,
    private matrixUtilService: MatrixUtilService,
    private credentialsService: CredentialsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.language) {
      this.fillCurrentAccountsTable();
      this.fillChosenAccountTable(this.chosenCard);
    }
  }

  ngOnInit(): void {
    this.createTabValidationSubscription();
    this.transformAccountIssueData(this.accountIssue);
    this.transformApplicantContactPersons(this.applicantContactPersons);
    this.transformInsuranceInfoData(this.appDto.insuranceInfo);
    this.setChosenCreditInfoData();
    this.setFinalMatrixData();
    this.getDirectories();
    this.setInitialChosenAccountData();
    this.setProductToPaymentOptions(this.appDto.finalCreditInfo);
    this.createForm();
    this.setSelectedCreditConditionsData();
    this.setSetSecondPaymentDayVisibility();
    this.setValidationsSub();
    this.setChatInfo();
    this.checkOnReadonly();
  }

  ngOnDestroy(): void {}

  private checkOnReadonly(): void {
    if (this.readonlyForm) {
      this.finalDecForm.disable();
    }
  }

  private setChatInfo() {
    this.chatManagerVerificatorService
      .getAllByApplicationId(this.appDto.id.toString())
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        res.sort(function(a, b) {
          // @ts-ignore
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
        this.chatManagerVerificatorList = res;
      });

    this.isNewMessageExists = this.appDto.newMessageULChat;
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
    if (this.isAccounts && !!this.accountIssuePost) {
      if (
        this.accountIssuePost.absCardDisburseAccountId &&
        !this.isNewCardOrderChecked &&
        !this.isNewInstantCardOrderChecked
      ) {
        this.chosenCard = this.integrationInterface.absClientInfoResponseDto.accounts.find(
          (account: AccountDto) =>
            account.type === this.CARD_ACCOUNT_TYPE &&
            account.absId === this.accountIssuePost.absCardDisburseAccountId &&
            account.currency === this.accountIssuePost.dirCurrencyId
        );
      }

      if (this.accountIssuePost.absDisburseAccountId && !this.isNewAccOrderChecked) {
        this.chosenCard = this.integrationInterface.absClientInfoResponseDto.accounts.find(
          (account: AccountDto) =>
            account.type === this.ACCOUNT_TYPE &&
            account.absId === this.accountIssuePost.absDisburseAccountId &&
            account.currency === this.accountIssuePost.dirCurrencyId
        );
      }

      this.fillChosenAccountTable(this.chosenCard);
    }
  }

  private setProductToPaymentOptions(product: FinalProduct): void {
    if (!!product && !!product.product) {
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

  private defineProductType(creditInfo: FinalProduct): void {
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

  private fillAccountTablesAccordingToProduct(): void {
    if (this.isConsumerCredit) {
      this.setConsumerCreditData();
    }

    if (this.isCreditCard) {
      this.setCreditCardData();
    }

    if (this.isOverdraft) {
      this.setOverdraftData();
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
    let currentAccounts: AccountDto[] = this.integrationInterface.absClientInfoResponseDto.accounts.filter(
      (account: AccountDto) => account.type === this.ACCOUNT_TYPE && !account.isCreditCard && !account.isSalaryCard
    );

    if (currentAccounts.length) {
      currentAccounts = currentAccounts.map((account: AccountDto) => {
        if (
          !account.descriptionEn ||
          account.descriptionEn === EAccountNameColumn.GE ||
          account.descriptionEn === EAccountNameColumn.RU
        ) {
          account.descriptionEn = this.language === ELanguage.Ge ? EAccountNameColumn.GE : EAccountNameColumn.RU;
        }

        return { ...account };
      });

      this.selectingCurrentAccountData = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, currentAccounts);
    }
  }

  private fillChosenAccountTable(account: AccountDto): void {
    if (account) {
      if (
        !account.descriptionEn ||
        account.descriptionEn === EAccountNameColumn.GE ||
        account.descriptionEn === EAccountNameColumn.RU
      ) {
        account.descriptionEn = this.language === ELanguage.Ge ? EAccountNameColumn.GE : EAccountNameColumn.RU;
      }
      this.chosenAccountData = new TableData(CHOSEN_ACCOUNT_HEADERS, [account]);
    }
  }

  private setConsumerCreditData(): void {
    if (this.isAccounts) {
      this.fillCardAccountsTable();
      this.fillCurrentAccountsTable();
    }
  }

  private setCreditCardData(): void {
    if (this.isAccounts) {
      const accounts: AccountDto[] = this.integrationInterface.absClientInfoResponseDto.accounts.filter(
        (account: AccountDto) => account.type === this.CARD_ACCOUNT_TYPE && account.isCreditCard
      );

      if (accounts.length) {
        this.selectingCardAccountData = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, accounts);
      }
    }
  }

  private setOverdraftData(): void {
    if (this.isAccounts) {
      const accounts: AccountDto[] = this.integrationInterface.absClientInfoResponseDto.accounts.filter(
        (accountDto: AccountDto) => accountDto.type === this.CARD_ACCOUNT_TYPE && accountDto.isSalaryCard
      );

      if (accounts.length) {
        this.selectingCardAccountData = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, accounts);
      }
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

  private getInsuranceProduct(creditInfo: FinalProduct): void {
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
      this.chosenCreditInfoData = new TableData(HEADERS.CHOSEN_CREDIT_INFO_HEADERS, [this.appDto.chosenCreditInfo]);
    }
  }

  private setSelectedCreditConditionsData(): void {
    if (!!this.appDto && !!this.appDto.finalCreditInfo) {
      this.isFamilyInfoValidation$.next(true);
      this.isAdditionalParametersValidation$.next(true);
      this.isChangesAccepted = true;
      this.selectedCreditConditionsData = new TableData(HEADERS.SELECTED_CREDIT_TERMS_HEADERS, [
        this.appDto.finalCreditInfo
      ]);
      this.finalProduct.push(this.mapCreditInfoToBRMSFinalMatrixDto(this.appDto.finalCreditInfo));
      this.defineProductType(this.appDto.finalCreditInfo);
      this.isGraceInterestShown(this.appDto.finalCreditInfo);
      this.setInitialValuesForAdditionalParams();
      this.fillAccountTablesAccordingToProduct();
      this.enableOrDisableProductInsuranceForm(this.appDto.finalCreditInfo);
    }
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.accept();
        break;
      }
      case 'print': {
        this.printForm();
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
      case 'openComments': {
        this.onCommentClick();
        break;
      }
      case 'loadToOwner': {
        this.loadCommentToVerificatorChat(event.event as string);
        break;
      }
      default: {
        break;
      }
    }
  }

  private loadCommentToVerificatorChat(comment: string) {
    this.chatManagerVerificatorService
      .save({
        applicationId: this.appDto.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  private isGraceInterestShown(finalCreditInfo: FinalProduct): void {
    if (finalCreditInfo.product) {
      this.isGraceInterest = finalCreditInfo.product.isComRestr || finalCreditInfo.product.isForcedRestr;
    }
  }

  transformInsuranceInfoData(insuranceInfo: InsuranceInfo) {
    if (insuranceInfo) {
      this.insuranceInfoDto = new InsuranceInfoDto(insuranceInfo);
    }
  }

  private createTabValidationSubscription(): void {
    this.validateTabsStateService.currentTabs.pipe(untilDestroyed(this)).subscribe((tabs: Record<string, boolean>) => {
      this.isAmlTabValid = tabs[this.TabTitles[TabNames.Aml]];
    });
  }

  acceptChanges(): void {
    this.isChangesAccepted = true;
    this.isAcceptButtonDisabled = true;
    this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).disable();
    this.selectedCreditConditionsData = new TableData(HEADERS.CALCULATED_CREDIT_CONDITIONS_HEADERS, this.finalProduct);
    this.isGraceInterestShown(this.finalProduct[0]);
    this.defineProductType(this.finalProduct[0]);
    this.setProductToPaymentOptions(this.finalProduct[0]);
    this.setInitialValuesForAdditionalParams();
    this.fillAccountTablesAccordingToProduct();
    this.enableOrDisableProductInsuranceForm(this.finalProduct[0]);
  }

  cancelChanges(): void {
    this.isChangesAccepted = false;
    this.isCalculateButtonDisabled = true;
    this.isAcceptButtonDisabled = true;
    this.isConsumerCredit = false;
    this.isCreditCard = false;
    this.isOverdraft = false;
    this.isNewInstantCardOrderChecked = false;
    this.isNewCardOrderChecked = false;
    this.isGamingUsage = false;
    this.isStandardSchedule = false;
    this.isCardOrOverdraftSchedule = false;

    this.isAdditionalParametersValidation$.next(false);
    this.isFamilyInfoValidation$.next(false);
    this.isNameOnCardValidation$.next(false);
    this.isNewInstantCardFieldsValidation$.next(false);
    this.isInsuranceTypedValidation$.next(false);
    this.isInsuranceCompaniesValidation$.next(false);
    this.isInsuranceProductNameValidation$.next(false);
    this.clearInsuranceBrokerageValidation();

    this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).reset();
    this.finalDecForm.get(FinalDecisionGroupKeys.GraceInterest).reset();
    this.finalDecForm.get(FinalDecisionGroupKeys.AdditionalParameters).reset();
    this.finalDecForm.get(FinalDecisionGroupKeys.AdditionalParameters).disable();
    this.finalDecForm.get(FinalDecisionGroupKeys.AccountForm).reset();
    this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).reset();
    this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).disable();

    this.calculatedCreditConditionsData = new TableData(HEADERS.CALCULATED_CREDIT_CONDITIONS_HEADERS, []);
    this.selectedCreditConditionsData = new TableData(HEADERS.CALCULATED_CREDIT_CONDITIONS_HEADERS, []);
    this.availableRefinancingOptionsData = new TableData(HEADERS.AVAILABLE_REFINANCING_OPTIONS_HEADERS, []);
    this.selectingCardAccountData = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, []);
    this.selectingCurrentAccountData = new TableData(HEADERS.SELECTING_ACCOUNT_HEADERS, []);
    this.chosenAccountData = new TableData(CHOSEN_ACCOUNT_HEADERS, []);
  }

  private scrollToFirstInvalidField(): void {
    const firstElementWithError = document.querySelector('.form').querySelector('.ng-invalid');
    if (!!firstElementWithError) {
      firstElementWithError.scrollIntoView();
    }
  }

  private saveCardInfo(): Observable<AccountIssueGetDto> {
    let mergedData: AccountIssuePostDto = { ...this.accountIssuePost };

    if (this.chosenCard) {
      mergedData.dirCurrencyId = this.chosenCard.currency;
      mergedData.isNewCardOrder = false;
      mergedData.isNewInstantCardOrder = false;
      mergedData.isNewAccOrder = false;
      mergedData.isGamingSite = false;
      mergedData.nameOnCard = null;
      mergedData.cardNumber = null;

      if (this.chosenCard.type === this.ACCOUNT_TYPE) {
        mergedData.absDisburseAccountId = this.chosenCard.absId;
        mergedData.accNum = this.chosenCard.acctNum;
        mergedData.absCardDisburseAccountId = null;
        mergedData.cardAccNum = null;
      }

      if (this.chosenCard.type === this.CARD_ACCOUNT_TYPE) {
        mergedData.absCardDisburseAccountId = this.chosenCard.absId;
        mergedData.cardAccNum = this.chosenCard.acctNum;
        mergedData.absDisburseAccountId = null;
        mergedData.accNum = null;
      }
    } else {
      mergedData = {
        ...mergedData,
        ...this.finalDecForm.getRawValue()[FinalDecisionGroupKeys.AccountForm]
      };

      if (this.isNewCardOrderChecked || this.isNewInstantCardOrderChecked || this.isNewAccOrderChecked) {
        mergedData.absDisburseAccountId = null;
        mergedData.absCardDisburseAccountId = null;
        mergedData.accNum = null;
        mergedData.cardAccNum = null;
        mergedData.dirCurrencyId = null;
      }

      if (this.isNewCardOrderChecked) {
        mergedData.isNewInstantCardOrder = false;
        mergedData.isNewAccOrder = false;
        mergedData.cardNumber = null;
      }

      if (this.isNewInstantCardOrderChecked) {
        mergedData.isNewCardOrder = false;
        mergedData.isNewAccOrder = false;
        mergedData.cardAccNum = this.finalDecForm.get(FinalDecisionGroupKeys.AccountForm).get('cardAccNum').value;
      }

      if (this.isNewAccOrderChecked) {
        mergedData.isNewCardOrder = false;
        mergedData.isNewInstantCardOrder = false;
        mergedData.isGamingSite = false;
        mergedData.cardNumber = null;
      }
    }

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

  updateApplication(
    applicantId: number,
    finalCreditInfoId: number,
    insuranceInfoId: number
  ): Observable<ApplicationDto> {
    const appData: ApplicationDto = new ApplicationDto(this.appDto);
    return this.applicationControllerService.update({
      ...appData,
      applicantId,
      finalCreditInfoId,
      insuranceInfoId,
      dirManagerDeclineReasonId:
        !!this.credentialsService.isCreditManager ||
        !!this.credentialsService.isVideoBank ||
        !!this.credentialsService.isDSA
          ? this.selectedDeclineReasonId
          : null
    });
  }

  requestsPipe() {
    return forkJoin([
      this.updateApplicant(),
      this.updateCreditInfo(),
      this.updateInsuranceInfo(),
      this.saveCardInfo()
    ]).pipe(
      switchMap(([applicantId, finalCreditInfoId, insuranceInfoId, accountIssue]) => {
        this.accountIssuePost = new AccountIssuePostDto(accountIssue);
        return this.updateApplication(applicantId, finalCreditInfoId, insuranceInfoId);
      }),
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
    if (!this.isChangesAccepted || this.finalProduct.length === 0) {
      this.toastService.viewMsg('ErrorMessage.NoProduct', 'warning');
      return;
    }

    this.setFieldsValidation();

    if (this.finalDecForm.invalid) {
      this.scrollToFirstInvalidField();
      return;
    }

    if (this.appDto.applicant.isAmlNeeded && !this.isAmlTabValid) {
      this.toastService.viewMsg('ErrorMessage.SaveFATCATab', 'warning');
      return;
    }

    this.isLoading = true;

    this.requestsPipe()
      .pipe(
        switchMap(() => this.applicationControllerService.acceptApp(this.appDto.id.toString(), this.language)),
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

  delayApp() {
    this.isLoading = true;

    this.requestsPipe()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.toastService.viewMsg('Заявка отложена', 'success');
        this.navigateToDashboard();
      });
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

  calculate(): void {
    if (this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).invalid) {
      return;
    }

    this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).disable();

    if (!!this.chosenMatrix) {
      this.toastService.viewInfo('InfoMessage.ApplicationProcessed', 'warning');
      this.isCalculate = true;

      this.isLoading = true;
      const transformedMatrix: BRMSFinalMatrixDto = this.transformMatrixDtoIntoMatrix(this.chosenMatrix);

      this.brmsFinalService
        .calculateMatrix(this.appDto.id, transformedMatrix)
        .pipe(
          catchError(err => {
            this.isLoading = false;
            return throwError(err);
          }),
          untilDestroyed(this)
        )
        .subscribe((matrix: BRMSFinalMatrixDto) => {
          if (!!matrix) {
            // matrix.issueFee = this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('issueFee').value;
            // matrix.overpayPrepaymentRate = this.finalDecForm
            //   .get(FinalDecisionGroupKeys.Calculator)
            //   .get('overpayPrepaymentRate').value;
            this.calculatedCreditConditionsData = new TableData(HEADERS.CALCULATED_CREDIT_CONDITIONS_HEADERS, [matrix]);
            this.isAcceptButtonDisabled = false;
            this.finalProduct = [matrix];
          } else {
            this.calculatedCreditConditionsData = new TableData(HEADERS.CALCULATED_CREDIT_CONDITIONS_HEADERS, []);
            this.isAcceptButtonDisabled = true;
            this.finalProduct = [];
          }

          this.isCalculate = false;
          Swal.close();
          this.toastService.viewMsg('SuccessMessage.ProcessComplete', 'success')

          this.isLoading = false;
        });
    }
  }

  setCalculatorField(matrix: BRMSFinalMatrixDto, value: string): void {
    const isValue = matrix[value] !== null && matrix[value] !== undefined;

    if (isValue) {
      this.finalDecForm
        .get(FinalDecisionGroupKeys.Calculator)
        .get(value)
        .setValue(matrix[value]);
    }
  }

  chooseApprovedCredit(matrix: BRMSFinalMatrixDto): void {
    this.isAcceptButtonDisabled = true;
    this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).reset();
    this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).enable();

    this.setCalculatorField(matrix, 'creditSum');
    this.setCalculatorField(matrix, 'creditTerm');
    //this.setCalculatorField(matrix, 'gracePeriod');
    this.finalDecForm
      .get(FinalDecisionGroupKeys.Calculator)
      .get('gracePeriod')
      .setValue(0);

    this.chosenMatrix = Object.assign({}, matrix);

    this.isRefAcbLiabilityExists = this.isNotNullMatrixExist(matrix);

    if (!!this.isRefAcbLiabilityExists) {
      this.availableRefinancingOptionsData = new TableData(
        HEADERS.AVAILABLE_REFINANCING_OPTIONS_HEADERS,
        this.setNotNullMatrixArr(matrix)
      );
      this.chosenRefinanceList = this.setNotNullMatrixArr(matrix);
    } else {
      this.availableRefinancingOptionsData = new TableData(HEADERS.AVAILABLE_REFINANCING_OPTIONS_HEADERS, []);
    }

    this.isCalculateButtonDisabled = false;
  }

  chooseValidCard(card: AccountDto) {
    this.chosenCard = card;
    this.chosenAccountData = new TableData(CHOSEN_ACCOUNT_HEADERS, [card]);
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

    return this.finalProduct[0] !== null &&
      this.finalProduct[0] !== undefined &&
      this.finalProduct[0].creditInfoId !== null
      ? this.creditInfoControllerService.updateCreditInfo({
          ...this.finalDecForm.getRawValue()[this.FinalDecisionGroupKeys.GraceInterest],
          ...additionalParameters,
          id: this.finalProduct[0].creditInfoId || this.appDto.finalCreditInfo.id
        })
      : of(null);
  }

  private enableOrDisableProductInsuranceForm(creditInfo: FinalProduct): void {
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
    this.brmsFinalService
      .getPreapproveMatrix(this.appDto.id.toString())
      .pipe(untilDestroyed(this))
      .subscribe((matrix: BRMSFinalMatrixDto[]) => {
        this.approvedMatrix = matrix;
        this.approvedCreditConditionsData = new TableData(
          !this.isWithRef ? APPROVED_CREDIT_CONDITIONS_HEADERS : APPROVED_CREDIT_CONDITIONS_WITH_REF_HEADERS,
          this.matrixUtilService.filterMatrix(matrix, this.isWithRef, this.isWithProduct)
        );
      });
  }

  private navigateToDashboard(): void {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
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
    const calculateControls: FormGroup = this.formGroupService.createForm(null, this.calculateFormConfig, null);
    this.finalDecForm.addControl(FinalDecisionGroupKeys.Calculator, calculateControls);

    Object.keys(calculateControls.controls)
      .filter(
        (control: string) => control === 'creditSum' || control === 'issueFeeParam' || control === 'overpayPrepaymentRateParam'
      )
      .forEach((control: string) =>
        this.setCustomValidatorToControl(
          calculateControls,
          control,
          '^(?!$)\\d{0,8}(?:\\.\\d{1,2})?$',
          InputErrorKeys.Double
        )
      );

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
      this.appDto.insuranceInfo,
      this.insuranceFormConfig,
      this.optionsList
    );

    this.finalDecForm.addControl(FinalDecisionGroupKeys.Insurance, insuranceControls);
    this.finalDecForm.get(FinalDecisionGroupKeys.Insurance).disable();
  }

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
      this.selectUserData$,
      this.maritalStatuses$,
      this.dirScheduleTypes$,
      this.dirScheduleFrequency$,
      this.dirEnsureType$,
      this.dirIssueType$,
      this.relationships$,
      this.declineReasons$,
      this.insuranceType$,
      this.currencies$,
      this.products$
    ])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          selectedUserData,
          maritalStatuses,
          scheduleTypes,
          scheduleFrequencies,
          ensureTypes,
          issueTypes,
          relationships,
          declineReasons,
          insuranceType,
          currencies,
          products
        ]) => {
          this.userData = selectedUserData || null;
          this.optionsList[OptionListNames.MaritalStatuses] = maritalStatuses || null;
          this.optionsList[OptionListNames.ScheduleTypes] = getOnlyActiveItems<DirAbsCode>(scheduleTypes);
          this.optionsList[OptionListNames.ScheduleFrequencies] = getOnlyActiveItems<Dir>(scheduleFrequencies);
          this.optionsList[OptionListNames.IssueTypes] = getOnlyActiveItems<Dir>(issueTypes);
          this.optionsList[OptionListNames.EnsureTypes] = getOnlyActiveItems<Dir>(ensureTypes);
          this.optionsList[OptionListNames.Relationships] = getOnlyActiveItems<Dir>(relationships);
          this.optionsList[OptionListNames.DeclineReasons] = getOnlyActiveItems<Dir>(declineReasons);
          this.optionsList[OptionListNames.Currencies] = getOnlyActiveItems<Dir>(currencies);
          this.dirInsuranceType = getOnlyActiveItems<DirAbsCode>(insuranceType);
          this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductRes>(products);
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
      gracePeriod: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('gracePeriod').value,
      // rateParam: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('rateParam').value,
      // issueFee: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('issueFee').value,
      // overpayPrepaymentRate: this.finalDecForm.get(FinalDecisionGroupKeys.Calculator).get('overpayPrepaymentRate').value
    };
  }

  private transformFromLiabilityToLiabilityId(matrix: BRMSFinalMatrixDto): RefAcbLiabilityId {
    return new RefAcbLiabilityId(matrix);
  }

  private deleteRefLiabilityKeys(obj: BRMSFinalMatrixDto): void {
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
  /* ------ END MATRIX ------ */

  /* ------ GETTING PRINT FORMS  ------ */

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
    const agreementFormParams: PrintingFormDownloadRq = new PrintingFormDownloadRq(
      this.appDto.id,
      data.form.id,
      null,
      this.finalProduct[0].product.id
    );
    this.printingFormService
      .fillExternal(agreementFormParams)
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.fileService.downloadFile(res, `${data.form.name}.pdf`);
        this.isLoading = false;
      });
  }

  private translateTitle(key: string, extension: string): string {
    let title: string;

    this.translateService.get(key).subscribe((data: string) => (title = data));
    return `${title}.${extension}` || `emptyName.${extension}`;
  }

  /* ------ END GETTING PRINT FORMS  ------ */

  private resetControlValueAndValidators(control: AbstractControl, resetValue: boolean): void {
    if (resetValue) {
      control.reset();
    }
    control.clearValidators();
    control.updateValueAndValidity();
  }

  private mapCreditInfoToBRMSFinalMatrixDto(creditInfo: CreditInfo): BRMSFinalMatrixDto {
    const brmsFinalMatrixDto: BRMSFinalMatrixDto = new BRMSFinalMatrixDto();

    brmsFinalMatrixDto.annPayment = creditInfo.monthlyPayment;
    brmsFinalMatrixDto.applicationId = creditInfo.applicationId;
    brmsFinalMatrixDto.creditSum = creditInfo.creditAmount;
    brmsFinalMatrixDto.creditTerm = creditInfo.creditTerm;
    brmsFinalMatrixDto.product = creditInfo.product;
    brmsFinalMatrixDto.refinanceLiabilities = creditInfo.refinanceLiabilities;

    return brmsFinalMatrixDto;
  }

  filterMatrix() {
    this.approvedCreditConditionsData = new TableData(
      !this.isWithRef ? APPROVED_CREDIT_CONDITIONS_HEADERS : APPROVED_CREDIT_CONDITIONS_WITH_REF_HEADERS,
      this.matrixUtilService.filterMatrix(this.approvedMatrix, this.isWithRef, this.isWithProduct)
    );
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

  private transformAccountIssueData(accountIssue: AccountIssueGetDto) {
    if (accountIssue) {
      this.accountIssuePost = new AccountIssuePostDto(accountIssue);

      this.isNewCardOrderChecked = !!this.accountIssuePost.isNewCardOrder;
      this.isNewInstantCardOrderChecked = !!this.accountIssuePost.isNewInstantCardOrder;
      this.isNewAccOrderChecked = !!this.accountIssuePost.isNewAccOrder;
      this.isGamingUsage = !!this.accountIssuePost.isNewCardOrder || !!this.accountIssuePost.isNewInstantCardOrder;
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
    if (!!this.isNewMessageExists && !this.readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.appDto.id)
        .pipe(untilDestroyed(this))
        .subscribe(_ => (this.isNewMessageExists = false));
    }
  }

  private resetChosenAccountTable(flag: boolean): void {
    if (flag) {
      this.chosenCard = null;
      this.chosenAccountData = new TableData(CHOSEN_ACCOUNT_HEADERS, []);
    }
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
}
