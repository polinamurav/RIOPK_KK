import {
  Company,
  Decision,
  Dir,
  DirAbsCode,
  DirCityDto,
  DirCountry,
  DirStage,
  DirStatus,
  Directory,
  DirectoryVal,
  InsuranceCompany,
  InsuranceCondition,
  PaginationAndSortingDto,
  ProductDto,
  StaticDirectory,
  Status,
  StopListAbsStatusDto,
  SystemDirectory,
  InsuranceProductFrontDto,
  IdentityCardType
} from '@app/_models';

import { CompanyControllerService } from './company-controller.service';
import { CompanyStatus } from '@app/_models';
import { CompanyStatusControllerService } from './company-status-controller.service';
import { AccepterDecisionControllerService } from './accepter-decision-controller.service';
import { DirAccommodationTypeControllerService } from './dir-accommodation-type-controller.service';
import { DirActivitiesControllerService } from './dir-activities-controller.service';
import { DirBankControllerService } from './dir-bank-controller.service';
import { DirCallCentreDeclineReasonControllerService } from './dir-call-centre-decline-reason-controller.service';
import { DirCallStatusControllerService } from './dir-call-status-controller.service';
import { DirCityControllerService } from './dir-city-controller.service';
import { DirCommunicationTypeControllerService } from './dir-communication-type-controller.service';
import { DirCountryControllerService } from './dir-country-controller.service';
import { DirCreditPurposeControllerService } from './dir-credit-purpose-controller.service';
import { DirCurrencyControllerService } from './dir-currency-controller.service';
import { DirEducationControllerService } from './dir-education-controller.service';
import { DirEmploymentLegalStructureControllerService } from './dir-employment-legal-structure-type-controller.service';
import { DirFamilyRelationshipControllerService } from './dir-family-relationship-controller.service';
import { DirFatcaControllerService } from './dir-fatca-controller.service';
import { DirIncomeFrequencyControllerService } from './dir-income-frequency-controller.service';
import { DirIncomeTypeControllerService } from './dir-income-type-controller.service';
import { DirInnAbsenceReasonControllerService } from './dir-inn-absence-reason-controller.service';
import { DirInsuranceTypeControllerService } from './dir-insurance-type-controller.service';
import { DirIpdlControllerService } from './dir-ipdl-controller.service';
import { DirJobPositionControllerService } from './dir-job-position-controller.service';
import { DirDecisionMakerDecisionControllerService } from './dir-decision-maker-decision-controller.service';
import { DirManagerDeclineReasonsControllerService } from './dir-manager-decline-reasons-controller.service';
import { DirNumberEmployeeControllerService } from './dir-number-employee-controller.service';
import { DirPaymentCardControllerService } from './dir-payment-card-controller.service';
import { DirRegionControllerService } from './dir-region-controller.service';
import { DirVerifierDecisionControllerService } from './dir-verifier-decision-controller.service';
import { DirDecisionMakerDeclineReasonControllerService } from './dir-decision-maker-decline-reason-controller.service';
import { GenderController } from './gender-controller.service';
import { HttpClient } from '@angular/common/http';
import { IdentityCardTypeControllerService } from './identity-card-type-controller.service';
import { Injectable } from '@angular/core';
import { InsuranceCompanyControllerService } from './insurance-company-controller.service';
import { InsuranceConditionControllerService } from './insurance-condition-controller.service';
import { Observable } from 'rxjs';
import { PaperworkDecisionControllerService } from './paperwork-decision-controller.service';
import { ProductCategoryControllerService } from './product-category-controller.service';
import { ProductGroup } from './../constants/product-group';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { StageControllerService } from '@app/api/stage-controller.service';
import { StopListAbsStatusControllerService } from './stop-list-abs-status-controller.service';
import { environment } from '@env/environment';
import { pluck } from 'rxjs/operators';
import { DirScheduleTypeControllerService } from '@app/api/dir-schedule-type-controller.service';
import { DirScheduleFrequencyControllerService } from '@app/api/dir-schedule-frequency-controller.service';
import { DirEnsureTypeService } from '@app/api/dir-ensure-type.service';
import { DirIssueTypeControllerService } from '@app/api/dir-issue-type-controller.service';
import { ProductToPaymentDayControllerService } from '@app/api/product-to-payment-day-controller.service';
import { ProductToPaymentDay } from '@app/_models/api-models/product-to-payment-day';
import { InsuranceProductControllerService } from '@app/api/insurance-product-controller.service';
import { DirProvisionRateControllerService } from '@app/api/dir-provision-rate-controller.service';
import { CustomSettingsControllerService } from '@app/api/custom-settings-controller.service';
import { ApplicationControllerService } from '@app/api/application-controller.service';

@Injectable({ providedIn: 'root' })
export class DirectoriesService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private genderController: GenderController,
    private dirCurrencyService: DirCurrencyControllerService,
    private dirCountryService: DirCountryControllerService,
    private dirCreditPurposeService: DirCreditPurposeControllerService,
    private dirEducationService: DirEducationControllerService,
    private dirActivitiesService: DirActivitiesControllerService,
    private dirFamilyRelationshipService: DirFamilyRelationshipControllerService,
    private dirNumberEmployeeService: DirNumberEmployeeControllerService,
    private dirAccommodationTypeService: DirAccommodationTypeControllerService,
    private dirCallCentreDeclineReasonService: DirCallCentreDeclineReasonControllerService,
    private dirManagerDeclineReasonsService: DirManagerDeclineReasonsControllerService,
    private dirEmploymentLegalStructureService: DirEmploymentLegalStructureControllerService,
    private dirCommunicationTypeService: DirCommunicationTypeControllerService,
    private dirCityService: DirCityControllerService,
    private dirRegionService: DirRegionControllerService,
    private insuranceCompanyService: InsuranceCompanyControllerService,
    private insuranceConditionService: InsuranceConditionControllerService,
    private dirPaymentCardService: DirPaymentCardControllerService,
    private accepterDecisionService: AccepterDecisionControllerService,
    private paperworkDecisionService: PaperworkDecisionControllerService,
    private dirIncomeTypeService: DirIncomeTypeControllerService,
    private dirIpdlService: DirIpdlControllerService,
    private dirFatcaService: DirFatcaControllerService,
    private dirInnAbsenceReasonService: DirInnAbsenceReasonControllerService,
    private identityCardTypeService: IdentityCardTypeControllerService,
    private dirDecisionMakerDecisionService: DirDecisionMakerDecisionControllerService,
    private stopListAbsStatusService: StopListAbsStatusControllerService,
    private dirDecisionMakerDeclineReasonService: DirDecisionMakerDeclineReasonControllerService,
    private dirVerifierDecisionService: DirVerifierDecisionControllerService,
    private dirCallStatusService: DirCallStatusControllerService,
    private productCategoryService: ProductCategoryControllerService,
    private dirInsuranceTypeService: DirInsuranceTypeControllerService,
    private stageService: StageControllerService,
    private incomeFrequencyService: DirIncomeFrequencyControllerService,
    private jobPositionService: DirJobPositionControllerService,
    private companyService: CompanyControllerService,
    private dirBankService: DirBankControllerService,
    private companyStatusService: CompanyStatusControllerService,
    private dirScheduleTypeService: DirScheduleTypeControllerService,
    private dirScheduleFrequencyService: DirScheduleFrequencyControllerService,
    private dirEnsureTypeService: DirEnsureTypeService,
    private dirIssueTypeService: DirIssueTypeControllerService,
    private productToPaymentDayService: ProductToPaymentDayControllerService,
    private insuranceProductService: InsuranceProductControllerService,
    private dirProvisionRateService: DirProvisionRateControllerService,
    private customSettingsControllerService: CustomSettingsControllerService,
    private applicationControllerService: ApplicationControllerService
  ) {}

  /* ----- FROM SPECIFIC SERVICES ----- */
  public getGenderDir(): Observable<DirAbsCode[]> {
    return this.genderController.getAll();
  }

  public getCurrencies(): Observable<Dir[]> {
    return this.dirCurrencyService.getList();
  }

  public getCountries(): Observable<DirCountry[]> {
    return this.dirCountryService.getList();
  }

  public getCreditPurposeDir(): Observable<Directory[]> {
    return this.dirCreditPurposeService.getList();
  }

  public getEducationDir(): Observable<Directory[]> {
    return this.dirEducationService.getList();
  }

  public getActivitiesDir(productGroupId: ProductGroup): Observable<Directory[]> {
    return this.dirActivitiesService.getList(productGroupId);
  }

  public getRelationshipsDir(): Observable<Dir[]> {
    return this.dirFamilyRelationshipService.getList();
  }

  public getNumberEmployeeDir(): Observable<Dir[]> {
    return this.dirNumberEmployeeService.getList();
  }

  public getAccommodationTypeDir(): Observable<Dir[]> {
    return this.dirAccommodationTypeService.getList();
  }

  public getCallCentreDeclineReason(): Observable<Dir[]> {
    return this.dirCallCentreDeclineReasonService.getList();
  }

  public getManagerDeclineReason(): Observable<Directory[]> {
    return this.dirManagerDeclineReasonsService.getList();
  }

  public getEmploymentLegalStructureType(): Observable<DirAbsCode[]> {
    return this.dirEmploymentLegalStructureService.getList();
  }

  public getCommunicationTypeDir(): Observable<Dir[]> {
    return this.dirCommunicationTypeService.getList();
  }

  public getCityDir(): Observable<DirCityDto[]> {
    return this.dirCityService.getList();
  }

  public getRegionDir(): Observable<Dir[]> {
    return this.dirRegionService.getList();
  }

  public getFatcaRegionDir(): Observable<Dir[]> {
    return this.dirRegionService.getFatcaRegionList();
  }

  public getInsuranceCompanyDir(): Observable<InsuranceCompany[]> {
    return this.insuranceCompanyService.getAll();
  }

  public getInsuranceConditionDir(): Observable<InsuranceCondition[]> {
    return this.insuranceConditionService.getAll();
  }

  public getPaymentCardTypeDir(): Observable<DirectoryVal[]> {
    return this.dirPaymentCardService.getList();
  }

  public getAccepterDecisionList(): Observable<Decision[]> {
    return this.accepterDecisionService.getAll();
  }

  public getPaperworkDecisionList(): Observable<Decision[]> {
    return this.paperworkDecisionService.getAll();
  }

  public getIncomeTypeList(): Observable<Dir[]> {
    return this.dirIncomeTypeService.getList();
  }

  public getIpdlTypeList(): Observable<Dir[]> {
    return this.dirIpdlService.getList();
  }

  public getFatcaList(): Observable<Directory[]> {
    return this.dirFatcaService.getList();
  }

  public getAbsecceReasonList(): Observable<Dir[]> {
    return this.dirInnAbsenceReasonService.getList();
  }

  public getIdentityCardTypeList(): Observable<IdentityCardType[]> {
    return this.identityCardTypeService.getList();
  }

  public getDecisionMakerDecisionsList(): Observable<Decision[]> {
    return this.dirDecisionMakerDecisionService.getAll();
  }

  public getStopListAbsStatusList(): Observable<StopListAbsStatusDto[]> {
    return this.stopListAbsStatusService.getAll();
  }

  public getDecisionMakerDeclineReasonList(): Observable<DirectoryVal[]> {
    return this.dirDecisionMakerDeclineReasonService.getAll();
  }

  public getVerifierDecisionsList(): Observable<Decision[]> {
    return this.dirVerifierDecisionService.getAll();
  }

  public getVerifierDeclineReasons(): Observable<Decision[]> {
    return this.dirVerifierDecisionService.getVerifierDeclineReasons();
  }

  public getCallStatusList(): Observable<Directory[]> {
    return this.dirCallStatusService.getList();
  }

  public getProductsList(): Observable<ProductDto[]> {
    return this.productCategoryService.getAllActive();
  }

  public getInsuranceTypeDir(): Observable<DirAbsCode[]> {
    return this.dirInsuranceTypeService.getList();
  }

  public getStagesDir(): Observable<DirStage[]> {
    return this.stageService.getStagesDir();
  }

  public getIncomeFrequency(): Observable<Dir[]> {
    return this.incomeFrequencyService.getList();
  }
  public getJobPositionType(): Observable<Dir[]> {
    return this.jobPositionService.getList();
  }
  public getCompanies(sortAndPage: PaginationAndSortingDto = { page: 0, size: 20 }): Observable<Company[]> {
    return this.companyService.getByPage(sortAndPage).pipe(pluck('content'));
  }
  public getBankDir(): Observable<DirAbsCode[]> {
    return this.dirBankService.getList();
  }

  public getCompanyStatuses(): Observable<CompanyStatus[]> {
    return this.companyStatusService.getList();
  }

  public getScheduleTypes(): Observable<DirAbsCode[]> {
    return this.dirScheduleTypeService.getList();
  }

  public getScheduleFrequency(): Observable<Dir[]> {
    return this.dirScheduleFrequencyService.getList();
  }

  public getEnsureType(): Observable<Dir[]> {
    return this.dirEnsureTypeService.getList();
  }

  public getIssueType(): Observable<Dir[]> {
    return this.dirIssueTypeService.getList();
  }

  public getProductToPaymentDay(): Observable<ProductToPaymentDay[]> {
    return this.productToPaymentDayService.getAll();
  }

  public getInsuranceProduct(): Observable<InsuranceProductFrontDto[]> {
    return this.insuranceProductService.getAll();
  }

  public getProvisionRate(): Observable<Dir[]> {
    return this.dirProvisionRateService.getList();
  }

  public getPhoneCodes(): Observable<any[]> {
    return this.customSettingsControllerService.getPhoneCodes();
  }

  public getApplicationsType(): Observable<any[]> {
    return this.applicationControllerService.applicationsType();
  }

  /* ----- END FROM SPECIFIC SERVICES ----- */

  /* CALLING ONLY HERE */
  /**
   * Получение военских обязанностей
   * @returns Observable of StaticDirectory[]
   */
  public getMilitaryDutyDir(): Observable<Dir[]> {
    return this.http.get<Dir[]>(`${this.baseUrl}/militaryDuty`);
  }

  /**
   * Получение справочника статусов
   * @returns Observable of SystemDirectory[]
   */
  public getStatusDir(): Observable<DirStatus[]> {
    return this.http.get<DirStatus[]>(`${this.baseUrl}/status`);
  }

  public getStatusReportsDir(): Observable<DirStatus[]> {
    return this.http.get<DirStatus[]>(`${this.baseUrl}/status-reports`);
  }

  /**
   * Получение справочника решений
   * @returns Observable of SystemDirectory[]
   */
  public getDecisionsDir(): Observable<SystemDirectory[]> {
    return this.http.get<SystemDirectory[]>(`${this.baseUrl}/decisions`);
  }

  /**
   * Получение справочника решений
   * @returns Observable of SystemDirectory[]
   */
  public getTypeOfDecisionsDir(): Observable<SystemDirectory[]> {
    return this.http.get<SystemDirectory[]>(`${this.baseUrl}/decision-maker-type-decision`);
  }

  /**
   * Получение справочника семейного положения
   * @returns Observable of StaticDirectory[]
   */
  public getMaritalStatusesDir(): Observable<Dir[]> {
    return this.http.get<Dir[]>(`${this.baseUrl}/maritalStatuses`);
  }

  /**
   * Получение справочника категорий занимаемой должности
   * @returns Observable of StaticDirectory
   */
  public geJobPositionCategories(): Observable<StaticDirectory[]> {
    return this.http.get<StaticDirectory[]>(`${this.baseUrl}/jobPositionCategories`);
  }

  /**
   * Получение справочника статуса занятости
   * @returns Observable of StaticDirectory
   */
  public getEmploymentStatusest(): Observable<StaticDirectory[]> {
    return this.http.get<StaticDirectory[]>(`${this.baseUrl}/employmentStatuses`);
  }

  /**
   * Получение справочника категории клиента
   * @returns Observable of StaticDirectory
   */
  public getCustomerCategories(): Observable<StaticDirectory[]> {
    return this.http.get<StaticDirectory[]>(`${this.baseUrl}/customerCategories`);
  }

  /**
   * Получение справочника цели кредита
   * @returns Observable of StaticDirectory
   */
  public getCreditPurposes(): Observable<StaticDirectory[]> {
    return this.http.get<StaticDirectory[]>(`${this.baseUrl}/creditPurposes`);
  }

  /**
   * Получение справочника вида деятельности компании
   * @returns Observable of StaticDirectory
   */
  public getCompaniesIndustries(): Observable<StaticDirectory[]> {
    return this.http.get<StaticDirectory[]>(`${this.baseUrl}/companiesIndustries`);
  }

  /**
   * Получение справочника статусов компании
   * @returns Observable of Status
   */
  public getCompanyStatusDir(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}/company-status`);
  }
}

export const DIR_SERVICE_FUNC_NAMES: Record<RetailDirectoriesNames, string> = {
  [RetailDirectoriesNames.identityCardType]: 'getIdentityCardTypeList',
  [RetailDirectoriesNames.bank]: 'getBankDir',
  [RetailDirectoriesNames.paymentCards]: 'getPaymentCardTypeDir',
  [RetailDirectoriesNames.accepterDecisionList]: 'getAccepterDecisionList',
  [RetailDirectoriesNames.paperworkDecisionList]: 'getPaperworkDecisionList',
  [RetailDirectoriesNames.declineReasons]: 'getManagerDeclineReason',
  [RetailDirectoriesNames.declineReasonsCallCenter]: 'getCallCentreDeclineReason',
  [RetailDirectoriesNames.currencies]: 'getCurrencies',
  [RetailDirectoriesNames.insuranceCompany]: 'getInsuranceCompanyDir',
  [RetailDirectoriesNames.insuranceType]: 'getInsuranceTypeDir',
  [RetailDirectoriesNames.insuranceConditions]: 'getInsuranceConditionDir',
  [RetailDirectoriesNames.communicationType]: 'getCommunicationTypeDir',
  [RetailDirectoriesNames.countries]: 'getCountries',
  [RetailDirectoriesNames.regions]: 'getRegionDir',
  [RetailDirectoriesNames.cities]: 'getCityDir',
  [RetailDirectoriesNames.employmentActivity]: 'getActivitiesDir',
  [RetailDirectoriesNames.incomeType]: 'getIncomeTypeList',
  [RetailDirectoriesNames.incomeFrequency]: 'getIncomeFrequency',
  [RetailDirectoriesNames.jobPositionType]: 'getJobPositionType',
  [RetailDirectoriesNames.companies]: 'getCompanies',
  [RetailDirectoriesNames.ipdlType]: 'getIpdlTypeList',
  [RetailDirectoriesNames.relationships]: 'getRelationshipsDir',
  [RetailDirectoriesNames.fatca]: 'getFatcaList',
  [RetailDirectoriesNames.innAbsenceReason]: 'getAbsecceReasonList',
  [RetailDirectoriesNames.passportType]: 'getIdentityCardTypeList',
  [RetailDirectoriesNames.dirDecisionMakerDecisionList]: 'getDecisionMakerDecisionsList',
  [RetailDirectoriesNames.stopListAbsStatusList]: 'getStopListAbsStatusList',
  [RetailDirectoriesNames.dirVerifierDecisionList]: 'getVerifierDecisionsList',
  [RetailDirectoriesNames.dirVerifierDeclineReasons]: 'getVerifierDeclineReasons',
  [RetailDirectoriesNames.dirDecisionMakerDeclineReasonList]: 'getDecisionMakerDeclineReasonList',
  [RetailDirectoriesNames.statusData]: 'getCallStatusList',
  [RetailDirectoriesNames.militaryDutyDir]: 'getMilitaryDutyDir',
  [RetailDirectoriesNames.status]: 'getStatusDir',
  [RetailDirectoriesNames.decisions]: 'getDecisionsDir',
  [RetailDirectoriesNames.typeOfDecisions]: 'getTypeOfDecisionsDir',
  [RetailDirectoriesNames.productCategories]: 'getProductsList',
  [RetailDirectoriesNames.gender]: 'getGenderDir',
  [RetailDirectoriesNames.maritalStatuses]: 'getMaritalStatusesDir',
  [RetailDirectoriesNames.creditPurpose]: 'getCreditPurposeDir',
  [RetailDirectoriesNames.numberEmployee]: 'getNumberEmployeeDir',
  [RetailDirectoriesNames.accommodationType]: 'getAccommodationTypeDir',
  [RetailDirectoriesNames.employmentLegalStructure]: 'getEmploymentLegalStructureType',
  [RetailDirectoriesNames.companyStatuses]: 'getCompanyStatuses',
  [RetailDirectoriesNames.dirScheduleTypes]: 'getScheduleTypes',
  [RetailDirectoriesNames.dirScheduleFrequency]: 'getScheduleFrequency',
  [RetailDirectoriesNames.dirEnsureType]: 'getEnsureType',
  [RetailDirectoriesNames.dirIssueType]: 'getIssueType',
  [RetailDirectoriesNames.productToPaymentDay]: 'getProductToPaymentDay',
  [RetailDirectoriesNames.insuranceProduct]: 'getInsuranceProduct',
  [RetailDirectoriesNames.provisionRate]: 'getProvisionRate'
};
