import { CompanyStatus } from './../../../_models/api-models/company-status';
import { Company, CompanyDto } from './../../../_models/api-models/company';
import { ApplicantDto } from '../../../_models/api-models/applicant';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  AcbLiabilityDto,
  ApplicantIncomeGetDto,
  ApplicantIncomePostDto,
  ApplicantLoanGetDto,
  ApplicantLoanPostDto,
  Application,
  ApplicationDto,
  BaseFormField,
  CommentDto,
  CreditInfo,
  Dir,
  DirAbsCode,
  DirCountry,
  Directory,
  DirStatus,
  EditableTableHeader,
  EInputType,
  ELocalNames,
  Guarantee,
  Liability,
  OptionListNames,
  ProductRes,
  TableData,
  UserDto,
  ValueType
} from '@app/_models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { untilDestroyed } from '@app/core';
import { MatDialog } from '@angular/material';
import {
  ApplicationControllerService,
  Brms2MatrixFrontControllerService,
  Brms4MatrixFrontControllerService
} from '@app/api';
import { CreditInfoControllerService } from '@app/api/credit-info-controller.service';
import { combineLatest, forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
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
  CREDIT_INFO_NAME_PROPS,
  POSSIBLE_CREDIT_PROPS,
  POSSIBLE_CREDIT_PROPS_WITH_REF,
  PRODUCT_NAME_PROPS,
  REFINANCE_PROPS
} from './constants/data-form-constants';
import { DeclineReasonModalComponent } from '@app/shared/modals/decline-reason-modal/decline-reason-modal.component';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { RouterURLService } from '@app/services/routerURL.service';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { CURRENCY_NAME, ELanguage } from '@app/constants/language';
import { CREDIT_TYPE } from '@app/constants/credit-type';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { FormGroupService } from '@app/services/form-group.service';
import {
  FULL_FORM,
  FULL_FORM_INCOME,
  FULL_FORM_MATRIX,
  FULL_FORM_TITLES,
  FullFormGroup,
  FullFormGroupKeys
} from './constants/data-form-config';
import { BRMS2MatrixDto, BRMS4Matrix } from '@app/_models/api-models/brms';
import { TableDataProcessingService } from './services/table-data-processing.service';
import { MatrixUtilService } from './services/matrix-util.service';
import * as _ from 'lodash';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import { CompanyControllerService } from '@app/api/company-controller.service';
import { ADD_COMPANY_FULL_FORM } from './constants/add-company-config';
import Swal from "sweetalert2";

type Options = Dir | DirStatus | Directory | ProductRes | DirAbsCode | DirCountry | Company | CompanyStatus;
type TableDataOptions = ApplicantLoanPostDto | ApplicantLoanGetDto | ApplicantIncomePostDto | ApplicantIncomeGetDto;

@Component({
  selector: 'ng-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['../../common-tabs-scss/full-form-common.component.scss'],
  providers: [TableDataProcessingService, MatrixUtilService]
})
export class DataFormComponent implements OnInit, OnChanges, OnDestroy {
  fullForm: FormGroup;
  chatUnderManagerList: CommentDto[];
  userData: UserDto;
  pageForSelect: number;

  totalCount: number = 0;
  itemLimit: number = 20;
  selectedPage: number = 0;
  footerConfigSource = 'common.dataForm';

  phonePrefix: string = '';
  isCancelRoleAvail: boolean = false;
  isDeclineReasonVisible: boolean = false;
  isNewMessageExists: boolean = false;
  isRefAcbLiabilityExists: boolean = false;
  isChangesAccepted: boolean = false;
  isCalculateButtonDisabled: boolean = true;
  isAcceptButtonDisabled: boolean = true;
  isProductAccepted: boolean = false;
  isChosenProductError: boolean = false;
  isGraceInterestToggleVisible: boolean = false;
  isWithRef: boolean = false;
  isWithProduct: number = null;
  isCalculateButtonPressed: boolean = false;
  isCalculatePreapproveCredit: boolean = false;

  isLoading: boolean = false;
  submitted: boolean = false;
  toggleIsBasicChecked: boolean = false;
  selectedDeclineReasonId: number;

  titles: Record<string, string> = FULL_FORM_TITLES;
  fullFormConfig: FullFormGroup = FULL_FORM;
  incomeConfig: BaseFormField[] = FULL_FORM_INCOME;
  matrixConfig: BaseFormField[] = FULL_FORM_MATRIX;
  fullFormConfigKeys: string[] = Object.keys(this.fullFormConfig);
  creditType: Record<string, string> = CREDIT_TYPE;
  FullFormGroupKeys = FullFormGroupKeys;
  currency = CURRENCY_NAME;
  EInputType = EInputType;
  ValueType = ValueType;

  applicantLoanPostDto: ApplicantLoanPostDto[] = [];
  applicantGuarantorLoanPostDto: ApplicantLoanPostDto[] = [];
  applicantIncomePostDto: ApplicantIncomePostDto[] = [];

  applicantLoanTableHeaders: EditableTableHeader[] = APPLICANT_LOAN_TABLE_HEADERS;
  applicantGuarantorLoanTableHeaders: EditableTableHeader[] = APPLICANT_GUARANTOR_TABLE_HEADERS;
  applicantIncomeTableHeaders: EditableTableHeader[] = APPLICANT_INCOME_TABLE_HEADERS;

  // col chosen
  preapprove2CreditColInfoData: TableData<BRMS2MatrixDto | BRMS4Matrix> = new TableData(POSSIBLE_CREDIT_PROPS, []);
  calcProductColumnTableData: TableData<BRMS2MatrixDto> = new TableData(PRODUCT_NAME_PROPS, []);
  refinanceColumnTableData: TableData<AcbLiabilityDto> = new TableData(REFINANCE_PROPS, []);
  chosenProductColumnTableData: TableData<BRMS2MatrixDto | CreditInfo> = new TableData(PRODUCT_NAME_PROPS, []);

  chosenPreApprovedCreditMatrix: BRMS2MatrixDto | null;
  chosenRefinanceList: AcbLiabilityDto[] = [];
  finalProduct: BRMS2MatrixDto[] = [];
  approvedMatrix: BRMS2MatrixDto[] = [];

  activeCreditArr: Liability[] = [];
  guaranteeArr: Guarantee[] = [];

  public optionsList: Record<string, Options[]> = {
    [OptionListNames.Banks]: [],
    [OptionListNames.Product]: [],
    [OptionListNames.Currencies]: [],
    [OptionListNames.Gender]: [],
    [OptionListNames.Countries]: [],
    [OptionListNames.Cities]: [],
    [OptionListNames.Companies]: [],
    [OptionListNames.CompanyActivityType]: [],
    [OptionListNames.JobPositionType]: [],
    [OptionListNames.IncomeType]: [],
    [OptionListNames.IncomeFrequency]: [],
    [OptionListNames.CreditPurpose]: [],
    [OptionListNames.DeclineReasons]: [],
    [OptionListNames.CompanyStatus]: []
  };

  @Input() applicationData: Application;
  @Input() applicantIncome: ApplicantIncomeGetDto[];
  @Input() applicantLoan: ApplicantLoanGetDto[];

  @Input() managerInfo: UserDto;
  @Input() readonlyForm: boolean = false;
  @Input() isMenuVisible: boolean;
  @Input() language: string;

  private validityDateVal: Date;
  private declineReasonsCallCenter: Dir[] = [];
  private declineReasonsManager: Dir[] = [];
  private userName: string = null;
  private isMatrixCalculating: boolean = false;

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private banks$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.bank)));
  private currencies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.currencies)));
  private countries$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.countries)));
  private cities$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.cities)));
  private companies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.companies)));
  private companyActivityType$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.employmentActivity))
  );
  private jobPositionType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.jobPositionType)));
  private incomeType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeType)));
  private incomeFrequency$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeFrequency)));
  private products$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.productCategories)));
  private gender$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.gender)));
  private creditPurpose$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.creditPurpose)));
  private declineReasons$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.declineReasons)));
  private declineReasonsCallCenter$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.declineReasonsCallCenter))
  );
  private companyStatuses$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.companyStatuses)));

  constructor(
    private _store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastService: ToastService,
    private tocService: TocService,
    private chatUnderManagerService: ChatUnderManagerControllerService,
    private creditInfoControllerService: CreditInfoControllerService,
    private applicationControllerService: ApplicationControllerService,
    private applicantControllerService: ApplicantControllerService,
    private credentialsService: CredentialsService,
    private brms2MatrixService: Brms2MatrixFrontControllerService,
    private tableDataProcessingService: TableDataProcessingService,
    private matrixUtilService: MatrixUtilService,
    private routerURLService: RouterURLService,
    private formGroupService: FormGroupService<any, Options>,
    private companyService: CompanyControllerService,
    private brms4MatrixFrontService: Brms4MatrixFrontControllerService,
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
  }

  ngOnInit() {
    this.filterIncomeConfigByRoles();
    this.getDirectories();
    this.createForm();
    this.transformApplicantIncomeObj(this.applicantIncome);
    this.transformApplicantLoanObj(this.applicantLoan);

    this.getPreApprovedMatrix(this.isWithRef);
    this.setChosenProductTableData();
    this.checkReadonly();
    this.setTotalExpInitialValue();
    this.setPhonePrefix();
    this.setChatInfo();
    this.checkDeclineReason();
    this.changeGraceInterestToggleVisibility(this.applicationData.chosenCreditInfo);
    this.createNumberOfEnrolmentSubscription();
  }

  ngOnDestroy(): void {
    this.tocService.resetScrollSpyInfo();
  }

  saveRow(rowValue: TableDataOptions, groupName: string) {
    if (groupName === FullFormGroupKeys.IncomeInfo) {
      rowValue = { ...rowValue, jobExp: 36 };
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
    this.tableDataProcessingService
      .editedRow(rowValue, groupName)
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
    if (groupName === FullFormGroupKeys.IncomeInfo) {
      return this.tableDataProcessingService.updateIncomeInfo(this.applicationData, 'FULL_FORM');
    } else {
      return this.tableDataProcessingService.updateCreditDetailsInfo(this.applicationData, 'FULL_FORM');
    }
  }

  saveEditRowSuccessCallback(value: [], groupName: string) {
    this.toastService.viewMsg('SuccessMessage.Added', 'success');
    if (groupName === FullFormGroupKeys.IncomeInfo) {
      this.transformApplicantIncomeObj(value);
      if (!this.toggleIsBasicChecked && value.length) {
        this.toastService.viewMsg('ErrorMessage.BasicChecked', 'warning');
      }
    } else {
      this.transformApplicantLoanObj(value);
    }
    this.reCalculate();
  }

  choosePreapprove2Credit(matrix: BRMS2MatrixDto) {
    this.changeGraceInterestToggleVisibility(matrix);

    if (!!matrix.product) {
      const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('matrixProduct');
      control.setValue(this.language === ELanguage.Ge ? matrix.product.nameGe : matrix.product.nameRu);
    }

    if (!!matrix.creditSum) {
      const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum');
      control.setValue(matrix.creditSum);
      control.enable();
    }

    if (!!matrix.creditTerm) {
      const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditTerm');
      control.setValue(matrix.creditTerm);
      control.enable();
    }

    if (!!matrix.gracePeriod) {
      const control = this.fullForm.get(FullFormGroupKeys.Brms2).get('gracePeriod');
      //control.setValue(matrix.gracePeriod);
      control.setValue(0);
      control.enable();
    }

    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('isGraceInterest')
      .enable();

    this.chosenPreApprovedCreditMatrix = Object.assign({}, matrix);

    this.isRefAcbLiabilityExists = this.matrixUtilService.isNotNullMatrixExist(matrix);

    if (!!this.isRefAcbLiabilityExists) {
      this.fullForm
        .get(FullFormGroupKeys.Brms2)
        .get('freshMoney')
        .setValue(matrix.freshMoney);
      this.refinanceColumnTableData = new TableData(REFINANCE_PROPS, this.setNotNullMatrixArr(matrix));
      this.chosenRefinanceList = this.setNotNullMatrixArr(matrix);

      this.chosenRefinanceList.forEach((dto: AcbLiabilityDto) => {
        dto.selected = false;
      });
    } else if (!this.isRefAcbLiabilityExists) {
      this.refinanceColumnTableData = new TableData(REFINANCE_PROPS, []);
    }

    this.isCalculateButtonDisabled = false;
  }

  calculatePreapproveCredit() {
    if (this.fullForm.get(FullFormGroupKeys.Brms2).invalid) {
      return;
    }

    this.isCalculateButtonPressed = true;
    if (!!this.chosenPreApprovedCreditMatrix) {

      this.toastService.viewInfo('InfoMessage.ApplicationProcessed', 'warning');
      this.isCalculatePreapproveCredit = true;

      const transformedMatrix: BRMS2MatrixDto = this.transformMatrixIntoBRMS2MatrixType(
        this.chosenPreApprovedCreditMatrix
      );
      this.brms2MatrixService
        .calculateMatrix(this.applicationData.id, transformedMatrix)
        .pipe(untilDestroyed(this))
        .subscribe((matrix: BRMS2MatrixDto) => {
          if (!!matrix) {
            this.finalProduct = [matrix];
            this.isAcceptButtonDisabled = false;
            this.calcProductColumnTableData = new TableData(PRODUCT_NAME_PROPS, [matrix]);
          } else {
            this.finalProduct = [];
            this.calcProductColumnTableData = new TableData(PRODUCT_NAME_PROPS, []);
            this.isAcceptButtonDisabled = true;
          }
          this.isCalculatePreapproveCredit = false;
          Swal.close();
          this.toastService.viewMsg('SuccessMessage.ProcessComplete', 'success')
        });
    }
  }
  changeGraceInterestToggleVisibility(matrix: BRMS2MatrixDto | CreditInfo) {
    if (matrix) {
      this.isGraceInterestToggleVisible = matrix.product.isComRestr || matrix.product.isForcedRestr;
    } else {
      this.isGraceInterestToggleVisible = !!this.applicationData.chosenCreditInfo;
    }
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
        .calculateMatrix(this.applicationData.id, this.calcRefinanceList(this.chosenRefinanceList))
        .pipe(untilDestroyed(this))
        .subscribe((matrix: BRMS2MatrixDto) => {
          if (!!matrix) {
            this.finalProduct = [matrix];
            this.calcProductColumnTableData = new TableData(PRODUCT_NAME_PROPS, [matrix]);
            this.isAcceptButtonDisabled = false;
          } else {
            this.finalProduct = [];
            this.calcProductColumnTableData = new TableData(PRODUCT_NAME_PROPS, []);
            this.isAcceptButtonDisabled = true;
          }
        });
    }
  }

  acceptChanges() {
    this.isCalculateButtonPressed = false;
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
      .get('gracePeriod')
      .disable();

    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('isGraceInterest')
      .disable();

    this.chosenProductColumnTableData = new TableData(PRODUCT_NAME_PROPS, this.finalProduct);
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

    this.refinanceColumnTableData = new TableData(REFINANCE_PROPS, []);
    this.calcProductColumnTableData = new TableData(PRODUCT_NAME_PROPS, []);
    this.chosenProductColumnTableData = new TableData(PRODUCT_NAME_PROPS, []);

    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('preapproveCalcCreditSum')
      .reset();
    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('preapproveCalcCreditTerm')
      .reset();
    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('gracePeriod')
      .reset();
    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('isGraceInterest')
      .reset();

    this.isGraceInterestToggleVisible = false;

    this.fullForm
      .get(FullFormGroupKeys.Brms2)
      .get('chosenProduct')
      .setErrors(null);
  }

  reCalculate() {
    setTimeout(() => {
      this.isLoading = true;
    });

    this.isMatrixCalculating = true;
    this.preapprove2CreditColInfoData = new TableData(
      !this.isWithRef ? POSSIBLE_CREDIT_PROPS : POSSIBLE_CREDIT_PROPS_WITH_REF,
      []
    );
    this.brms4MatrixFrontService
      .calculateMatrix(
        this.applicationData.id.toString(),
        this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('fullFormIncome').value,
        null,
        this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('numberOfEnrolment').value
      )
      .subscribe(res => {
        this.approvedMatrix = res;
        this.preapprove2CreditColInfoData = new TableData(
          !this.isWithRef ? POSSIBLE_CREDIT_PROPS : POSSIBLE_CREDIT_PROPS_WITH_REF,
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

  loadCommentToSopiokChat(comment: string) {
    this.chatUnderManagerService
      .save({
        applicationId: this.applicationData.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  submitForm() {
    this.submitted = true;

    if (!this.toggleIsBasicChecked && this.applicantIncomePostDto.length) {
      this.toastService.viewMsg('ErrorMessage.BasicChecked', 'warning');
      return;
    }

    if (this.fullForm.invalid) {
      this.scrollToFirstInvalid();
      return;
    } else if (!this.isProductAccepted) {
      this.toastService.viewMsg('ErrorMessage.NoAcceptedCreditInfo', 'warning');
      return;
    }

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
      this.updateCreditInfo(),
      this.updateChosenCreditInfo(this.finalProduct[0])
    ]).pipe(
      switchMap(([applicantId, requestedCreditInfoId, chosenCreditInfo]) => {
        return this.updateApplication(applicantId, requestedCreditInfoId);
      }),
      catchError(err => {
        this.isLoading = false;
        return throwError(err);
      })
    );
  }

  updateApplicant(): Observable<number> {
    const applicantDto: ApplicantDto = new ApplicantDto(this.applicationData.applicant);
    return this.applicantControllerService.update({
      ...applicantDto,
      factAddressObj: this.fullForm.getRawValue()[FullFormGroupKeys.FactAddress],
      fullFormIncome: this.fullForm.getRawValue()[FullFormGroupKeys.IncomeInfo].fullFormIncome,
      numberOfEnrolment: this.fullForm.getRawValue()[FullFormGroupKeys.IncomeInfo].numberOfEnrolment,
      totalJobExp: this.fullForm.getRawValue()[FullFormGroupKeys.IncomeInfo].totalJobExp
    });
  }

  updateCreditInfo(): Observable<number> {
    return this.creditInfoControllerService.update({
      ...this.fullForm.getRawValue()[FullFormGroupKeys.CreditInfo],
      dirCurrencyId: this.applicationData.requestedCreditInfo.dirCurrency.id,
      applicationId: this.applicationData.id,
      id: this.applicationData.requestedCreditInfo.id
    });
  }

  updateChosenCreditInfo(finalMatrix: BRMS2MatrixDto): Observable<number> {
    return finalMatrix !== null && finalMatrix !== undefined && finalMatrix.creditInfoId !== null
      ? this.creditInfoControllerService.updateCreditInfo({
          isGraceInterest: this.fullForm.get(FullFormGroupKeys.Brms2).get('isGraceInterest').value,
          id: finalMatrix.creditInfoId
        })
      : of(null);
  }

  updateApplication(applicantId: number, requestedCreditInfoId: number): Observable<ApplicationDto> {
    const appData: ApplicationDto = new ApplicationDto(this.applicationData);
    return this.applicationControllerService.update({
      ...appData,
      applicantId,
      requestedCreditInfoId,
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

  private createNumberOfEnrolmentSubscription() {
    this.fullForm
      .get(FullFormGroupKeys.IncomeInfo)
      .get('numberOfEnrolment')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: number) => {
        if (value && !this.isMatrixCalculating && this.fullForm.get(FullFormGroupKeys.IncomeInfo).valid && !this.readonlyForm) {
          this.reCalculate();
        }
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
    this.fullForm = this.formBuilder.group({});
    this.fullFormConfigKeys.forEach((key: string) => {
      const controls: FormGroup = this.formGroupService.createForm(
        this.applicationData,
        this.fullFormConfig[key],
        this.optionsList
      );
      this.fullForm.addControl(key, controls);
    });

    const matrixControls: FormGroup = this.formGroupService.createForm(this.applicationData, this.matrixConfig, null);
    const incomeControls: FormGroup = this.formGroupService.createForm(
      this.applicationData.applicant,
      this.incomeConfig,
      null
    );

    this.fullForm.addControl(FullFormGroupKeys.Brms2, matrixControls);
    this.fullForm.addControl(FullFormGroupKeys.IncomeInfo, incomeControls);
  }

  private setToggleIsBasicChecked(applicantIncome) {
    this.toggleIsBasicChecked = false;
    applicantIncome.forEach(item => {
      if (item.isBasic) {
        this.toggleIsBasicChecked = true;
      }
    });
  }

  private transformApplicantIncomeObj(applicantIncome: ApplicantIncomeGetDto[]) {
      this.applicantIncome = applicantIncome;

    if (applicantIncome) {
      this.setToggleIsBasicChecked(applicantIncome);
      this.applicantIncomePostDto = applicantIncome.map(
        (item: ApplicantIncomeGetDto) => new ApplicantIncomePostDto(item)
      );
      this.getTotalIncomeValue(this.applicantIncomePostDto);
    }
  }

  private transformApplicantLoanObj(applicantLoan: ApplicantLoanGetDto[]) {
    this.applicantLoanPostDto = [];
    this.applicantGuarantorLoanPostDto = [];

    if (applicantLoan) {
      applicantLoan.forEach((item: ApplicantLoanGetDto) => {
        item.isBorrower
          ? this.applicantLoanPostDto.push(new ApplicantLoanPostDto(item))
          : this.applicantGuarantorLoanPostDto.push(new ApplicantLoanPostDto(item));
      });
    }
  }

  private filterIncomeConfigByRoles(): void {
    this.incomeConfig = this.incomeConfig.filter((filed: BaseFormField) => {
      if (filed.visibleForRolesList) {
        return this.credentialsService.checkRoles(filed.visibleForRolesList);
      }

      return true;
    });
  }

  private getTotalIncomeValue(applicantIncome: ApplicantIncomePostDto[]) {
    let totalIncome = 0;
    applicantIncome.forEach((incomeItem: ApplicantIncomePostDto) => {
      totalIncome += +incomeItem.amountGEL;
    });
    this.setTotalIncomeValue(totalIncome);
  }

  private setTotalIncomeValue(totalIncome: number) {
    this.fullForm
      .get(FullFormGroupKeys.IncomeInfo)
      .get('fullFormIncome')
      .setValue(+totalIncome.toFixed(2));
  }

  private setTotalExpInitialValue() {
    const totalJobExpControl = this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('totalJobExp');

    if (!!totalJobExpControl && !totalJobExpControl.value) {
      totalJobExpControl.setValue(
        this.tableDataProcessingService.getJobExpDefaultValueByApplicantAge(this.applicationData.applicant)
      );
    }
  }

  getPreApprovedMatrix(isWithRef: boolean) {
    this.isWithRef = isWithRef;
    this.brms2MatrixService
      .getPreapproveMatrix(this.applicationData.id.toString())
      .pipe(untilDestroyed(this))
      .subscribe((matrix: BRMS2MatrixDto[]) => {
        this.approvedMatrix = matrix;
        this.preapprove2CreditColInfoData = new TableData(
          !this.isWithRef ? POSSIBLE_CREDIT_PROPS : POSSIBLE_CREDIT_PROPS_WITH_REF,
          this.matrixUtilService.filterMatrix(matrix, this.isWithRef, this.isWithProduct)
        );
      });
  }

  private setChosenProductTableData() {
    if (!!this.applicationData && !!this.applicationData.chosenCreditInfo) {
      this.isProductAccepted = true;
      this.chosenProductColumnTableData = new TableData(CREDIT_INFO_NAME_PROPS, [
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
      this.cities$,
      this.companies$,
      this.companyActivityType$,
      this.jobPositionType$,
      this.incomeType$,
      this.incomeFrequency$,
      this.products$,
      this.gender$,
      this.creditPurpose$,
      this.declineReasons$,
      this.declineReasonsCallCenter$,
      this.companyStatuses$
    ])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          banks,
          selectedUserData,
          currencies,
          countries,
          cities,
          companies,
          companyActivityTypes,
          jobPositionType,
          incomeType,
          incomeFrequency,
          productCategories,
          gender,
          creditPurpose,
          declineReasons,
          declineReasonsCallCenter,
          companyStatuses
        ]) => {
          this.setCurrentUserData<UserDto>(selectedUserData);
          this.optionsList[OptionListNames.Banks] = getOnlyActiveItems<Dir>(banks);
          this.optionsList[OptionListNames.Currencies] = getOnlyActiveItems<Dir>(currencies);
          this.optionsList[OptionListNames.Countries] = getOnlyActiveItems<DirCountry>(countries);
          this.optionsList[OptionListNames.Cities] = getOnlyActiveItems<DirCountry>(cities);
          this.optionsList[OptionListNames.Companies] = companies;
          this.optionsList[OptionListNames.CompanyActivityType] = getOnlyActiveItems<DirCountry>(companyActivityTypes);
          this.optionsList[OptionListNames.JobPositionType] = getOnlyActiveItems<DirCountry>(jobPositionType);
          this.optionsList[OptionListNames.IncomeType] = getOnlyActiveItems<DirCountry>(incomeType);
          this.optionsList[OptionListNames.IncomeFrequency] = getOnlyActiveItems<DirCountry>(incomeFrequency);
          this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductRes>(productCategories);
          this.optionsList[OptionListNames.Gender] = gender;
          this.optionsList[OptionListNames.CreditPurpose] = getOnlyActiveItems<Directory>(creditPurpose);
          this.optionsList[OptionListNames.CompanyStatus] = getOnlyActiveItems<CompanyStatus>(companyStatuses);
          this.declineReasonsManager = getOnlyActiveItems<Dir>(declineReasons);
          this.declineReasonsCallCenter = getOnlyActiveItems<Dir>(declineReasonsCallCenter);
          this.setDeclineReasons();
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

  private setPhonePrefix() {
    if (!!this.applicationData && !!this.applicationData.applicant.employment.phone) {
      this.phonePrefix = '+';
    }
  }

  private transformMatrixIntoBRMS2MatrixType(matrix: BRMS2MatrixDto): BRMS2MatrixDto {
    const assignObj = Object.assign({}, matrix);
    const refObj = this.matrixUtilService.transformFromLiabilityToLiabilityId(assignObj);
    this.matrixUtilService.deleteRefLiabilityKeys(assignObj);

    return {
      ...assignObj,
      ...refObj,
      creditSum:
        !!matrix && !!matrix.brmsMatrixConditionType
          ? this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum').value
          : '',
      creditTerm:
        !!matrix && !!matrix.brmsMatrixConditionType
          ? this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditTerm').value
          : '',
      gracePeriod:
        !!matrix && !!matrix.brmsMatrixConditionType
          ? this.fullForm.get(FullFormGroupKeys.Brms2).get('gracePeriod').value
          : '',
      freshMoney: !!this.fullForm.get(FullFormGroupKeys.Brms2).get('freshMoney').value
        ? this.fullForm.get(FullFormGroupKeys.Brms2).get('freshMoney').value
        : matrix.freshMoney,
      income: !!this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('fullFormIncome').value
        ? this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('fullFormIncome').value
        : null,
      isGraceInterest: !!this.fullForm.get(FullFormGroupKeys.Brms2).get('isGraceInterest').value
        ? this.fullForm.get(FullFormGroupKeys.Brms2).get('isGraceInterest').value
        : null
    };
  }

  private calcRefinanceList(arr: AcbLiabilityDto[]): BRMS2MatrixDto {
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

    return {
      ...assignObj,
      ...refObj,
      creditSum: this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditSum').value,
      creditTerm: this.fullForm.get(FullFormGroupKeys.Brms2).get('preapproveCalcCreditTerm').value,
      gracePeriod: this.fullForm.get(FullFormGroupKeys.Brms2).get('gracePeriod').value,
      freshMoney: this.fullForm.get(FullFormGroupKeys.Brms2).get('freshMoney').value,
      income: !!this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('fullFormIncome').value
        ? this.fullForm.get(FullFormGroupKeys.IncomeInfo).get('fullFormIncome').value
        : null
    };
  }

  private setNotNullMatrixArr(matrix: BRMS2MatrixDto) {
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

    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
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

  private checkDeclineReason() {
    if (!!this.applicationData.dirManagerDeclineReason || !!this.applicationData.dirCallCentreDeclineReason) {
      this.isDeclineReasonVisible = true;
      this.setDeclineReasonValue(this.applicationData.dirManagerDeclineReason.id);
    }
  }

  private setDeclineReasonValue(dirManagerDeclineReasonId: number) {
    this.fullForm
      .get(FullFormGroupKeys.DeclineReasons)
      .get('declineReason')
      .setValue(dirManagerDeclineReasonId);
    this.selectedDeclineReasonId = dirManagerDeclineReasonId;
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

    data.forEach((item: T) => {
      if (item[propertyName]) {
        options = [...options, item[propertyName]];
      }
    });

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
  }

  filterMatrix() {
    this.preapprove2CreditColInfoData = new TableData(
      !this.isWithRef ? POSSIBLE_CREDIT_PROPS : POSSIBLE_CREDIT_PROPS_WITH_REF,
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
}
