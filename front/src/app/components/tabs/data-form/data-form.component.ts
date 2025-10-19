import {
  AcbLiabilityDto,
  Address,
  ApplicantIncomeGetDto,
  ApplicantIncomePostDto,
  ApplicantLoanDto,
  Application,
  ApplicationDto,
  BaseFormField,
  CommentDto,
  CompanyStatus,
  CreditInfo,
  CreditInfoDto,
  Dir,
  DirAbsCode,
  DirCountry,
  Directory,
  DirStatus,
  EditableTableHeader,
  EInputType,
  Guarantee,
  IdentityCardType,
  Liability,
  OptionListNames,
  PaginationAndSortingDto,
  ProductDto,
  StageType,
  TableData,
  UserDto,
  ValueType
} from '@app/_models';
import { Company, CompanyDto } from './../../../_models/api-models/company';
import { ApplicantDto } from '@app/_models/api-models/applicant';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { untilDestroyed } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ApplicantLoanControllerService,
  ApplicationControllerService,
  Brms2MatrixFrontControllerService,
  Brms4MatrixFrontControllerService,
  DirectoriesService
} from '@app/api';
import { CreditInfoControllerService } from '@app/api/credit-info-controller.service';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, pluck, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ApplicantControllerService } from '@app/api/applicant-controller.service';
import { ToastService } from '@app/services/toast.service';
import { TocService } from '@app/services/toc.service';
import { DOCUMENT } from '@angular/common';
import { CredentialsService } from '@app/services/authentication';
import { ChatUnderManagerControllerService } from '@app/api/chat-under-manager-controller.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { selectUserData } from '@app/store/selectors/auth.selector';
import {
  APPLICANT_GUARANTOR_TABLE_HEADERS,
  APPLICANT_INCOME_TABLE_HEADERS,
  APPLICANT_LOAN_TABLE_HEADERS,
  CREDIT_INFO_NAME_PROPS_FORM,
  POSSIBLE_CREDIT_PROPS_FORM,
  POSSIBLE_CREDIT_PROPS_WITH_REF,
  PRODUCT_NAME_PROPS_FORM,
  REFINANCE_PROPS,
  SUSPENSIVE_CONDITIONS_TABLE_HEADERS
} from './constants/data-form-constants';
import { DeclineReasonModalComponent } from '@app/shared/components/modals/decline-reason-modal/decline-reason-modal.component';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { RouterURLService } from '@app/services/routerURL.service';
import { CURRENCY_NAME, ELanguage, ELanguageType } from '@app/constants/language';
import { CREDIT_TYPE } from '@app/constants/credit-type';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { FormGroupService } from '@app/services/form-group.service';
import {
  FULL_FORM,
  FULL_FORM_MATRIX,
  FULL_FORM_TITLES,
  FullFormGroup,
  FullFormGroupKeys
} from './constants/data-form-config';
import { BRMS4Matrix, BRMSMatrixDto } from '@app/_models/api-models/brms';
import { TableDataProcessingService } from './services/table-data-processing.service';
import { MatrixUtilService } from './services/matrix-util.service';
import * as _ from 'lodash';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { CompanyControllerService } from '@app/api/company-controller.service';
import { ADD_COMPANY_FULL_FORM } from './constants/add-company-config';
import Swal from 'sweetalert2';
import { SuspensiveConditionsTypeControllerService } from '@app/api/suspensive-conditions-type-controller';
import { PHONE_CODE, PHONE_MASK, PHONE_PREFIX } from '@app/constants/phone-code';
import { OnBlurEventOutputConfig } from '@app/shared/components/editable-table/editable-table.component';
import { DirCorpCompanyDto } from '@app/_models/api-models/dir-corp-company-dto';
import {
  CorpCompanySearchModalComponent,
  CorpCompanySearchModalConfig
} from '@app/shared/components/corp-company-search-modal/corp-company-search-modal.component';
import { AppCommonRequestService } from '@app/services/app-common-request.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AddressControllerService } from '@app/api/address-controller.service';
import { AddressDirsRqDto, AddressDirsRsDto } from '@app/_models/api-models/address-dirs-dto';
import { YES_NO_TYPES } from '@app/constants/yes-or-no-type';
import { AvailableIncomeControllerService } from '@app/api/available-income-controller.service';
import { InputErrorKeys } from '@app/constants/validators-errors';
import { ValidateMatrixDataService } from '@app/components/comon-services/validate-matrix-data.service';
import { MatrixProductType } from '@app/components/tabs/final-decision/services/matrix-process-data.service';
import { AcraLoanFilterDto } from '@app/_models/api-models/integration-acra';
import { BooleanFilterType } from '@app/shared/components/table-sort/table-sort.component';
import { HistoryModalComponent } from '@app/shared/components/modals/history-modal/history-modal.component';
import { InnCompanyDuplecatesModalComponent } from '@app/components/modals/inn-company-duplecates-modal/inn-company-duplecates-modal.component';
import { validateByPattern } from '@app/validators/validation-by-pattern';

type Options = Dir | DirStatus | Directory | ProductDto | DirAbsCode | DirCountry | Company | CompanyStatus | any;
type TableDataOptions = ApplicantLoanDto | ApplicantIncomePostDto | ApplicantIncomeGetDto | any;

@Component({
  selector: 'ng-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['../../common-tabs-scss/full-form-common.component.scss'],
  providers: [TableDataProcessingService, MatrixUtilService]
})
export class DataFormComponent implements OnInit, OnChanges, OnDestroy {
  get isLoanByuOut() {
    return this.selectedMatrix && this.selectedMatrix.product.code === MatrixProductType.LOAN_BUYOUT;
  }

  get isRefMix() {
    return this.selectedMatrix && this.selectedMatrix.product.code === MatrixProductType.REFINANCING_MIX;
  }

  get isRef() {
    return this.selectedMatrix && this.selectedMatrix.product.code === MatrixProductType.REFINANCING;
  }

  get isClientMilitary() {
    return this.applicationData && this.applicationData.applicant.isClientMilitary;
  }

  get isSoleTrader() {
    return this.applicationData && this.applicationData.applicant.isSoleTrader;
  }

  get isTopUp() {
    return (
      this.selectedMatrix &&
      this.selectedMatrix.product.code === MatrixProductType.TOPUP &&
      !!this.selectedMatrix.topUps.length
    );
  }

  get footerButtonsVisible(): boolean {
    if (this.applicationData) {
      return [StageType.FULL_FORM, StageType.FULL_FORM_RETURN].some(el => el === this.applicationData.stage.id);
    }
  }

  public get isConsentExists() {
    const additionalConditionsControl = this.fullForm.controls.additionalConditions as FormGroup;

    if (additionalConditionsControl && additionalConditionsControl.controls.esignAgreement) {
      return additionalConditionsControl.controls.esignAgreement.value as FormControl;
    }
  }

  get isFactAddressShow(): boolean {
    const regAddressControl = this.fullForm.get(this.FullFormGroupKeys.RegAddress) as FormGroup;
    return !regAddressControl.get('isRealEqFactAddress').value;
  }

  fullForm: FormGroup;
  chatUnderManagerList: CommentDto[];
  userData: UserDto;
  pageForSelect: number;

  totalCount: number = 0;
  itemLimit: number = 20;
  selectedPage: number = 0;
  footerConfigSource = 'common.dataForm';

  public readonly phonePrefix: string = PHONE_PREFIX;
  public readonly phoneMask: string = PHONE_MASK;

  // phonePrefix: string = '';
  isCancelRoleAvail: boolean = false;
  isDeclineReasonVisible: boolean = false;
  isNewMessageExists: boolean = false;
  isRefAcbLiabilityExists: boolean = false;
  isChangesAccepted: boolean = false;
  isCalculateButtonDisabled: boolean = true;
  isAcceptButtonDisabled: boolean = true;
  isProductAccepted: boolean;
  isChosenProductError: boolean = false;
  availableIncomeType: boolean = false;
  isGraceInterestToggleVisible: boolean = false;
  isWithRef: boolean = false;
  isWithProduct: number = null;
  isCalculateButtonPressed: boolean;
  isCalculatePreapproveCredit: boolean = false;
  choosePreapproveBtnDisabled: boolean;
  isLoading: boolean = false;
  isConsentDownloaded: boolean = false;
  submitted: boolean = false;
  toggleIsBasicChecked: boolean = false;
  incomeInformationEditing: boolean = false;
  selectedDeclineReasonId: number;

  updateApplicantIncomeRow$ = new BehaviorSubject<any>(null);
  setDisabledCells$ = new BehaviorSubject<any>(null);

  titles: Record<string, string> = FULL_FORM_TITLES;
  fullFormConfig: FullFormGroup = FULL_FORM;
  // incomeConfig: BaseFormField[] = FULL_FORM_INCOME;
  matrixConfig: BaseFormField[] = FULL_FORM_MATRIX;
  fullFormConfigKeys: string[] = Object.keys(this.fullFormConfig);
  creditType: Record<string, string> = CREDIT_TYPE;
  FullFormGroupKeys = FullFormGroupKeys;
  currency = CURRENCY_NAME;
  EInputType = EInputType;
  ValueType = ValueType;

  applicantLoanDto: ApplicantLoanDto[] = [];
  typeOfLoanFilters: any;

  applicantGuarantorLoanPostDto: ApplicantLoanDto[] = [];
  applicantIncomePostDto: ApplicantIncomePostDto[] = [];

  applicantLoanTableHeaders: TableData<ApplicantLoanDto> = new TableData(APPLICANT_LOAN_TABLE_HEADERS, []); // * Обязательства
  applicantGuarantorLoanTableHeaders: EditableTableHeader[] = APPLICANT_GUARANTOR_TABLE_HEADERS;
  applicantIncomeTableHeaders: EditableTableHeader[] = APPLICANT_INCOME_TABLE_HEADERS;

  suspensiveConditionsTableHeaders: EditableTableHeader[] = SUSPENSIVE_CONDITIONS_TABLE_HEADERS;
  // col chosen
  preapprove2CreditColInfoData: TableData<BRMSMatrixDto | BRMS4Matrix> = new TableData(POSSIBLE_CREDIT_PROPS_FORM, []);
  calcProductColumnTableData: TableData<BRMSMatrixDto> = new TableData(PRODUCT_NAME_PROPS_FORM, []);
  refinanceColumnTableData: TableData<AcbLiabilityDto> = new TableData(REFINANCE_PROPS, []);

  chosenProductColumnTableData: TableData<BRMSMatrixDto | CreditInfo> = new TableData(PRODUCT_NAME_PROPS_FORM, []);
  chosenPreApprovedCreditMatrix: BRMSMatrixDto | null;
  chosenRefinanceList: AcbLiabilityDto[] = [];
  finalProduct: BRMSMatrixDto[] = [];

  approvedMatrix: BRMSMatrixDto[] = [];
  activeCreditArr: Liability[] = [];

  guaranteeArr: Guarantee[] = [];
  changePage: Subject<number> = new Subject<number>();
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };
  filterParams: AcraLoanFilterDto;

  public optionsList: Record<string, Options[]> = {
    [OptionListNames.Banks]: [],
    [OptionListNames.Product]: [],
    [OptionListNames.IdentityCardType]: [],
    [OptionListNames.SocialCardType]: [],
    [OptionListNames.SuspensiveConditionsTypes]: [],
    [OptionListNames.Currencies]: [],
    [OptionListNames.Gender]: [],
    [OptionListNames.Countries]: [],
    [OptionListNames.Regions]: [],
    [OptionListNames.Cities]: [],
    [OptionListNames.District]: [],
    [OptionListNames.Companies]: [],
    [OptionListNames.CorpCompanies]: [],
    [OptionListNames.CompanyActivityType]: [],
    [OptionListNames.JobPositionType]: [],
    [OptionListNames.IncomeType]: [],
    [OptionListNames.AvailableIncome]: [],
    [OptionListNames.IncomeFrequency]: [],
    [OptionListNames.CreditPurpose]: [],
    [OptionListNames.DeclineReasons]: [],
    [OptionListNames.YesOrNoTypes]: [],
    [OptionListNames.CompanyStatus]: [],
    SuspensiveConditionsTypesFiltered: []
  };

  @Input() public applicantLoan: ApplicantLoanDto[];
  @Input() public applicantLoanFilterDto: any;
  @Input() public applicantLoanObligationsInfo: any;

  @Input() applicationData: Application;
  @Input() applicantIncome: ApplicantIncomeGetDto[] = [];

  @Input() managerInfo: UserDto;
  @Input() readonlyForm: boolean = false;
  @Input() isMenuVisible: boolean;
  @Input() language: string;

  suspensiveConditionsList: ApplicantLoanDto[] = [];
  suspensiveConditionsListFiltered: ApplicantLoanDto[] = [];

  private validityDateVal: Date;
  private declineReasonsCallCenter: Dir[] = [];
  private availableIncomeTypeApp: any[] = [];
  private declineReasonsManager: Dir[] = [];
  private userName: string = null;
  private isMatrixCalculating: boolean = false;

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private banks$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.bank)));
  private currencies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.currencies)));
  private countries$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.countries)));
  private companies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.companies)));
  private companyActivityType$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.employmentActivity))
  );
  private jobPositionType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.jobPositionType)));
  private incomeType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeType)));
  private incomeFrequency$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeFrequency)));
  private products$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.productCategories)));
  private identityCardType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.identityCardType)));
  private gender$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.gender)));
  private creditPurpose$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.creditPurpose)));
  private declineReasons$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.declineReasons)));
  private declineReasonsCallCenter$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.declineReasonsCallCenter))
  );
  private companyStatuses$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.companyStatuses)));

  private addressDirsRqDto: AddressDirsRqDto = new AddressDirsRqDto();

  private matrixCreditLimit: number;
  private loanBuyoutProductCounter: number;
  private selectedMatrix: BRMSMatrixDto;

  private corpCompanySearchModalOpen: boolean;

  constructor(
    private _store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastService: ToastService,
    private translateService: TranslateService,
    private tocService: TocService,
    private validateMatrixDataService: ValidateMatrixDataService,
    private chatUnderManagerService: ChatUnderManagerControllerService,
    private creditInfoControllerService: CreditInfoControllerService,
    private addressControllerService: AddressControllerService,
    private applicationControllerService: ApplicationControllerService,
    private appCommonRequestService: AppCommonRequestService,
    private applicantControllerService: ApplicantControllerService,
    private credentialsService: CredentialsService,
    private brms2MatrixService: Brms2MatrixFrontControllerService,
    private tableDataProcessingService: TableDataProcessingService,
    private matrixUtilService: MatrixUtilService,
    private routerURLService: RouterURLService,
    private applicantLoanControllerService: ApplicantLoanControllerService,
    private formGroupService: FormGroupService<any, Options>,
    private companyService: CompanyControllerService,
    private availableIncomeControllerService: AvailableIncomeControllerService,
    private directoriesService: DirectoriesService,
    private brms4MatrixFrontService: Brms4MatrixFrontControllerService,
    private suspensiveConditionsTypeService: SuspensiveConditionsTypeControllerService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (
      changes.isMenuVisible &&
      changes.isMenuVisible.currentValue &&
      changes.isMenuVisible.currentValue !== changes.isMenuVisible.previousValue
    ) {
      if (!!this.doc.querySelector('div.data-form-block')) {
        this.tocService.genToc(this.doc.querySelector('div.data-form-block'));
      }
    }
    this.remapApplicantIncomePostDto();
    this.setAddressValueForForm();
    this.updateAddresses();
  }

  ngOnInit() {
    // this.setApplicantIncomeTableHeaders();
    this.filterIncomeConfigByRoles();
    this.getDirectories();
    this.createForm();
    this.subscribeOnAddress();

    this.transformApplicantIncomeObj(this.applicantIncome);
    this.transformApplicantLoanObj(
      this.applicantLoanFilterDto.credits,
      this.typeOfLoanFiltersRemap(this.applicantLoanFilterDto.filters)
    );
    this.fetchApplicantLoanFiltered();
    this.translateServiceSubscription(
      this.applicantLoanFilterDto.credits,
      this.typeOfLoanFiltersRemap(this.applicantLoanFilterDto.filters)
    );
    this.getPreApprovedMatrix(this.isWithRef);
    this.setChosenProductTableData();
    this.checkReadonly();
    this.setTotalExpInitialValue();
    // this.setPhonePrefix();
    this.setChatInfo();
    // this.checkDeclineReason();
    this.changeGraceInterestToggleVisibility(this.applicationData.chosenCreditInfo);
    this.createNumberOfEnrolmentSubscription();
  }

  get historyButtonVisible() {
    return this.routerURLService.isqQueues();
  }

  ngOnDestroy(): void {
    this.tocService.resetScrollSpyInfo();
  }

  typeOfLoanFiltersRemap = (applicantLoanFilterDto: any) => {
    return { ...applicantLoanFilterDto };
  };

  filterEvent(event: any) {
    this.applicantLoanControllerService
      .getLoanObligationsOfApplicant(this.applicationData.applicant.applicationId, this.setFilterParams(event))
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

  getFilledAgreement() {}

  saveRow(rowValue: TableDataOptions, groupName: string) {
    // if (groupName === FullFormGroupKeys.IncomeInfo) {
    //   rowValue = { ...rowValue, jobExp: 36 };
    // }

    const corpCompany = this.findCorpCompany((rowValue as any).corpCompanyId);

    if (corpCompany) {
      (rowValue as ApplicantIncomePostDto).corpCompany = corpCompany;
    }

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
    const corpCompany = this.findCorpCompany((rowValue as any).corpCompanyId);

    if (corpCompany) {
      (rowValue as ApplicantIncomePostDto).corpCompany = corpCompany;
      (rowValue as ApplicantIncomePostDto).name = corpCompany.name || corpCompany.nameAm || corpCompany.nameRu;
    }

    if (rowValue.typeId) {
      const neededId = this.isRefMix || this.isRef ? 1 : this.isLoanByuOut ? 2 : this.isTopUp ? 3 : null;
      rowValue.type = (this.optionsList[OptionListNames.SuspensiveConditionsTypes] as Array<any>).find(
        el => el.id === neededId
      );
      // @ts-ignore
      rowValue.typeId = rowValue.type.id;
    } else {
      rowValue.typeId = null;
    }

    rowValue.applicationId = this.applicationData.id;

    if (groupName === FullFormGroupKeys.CreditDetails) {
      const code = this.selectedMatrix ? (this.selectedMatrix.product.code as any) : null;
      // refin

      if (this.selectedMatrix && [MatrixProductType.REFINANCING, MatrixProductType.REFINANCING_MIX].includes(code)) {
        // isRefinancing
        this.resetCalculator(['creditSum', 'creditSumTopUp']);
        if (!this.calculateMaxCreditSum(1)) {
          rowValue.typeId = null;
          return;
        }

        this.clearFinalProduct();
      } else if (code === MatrixProductType.LOAN_BUYOUT) {
        // 2 BYEOUT

        if (!this.calculateMaxCreditSum(2)) {
          rowValue.typeId = null;
          return;
        }
      } else if (this.isTopUp) {
        this.resetCalculator(['preapproveCalcCreditSum', 'creditSum', 'creditSumTopUp']);
        if (!this.calculateMaxCreditSum(3)) {
          rowValue.typeId = null;
          return;
        }
        this.setTopUpValues(rowValue);
      }
      this.isAcceptButtonDisabled = true;
    }

    this.tableDataProcessingService
      .editedRow(rowValue, groupName)
      .pipe(
        tap(data => {
          if (this.isLoanByuOut) {
            const preapproveCalcCreditSumControl = this.fullForm
              .get(FullFormGroupKeys.Brms2)
              .get('preapproveCalcCreditSum');
            const calcCreditSumControl = this.fullForm.get(FullFormGroupKeys.Brms2).get('creditSum');

            preapproveCalcCreditSumControl.setValue(this.selectedMatrix.maxLimit - +calcCreditSumControl.value);

            this.disableCalculatorCreditControl();
            this.clearFinalProduct();
          }
        }),
        switchMap(() => this.saveEditRowPipe(groupName)),
        untilDestroyed(this)
      )
      .subscribe(
        value => this.saveEditRowSuccessCallback(value, groupName),
        err => this.toastService.viewMsg('ErrorMessage.NotEdited', 'error')
      );
  }

  clearFinalProduct = (): void => {
    this.isAcceptButtonDisabled = true;
    this.isChosenProductError = false;

    this.calcProductColumnTableData = new TableData<BRMSMatrixDto>(PRODUCT_NAME_PROPS_FORM, []);
  };

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
    if (groupName === FullFormGroupKeys.CreditDetails) {
      // TODO Romanovski: add update logic
    }
    if (groupName === FullFormGroupKeys.IncomeInfo) {
      return this.tableDataProcessingService.updateIncomeInfo(this.applicationData);
    } else {
      return this.tableDataProcessingService.updateCreditDetailsInfo(this.applicationData).pipe(pluck('credits'));
    }
  }

  saveEditRowSuccessCallback(value: [], groupName: string) {
    this.toastService.viewMsg('SuccessMessage.Added', 'success');
    if (groupName === FullFormGroupKeys.IncomeInfo) {
      this.transformApplicantIncomeObj(value);
      // if (!this.toggleIsBasicChecked && value.length) {
      //   this.toastService.viewMsg('ErrorMessage.BasicChecked', 'warning');
      // }
    } else {
      this.transformApplicantLoanObj(value);
      this.fetchApplicantLoanFiltered();
    }
    // this.reCalculate();
  }

  choosePreapprove2Credit(matrix: BRMSMatrixDto) {
    this.finalProduct = [];
    this.selectedMatrix = matrix;
    this.isAcceptButtonDisabled = true;

    this.matrixCreditLimit = this.isRefMix ? matrix.maxLimitForRefRepay : matrix.maxLimit;

    this.changeGraceInterestToggleVisibility(matrix);
    this.resetCalculator(['preapproveCalcCreditSum', 'creditSum', 'creditSumTopUp']);

    if (!!matrix.product) {
      const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('matrixProduct');
      control.setValue(this.language === ELanguage.Am ? matrix.product.nameAm : matrix.product.nameRu);
    }

    if (!!matrix.maxLimit) {
      const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum');
      control.setValue(matrix.maxLimit);
      control.enable();
    }

    if (!!matrix.creditTerm) {
      const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditTerm');
      control.setValue(matrix.creditTerm);
      control.enable();
    }

    if (this.isLoanByuOut) {
      this.disableCalculatorCreditControl();
    } else if (this.isRefMix) {
      const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum');

      control.setValue(Math.ceil(matrix.maxLimitCL));
      control.setValidators(maxLimitSumValidator(Math.ceil(matrix.maxLimitCL)));
      control.enable();
      control.updateValueAndValidity();

      // top up
    } else if (this.isTopUp) {
      this.disableCalculatorCreditControl(true);
    } else {
      this.disableCalculatorCreditControl(true);
    }

    this.choosePreapproveBtnDisabled = true;
    this.clearAndFetchApplicantLoan(() => {
      this.checkMatrixType();
      this.choosePreapproveBtnDisabled = false;
    });

    // this.fullForm
    //   .get(FullFormGroupKeys.Brms2)
    //   .get('isInsuranceAccident')
    //   .enable();
    // if (!!matrix.gracePeriod) {
    //   const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('gracePeriod');
    //   //control.setValue(matrix.gracePeriod);
    //   control.setValue(0);
    //   control.enable();
    // }
    // this.fullForm
    //   .get(FullFormGroupKeys.Brms2)
    //   .get('isGraceInterest')
    //   .enable();

    this.chosenPreApprovedCreditMatrix = Object.assign({}, matrix);

    this.isRefAcbLiabilityExists = this.matrixUtilService.isNotNullMatrixExist(matrix);

    if (!!this.isRefAcbLiabilityExists) {
      // this.fullForm
      //   .get(FullFormGroupKeys.Brms2)
      //   .get('freshMoney')
      //   .setValue(matrix.freshMoney);
      this.refinanceColumnTableData = new TableData(REFINANCE_PROPS, this.setNotNullMatrixArr(matrix));
      this.chosenRefinanceList = this.setNotNullMatrixArr(matrix);

      this.chosenRefinanceList.forEach((dto: AcbLiabilityDto) => {
        dto.selected = false;
      });
    } else if (!this.isRefAcbLiabilityExists) {
      this.refinanceColumnTableData = new TableData(REFINANCE_PROPS, []);
    }
    this.calcProductColumnTableData = new TableData<BRMSMatrixDto>(PRODUCT_NAME_PROPS_FORM, []);
    this.isCalculateButtonDisabled = false;
  }

  calculatePreapproveCredit() {
    this.isCalculateButtonPressed = true;
    if (!!this.chosenPreApprovedCreditMatrix) {
      const dataMatrix = this.chosenPreApprovedCreditMatrix;

      const transformedMatrix: BRMSMatrixDto = this.transformMatrixIntoBRMS2MatrixType(dataMatrix);

      if (!this.validateCalculateProduct() || this.fullForm.get(FullFormGroupKeys.Brms2).invalid) {
        return;
      }

      if (
        !this.validateMatrixDataService.validateSumAndTermByProdcat(
          this.applicationData,
          dataMatrix,
          transformedMatrix,
          this.isTopUp
        )
      ) {
        return;
      }

      this.isCalculatePreapproveCredit = true;
      this.isCalculateButtonDisabled = true;
      this.brms2MatrixService
        .recalculateOffer(transformedMatrix)
        .pipe(
          tap(matrix => {
            if (!!matrix) {
              this.disableCalculatorCreditControl(true);

              if (this.isTopUp) {
                const sCondition = this.suspensiveConditionsListFiltered.find(el => !!el.typeId);
                const topUp = matrix.topUps.find(el => el.applicantLoanId === sCondition.id);
                matrix.maxLimit = topUp.maxLimit;
                matrix.singleFeeLoanIssueSum = topUp.singleFeeLoanIssueSum;
                matrix.monthlyFeeLoanAccSum = topUp.monthlyFeeLoanAccSum;
                matrix.monthlyFeeLoanAccAddSum = topUp.monthlyFeeLoanAccAddSum;
              }

              if (this.isRefMix) {
                const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum');
                const validLim =
                  this.chosenPreApprovedCreditMatrix.maxLimitCL;

                control.setValue(Math.ceil(matrix.maxLimitCL));
                control.setValidators(maxLimitSumValidator(Math.ceil(matrix.maxLimitCL)));
                control.enable();
                control.updateValueAndValidity();
              }

              if (this.isLoanByuOut) {
                this.matrixCreditLimit = matrix.maxLimit;
                const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum');
                const controlLoan = this.fullForm.get(FullFormGroupKeys.Brms2).get('creditSum');

                let newLimit = 0;
                if (matrix.maxLimit >= matrix.maxCreditSum) {
                  newLimit = Math.ceil(matrix.maxCreditSum) - Math.ceil(matrix.maxLimitForRefRepay);
                } else {
                  newLimit = Math.ceil(matrix.maxLimit) - Math.ceil(matrix.maxLimitForRefRepay);
                }

                control.setValue(newLimit);
                controlLoan.setValue(Math.ceil(matrix.maxLimitForRefRepay));
                control.setValidators(maxLimitSumValidator(Math.ceil(newLimit)));
                control.updateValueAndValidity();
                // this.setLoanBuyoutProductCounter();
              }

              this.isAcceptButtonDisabled = false;

              this.setFinalProductInfoIfTopUp(matrix);
              this.setMatrixTerms([matrix]);
              this.finalProduct = this.setTotUpsNaming([matrix]);
              this.calcProductColumnTableData = new TableData<BRMSMatrixDto>(
                PRODUCT_NAME_PROPS_FORM,
                this.finalProduct
              );
            } else {
              this.finalProduct = [];
              this.calcProductColumnTableData = new TableData<BRMSMatrixDto>(PRODUCT_NAME_PROPS_FORM, []);
              this.isAcceptButtonDisabled = true;
            }

            Swal.close();
            this.toastService.viewMsg('SuccessMessage.ProcessComplete', 'success');
          }),
          finalize(() => {
            this.isCalculateButtonDisabled = false;
            this.isCalculatePreapproveCredit = false;
          }),
          catchError(err => {
            if (err.error.message === 'No offer available') {
              this.toastService.viewMsg('Для заданных параметров нет доступных предложений', 'error');
            } else if (err.status === 400) {
              this.toastService.viewMsg(err.error.message, 'error');
            }

            return throwError(err);
          }),
          untilDestroyed(this)
        )
        .subscribe();
    }
  }

  // getMaxLimitForLoanBuyOut(item: BRMSMatrixDto){
  //   const transformedMatrix: BRMSMatrixDto = this.transformMatrixIntoBRMS2MatrixType(
  //     item
  //   );
  //
  //   console.log('transformedMatrix', transformedMatrix)
  //
  //   this.brms2MatrixService
  //     .recalculateOffer(transformedMatrix)
  //     .pipe(
  //       tap(matrix => {
  //         if (!!matrix) {
  //           this.matrixCreditLimit = matrix.maxLimit;
  //           const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum');
  //           control.setValue(matrix.maxLimit);
  //         }
  //       }),
  //       untilDestroyed(this)).subscribe();
  // }

  changeGraceInterestToggleVisibility(matrix: BRMSMatrixDto | CreditInfo) {
    if (matrix) {
      this.isGraceInterestToggleVisible = matrix.product.isComRestr || matrix.product.isForcedRestr;
    } else {
      this.isGraceInterestToggleVisible = !!this.applicationData.chosenCreditInfo;
    }

    const controlRefMix = this.matrixConfig.find(el => el.code === 'creditSum');
    const controlTopUp = this.matrixConfig.find(el => el.code === 'creditSumTopUp');
    controlRefMix.isVisible = this.isRefMix || this.isLoanByuOut;
    controlRefMix.placeholder = this.isLoanByuOut ? 'Сумма на выкуп' : 'Сумма на рефинансирование';

    controlTopUp.isVisible = this.isTopUp;
  }

  refinanceToggleClick(data: AcbLiabilityDto) {
    if (data.selected) {
      this.chosenRefinanceList.push(data);
    }

    if (!data.selected) {
      this.chosenRefinanceList = this.chosenRefinanceList.filter((el: AcbLiabilityDto) => {
        return el.id !== data.id;
      });
    }

    if (data.selected !== null) {
      this.brms2MatrixService
        .recalculateOffer(this.calcRefinanceList(this.chosenRefinanceList))
        .pipe(untilDestroyed(this))
        .subscribe(matrix => {
          if (!!matrix) {
            this.finalProduct = [matrix];
            this.calcProductColumnTableData = new TableData(PRODUCT_NAME_PROPS_FORM, [matrix]);
            this.isAcceptButtonDisabled = false;
          } else {
            this.finalProduct = [];
            this.calcProductColumnTableData = new TableData(PRODUCT_NAME_PROPS_FORM, []);
            this.isAcceptButtonDisabled = true;
          }
        });
    }
  }

  acceptChanges() {
    this.isProductAccepted = true;
    this.isChangesAccepted = true;
    this.isAcceptButtonDisabled = true;

    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('preapproveCalcCreditSum')
      .disable();

    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('preapproveCalcCreditTerm')
      .disable();

    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('isInsuranceAccident')
      .disable();
    // this.fullForm
    //   .get(FullFormGroupKeys.Brms2)
    //   .get('gracePeriod')
    //   .disable();

    // this.fullForm
    //   .get(preapproveCalcCreditSum)
    //   .get('isGraceInterest')
    //   .disable();

    this.chosenProductColumnTableData = new TableData(PRODUCT_NAME_PROPS_FORM, this.finalProduct);
    this.isCalculateButtonDisabled = true;
  }

  cancelChanges() {
    this.isCalculateButtonPressed = false;
    this.isRefAcbLiabilityExists = false;
    this.isProductAccepted = false;
    this.isChangesAccepted = false;
    this.isCalculateButtonDisabled = true;
    this.isAcceptButtonDisabled = true;
    this.isChosenProductError = false;

    this.finalProduct = [];
    this.suspensiveConditionsListFiltered = [];

    this.refinanceColumnTableData = new TableData(REFINANCE_PROPS, []);
    this.calcProductColumnTableData = new TableData(PRODUCT_NAME_PROPS_FORM, []);
    this.chosenProductColumnTableData = new TableData(PRODUCT_NAME_PROPS_FORM, []);

    this.resetCalculator(['preapproveCalcCreditSum', 'creditSum', 'creditSumTopUp']);

    const matrixForm = this.fullForm.get(FullFormGroupKeys.Brms2);
    matrixForm.get('matrixProduct').reset();
    matrixForm.get('preapproveCalcCreditSum').reset();
    matrixForm.get('preapproveCalcCreditTerm').reset();
    matrixForm.get('isInsuranceAccident').reset();
    this.isGraceInterestToggleVisible = false;
  }

  reCalculate() {
    setTimeout(() => {
      this.isLoading = true;
    });

    this.isMatrixCalculating = true;
    this.preapprove2CreditColInfoData = new TableData(
      !this.isWithRef ? POSSIBLE_CREDIT_PROPS_FORM : POSSIBLE_CREDIT_PROPS_WITH_REF,
      []
    );
    this.brms4MatrixFrontService
      .calculateMatrix(
        this.applicationData.id.toString(),
        // this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('fullFormIncome').value,
        null
        // this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('numberOfEnrolment').value
      )
      .subscribe(res => {
        this.approvedMatrix = res as any;
        this.preapprove2CreditColInfoData = new TableData(
          !this.isWithRef ? POSSIBLE_CREDIT_PROPS_FORM : POSSIBLE_CREDIT_PROPS_WITH_REF,
          this.matrixUtilService.filterMatrix(res, this.isWithRef, this.isWithProduct)
        );
        this.isLoading = false;
        this.isMatrixCalculating = false;
      });
  }

  nextPartEvent(page: number) {
    const oldCompanies: Company[] = this.optionsList[OptionListNames.Companies] as Company[];

    if (page) {
      this.pageForSelect = page;

      this.tableDataProcessingService
        .nextPartEvent(page)
        .pipe(untilDestroyed(this))
        .subscribe(() => this.getCompanies(page, oldCompanies));
    } else {
      this.getCompanies(page, oldCompanies);
    }
  }

  sortPartEvent(searchValue: string): void {
    if (searchValue) {
      this.tableDataProcessingService
        .searchPartEvent(searchValue)
        .pipe(untilDestroyed(this))
        .subscribe((companies: Company[]) => {
          this.updateOptionsList(OptionListNames.Companies, [
            ...companies,
            ...this.iterationOverConfig<ApplicantIncomeGetDto>(this.applicantIncome, this.applicantIncomeTableHeaders)
          ]);
        });
    }
  }

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
        this.openDeclineReasonModal();
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

  filteredList(e: ApplicantIncomePostDto[]) {
    e.map(data => {
      return data.income ? data.isIncomeConsider : (data.isIncomeConsider = true);
    });
  }

  loadCommentToSopiokChat(comment: string) {
    this.chatUnderManagerService
      .save({
        applicationId: this.applicationData.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.chatUnderManagerService.triggerChatUpdate().subscribe();
        })
      )
      .subscribe();
  }

  validationInTheIncomeField() {
    const clientMilitaryTypeId = !!this.applicantIncomePostDto.find(id => id.dirIncomeTypeId === 24);
    const clientVipTypeId = !!this.applicantIncomePostDto.find(
      id => id.dirIncomeTypeId === 24 || id.dirIncomeTypeId === 30
    );

    if (this.applicationData.applicant.isClientMilitary && !clientMilitaryTypeId) {
      this.toastService.viewMsg('Необходимо добавить данные о доходах', 'warning');
      return true;
    }

    if (this.applicationData.applicant.isClientVip && !clientVipTypeId) {
      this.toastService.viewMsg('Необходимо добавить данные о доходах', 'warning');
      return true;
    }

    return false;
  }

  submitForm() {
    // if (!this.toggleIsBasicChecked && this.applicantIncomePostDto.length) {
    //   this.toastService.viewMsg('ErrorMessage.BasicChecked', 'warning');
    //   return;
    // }

    // if (this.fullForm.invalid) {
    //   this.scrollToFirstInvalid();
    //   return;
    // } else if (!this.isProductAccepted) {
    //   this.toastService.viewMsg('ErrorMessage.NoAcceptedCreditInfo', 'warning');
    //   return;
    // }

    if (this.validationInTheIncomeField()) {
      return;
    }

    this.remiveCreditValidatorIfMilitary();

    if (this.fullForm.invalid) {
      this.scrollToFirstInvalid();
      return;
    }

    if (!this.validateChoosenCreditCredit()) {
      return;
    }
    this.submitted = true;
    this.isLoading = true;
    this.requestsPipe()
      .pipe(
        switchMap(() => this.applicationControllerService.acceptApp(this.applicationData.id.toString(), this.language)),
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
        this.submitted = false;
      });
  }

  delayApp() {
    if (this.isCalculateButtonPressed && !this.isProductAccepted) {
      this.toastService.viewMsg('ErrorMessage.NoAcceptedCreditInfo', 'warning');
      return;
    }
    this.isLoading = true;

    this.requestsPipe()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.toastService.viewMsg('SuccessMessage.Saved', 'success');
        this.navigateToDashboard();
      });
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
    this.selectedDeclineReasonId = dirManagerDeclineReasonId;

    this.requestsPipe()
      .pipe(
        switchMap(() => this.applicationControllerService.declineApp(this.applicationData.id.toString())),
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.isLoading = false;
        this.toastService.viewMsg('SuccessMessage.Denied', 'success');
        this.navigateToDashboard();
      });
  }

  requestsPipe() {
    return forkJoin([
      this.updateApplicant(),
      // this.updateCreditInfo(),
      this.updateChosenCreditInfo(this.finalProduct[0])
    ]).pipe(
      switchMap(res => {
        return this.updateApplication(this.applicationData.applicant.id, this.applicationData.requestedCreditInfo.id);
      }),
      catchError(err => {
        this.isLoading = false;
        return throwError(err);
      })
    );
  }

  onTableSearchEvent(e: ApplicantIncomeGetDto) {
    if (!this.corpCompanySearchModalOpen) {
      this.corpCompanySearchModalOpen = true;
      this.openCorpCompanySearchModal(e);
    }
  }

  onTableEditEvent(data: OnBlurEventOutputConfig) {
    if (!!!this.optionsList[OptionListNames.CorpCompanies]) {
      this.companyService
        .getCorpCompany()
        .pipe(
          tap(val => {
            this.optionsList[OptionListNames.CorpCompanies] = val;
          })
        )
        .subscribe();
    }

    if (!!data.value) {
      this.companyService
        .getCorpCompanyByInn(data.value)
        .pipe(
          tap(res => {
            // need to choose needed company
            this.showAllInnDuplicates(res);
          })
        )
        .subscribe();
    }
  }

  updateCreditInfo(): Observable<number> {
    if (this.finalProduct[0]) {
      return this.creditInfoControllerService.update({
        ...this.fullForm.getRawValue()[FullFormGroupKeys.CreditInfo],
        productId: this.finalProduct[0] ? this.finalProduct[0].product.id : null,
        currencyId: this.finalProduct[0] ? this.finalProduct[0].dirCurrency.id : null,
        dirCurrencyId: this.finalProduct[0] ? this.finalProduct[0].dirCurrency.id : null,
        applicationId: this.applicationData.id,
        brmsMatrixId: this.finalProduct[0] ? this.finalProduct[0].id : null,
        id: this.applicationData.requestedCreditInfo.id
      });
    } else {
      return of(null);
    }
  }

  updateChosenCreditInfo(finalMatrix: BRMSMatrixDto): Observable<number> {
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
      brmsMatrixId: finalMatrix ? finalMatrix.id : null,
      ...(formValues as any)
    });
    return finalMatrix !== null && finalMatrix !== undefined && finalMatrix.id !== null
      ? this.creditInfoControllerService.updateCreditInfo(
          {
            ...finalMatrix,
            ...credit
          },
          this.applicationData.id,
          this.applicationData.stage.id
        )
      : of(null);
  }

  updateApplication(applicantId: number, requestedCreditInfoId: number): Observable<ApplicationDto> {
    const appData: ApplicationDto = new ApplicationDto(this.applicationData);
    return this.applicationControllerService.update({
      ...appData,
      applicantId,
      requestedCreditInfoId,
      ...this.getMatrixValues(),
      stageId: this.fullForm.getRawValue().stageId,
      dirManagerDeclineReasonId:
        !!this.credentialsService.isCreditManager ||
        !!this.credentialsService.isVideoBank ||
        !!this.credentialsService.isDSA
          ? this.selectedDeclineReasonId
          : null,
      dirCallCentreDeclineReasonId: this.credentialsService.isCallCenter ? this.selectedDeclineReasonId : null
    });
  }

  onCommentClick() {
    if (!!this.isNewMessageExists && !this.readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.applicationData.id)
        .pipe(untilDestroyed(this))
        .subscribe(_ => (this.isNewMessageExists = false));
    }
  }

  addCompany() {
    this.showDialog(
      {
        title: 'Modals.Title.AddCompany',
        dataInfo: null,
        formConfig: ADD_COMPANY_FULL_FORM,
        showSaveButton: false,
        showEditButton: false,
        showCreateButton: false,
        showAddButton: true,
        disabledFields: false,
        optionsList: this.optionsList
      },
      (data: Partial<CompanyDto>) => {
        this.companyService
          .create(data)
          .pipe(untilDestroyed(this))
          .subscribe(
            value => {},
            err => {
              if (err.status === 500) {
                this.toastService.viewMsg(err.error, 'error');
              }
            }
          );
      }
    );
  }

  getPreApprovedMatrix(isWithRef: boolean) {
    this.isWithRef = isWithRef;
    this.brms2MatrixService
      .getMatrix(
        this.applicationData.id.toString(),
        this.applicationData.brms3Response ? this.applicationData.brms3Response.brmsTypeId : 'brms3'
      )
      .pipe(
        map(this.setTotUpsNaming),
        untilDestroyed(this)
      )
      .subscribe((matrix: BRMSMatrixDto[]) => {
        this.approvedMatrix = this.setMatrixTerms(matrix);
        this.preapprove2CreditColInfoData = new TableData(POSSIBLE_CREDIT_PROPS_FORM, matrix);
      });
  }

  filterMatrix() {
    this.preapprove2CreditColInfoData = new TableData(
      !this.isWithRef ? POSSIBLE_CREDIT_PROPS_FORM : POSSIBLE_CREDIT_PROPS_WITH_REF,
      this.matrixUtilService.filterMatrix(this.approvedMatrix, this.isWithRef, this.isWithProduct)
    );
  }

  // Обязательства

  selectedPageEventObligations(pageNumber: number) {
    this.params.page = pageNumber - 1;
  }

  // рефинансирование
  changeIsWithRef(isWithRef: boolean) {
    // this.isWithRef = isWithRef;
    // this.isWithProduct = null;
    // this.filterMatrix();
  }

  changeIsWithProduct(isWithProduct: number) {
    this.isWithProduct = isWithProduct;

    this.filterMatrix();
  }

  private resetCalculator = (arr: string[]): void => {
    //['preapproveCalcCreditSum', 'creditSum', 'creditSumTopUp'];
    arr.forEach(ctrl => {
      this.fullForm
        .get(FullFormGroupKeys.Brms2)
        .get(ctrl)
        .reset();
    });
  };

  private disableCalculatorCreditControl = (enable?: boolean): void => {
    const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum');
    control.clearValidators();
    if (enable) {
      control.setValidators(Validators.required);
      control.enable();
    } else {
      control.disable();
    }
    control.updateValueAndValidity();
  };

  // Сохранение заявки на кредит
  private updateApplicant(): Observable<number> {
    const applicantDto: ApplicantDto = new ApplicantDto(this.applicationData.applicant);
    const shortApplicationId = this.applicationData.shortApplicationId;
    const form = this.fullForm.getRawValue();
    const mobilePhone = this.fullForm.getRawValue()[FullFormGroupKeys.ClientCommunication].mobilePhone;

    return this.applicantControllerService.update({
      ...applicantDto,
      ...this.fullForm.getRawValue()[FullFormGroupKeys.ClientCommunication],
      ...this.fullForm.getRawValue()[FullFormGroupKeys.AdditionalConditions],
      shortApplicationId: shortApplicationId,
      isRealEqFactAddress: !this.isFactAddressShow,
      mobilePhone: !!mobilePhone ? PHONE_CODE + mobilePhone : null,
      homePhone: !!form[FullFormGroupKeys.ClientCommunication].homePhone
        ? PHONE_CODE + form[FullFormGroupKeys.ClientCommunication].homePhone
        : null,
      factAddressObj: !this.isFactAddressShow
        ? this.getAddressValueForSave(
            this.applicationData.applicant.regAddressObj,
            form[FullFormGroupKeys.RegAddress],
            this.applicationData.applicant.factAddressObj.id
          )
        : this.getAddressValueForSave(
            this.applicationData.applicant.factAddressObj,
            form[FullFormGroupKeys.FactAddress]
          ),
      regAddressObj: !this.isFactAddressShow
      ? this.applicationData.applicant.regAddressObj
        : this.getAddressValueForSave(
        this.applicationData.applicant.regAddressObj,
        form[FullFormGroupKeys.RegAddress]
      )
      // this.getAddressValueForSave
      // fullFormIncome: this.fullForm.getRawValue()[FullFormGroupKeys.IncomeInfo].fullFormIncome,
      // numberOfEnrolment: this.fullForm.getRawValue()[FullFormGroupKeys.IncomeInfo].numberOfEnrolment,
      // totalJobExp: this.fullForm.getRawValue()[FullFormGroupKeys.IncomeInfo].totalJobExp
    });
  }

  private getAddressValueForSave(existedAddress?: Address, formValues?: any, updatedId?: number): Address {
    // const values = this.fullForm.getRawValue()[formGroupName];
    const dirCommunity = isObjAnyExist(formValues.city)
      ? formValues.city
      : existedAddress.dirCommunity
      ? existedAddress.dirCommunity
      : null;
    const dirRegion = isObjAnyExist(formValues.region)
      ? formValues.region
      : existedAddress.dirRegion
      ? existedAddress.dirRegion
      : null;
    const dirResidence = isObjAnyExist(formValues.residence)
      ? formValues.residence
      : existedAddress.dirResidence
      ? existedAddress.dirResidence
      : null;

    return {
      ...existedAddress,
      ...formValues,
      id: !!updatedId ? updatedId : existedAddress.id,
      dirCommunity,
      dirRegion,
      dirResidence,
      city:
        !!existedAddress.city || !!dirCommunity
          ? (dirCommunity ? dirCommunity[ELanguageType.am] : null) || existedAddress.city
          : isObjAnyExist(formValues.city)
            ? formValues.city[ELanguageType.am]
            : formValues.city,
      region:
        !!existedAddress.region || !!dirRegion
          ? (dirRegion ? dirRegion[ELanguageType.am] : null) || existedAddress.region
          : isObjAnyExist(formValues.region)
            ? formValues.region[ELanguageType.am]
            : formValues.region,
      residence:
        !!existedAddress.residence || !!dirResidence
          ? (dirResidence ? dirResidence[ELanguageType.am] : null) || existedAddress.residence
          : isObjAnyExist(formValues.residence)
            ? formValues.residence[ELanguageType.am]
            : formValues.residence
    };

    function isObjAnyExist(val: any) {
      return val && typeof val === 'object';
    }
  }

  private subscribeOnAddress() {
    const addressForm = this.fullForm.get(FullFormGroupKeys.RegAddress) as FormGroup;
    // address Form
    if (addressForm.get('region').enabled) {
      addressForm
        .get('region')
        .valueChanges.pipe(
          tap(val => {
            addressForm.get('city').reset();
            addressForm.get('residence').reset();
            this.getAddressDirsById(addressForm);
          })
        )
        .subscribe();
    }
    if (addressForm.get('city').enabled) {
      addressForm
        .get('city')
        .valueChanges.pipe(
          tap(val => {
            addressForm.get('residence').reset();
            if (val) {
              this.getAddressDirsById(addressForm);
            }
          })
        )
        .subscribe();
    }

    if (addressForm.get('residence').enabled) {
      addressForm
        .get('residence')
        .valueChanges.pipe(
          tap(val => {
            if (val) {
              this.getAddressDirsById(addressForm);
            }
          })
        )
        .subscribe();
    }

    // fact address Form
    const factAddressForm = this.fullForm.get(FullFormGroupKeys.FactAddress) as FormGroup;
    if (factAddressForm.get('region').enabled) {
      factAddressForm
        .get('region')
        .valueChanges.pipe(
          tap(() => {
            factAddressForm.get('city').reset();
            factAddressForm.get('residence').reset();
            this.getAddressDirsById(factAddressForm, true);
          })
        )
        .subscribe();
    }

    if (factAddressForm.get('city').enabled) {
      factAddressForm
        .get('city')
        .valueChanges.pipe(
          tap(val => {
            factAddressForm.get('residence').reset();
            if (val) {
              this.getAddressDirsById(factAddressForm, true);
            }
          })
        )
        .subscribe();
    }
    if (factAddressForm.get('residence').enabled) {
      factAddressForm
        .get('residence')
        .valueChanges.pipe(
          tap(val => {
            if (val) {
              this.getAddressDirsById(factAddressForm, true);
            }
          })
        )
        .subscribe();
    }
  }

  private getAddressDirsById = (form: FormGroup, isFact?: boolean): void => {
    const region = form.get('region').value;
    const city = form.get('city').value;
    const residence = form.get('residence').value;
    const addressReq: AddressDirsRqDto = {
      regionId: region ? region.id : null,
      communityId: region ? (city ? city.id : null) : null,
      residenceId: region ? (residence ? residence.id : null) : null
    };
    this.addressControllerService
      .getAddressDirs(addressReq)
      .pipe(
        take(1),
        tap(data => {
          if (isFact) {
            this.setFactAddressDirs(data);
          } else {
            this.setAddressDirs(data);
          }
        })
      )
      .subscribe();
  };

  private setAddressDirs = (addressDirs: AddressDirsRsDto): void => {
    this.optionsList[OptionListNames.Cities] = [...addressDirs.communities];
    this.optionsList[OptionListNames.District] = [...addressDirs.residences];
  };

  private setFactAddressDirs = (addressDirs: AddressDirsRsDto): void => {
    this.optionsList.factCommunities = [...addressDirs.communities];
    this.optionsList.factResidences = [...addressDirs.residences];
  };

  private createNumberOfEnrolmentSubscription() {}

  private showDialog(data: AdministrationBaseModalData<Company, Options>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '40%',
      height: '50%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(callback);
  }

  private dontVisibleFields(fields: any) {
    // console.log(fields);
  }

  private createForm() {
    this.fullForm = this.formBuilder.group({});
    this.setAddressValueForForm();
    this.applicationData.isInsuranceAccidentValue = this.setInsuranceAccident(this.applicationData.isInsuranceAccident);

    const militaryField = this.fullFormConfig[FullFormGroupKeys.AdditionalConditions].find(field => field.code === 'isClientMilitary');

    if (militaryField) {
      militaryField.placeholder = this.isSoleTrader ? 'FullForm.Placeholder.SoleTrader' : 'FullForm.Placeholder.Military';
    }

    this.fullFormConfigKeys.forEach((key: string) => {
      const controls: FormGroup = this.formGroupService.createForm(
        this.applicationData,
        this.fullFormConfig[key],
        this.optionsList
      );
      this.fullForm.addControl(key, controls);
    });

    this.setPhoneCodesValidator();

    this.fullForm
      .get('additionalConditions')
      .get('esignAgreement')
      .setValue(!!this.applicationData.applicant.esignAgreement);

    this.fullForm
      .get('additionalConditions')
      .get('isClientMilitary')
      .setValue(this.isSoleTrader || this.isClientMilitary)

    // ability to edit for the factAddress
    if (this.applicationData.applicant.isRealEqFactAddress) {
      setTimeout(() => {
        this.formGroupService.disableAllControlsFormGroup(this.fullForm.controls.factAddress as FormGroup, false);
      }, 300);
    }
    this.setAdditionalConditionsDisabled();
    this.dontVisibleFields(this.fullFormConfig);
    const matrixControls: FormGroup = this.formGroupService.createForm(
      this.applicationData,
      Object.assign(this.matrixConfig),
      null
    );
    // const incomeControls: FormGroup = this.formGroupService.createForm(
    //   this.applicationData.applicant,
    //   this.incomeConfig,
    //   null
    // );

    this.fullForm.addControl(FullFormGroupKeys.Brms2, matrixControls);
    // this.fullForm.addControl(FullFormGroupKeys.IncomeInfo, incomeControls);

    this.fullForm
      .get(this.FullFormGroupKeys.FactAddress)
      .get('country')
      .setValue({ id: 275 });

    const regAddressControl = this.fullForm.get(this.FullFormGroupKeys.RegAddress) as FormGroup;
    regAddressControl
      .get('isRealEqFactAddress')
      .valueChanges.pipe()
      .subscribe(val => {
        if (!val && !this.readonlyForm) {
          (this.fullForm.get(this.FullFormGroupKeys.FactAddress) as FormGroup).reset();
          (this.fullForm.get(this.FullFormGroupKeys.FactAddress) as FormGroup).enable();
        } else {
          setTimeout(() => {
            (this.fullForm.get(this.FullFormGroupKeys.FactAddress) as FormGroup).disable();
          });
        }
      });

    this.subscribeOnBrms2Controls();
  }

  private subscribeOnBrms2Controls = (): void => {
    const isBwControl = this.fullForm.get(FullFormGroupKeys.Brms2).get('isBw');
    // const isDsaControl = this.fullForm.get(FullFormGroupKeys.Brms2).get('isDsa');
    const isAgentInsuranceChosenControl = this.fullForm.get(FullFormGroupKeys.Brms2).get('isAgentInsuranceChosen');
    const options = { emitEvent: false };

    const isBw = this.matrixConfig.find(el => el.code === 'isBw');
    // const isDsa = this.matrixConfig.find(el => el.code === 'isDsa');
    // isDsa.readonly = false;
    isBw.readonly = false;
    isBwControl.valueChanges.subscribe(val => {
      // isDsa.readonly = val;
      if (val) {
        isAgentInsuranceChosenControl.enable(options);
      } else {
        isAgentInsuranceChosenControl.disable(options);
      }
    });
    // isDsaControl.valueChanges.subscribe(val => {
    //   isBw.readonly = val;
    //   if (val) {
    //     isAgentInsuranceChosenControl.enable(options);
    //   } else {
    //     isAgentInsuranceChosenControl.disable(options);
    //   }
    // });
  };

  private setToggleIsBasicChecked(applicantIncome: ApplicantIncomeGetDto[]) {
    this.toggleIsBasicChecked = false;
    applicantIncome.forEach(item => {
      // if (item.isBasic) {  todo: fix
      //   this.toggleIsBasicChecked = true;
      // }
    });
  }

  private transformApplicantIncomeObj(applicantIncome: ApplicantIncomeGetDto[]) {
    if (applicantIncome) {
      this.setToggleIsBasicChecked(applicantIncome);
      this.applicantIncomePostDto = applicantIncome.map(
        (item: ApplicantIncomeGetDto) => new ApplicantIncomePostDto(item)
      );
      this.getTotalIncomeValue(this.applicantIncomePostDto);
    }
  }

  private remapApplicantIncomePostDto() {
    if (this.applicantIncome) {
      this.applicantIncome.forEach(el => {
        if (el.dirIncomeType) {
          this.availableIncomeTypeApp.push(el.dirIncomeType);
        }
      });
      this.applicantIncomePostDto = this.applicantIncome.map(
        (item: ApplicantIncomeGetDto) => new ApplicantIncomePostDto(item)
      );
    }
  }

  private translateServiceSubscription(applicantLoanDto: ApplicantLoanDto[], applicantLoanFilters?: any) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.transformApplicantLoanObj(applicantLoanDto, applicantLoanFilters);
    });
  }

  private transformApplicantLoanObj(applicantLoan?: ApplicantLoanDto[], applicantLoanFilters?: any) {
    this.applicantLoanDto = [];
    this.applicantGuarantorLoanPostDto = [];

    if (applicantLoan) {
      applicantLoan.forEach((item: ApplicantLoanDto) => {
        const depositList = item.pledgeList && item.pledgeList.length > 0 ? item.pledgeList : [];

        item.maturityDateRemap = item.maturityDate;
        item.dateOfLastRepaymentRemap = item.dateOfLastRepayment;

        item.issueDateRemap = item.issueDate;
        this.applicantLoanDto.push(new ApplicantLoanDto(item));
      });
    }
    const applicantLoanDtoMap: any[] = this.applicantLoanDto.map(el => {
      return {
        ...el,
        // typeOfLoanRemap: el.dirLiabilityType,
        creditSubclassRemapRu: el.source === 'ABS' ? el.creditSubclassAbsName : el.creditSubclassRu,
        creditSubclassRemapAm: el.source === 'ABS' ? el.creditSubclassAm : el.creditSubclassAm,
        worstRiskClassRemapRu: el.source === 'ABS' ? el.worstRiskClassAbsName : el.worstRiskClassRu,
        worstRiskClassRemapAm: el.source === 'ABS' ? el.creditSubclassAm : el.worstRiskClassAm,
        isCreditLine: el.isCreditLine
          ? this.translateService.instant(BooleanFilterType.YES)
          : this.translateService.instant(BooleanFilterType.NO),
        isKPZZ: el.isKPZZ
          ? this.translateService.instant(BooleanFilterType.YES)
          : this.translateService.instant(BooleanFilterType.NO)
      };
    });

    this.applicantLoanTableHeaders = new TableData(
      APPLICANT_LOAN_TABLE_HEADERS,
      applicantLoanDtoMap,
      applicantLoanFilters
    );
  }

  private filterIncomeConfigByRoles(): void {
    // this.incomeConfig = this.incomeConfig.filter((filed: BaseFormField) => {
    //   if (filed.visibleForRolesList) {
    //     return this.credentialsService.checkRoles(filed.visibleForRolesList);
    //   }
    //   return true;
    // });
  }

  private getTotalIncomeValue(applicantIncome: ApplicantIncomePostDto[]) {
    // let totalIncome = 0;
    // applicantIncome.forEach((incomeItem: ApplicantIncomePostDto) => {
    //   totalIncome += +incomeItem.amountGEL;
    // });
    // this.setTotalIncomeValue(totalIncome);
  }

  private setTotalIncomeValue(totalIncome: number) {
    //   this.fullForm
    //     .get(FullFormGroupKeys.IncomeInfo)
    //     .get('fullFormIncome')
    //     .setValue(+totalIncome.toFixed(2));
  }

  private setTotalExpInitialValue() {
    // const totalJobExpControl = this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('totalJobExp');
    // if (!!totalJobExpControl && !totalJobExpControl.value) {
    //   totalJobExpControl.setValue(
    //     this.tableDataProcessingService.getJobExpDefaultValueByApplicantAge(this.applicationData.applicant)
    //   );
    // }
  }

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

  private setChosenProductTableData() {
    if (!!this.applicationData && !!this.applicationData.chosenCreditInfo) {
      const creditTerm = this.applicationData.chosenCreditInfo.creditTerm;
      const chosenCreditInfo = this.applicationData.chosenCreditInfo;
      this.setTopUpProductName(this.applicationData.chosenCreditInfo);
      chosenCreditInfo.maxLimit = chosenCreditInfo.creditAmount;
      this.applicationData.chosenCreditInfo.creditTermWithType =
        creditTerm +
        ` ${
          chosenCreditInfo.productCondition && chosenCreditInfo.productCondition.dirLoanTermType
            ? chosenCreditInfo.productCondition.dirLoanTermType
            : 'мес.'
        }`;

      this.applicationData.chosenCreditInfo.creditTermWithTypeAm =
        creditTerm +
        ` ${
          chosenCreditInfo.productCondition && chosenCreditInfo.productCondition.dirLoanTermType
            ? chosenCreditInfo.productCondition.dirLoanTermType
            : '(ամիս)'
        }`;

      this.isProductAccepted = true;

      // const matrix = this.setTotUpsNaming([this.applicationData.chosenCreditInfo as any]);

      this.chosenProductColumnTableData = new TableData(CREDIT_INFO_NAME_PROPS_FORM, [
        this.applicationData.chosenCreditInfo
      ]);
    } else {
      this.isProductAccepted = false;
    }
  }

  private getDirectories() {
    combineLatest([
      this.banks$,
      this.selectUserData$,
      this.currencies$,
      this.countries$,
      this.addressControllerService.getAddressDirs(this.addressDirsRqDto),
      this.companies$,
      this.companyActivityType$,
      this.jobPositionType$,
      this.incomeType$,
      this.incomeFrequency$,
      this.products$,
      this.directoriesService.getIdentityCardTypeList(),
      this.suspensiveConditionsTypeService.getSuspensiveConditionsTypes(),
      this.gender$,
      this.creditPurpose$,
      this.declineReasons$,
      this.declineReasonsCallCenter$,
      this.companyStatuses$,
      /*this.companyService.getCorpCompany(),*/
      this.availableIncomeControllerService.getIncomeType(this.applicationData.applicant.id)
    ])
      .pipe(
        take(2),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          banks,
          selectedUserData,
          currencies,
          countries,
          addressDirs,
          companies,
          companyActivityTypes,
          jobPositionType,
          incomeType,
          incomeFrequency,
          productCategories,
          identityCardType,
          suspensiveConditionsTypes,
          gender,
          creditPurpose,
          declineReasons,
          declineReasonsCallCenter,
          companyStatuses,
          /*corpCompany,*/
          availableIncome
        ]) => {
          this.setCurrentUserData<UserDto>(selectedUserData);
          this.optionsList = {};
          this.optionsList[OptionListNames.Banks] = getOnlyActiveItems<Dir>(banks);
          this.optionsList[OptionListNames.Currencies] = getOnlyActiveItems<Dir>(currencies);
          this.optionsList[OptionListNames.Countries] = getOnlyActiveItems<DirCountry>(countries);

          this.optionsList[OptionListNames.Regions] = addressDirs.regions;
          this.optionsList[OptionListNames.Cities] = addressDirs.communities;
          this.optionsList[OptionListNames.District] = addressDirs.residences;
          this.optionsList.factCommunities = addressDirs.communities;
          this.optionsList.factResidences = addressDirs.residences;

          this.optionsList[OptionListNames.YesOrNoTypes] = YES_NO_TYPES;

          this.optionsList[OptionListNames.Companies] = companies;
          /*this.optionsList[OptionListNames.CorpCompanies] = corpCompany;*/
          this.optionsList[OptionListNames.CompanyActivityType] = getOnlyActiveItems<DirCountry>(companyActivityTypes);
          this.optionsList[OptionListNames.JobPositionType] = getOnlyActiveItems<DirCountry>(jobPositionType);
          this.optionsList[OptionListNames.IncomeType] = getOnlyActiveItems<DirCountry>(incomeType);
          this.optionsList[OptionListNames.AvailableIncome] = availableIncome.length
            ? [...availableIncome]
            : getOnlyActiveItems<DirCountry>(incomeType);
          this.addButtonAvailableIncome(availableIncome);
          this.optionsList[OptionListNames.IncomeFrequency] = getOnlyActiveItems<DirCountry>(incomeFrequency);
          this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductDto>(productCategories);
          this.optionsList[OptionListNames.SuspensiveConditionsTypes] = getOnlyActiveItems<DirAbsCode>(
            suspensiveConditionsTypes
          );
          this.optionsList[OptionListNames.IdentityCardType] = getOnlyActiveItems<IdentityCardType>(
            this.passportTypefilter(identityCardType, false)
          );
          this.optionsList[OptionListNames.SocialCardType] = getOnlyActiveItems<IdentityCardType>(
            this.passportTypefilter(identityCardType, true)
          );
          this.optionsList[OptionListNames.Gender] = gender;
          this.optionsList[OptionListNames.CreditPurpose] = getOnlyActiveItems<Directory>(creditPurpose);
          this.optionsList[OptionListNames.CompanyStatus] = getOnlyActiveItems<CompanyStatus>(companyStatuses);
          this.declineReasonsManager = getOnlyActiveItems<Dir>(declineReasons);
          this.declineReasonsCallCenter = getOnlyActiveItems<Dir>(declineReasonsCallCenter);
          this.setDeclineReasons();

          // this.setLoanBuyoutProductCounter();

          this.fillCompaniesSearchOptions<ApplicantIncomeGetDto>(
            this.applicantIncome,
            this.applicantIncomeTableHeaders,
            OptionListNames.Companies
          );
        }
      );
  }

  private checkReadonly() {
    if (this.readonlyForm) {
      this.fullForm.disable();
    }
  }

  private addButtonAvailableIncome(data: Dir[]) {
    const idAvailableIncome = data.map(el => el.id);
    this.applicantIncomePostDto.forEach(el => {
      el.availableOptionsIds = [...idAvailableIncome];
    });
    this.availableIncomeType = !this.readonlyForm && !!data.length;
  }

  private transformMatrixIntoBRMS2MatrixType(matrix: any): BRMSMatrixDto {
    const assignObj = Object.assign({}, matrix);

    const refMixSum =
      +this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum').value +
      +this.fullForm.get(FullFormGroupKeys.Brms2).get('creditSum').value;

    const topUpSum =
      +this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum').value +
      +this.fullForm.get(FullFormGroupKeys.Brms2).get('creditSumTopUp').value;

    const isLoanByuOut =
      +this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum').value +
      +this.fullForm.get(FullFormGroupKeys.Brms2).get('creditSum').value;

    const maxLimit = this.isRefMix
      ? refMixSum
      : this.isTopUp
      ? topUpSum
      : this.isLoanByuOut
      ? isLoanByuOut
      : +this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum').value;

    return {
      ...assignObj,
      maxLimit,
      topUpRemainAmount: +this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum').value,
      maxLimitForRefRepay:
        this.isRefMix || this.isLoanByuOut ? +this.fullForm.get(FullFormGroupKeys.Brms2).get('creditSum').value : null,
      creditTerm: +this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditTerm').value
    };
  }

  private chooseMaxLimitForLoanBuyout = (): boolean => {
    const typedArray = this.suspensiveConditionsListFiltered.filter(
      el => !!el.typeId && (el.typeId === 2 || (el.type as any) === 2)
    );
    return typedArray.length !== this.loanBuyoutProductCounter;
  };

  private setLoanBuyoutProductCounter = (): void => {
    this.loanBuyoutProductCounter = this.suspensiveConditionsListFiltered.filter(
      el => !!el.typeId && (el.typeId === 2 || (el.type as any) === 2)
    ).length;
  };

  private calcRefinanceList(arr: AcbLiabilityDto[]): BRMSMatrixDto {
    let assignObj = Object.assign({}, this.chosenPreApprovedCreditMatrix);
    this.matrixUtilService.deleteRefLiabilityKeys(assignObj);

    assignObj = Object.assign(assignObj, this.matrixUtilService.getTransformedMatrix(assignObj));

    arr.forEach((elem: AcbLiabilityDto) => {
      if (elem.refNumber && elem.selected) {
        assignObj[elem.refNumber] = elem;
      }
    });

    const refObj = this.matrixUtilService.transformFromLiabilityToLiabilityId(assignObj);
    this.matrixUtilService.deleteRefLiabilityKeys(assignObj);

    return null;
  }

  private setNotNullMatrixArr(matrix: BRMSMatrixDto) {
    const calculatedMatrix = this.matrixUtilService.getTransformedMatrix(matrix);
    const calculatedArrNotNull = [];

    for (const key of Object.keys(calculatedMatrix)) {
      if (!!calculatedMatrix[key]) {
        calculatedArrNotNull.push({ ...calculatedMatrix[key], refNumber: key });
      }
    }
    return calculatedArrNotNull;
  }

  private setChatInfo() {
    this.chatUnderManagerService
      .getAllByApplicationId(this.applicationData.id.toString())
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        res.sort(function(a, b) {
          // @ts-ignore
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
        this.chatUnderManagerList = res;
      });

    this.isNewMessageExists = this.applicationData.newMessageUMChat;
  }

  private navigateToDashboard() {
    if (this.isCalculateButtonPressed && !this.isProductAccepted) {
      this.toastService.viewMsg('ErrorMessage.NoAcceptedCreditInfo', 'warning');
      return;
    }

    this.routerURLService.navigateToDashboard();
  }

  private setDeclineReasons() {
    this.isCancelRoleAvail =
      !!this.credentialsService.isCreditManager ||
      !!this.credentialsService.isCallCenter ||
      !!this.credentialsService.isVideoBank ||
      !!this.credentialsService.isDSA;

    if (!!this.credentialsService.isCallCenter || !!this.applicationData.dirCallCentreDeclineReason) {
      this.optionsList[OptionListNames.DeclineReasons] = this.declineReasonsCallCenter;
    } else if (this.isCancelRoleAvail) {
      this.optionsList[OptionListNames.DeclineReasons] = this.declineReasonsManager;
    }
  }

  private fillCompaniesSearchOptions<T>(data: T[], tableConfig: EditableTableHeader[], optionListName: string) {
    this.updateOptionsList(optionListName, this.iterationOverConfig<T>(data, tableConfig));
  }

  private getCompanies(page: number, oldCompanies: Company[]) {
    this.companies$.pipe(untilDestroyed(this)).subscribe((companies: Company[]) => {
      const companies1 = page
        ? _.union(
            companies,
            this.iterationOverConfig<ApplicantIncomeGetDto>(this.applicantIncome, this.applicantIncomeTableHeaders)
          )
        : _.union(
            companies,
            oldCompanies,
            this.iterationOverConfig<ApplicantIncomeGetDto>(this.applicantIncome, this.applicantIncomeTableHeaders)
          );
      this.updateOptionsList(OptionListNames.Companies, companies1);
    });
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

    if (data) {
      data.forEach((item: T) => {
        if (item[propertyName]) {
          options = [...options, item[propertyName]];
        }
      });
    }

    return options;
  }

  private scrollToFirstInvalid() {
    const firstElementWithError = document.querySelector('form').querySelector('.ng-invalid');
    if (!!firstElementWithError) {
      firstElementWithError.scrollIntoView();
    }
  }

  private setCurrentUserData<T extends UserDto>(res: T) {
    if (res) {
      this.userData = res;
    }
    if (res && res.username) {
      this.userName = res.username;
    }
    this.appCommonRequestService.userData = res;
  }

  private openCorpCompanySearchModal(item?: any) {
    this.companyService.getCorpCompany().subscribe(value => {
      this.optionsList[OptionListNames.CorpCompanies] = value;
      const config: CorpCompanySearchModalConfig = {
        title: 'Modals.Title.CorpCompany',
        confirmBtnName: 'Buttons.Choose',
        language: this.language,
        options: this.optionsList[OptionListNames.CorpCompanies] as any
      };
      const dialogRef = this.dialog.open(CorpCompanySearchModalComponent, {
        width: '40vw',
        maxWidth: '40vw',
        // height: '30vh',
        data: config
      });

      dialogRef
        .afterClosed()
        .pipe(untilDestroyed(this))
        .subscribe((res: any) => {
          if (typeof res === 'object') {
            const nameProp = ELanguageType[this.language];
            res.name = res[nameProp];
            this.updateApplicantIncomeRow$.next({
              corpCompanyId: res.id,
              name: res.name,
              inn: res.inn,
              segment: res.segment,
              code: res.code,
              industry: res.industry
            });
            this.setDisabledCells$.next(['name', 'inn']);
          }
          this.corpCompanySearchModalOpen = false;
        });
    });
  }

  private setInsuranceAccident = (flag: boolean): number => {
    if (flag !== null) {
      return flag ? 1 : 2;
    } else {
      return null;
    }
  };

  private getInsuranceAccident = (val: number): boolean => {
    if (val !== null) {
      return val === 1;
    }
    return null;
  };

  private validateChoosenCreditCredit = (): boolean => {
    if (this.isClientMilitary) {
      return true;
    }

    if (!this.isCalculateButtonPressed || !this.isProductAccepted) {
      this.toastService.viewMsg('ErrorMessage.NoAcceptedCreditInfo', 'warning');
      return false;
    }
    return true;
  };

  private getMatrixValues = (): object => {
    const values = (this.fullForm.get(FullFormGroupKeys.Brms2) as FormGroup).getRawValue();
    return {
      isAgentInsuranceChosen: values.isAgentInsuranceChosen,
      isBw: values.isBw,
      isDsa: values.isDsa,
      isInsuranceAccident: this.getInsuranceAccident(values.isInsuranceAccident)
    };
  };

  private findCorpCompany = (id: number, inn?: string): DirCorpCompanyDto => {
    if (!!this.optionsList[OptionListNames.CorpCompanies]) {
      return (this.optionsList[OptionListNames.CorpCompanies] as Array<DirCorpCompanyDto>).find(el => {
        return !!id ? el.id === id : !!inn ? el.inn === inn : false;
      });
    }
  };

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

  private passportTypefilter = (passportType: IdentityCardType[], isSocial: boolean): IdentityCardType[] => {
    return passportType.filter(el => el.isSoc === isSocial);
  };

  private setAdditionalConditionsDisabled = (): void => {
    if (!this.applicationData.isPreApproved) {
      const isConsentExistsControl = (this.fullFormConfig[FullFormGroupKeys.AdditionalConditions] as Array<
        BaseFormField
      >).find(el => el.code === 'esignAgreement');
      isConsentExistsControl.disabled = true;
      this.formGroupService.disableAllControlsFormGroup(
        this.fullForm.controls[FullFormGroupKeys.AdditionalConditions] as FormGroup,
        true
      );
    } else {
      const ignoreIncomeControl = (this.fullFormConfig[FullFormGroupKeys.AdditionalConditions] as Array<
        BaseFormField
      >).find(el => el.code === 'ignoreIncome');
      ignoreIncomeControl.disabled = false;
    }
  };

  private getLocalizationName = (obj: Options, lang: string): string => (obj ? obj[ELanguageType[lang]] : null);

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      // this.language = lang.lang;
    });
  }

  private setAddressValueForForm() {
    this.applicationData.applicant.regAddressObj.cityForShow =
      this.applicationData.applicant.regAddressObj.city ||
      this.getLocalizationName(this.applicationData.applicant.regAddressObj.dirCommunity, ELanguage.Am);
    this.applicationData.applicant.regAddressObj.regionForShow =
      this.applicationData.applicant.regAddressObj.region ||
      this.getLocalizationName(this.applicationData.applicant.regAddressObj.dirRegion, ELanguage.Am);
    this.applicationData.applicant.regAddressObj.residenceForShow =
      this.applicationData.applicant.regAddressObj.residence ||
      this.getLocalizationName(this.applicationData.applicant.regAddressObj.dirResidence, ELanguage.Am);

    this.applicationData.applicant.factAddressObj.cityForShow =
      this.applicationData.applicant.factAddressObj.city ||
      this.getLocalizationName(this.applicationData.applicant.factAddressObj.dirCommunity, ELanguage.Am);
    this.applicationData.applicant.factAddressObj.regionForShow =
      this.applicationData.applicant.factAddressObj.region ||
      this.getLocalizationName(this.applicationData.applicant.factAddressObj.dirRegion, ELanguage.Am);
    this.applicationData.applicant.factAddressObj.residenceForShow =
      this.applicationData.applicant.factAddressObj.residence ||
      this.getLocalizationName(this.applicationData.applicant.factAddressObj.dirResidence, ELanguage.Am);
  }

  private updateAddresses = (): void => {
    if (this.fullForm) {
      const regAddressControl = this.fullForm.get(this.FullFormGroupKeys.RegAddress) as FormGroup;
      const factAddressControl = this.fullForm.get(this.FullFormGroupKeys.FactAddress) as FormGroup;
      this.formGroupService.updateFormValues(
        this.applicationData,
        factAddressControl,
        this.fullFormConfig[this.FullFormGroupKeys.FactAddress],
        false,
        true
      );
    }
  };

  private validateCalculateProduct = (): boolean => {
    let valid = true;
    const productCode = this.selectedMatrix.product.code as any;
    const controlName = this.isRefMix ? 'creditSum' : this.isTopUp ? 'creditSumTopUp' : 'preapproveCalcCreditSum';
    const calcCreditSum = this.fullForm.get(FullFormGroupKeys.Brms2).get(controlName).value;

    const msgTip = this.isTopUp ? '' : 'хотя бы';
    const msg = `Необходимо заполнить поле “Тип отлагательных условий“
      ${msgTip} для одного кредита в таблице “Отлагательные условия“ для продукта “${
      this.selectedMatrix.product.nameRu
    }“`;

    if (
      [MatrixProductType.REFINANCING, MatrixProductType.REFINANCING_MIX, MatrixProductType.TOPUP].includes(
        productCode
      ) &&
      !calcCreditSum
    ) {
      valid = false;
    }

    if ([MatrixProductType.LOAN_BUYOUT].includes(productCode)) {
      const typedArray = this.suspensiveConditionsListFiltered.filter(el => !!el.typeId && el.typeId === 2);
      valid = !!typedArray.length;
    }

    if (!valid) {
      this.toastService.viewMsg(msg, 'error');
      return valid;
    }
    return true;
  };

  private checkMatrixType = (): void => {
    const code = this.selectedMatrix.product.code;
    this.filterSuspensiveConditionsList();

    if ([MatrixProductType.REFINANCING, MatrixProductType.REFINANCING_MIX].includes(code as any)) {
      // isRefinancing
      this.calculateMaxCreditSum(1);
      this.setConditionTypesOptions(1);
    } else if (code === MatrixProductType.LOAN_BUYOUT) {
      this.calculateMaxCreditSum(2);
      this.setConditionTypesOptions(2);
    } else if (this.isTopUp) {
      this.calculateMaxCreditSum(3);
      this.setConditionTypesOptions(3);
    }
  };

  private filterSuspensiveConditionsList = (): void => {
    const code = this.selectedMatrix && this.selectedMatrix.product.code;

    if (this.isRefMix || this.isRef) {
      // isRefinancing
      this.suspensiveConditionsListFiltered = this.suspensiveConditionsList.filter(el => el.isRefinancing);
    } else if (this.isLoanByuOut) {
      this.suspensiveConditionsListFiltered = this.suspensiveConditionsList.filter(el => el.isRepayment);
    } else if (this.isTopUp) {
      this.suspensiveConditionsListFiltered = this.suspensiveConditionsList.filter(el => el.isTopup);
    } else {
      this.suspensiveConditionsListFiltered = [];
    }

    this.choosePreapproveBtnDisabled = false;
  };

  private setTopUpValues = (data: ApplicantLoanDto): void => {
    if (data) {
      const topUp = this.selectedMatrix.topUps.find(el => {
        el.isSelected = false;
        if (el.applicantLoanId === data.id) {
          el.isSelected = !!data.typeId;
          return !!data.typeId;
        }
      });

      const preapproveCalcCreditSumControl = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum');
      const calcCreditSumControl = this.fullForm.get(FullFormGroupKeys.Brms2).get('creditSumTopUp');
      const preapproveCalcCreditTermControl = this.fullForm
        .get(FullFormGroupKeys.Brms2)
        .get('preapproveCalcCreditTerm');
      if (topUp) {
        const remainder = data.isCreditLine ? data.amount : data.remainder;

        calcCreditSumControl.setValue(Math.ceil(remainder));
        const sum = topUp.maxLimit - Math.ceil(remainder);
        preapproveCalcCreditSumControl.setValue(Math.ceil(sum));
        preapproveCalcCreditSumControl.setValidators(maxLimitSumValidator(Math.ceil(sum)));
        preapproveCalcCreditSumControl.updateValueAndValidity();

        preapproveCalcCreditTermControl.setValue(topUp.creditTerm);
      } else {
        preapproveCalcCreditSumControl.reset();
        calcCreditSumControl.reset();
      }
    }
  };

  private setConditionTypesOptions = (id: number): void => {
    this.optionsList = {
      ...this.optionsList,
      SuspensiveConditionsTypesFiltered: this.optionsList[OptionListNames.SuspensiveConditionsTypes].filter(
        el => el.id === id
      )
    };
  };

  private calculateMaxCreditSum = (type: number): boolean => {
    const controlName = this.isRefMix || this.isLoanByuOut ? 'creditSum' : 'preapproveCalcCreditSum';
    const calcCreditSumControl = this.fullForm.get(FullFormGroupKeys.Brms2).get(controlName);

    const typedArray = this.suspensiveConditionsListFiltered.filter(el => !!el.typeId && el.typeId === type);

    if (!this.isTopUp) {
      const sum = typedArray.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.isCreditLine ? currentValue.amount : currentValue.remainder);
      }, 0);

      // const roundSum = !!sum ? Math.ceil(sum) : 0;
      const roundSum = !!sum && this.isRefMix ? sum.toFixed(2) : Math.ceil(sum) || 0;

      const msgType = ['', 'рефинансирования', 'выкупа'];

      if (this.matrixCreditLimit < roundSum) {
        this.toastService.viewMsg(
          `Сумма остатков выбранных для ${msgType[type]} кредитов
      ${roundSum} (рассчитанное значение) превышает лимит ${this.matrixCreditLimit}.`,
          'error'
        );
        return false;
      }

      // if(!!sum && !Number.isInteger(sum)) {
      //   sum = sum.toFixed(2) as any;
      // }
      // if (!this.isLoanByuOut) {
      calcCreditSumControl.setValue(roundSum);
      // }

      if (!this.isRefMix) {
        calcCreditSumControl.disable();
      }

      // if(this.isLoanByuOut) {
      // if(!typedArray.length) {
      //   calcCreditSumControl.disable();
      // } else {
      //   calcCreditSumControl.enable();
      // }
      // }
    } else {
      if (typedArray.length > 1) {
        this.toastService.viewMsg(`Только один кредит может быть выбран для top-up`, 'error');
        return false;
      } else {
        this.setTopUpValues(typedArray[0]);
      }
    }

    return true;
  };

  private remiveCreditValidatorIfMilitary = (): void => {
    if (this.isClientMilitary) {
      const calculateForm = this.fullForm.get(FullFormGroupKeys.Brms2);
      calculateForm.get('preapproveCalcCreditSum').clearValidators();
      calculateForm.get('preapproveCalcCreditSum').updateValueAndValidity();
      calculateForm.get('preapproveCalcCreditTerm').clearValidators();
      calculateForm.get('preapproveCalcCreditTerm').updateValueAndValidity();
    }

    if (!this.isFactAddressShow) {
      this.fullForm.get(this.FullFormGroupKeys.FactAddress).disable();
    }
  };

  private showAllInnDuplicates = (list: DirCorpCompanyDto[]): void => {
    if (list.length > 1) {
      const dialogRef = this.dialog
        .open(InnCompanyDuplecatesModalComponent, {
          width: '50%',
          height: '50%',
          panelClass: 'custom-panel-cls',
          data: list
        })
        .afterClosed()
        .subscribe(res => {
          if (res !== 'close') {
            this.updateCorpCompanyInTable(res);
          }
        });
    } else {
      this.updateCorpCompanyInTable(list[0]);
    }
  };

  private updateCorpCompanyInTable = (data: DirCorpCompanyDto): void => {
    if (data) {
      data.name = data.nameAm || data.nameRu;
      this.updateApplicantIncomeRow$.next({
        corpCompanyId: data.id,
        name: data.name,
        inn: data.inn,
        segment: data.segment,
        code: data.code,
        industry: data.industry
      });
    }
  };

  private setFinalProductInfoIfTopUp(matrix: BRMSMatrixDto) {
    if (this.isTopUp && matrix) {
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
      data: { applicationId: this.applicationData.id }
    });
  }

  private fetchApplicantLoanFiltered() {
    this.applicantLoanControllerService
      .applicantLoanFiltered(this.applicationData.id)
      .pipe(
        tap(data => {
          this.suspensiveConditionsList = [];
          data.forEach((item: ApplicantLoanDto) => {
            this.suspensiveConditionsList.push(new ApplicantLoanDto(item));
          });
          this.filterSuspensiveConditionsList();
        })
      )
      .subscribe();
  }

  private setPhoneCodesValidator() {
    if (!this.applicationData.applicant.mobilePhone) {
      const phoneControl = this.fullForm.get([FullFormGroupKeys.ClientCommunication]).get('mobilePhone');
      this.directoriesService.getPhoneCodes().subscribe(data => {
        const phoneValidationCod = `^((?:${data.join('|')}))`;
        phoneControl.setValidators([
          Validators.required,
          validateByPattern('^[0-9]{8}$', InputErrorKeys.IncorrectData8),
          validateByPattern(phoneValidationCod, InputErrorKeys.PhoneCodeFormat)
        ]);
        phoneControl.updateValueAndValidity();
      });
    }
  }

  private setApplicantIncomeTableHeaders = (): void => {
    if (this.credentialsService.isCreditManager) {
      this.applicantIncomeTableHeaders = APPLICANT_INCOME_TABLE_HEADERS.filter(el => el.code !== 'income');
    }
  };

  private clearAndFetchApplicantLoan(callBack?: () => void) {
    this.suspensiveConditionsList = [];
    this.applicantLoanControllerService
      .clearSuspensive(this.applicationData.id)
      .pipe(
        tap(data => {
          data.forEach((item: ApplicantLoanDto) => {
            this.suspensiveConditionsList.push(new ApplicantLoanDto(item));
          });
          // this.filterSuspensiveConditionsList();
          if (callBack) {
            callBack();
          }
        })
      )
      .subscribe();
  }
}

export function maxLimitSumValidator(limit: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value > limit) {
      return { [InputErrorKeys.IncorrectMaxLimit]: true };
    }
    return null;
  };
}

export function roundFloatNumber(sum: number): number {
  if (!!sum && !Number.isInteger(sum)) {
    return +sum.toFixed(2) as number;
  } else {
    return sum;
  }
}
