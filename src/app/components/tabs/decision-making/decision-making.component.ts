import * as HEADERS from '@app/components/tabs/decision-making/constants/decision-making.constants';
import * as _ from 'lodash';

import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import {
  ApplicantIncomeGetDto,
  ApplicantIncomePostDto,
  ApplicantLoanGetDto,
  ApplicantLoanPostDto,
  Application,
  BaseFormField,
  CommentDto,
  Company,
  CompanyDto,
  CompanyStatus,
  CreditInfo,
  Dir,
  DirAbsCode,
  DirCountry,
  DirStatus,
  Directory,
  EInputType,
  EditableTableHeader,
  OptionListNames,
  ProductRes,
  StopListAbsStatusDto,
  TableData,
  UserDto,
  VerificationEmployment,
  VerificationFrontDtoGet,
  VerificationPostDto,
  CreditInfoDto,
  User,
  VerificationEmploymentDto
} from '@app/_models';
import {
  ApplicationControllerService,
  Brms4MatrixFrontControllerService,
  ChatUnderLimitOwnerControllerService
} from '@app/api';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DECISION_MAKING_COMMENT,
  DECISION_MAKING_CREDIT_INFO,
  DECISION_MAKING_DECISION_MAKER_DECISION,
  DECISION_MAKING_INCOME,
  DECISION_MAKING_LIMIT_UNDER,
  DECISION_MAKING_DECLINE_REASON,
  DecisionMakingGroupKeys
} from '@app/components/tabs/decision-making/constants/decision-making.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { catchError, switchMap, take } from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, of, throwError } from 'rxjs';
import { ADD_COMPANY_DECISION_MAKING } from '../data-form/constants/add-company-config';
import { CompanyControllerService } from '@app/api/company-controller.service';
import { DecisionId } from '@app/constants/decision-id';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { FormGroupService } from '@app/services/form-group.service';
import { HistoryModalComponent } from '@app/shared/modals/history-modal/history-modal.component';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
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
import { InputErrorKeys } from '@app/constants/validators-errors';
import { CreditInfoControllerService } from '@app/api/credit-info-controller.service';
import { CredentialsService } from '@app/services/authentication';
import { BRMS4MatrixDto } from '@app/_models/api-models/brms';
import { MatrixUtilService } from '@app/components/tabs/data-form/services/matrix-util.service';
import { ChatUnderManagerControllerService } from '@app/api/chat-under-manager-controller.service';
import {ApplicantDto} from "@app/_models/api-models/applicant";
import {ApplicantControllerService} from "@app/api/applicant-controller.service";
import Swal from "sweetalert2";
import {VerificationEmploymentControllerService} from "@app/api/verification-employment-controller.service";

type Options =
  | Dir
  | DirStatus
  | Directory
  | ProductRes
  | DirAbsCode
  | DirCountry
  | Company
  | StopListAbsStatusDto
  | CompanyStatus;
type TableDataOptions = ApplicantLoanPostDto | ApplicantLoanGetDto | ApplicantIncomePostDto | ApplicantIncomeGetDto | VerificationEmployment;

@Component({
  selector: 'ng-decision-making',
  templateUrl: './decision-making.component.html',
  styleUrls: ['./decision-making.component.scss'],
  providers: [TableDataProcessingService, MatrixUtilService]
})
export class DecisionMakingComponent implements OnInit, OnDestroy {
  applicantIncomePostDto: ApplicantIncomePostDto[] = [];
  applicantLoanPostDto: ApplicantLoanPostDto[] = [];
  applicantGuarantorLoanPostDto: ApplicantLoanPostDto[] = [];
  verificationEmployments: VerificationEmployment[] = [];

  verificationEmploymentsTableHeaders: EditableTableHeader[] = HEADERS.VERIFICATION_EMPLOYMENTS_HEADERS;
  incomeInformationEditableTableHeaders: EditableTableHeader[] = HEADERS.INCOME_INFORMATION_HEADERS;
  applicantLoanTableHeaders: EditableTableHeader[] = HEADERS.LOAN_HEADERS;
  applicantGuarantorLoanTableHeaders: EditableTableHeader[] = HEADERS.GUARANTOR_TABLE_HEADERS;
  preApprovedLoanTermsInfoData: TableData<CreditInfo> = new TableData(HEADERS.PREAPPROVED_LOAN_TERMS_HEADERS, []);
  creditConditionsForConfirmedIncomeInfoData: TableData<any> = new TableData(HEADERS.CREDIT_CONDITIONS_HEADERS, []);

  incomeConfig: BaseFormField[] = DECISION_MAKING_INCOME;
  creditInfoConfig: BaseFormField[] = DECISION_MAKING_CREDIT_INFO;
  limitUnderConfig: BaseFormField[] = DECISION_MAKING_LIMIT_UNDER;
  decisionMakerDecisionConfig: BaseFormField[] = DECISION_MAKING_DECISION_MAKER_DECISION;
  declineReasonConfig: BaseFormField[] = DECISION_MAKING_DECLINE_REASON;
  commentConfig: BaseFormField[] = DECISION_MAKING_COMMENT;

  DecisionMakingGroupKeys = DecisionMakingGroupKeys;
  EInputType = EInputType;

  private addCompanyFormConfig: BaseFormField[] = ADD_COMPANY_DECISION_MAKING;
  private stopListAbsStatusList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.stopListAbsStatusList))
  );
  private banks$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.bank)));
  private companies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.companies)));
  private jobPositionType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.jobPositionType)));
  private currencies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.currencies)));
  private incomeType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeType)));
  private incomeFrequency$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.incomeFrequency)));
  private companyActivityType$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.employmentActivity))
  );
  private selectUserData$ = this._store.pipe(select(selectUserData));
  private dirDecisionMakerDecisionList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.dirDecisionMakerDecisionList))
  );
  private dirDecisionMakerDeclineReasonList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.dirDecisionMakerDeclineReasonList))
  );
  private companyStatuses$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.companyStatuses)));
  private provisionRate$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.provisionRate)));
  private products$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.productCategories)));

  pageForSelect: number;

  footerConfigSource = 'common.decisionMaking';
  itemLimit: number = 20;
  totalCount: number = 1;

  isReCalculate: boolean = false;
  isLoading: boolean = false;
  isNewMessageExists: boolean = false;
  isVisibleDeclineReason: boolean;
  isVisibleProvisionRate: boolean;
  lastValue: string;
  toggleIsBasicChecked: boolean = false;
  isWithRef: boolean = false;
  isWithProduct: number = null;
  approvedMatrix: BRMS4MatrixDto[] = [];

  chatUnderManagerList: CommentDto[];

  userData: UserDto;

  form: FormGroup;

  optionsList: Record<string, Options[]> = {
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

  @Input() applicationData: Application;
  @Input() readonlyForm: boolean = false;
  @Input() isAppInQueues: boolean = false;
  @Input() language: string;
  @Input() applicantIncome: ApplicantIncomeGetDto[];
  @Input() applicantLoan: ApplicantLoanGetDto[];
  @Input() verificationData: VerificationFrontDtoGet;

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
    private companyService: CompanyControllerService,
    private verificationService: VerificationControllerService,
    private creditInfoService: CreditInfoControllerService,
    private credentialsService: CredentialsService,
    private matrixUtilService: MatrixUtilService,
    private chatUnderManagerService: ChatUnderManagerControllerService,
    private applicantControllerService: ApplicantControllerService,
    private verificationEmploymentService: VerificationEmploymentControllerService
  ) {}

  ngOnInit() {
    this.filterConfigsByRoles(['commentConfig', 'incomeConfig']);
    this.getDirectories();
    this.createForm();
    this.transformApplicantIncomeObj(this.applicantIncome);
    this.transformApplicantLoanObj(this.applicantLoan);
    this.setTotalExpInitialValue();
    this.checkReadonly();
    this.setChatInfo();
    this.getCalculatedMatrix();

    if (this.applicationData) {
      this.preApprovedLoanTermsInfoData = new TableData(HEADERS.PREAPPROVED_LOAN_TERMS_HEADERS, [
        this.applicationData.chosenCreditInfo
      ]);
    }

    if (this.form.get('decisionMakerDecision.dirDecisionMakerDecision').value === DecisionId.decline) {
      this.isVisibleDeclineReason = true;
      this.form.get('declineReason.dirDecisionMakerDeclineReason').setValidators([Validators.required]);
      this.form.get('declineReason.dirDecisionMakerDeclineReason').updateValueAndValidity();
    }

    this.form.get('decisionMakerDecision.dirDecisionMakerDecision').valueChanges.subscribe(value => {
      if (value === DecisionId.decline) {
        this.isVisibleDeclineReason = true;
        this.form.get('declineReason.dirDecisionMakerDeclineReason').setValidators([Validators.required]);
      }
      if (value === DecisionId.return) {
        this.isVisibleDeclineReason = false;
        this.form.get('declineReason.dirDecisionMakerDeclineReason').setValidators(null);
      }
      if (value === DecisionId.approve) {
        this.isVisibleDeclineReason = false;
        this.form.get('declineReason.dirDecisionMakerDeclineReason').setValidators(null);
      }
      this.form.get('declineReason.dirDecisionMakerDeclineReason').updateValueAndValidity();
    });

    this.form.get('limitUnder.limitUnder').valueChanges.subscribe(value => {
      if (value !== this.lastValue) {
        if (value) {
          this.form
            .get('limitUnder.limitUnder')
            .setValidators(validateByPattern('^(?!$)\\d{0,8}(?:\\.\\d{1,2})?$', InputErrorKeys.Double));
          this.lastValue = value;
        } else {
          this.form.get('limitUnder.limitUnder').setValidators(null);
          this.lastValue = value;
        }
        this.form.get('limitUnder.limitUnder').updateValueAndValidity();
      }
    });

    if (
      this.applicationData.chosenCreditInfo.product.isComRestr === true ||
      this.applicationData.chosenCreditInfo.product.isForcedRestr === true
    ) {
      this.isVisibleProvisionRate = true;
    }
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
    if (this.form.valid) {
      this.isLoading = true;

      if (!this.toggleIsBasicChecked && this.applicantIncomePostDto.length) {
        this.toastService.viewMsg('ErrorMessage.BasicChecked', 'warning');
        this.isLoading = false;
        return;
      }

      this.requestsPipe()
        .pipe(
          switchMap(() => {
            return this.saveDecisionMakerDecision() // необходимо, чтобы запрос уходил после отработки запроса this.saveVerification()
          }),
          switchMap(() => {
            return this.applicationControllerService.acceptApp(this.applicationData.id.toString(), this.language)
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

    this.requestsPipe()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.toastService.viewMsg('Сохранено', 'success');
        this.navigateToDashboard();
      });
  }

  navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
  }

  onCommentClick() {
    if (!!this.isNewMessageExists && !this.readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.applicationData.id)
        .pipe(untilDestroyed(this))
        .subscribe(_ => (this.isNewMessageExists = false));
    }
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

  addCompany() {
    this.showDialog(
      {
        title: 'Modals.Title.AddCompany',
        dataInfo: null,
        formConfig: this.addCompanyFormConfig,
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

  private checkReadonly() {
    if (this.readonlyForm) {
      this.form.disable();
    }
  }

  private getCalculatedMatrix() {
    this.brms4MatrixFrontService.getCalculatedMatrix(this.applicationData.id.toString()).subscribe(res => {
      this.approvedMatrix = res;
      this.creditConditionsForConfirmedIncomeInfoData = new TableData(
        !this.isWithRef ? HEADERS.CREDIT_CONDITIONS_HEADERS : HEADERS.CREDIT_CONDITIONS_WITH_REF_HEADERS,
        this.matrixUtilService.filterMatrix(res, this.isWithRef, this.isWithProduct)
      );
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

    const incomeControls: FormGroup = this.formGroupService.createForm(
      this.applicationData.applicant,
      this.incomeConfig,
      null
    );

    const creditInfoControls: FormGroup = this.formGroupService.createForm(
      this.applicationData,
      this.creditInfoConfig,
      this.optionsList
    );

    const limitUnderControls: FormGroup = this.formGroupService.createForm(
      this.verificationData,
      this.limitUnderConfig,
      null
    );

    const decisionMakerDecisionControls: FormGroup = this.formGroupService.createForm(
      this.applicationData,
      this.decisionMakerDecisionConfig,
      this.optionsList
    );

    const declineReasonControls: FormGroup = this.formGroupService.createForm(
      this.verificationData,
      this.declineReasonConfig,
      this.optionsList
    );

    const commentControls: FormGroup = this.formGroupService.createForm(
      this.verificationData,
      this.commentConfig,
      null
    );

    this.form.addControl(DecisionMakingGroupKeys.ApplicantIncome, incomeControls);
    this.form.addControl(DecisionMakingGroupKeys.CreditInfo, creditInfoControls);
    this.form.addControl(DecisionMakingGroupKeys.LimitUnder, limitUnderControls);
    this.form.addControl(DecisionMakingGroupKeys.DecisionMakerDecision, decisionMakerDecisionControls);
    this.form.addControl(DecisionMakingGroupKeys.DeclineReason, declineReasonControls);
    this.form.addControl(DecisionMakingGroupKeys.Comment, commentControls);
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
            ...this.iterationOverConfig<ApplicantIncomeGetDto>(
              this.applicantIncome,
              this.incomeInformationEditableTableHeaders
            ),
            ...this.iterationOverConfig<VerificationEmployment>(
              this.verificationData.verificationEmployments,
              this.verificationEmploymentsTableHeaders
            )
          ]);
        });
    }
  }

  filterConfigsByRoles(configNames: string[]): void {
    configNames.forEach(configName => {
      this[configName] = this[configName].filter((filed: BaseFormField) => {
        if (filed.visibleForRolesList) {
          return this.credentialsService.checkRoles(filed.visibleForRolesList);
        }
        return true;
      });
    });
  }

  private getCompanies(page: number, oldCompanies: Company[]) {
    this.companies$.pipe(untilDestroyed(this)).subscribe((companies: Company[]) => {
      const companies1 = page
        ? _.union(
            companies,
            this.iterationOverConfig<ApplicantIncomeGetDto>(
              this.applicantIncome,
              this.incomeInformationEditableTableHeaders
            ),
          this.iterationOverConfig<VerificationEmployment>(
            this.verificationData.verificationEmployments,
            this.verificationEmploymentsTableHeaders)
          )
        : _.union(
            companies,
            oldCompanies,
            this.iterationOverConfig<ApplicantIncomeGetDto>(
              this.applicantIncome,
              this.incomeInformationEditableTableHeaders
            ),
            this.iterationOverConfig<VerificationEmployment>(
              this.verificationData.verificationEmployments,
              this.verificationEmploymentsTableHeaders
            )
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

  private setTotalExpInitialValue() {
    const totalJobExpControl = this.form.get(DecisionMakingGroupKeys.ApplicantIncome).get('totalJobExp');

    if (!!totalJobExpControl && !totalJobExpControl.value) {
      totalJobExpControl.setValue(
        this.tableDataProcessingService.getJobExpDefaultValueByApplicantAge(this.applicationData.applicant)
      );
    }
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

  private getTotalIncomeValue(applicantIncome: ApplicantIncomePostDto[]) {
    let totalIncome = 0;
    applicantIncome.forEach((incomeItem: ApplicantIncomePostDto) => {
      totalIncome += +incomeItem.amountGEL;
    });
    this.setTotalIncomeValue(totalIncome);
  }

  private setTotalIncomeValue(totalIncome: number) {
    this.form
      .get(DecisionMakingGroupKeys.ApplicantIncome)
      .get('decisionMakingIncome')
      .setValue(+totalIncome.toFixed(2));
  }

  private getDirectories() {
    combineLatest([
      this.stopListAbsStatusList$,
      this.banks$,
      this.selectUserData$,
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
      this.products$
    ])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          stopListAbsStatusList,
          banks,
          selectedUserData,
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
          products
        ]) => {
          this.optionsList[OptionListNames.StopListAbsStatusList] = getOnlyActiveItems<StopListAbsStatusDto>(
            stopListAbsStatusList
          );
          this.optionsList[OptionListNames.Banks] = getOnlyActiveItems<Dir>(banks);
          this.userData = selectedUserData || null;
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
          this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductRes>(products);

          // this.fillCompaniesSearchOptions<ApplicantIncomeGetDto>(
          //   this.applicantIncome,
          //   this.incomeInformationEditableTableHeaders,
          //   OptionListNames.Companies
          // );

          this.updateOptionsList(OptionListNames.Companies, [
            ...this.iterationOverConfig<ApplicantIncomeGetDto>(
              this.applicantIncome,
              this.incomeInformationEditableTableHeaders
            ),
            ...this.iterationOverConfig<VerificationEmployment>(
              this.verificationData.verificationEmployments,
              this.verificationEmploymentsTableHeaders)
          ]);
        }
      );
  }

  private fillCompaniesSearchOptions<T>(data: T[], tableConfig: EditableTableHeader[], optionListName: string) {
    this.updateOptionsList(optionListName, this.iterationOverConfig<T>(data, tableConfig));
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
    if (groupName === DecisionMakingGroupKeys.ApplicantIncome) {
      return this.tableDataProcessingService.updateIncomeInfo(this.applicationData, 'DECISION_MAKING');
    } else {
      return this.tableDataProcessingService.updateCreditDetailsInfo(this.applicationData, 'DECISION_MAKING');
    }
  }

  saveEditRowSuccessCallback(value: [], groupName: string) {
    this.toastService.viewMsg('SuccessMessage.Added', 'success');
    if (groupName === DecisionMakingGroupKeys.ApplicantIncome) {
      this.transformApplicantIncomeObj(value);
      if (!this.toggleIsBasicChecked && value.length) {
        this.toastService.viewMsg('ErrorMessage.BasicChecked', 'warning');
      }
    } else {
      this.transformApplicantLoanObj(value);
    }
  }

  reCalculate() {
    if (this.form.get(DecisionMakingGroupKeys.LimitUnder).invalid) {
      return;
    }

    this.toastService.viewInfo('InfoMessage.ApplicationProcessed', 'warning');
    this.isReCalculate = true;
    this.isLoading = true;

    this.brms4MatrixFrontService
      .calculateMatrix(
        this.applicationData.id.toString(),
        this.form.get(DecisionMakingGroupKeys.ApplicantIncome).get('decisionMakingIncome').value,
        this.form.get(DecisionMakingGroupKeys.LimitUnder).get('limitUnder').value,
        null
      )
      .subscribe(res => {
        this.approvedMatrix = res;
        this.creditConditionsForConfirmedIncomeInfoData = new TableData(
          !this.isWithRef ? HEADERS.CREDIT_CONDITIONS_HEADERS : HEADERS.CREDIT_CONDITIONS_WITH_REF_HEADERS,
          this.matrixUtilService.filterMatrix(res, this.isWithRef, this.isWithProduct)
        );
        this.isLoading = false;
        this.isReCalculate = false;
        Swal.close();
        this.toastService.viewMsg('SuccessMessage.ProcessComplete', 'success')
      });
  }

  requestsPipe() {
    return forkJoin([this.saveVerification(), this.updateCreditInfo(), this.updateApplicant()]).pipe(
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
      totalJobExp: this.form.getRawValue()[DecisionMakingGroupKeys.ApplicantIncome].totalJobExp,
      decisionMakingIncome: this.form.get(DecisionMakingGroupKeys.ApplicantIncome).get('decisionMakingIncome').value
    });
  }

  updateCreditInfo(): Observable<number> {
    const creditInfo = new CreditInfoDto(this.applicationData.chosenCreditInfo);
    return this.creditInfoService.update({
      ...creditInfo,
      ...this.form.getRawValue()[DecisionMakingGroupKeys.CreditInfo]
    });
  }

  saveVerification() {
    const user = new User();
    const verificationPostDto = new VerificationPostDto(this.verificationData.verification);
    const verification: VerificationPostDto = {
      ...verificationPostDto,
      comment: this.form.get('comment.comment').value,
      limitUnder: this.form.get('limitUnder.limitUnder').value,
      dirDecisionMakerDeclineReasonId: this.form.get('declineReason.dirDecisionMakerDeclineReason').value,
      decisionMaker: { ...user, ...this.userData }
    };
    const verificationEmployments: VerificationEmployment[] = this.verificationData.verificationEmployments;
    return this.verificationService.saveVerification({ verification, verificationEmployments });
  }

  saveDecisionMakerDecision() {
    const value = this.form.get('decisionMakerDecision.dirDecisionMakerDecision').value;
    if (value) {
      return this.applicationControllerService.setDecisionMakerDecision(this.applicationData.id, value);
    } else {
      return of({});
    }
  }

  saveVerificationEmployments(row: VerificationEmployment) {
    const sendCompany: VerificationEmploymentDto = {
      applicantId: this.applicationData.applicant.id,
      applicationId: this.applicationData.id,
      updated: new Date(),
      applicantIncomeId: row.applicantIncomeId,
      comment: row.comment,
      companyStatusId: row.companyStatusId,
      created: row.created,
      emplInn: row.company.id,
      emplName: row.company.name,
      id: row.id,
      initialCompanyStatusId: row.initialCompanyStatusId,
      verificationId: row.verificationId
    };

    this.verificationEmploymentService
        .update(sendCompany)
        .pipe(
          switchMap(() => this.verificationService.getVerification(this.applicationData.applicant.id.toString(), this.applicationData.id.toString())),
          untilDestroyed(this)
        )
        .subscribe(
          value => {
            this.verificationData.verificationEmployments = value.verificationEmployments
          },
          err => {
            if (err.status === 500) {
              this.toastService.viewMsg(err.error, 'error');
            }
          }
        );
  }

  filterMatrix() {
    this.creditConditionsForConfirmedIncomeInfoData = new TableData(
      !this.isWithRef ? HEADERS.CREDIT_CONDITIONS_HEADERS : HEADERS.CREDIT_CONDITIONS_WITH_REF_HEADERS,
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
