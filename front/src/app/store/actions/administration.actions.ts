import {
  AbsCommissionConfig,
  AbsCommissionConfigDto,
  BRMSRule,
  BRMSRuleDTO,
  Company,
  CompanyDto,
  Condition,
  ConditionDto,
  CustomSettingsDto,
  Dir,
  DirChecklist,
  Directory,
  InsuranceCompany,
  InsuranceCompanyDto,
  InsuranceCondition,
  InsuranceConditionDto,
  IntegrationLog,
  IntegrationSetting,
  NotificationSetting,
  PageDTO,
  PaginationAndSortingDto,
  PreApprovedOfferDto,
  PrintingForm,
  PrintingFormStageSetting,
  PrintingFormStageSettingDto,
  ProductDiscountCondition,
  ProductDiscountConditionDto,
  ProductDto,
  ProductResDto,
  StopListAbsDto,
  UpdateCustomSettingsDto,
  UploadOptions,
  UserDto
} from '@app/_models';
import { DirVisualAssessment, DirVisualAssessmentDto } from '@app/_models/api-models/visual-assessment';
import { createAction, props } from '@ngrx/store';

import { AuditLog } from './../../_models/api-models/audit-log';
import { DirPartner } from '@app/_models/api-models/dir-partner';
import { DirAbsAttribute, DirAbsAttributeDto } from '@app/_models/api-models/dir-abs-attribute';
import { DirAbsAttributeSetting, DirAbsAttributeSettingDto } from '@app/_models/api-models/dir-abs-attribute-setting';
import { DirAccountProduct, DirAccountProductDto } from '@app/_models/api-models/dir-account-product';
import { AbsExpenseSetting, AbsExpenseSettingDto } from '@app/_models/api-models/abs-expense-setting';
import { Blacklist, BlacklistDto } from '@app/_models/api-models/blacklist';
import { DirCompetenceLevel } from '@app/_models/api-models/dir-competence-level';
import { DirPatternDto } from '@app/_models/api-models/dir-pattern-dto';
import { DirCorpCompanyDto } from '@app/_models/api-models/dir-corp-company-dto';

export enum AdministrationActions {
  AdmSetCondition = '[Administration Page], Administration set Condition',
  AdmSetConditionSuccess = '[Administration Page], Administration set Condition success',
  AdmCreateCondition = '[Administration Page], Administration create Condition',
  AdmUpdateCondition = '[Administration Page], Administration update Conditions',
  AdmUpdateConditionSuccess = '[Administration Page], Administration update Conditions success',

  AdmSetUser = '[Administration Page], Administration set User',
  AdmCreateUser = '[Administration Page], Administration create User',
  AdmUpdateUser = '[Administration Page], Administration update User',
  AdmSetUserSuccess = '[Administration Page], Administration set User success',

  ProductTemplate = '[Administration Page], Administration set ProductTemplate',
  ProductTemplateSuccess = '[Administration Page], Administration set ProductTemplate Success',

  AdmSetSetting = '[Administration Page], Administration set Setting',
  AdmSaveSetting = '[Administration Page], Administration save Setting',
  AdmSetSettingsSuccess = '[Administration Page], Administration set Setting success',

  AdmSetNotificationSetting = '[Administration Page], Administration set NotificationSetting',
  AdmSaveNotificationSetting = '[Administration Page], Administration save NotificationSetting',
  AdmSetNotificationSettingSuccess = '[Administration Page], Administration set NotificationSetting success',

  AdmSetPrintingForm = '[Administration Page], Administration set Printing Form',
  AdmUploadPrintingForm = '[Administration Page], Administration upload Printing Form',
  AdmSetPrintingFormSuccess = '[Administration Page], Administration set Printing Form success',

  AdmSetIntegration = '[Administration Page], Administration set Integration',
  AdmSetIntegrationSuccess = '[Administration Page], Administration set Integration success',
  AdmUpdateIntegration = '[Administration Page], Administration update Integration',

  AdmSetIntegrationLog = '[Administration Page], Administration set IntegrationLog',
  AdmSetIntegrationLogSuccess = '[Administration Page], Administration set IntegrationLog success',
  AdmUpdateIntegrationLog = '[Administration Page], Administration update IntegrationLog',

  AdmSetCompanyList = '[Administration Page], Administration set Company List',
  AdmCreateCompanyList = '[Administration Page], Administration create Company List',
  AdmUpdateCompanyList = '[Administration Page], Administration update Company List',
  AdmUpdateCorpCompany = '[Administration Page], Administration update Corp Company',
  AdmUploadCompanyList = '[Administration Page], Administration upload Company List',
  AdmSetCompanyListSuccess = '[Administration Page], Administration set Company List success',

  AdmSetPreapprovedOffer = '[Administration Page], Administration get PreapprovedOffer',
  AdmSetPreapprovedOfferSuccess = '[Administration Page], Administration set PreapprovedOffer success',

  AdmSetSalesChanel = '[Administration Page], Administration set Sales Chanel',
  AdmUploadSalesChanel = '[Administration Page], Administration upload Sales Chanel',
  AdmSetSalesChanelSuccess = '[Administration Page], Administration set Sales Chanel success',

  AdmSetProduct = '[Administration Page], Administration set Product',
  AdmSetProductSuccess = '[Administration Page], Administration set Product success',
  AdmCreateProduct = '[Administration Page], Administration create Product',
  AdmUpdateProduct = '[Administration Page], Administration update Product success',

  AdmSetStopList = '[Administration Page], Administration set Stop List',
  AdmSetStopListSuccess = '[Administration Page], Administration set Stop List success',

  AdmSetInsuranceCompanies = '[Administration Page], Administration set InsuranceCompanies',
  AdmCreateInsuranceCompany = '[Administration Page], Administration create InsuranceCompany',
  AdmUpdateInsuranceCompany = '[Administration Page], Administration update InsuranceCompany',
  AdmSetInsuranceCompaniesSuccess = '[Administration Page], Administration set InsuranceCompanies success',

  AdmSetInsuranceConditions = '[Administration Page], Administration set InsuranceConditions',
  AdmCreateInsuranceCondition = '[Administration Page], Administration create InsuranceCondition',
  AdmUpdateInsuranceCondition = '[Administration Page], Administration update InsuranceCondition',
  AdmSetInsuranceConditionsSuccess = '[Administration Page], Administration set InsuranceConditions success',

  AdmSetVisualAssessment = '[Administration Page], Administration set VisualAssessment',
  AdmCreateVisualAssessment = '[Administration Page], Administration create VisualAssessment',
  AdmUpdateVisualAssessment = '[Administration Page], Administration update VisualAssessment',
  AdmSetVisualAssessmentSuccess = '[Administration Page], Administration set VisualAssessment success',

  AdmSetUnderChecklist = '[Administration Page], Administration set UnderChecklist',
  AdmCreateUnderChecklist = '[Administration Page], Administration create UnderChecklist',
  AdmUpdateUnderChecklist = '[Administration Page], Administration update UnderChecklist',
  AdmSetUnderChecklistSuccess = '[Administration Page], Administration set UnderChecklist success',

  AdmSetBrmsRule = '[Administration Page], Administration set BrmsRule',
  AdmUpdateBrmsRule = '[Administration Page], Administration update BrmsRule',
  AdmSetBrmsRuleSuccess = '[Administration Page], Administration set BrmsRule success',

  AdmSetDiscountCondition = '[Administration Page], Administration set DiscountCondition',
  AdmCreateDiscountCondition = '[Administration Page], Administration create DiscountCondition',
  AdmUpdateDiscountCondition = '[Administration Page], Administration update DiscountCondition',
  AdmSetDiscountConditionSuccess = '[Administration Page], Administration set DiscountCondition success',

  AdmSetAuditLog = '[Administration Page], Administration set AuditLog',
  AdmSetAuditLogSuccess = '[Administration Page], Administration set AuditLog success',

  AdmSetCommissionConfig = '[Administration Page], Administration set CommissionConfig',
  AdmCreateCommissionConfig = '[Administration Page], Administration create CommissionConfig',
  AdmUpdateCommissionConfig = '[Administration Page], Administration update CommissionConfig',
  AdmSetCommissionConfigSuccess = '[Administration Page], Administration set CommissionConfig success',

  AdmSetPrintingFormStageSetting = '[Administration Page], Administration set PrintingFormStageSetting',
  AdmCreatePrintingFormStageSetting = '[Administration Page], Administration create PrintingFormStageSetting',
  AdmUpdatePrintingFormStageSetting = '[Administration Page], Administration update PrintingFormStageSetting',
  AdmSetPrintingFormStageSettingSuccess = '[Administration Page], Administration set PrintingFormStageSetting success',

  AdmSetPartners = '[Administration Page], Administration set Partners',
  AdmSetPartnersSuccess = '[Administration Page], Administration set Partners success',
  AdmUpdatePartners = '[Administration Page], Administration update Partners',

  AdmLevelsPM = '[Administration Page], Administration set AdmLevelsPM',
  AdmLevelsPMSuccess = '[Administration Page], Administration set AdmLevelsPM success',
  AdmCreateLevelsPMS = '[Administration Page], Administration create AdmLevelsPM',
  AdmLevelsPMUpdate = '[Administration Page], Administration update AdmLevelsPM',

  AdmSetAttributes = '[Administration Page], Administration set Attributes',
  AdmSetAttributesSuccess = '[Administration Page], Administration set Attributes success',
  AdmCreateAttributes = '[Administration Page], Administration create Attributes',
  AdmUpdateAttributes = '[Administration Page], Administration update Attributes',

  AdmSetAttributesSetting = '[Administration Page], Administration set AttributesSetting',
  AdmSetAttributesSettingSuccess = '[Administration Page], Administration set AttributesSetting success',
  AdmCreateAttributesSetting = '[Administration Page], Administration create AttributesSetting',
  AdmUpdateAttributesSetting = '[Administration Page], Administration update AttributesSetting',

  AdmSetAccountProduct = '[Administration Page], Administration set AccountProduct',
  AdmSetAccountProductSuccess = '[Administration Page], Administration set AccountProduct success',
  AdmCreateAccountProduct = '[Administration Page], Administration create AccountProduct',
  AdmUpdateAccountProduct = '[Administration Page], Administration update AccountProduct',

  AdmSetExpenseSetting = '[Administration Page], Administration set ExpenseSetting',
  AdmSetExpenseSettingSuccess = '[Administration Page], Administration set ExpenseSetting success',
  AdmCreateExpenseSetting = '[Administration Page], Administration create ExpenseSetting',
  AdmUpdateExpenseSetting = '[Administration Page], Administration update ExpenseSetting',

  AdmSetBlacklist = '[Administration Page], Administration set Blacklist',
  AdmSetBlacklistSuccess = '[Administration Page], Administration set Blacklist success',
  AdmCreateBlacklist = '[Administration Page], Administration create Blacklist',
  AdmUpdateBlacklist = '[Administration Page], Administration update Blacklist'
}

// Condition
export const AdmSetConditionAction = createAction(
  AdministrationActions.AdmSetCondition,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetConditionSuccessAction = createAction(
  AdministrationActions.AdmSetConditionSuccess,
  props<{ data: PageDTO<Condition> }>()
);

export const AdmUpdateConditionAction = createAction(
  AdministrationActions.AdmUpdateCondition,
  props<{ data: ConditionDto }>()
);

export const AdmUpdateConditionSuccessAction = createAction(
  AdministrationActions.AdmUpdateConditionSuccess,
  props<{ data: Condition }>()
);

export const AdmCreateConditionAction = createAction(
  AdministrationActions.AdmCreateCondition,
  props<{ data: ConditionDto; paginationData: PaginationAndSortingDto }>()
);

// Users
export const AdmCreateUserAction = createAction(
  AdministrationActions.AdmCreateUser,
  props<{ data: UserDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateUserAction = createAction(
  AdministrationActions.AdmUpdateUser,
  props<{ data: UserDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetUserAction = createAction(
  AdministrationActions.AdmSetUser,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetUserSuccessAction = createAction(
  AdministrationActions.AdmSetUserSuccess,
  props<{ data: PageDTO<UserDto> }>()
);

// Settings
export const AdmSetSettingAction = createAction(
  AdministrationActions.AdmSetSetting,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSaveSettingAction = createAction(
  AdministrationActions.AdmSaveSetting,
  props<{ data: UpdateCustomSettingsDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetSettingsSuccessAction = createAction(
  AdministrationActions.AdmSetSettingsSuccess,
  props<{ data: PageDTO<CustomSettingsDto> }>()
);

// Notification
export const AdmSetNotificationSettingAction = createAction(
  AdministrationActions.AdmSetNotificationSetting,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSaveNotificationSettingAction = createAction(
  AdministrationActions.AdmSaveNotificationSetting,
  props<{ data: NotificationSetting; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetNotificationSettingSuccessAction = createAction(
  AdministrationActions.AdmSetNotificationSettingSuccess,
  props<{ data: PageDTO<NotificationSetting> }>()
);

// Printing Form
export const AdmSetPrintingFormAction = createAction(
  AdministrationActions.AdmSetPrintingForm,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmUploadPrintingFormAction = createAction(
  AdministrationActions.AdmUploadPrintingForm,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);

export const AdmSetPrintingFormSuccessAction = createAction(
  AdministrationActions.AdmSetPrintingFormSuccess,
  props<{ data: PageDTO<PrintingForm[]> }>()
);

// Integration
export const AdmSetIntegrationAction = createAction(
  AdministrationActions.AdmSetIntegration,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetIntegrationSuccessAction = createAction(
  AdministrationActions.AdmSetIntegrationSuccess,
  props<{ data: PageDTO<IntegrationSetting> }>()
);

export const AdmUpdateIntegrationAction = createAction(
  AdministrationActions.AdmUpdateIntegration,
  props<{ data: IntegrationSetting; paginationData: PaginationAndSortingDto }>()
);

// IntegrationLog
export const AdmSetIntegrationLogAction = createAction(
  AdministrationActions.AdmSetIntegrationLog,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetIntegrationLogSuccessAction = createAction(
  AdministrationActions.AdmSetIntegrationLogSuccess,
  props<{ data: PageDTO<IntegrationLog> }>()
);

export const AdmUpdateIntegrationLogAction = createAction(
  AdministrationActions.AdmUpdateIntegrationLog,
  props<{ data: IntegrationLog; paginationData: PaginationAndSortingDto }>()
);

// Company List
export const AdmCreateCompanyListAction = createAction(
  AdministrationActions.AdmCreateCompanyList,
  props<{ data: Company; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateCompanyListAction = createAction(
  AdministrationActions.AdmUpdateCompanyList,
  props<{ data: CompanyDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateCorpCompanyAction = createAction(
  AdministrationActions.AdmUpdateCorpCompany,
  props<{ data: DirCorpCompanyDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetCompanyListAction = createAction(
  AdministrationActions.AdmSetCompanyList,
  props<{ data: PaginationAndSortingDto }>()
);
export const AdmUploadCompanyListAction = createAction(
  AdministrationActions.AdmUploadCompanyList,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const AdmSetCompanyListSuccessAction = createAction(
  AdministrationActions.AdmSetCompanyListSuccess,
  props<{ data: PageDTO<DirCorpCompanyDto> }>()
);

// Preapproved
export const AdmSetPreapprovedOfferAction = createAction(
  AdministrationActions.AdmSetPreapprovedOffer,
  props<{ data: any; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetPreapprovedOfferSuccessAction = createAction(
  AdministrationActions.AdmSetPreapprovedOfferSuccess,
  props<{ data: PageDTO<PreApprovedOfferDto> }>()
);

// Sales Chanel
export const AdmSetSalesChanelAction = createAction(
  AdministrationActions.AdmSetSalesChanel,
  props<{ data: PaginationAndSortingDto }>()
);
export const AdmUploadSalesChanelAction = createAction(
  AdministrationActions.AdmUploadSalesChanel,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const AdmSetSalesChanelSuccessAction = createAction(
  AdministrationActions.AdmSetSalesChanelSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Product
export const AdmSetProductAction = createAction(
  AdministrationActions.AdmSetProduct,
  props<{ data: PaginationAndSortingDto }>()
);
export const AdmSetProductSuccessAction = createAction(
  AdministrationActions.AdmSetProductSuccess,
  props<{ data: PageDTO<ProductDto> }>()
);

export const AdmCreateProductAction = createAction(
  AdministrationActions.AdmCreateProduct,
  props<{ data: ProductResDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateProductAction = createAction(
  AdministrationActions.AdmUpdateProduct,
  props<{ data: ProductResDto; paginationData: PaginationAndSortingDto }>()
);

// Stop List
export const AdmSetStopListAction = createAction(
  AdministrationActions.AdmSetStopList,
  props<{ data: PaginationAndSortingDto }>()
);
export const AdmSetStopListSuccessAction = createAction(
  AdministrationActions.AdmSetStopListSuccess,
  props<{ data: PageDTO<StopListAbsDto> }>()
);

// InsuranceCompanies
export const AdmCreateInsuranceCompanyAction = createAction(
  AdministrationActions.AdmCreateInsuranceCompany,
  props<{ data: InsuranceCompanyDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateInsuranceCompanyAction = createAction(
  AdministrationActions.AdmUpdateInsuranceCompany,
  props<{ data: InsuranceCompanyDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetInsuranceCompaniesAction = createAction(
  AdministrationActions.AdmSetInsuranceCompanies,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetInsuranceCompaniesSuccessAction = createAction(
  AdministrationActions.AdmSetInsuranceCompaniesSuccess,
  props<{ data: PageDTO<InsuranceCompany> }>()
);

// Insurance Conditions
export const AdmCreateInsuranceConditionAction = createAction(
  AdministrationActions.AdmCreateInsuranceCondition,
  props<{ data: InsuranceConditionDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateInsuranceConditionAction = createAction(
  AdministrationActions.AdmUpdateInsuranceCondition,
  props<{ data: InsuranceConditionDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetInsuranceConditionsAction = createAction(
  AdministrationActions.AdmSetInsuranceConditions,
  props<{ data: PaginationAndSortingDto }>()
);
export const AdmSetInsuranceConditionsSuccessAction = createAction(
  AdministrationActions.AdmSetInsuranceConditionsSuccess,
  props<{ data: PageDTO<InsuranceCondition> }>()
);

// VisualAssessment
export const AdmCreateVisualAssessmentAction = createAction(
  AdministrationActions.AdmCreateVisualAssessment,
  props<{ data: DirVisualAssessmentDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateVisualAssessmentAction = createAction(
  AdministrationActions.AdmUpdateVisualAssessment,
  props<{ data: DirVisualAssessmentDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetVisualAssessmentAction = createAction(
  AdministrationActions.AdmSetVisualAssessment,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetVisualAssessmentSuccessAction = createAction(
  AdministrationActions.AdmSetVisualAssessmentSuccess,
  props<{ data: PageDTO<DirVisualAssessment> }>()
);

// UnderChecklist
export const AdmCreateUnderChecklistAction = createAction(
  AdministrationActions.AdmCreateUnderChecklist,
  props<{ data: DirChecklist; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateUnderChecklistAction = createAction(
  AdministrationActions.AdmUpdateUnderChecklist,
  props<{ data: DirChecklist; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetUnderChecklistAction = createAction(
  AdministrationActions.AdmSetUnderChecklist,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetUnderChecklistSuccessAction = createAction(
  AdministrationActions.AdmSetUnderChecklistSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// BrmsRule
export const AdmSetBrmsRuleAction = createAction(
  AdministrationActions.AdmSetBrmsRule,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetBrmsRuleSuccessAction = createAction(
  AdministrationActions.AdmSetBrmsRuleSuccess,
  props<{ data: PageDTO<BRMSRule> }>()
);

export const AdmUpdateBrmsRuleAction = createAction(
  AdministrationActions.AdmUpdateBrmsRule,
  props<{ data: BRMSRuleDTO; paginationData: PaginationAndSortingDto }>()
);

// DiscountCondition
export const AdmCreateDiscountConditionAction = createAction(
  AdministrationActions.AdmCreateDiscountCondition,
  props<{ data: ProductDiscountConditionDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateDiscountConditionAction = createAction(
  AdministrationActions.AdmUpdateDiscountCondition,
  props<{ data: ProductDiscountConditionDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetDiscountConditionAction = createAction(
  AdministrationActions.AdmSetDiscountCondition,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetDiscountConditionSuccessAction = createAction(
  AdministrationActions.AdmSetDiscountConditionSuccess,
  props<{ data: PageDTO<ProductDiscountCondition> }>()
);

// AuditLog
export const AdmSetAuditLogAction = createAction(
  AdministrationActions.AdmSetAuditLog,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetAuditLogSuccessAction = createAction(
  AdministrationActions.AdmSetAuditLogSuccess,
  props<{ data: PageDTO<AuditLog> }>()
);

// Commission

export const AdmCreateCommissionConfigAction = createAction(
  AdministrationActions.AdmCreateCommissionConfig,
  props<{ data: AbsCommissionConfigDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateCommissionConfigAction = createAction(
  AdministrationActions.AdmUpdateCommissionConfig,
  props<{ data: AbsCommissionConfigDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetCommissionConfigAction = createAction(
  AdministrationActions.AdmSetCommissionConfig,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetCommissionConfigSuccessAction = createAction(
  AdministrationActions.AdmSetCommissionConfigSuccess,
  props<{ data: PageDTO<AbsCommissionConfig> }>()
);

// PrintingFormStageSetting

export const AdmCreatePrintingFormStageSettingAction = createAction(
  AdministrationActions.AdmCreatePrintingFormStageSetting,
  props<{ data: PrintingFormStageSettingDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdatePrintingFormStageSettingAction = createAction(
  AdministrationActions.AdmUpdatePrintingFormStageSetting,
  props<{ data: PrintingFormStageSettingDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmSetPrintingFormStageSettingAction = createAction(
  AdministrationActions.AdmSetPrintingFormStageSetting,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetPrintingFormStageSettingSuccessAction = createAction(
  AdministrationActions.AdmSetPrintingFormStageSettingSuccess,
  props<{ data: PageDTO<PrintingFormStageSetting> }>()
);

// partners

export const AdmSetPartnersAction = createAction(
  AdministrationActions.AdmSetPartners,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetPartnersSuccessAction = createAction(
  AdministrationActions.AdmSetPartnersSuccess,
  props<{ data: PageDTO<DirPartner> }>()
);

export const AdmUpdatePartnersAction = createAction(
  AdministrationActions.AdmUpdatePartners,
  props<{ data: DirPartner; paginationData: PaginationAndSortingDto }>()
);

// levels PM
export const AdmLevelsPMAction = createAction(
  AdministrationActions.AdmLevelsPM,
  props<{ data: DirCompetenceLevel[] }>()
);

export const AdmLevelsPMSuccessAction = createAction(
  AdministrationActions.AdmLevelsPMSuccess,
  props<{ data: DirCompetenceLevel[] }>()
);

export const AdmCreateLevelsPMAction = createAction(
  AdministrationActions.AdmCreateLevelsPMS,
  props<{ data: DirCompetenceLevel }>()
);

export const AdmLevelsPMUpdateAction = createAction(
  AdministrationActions.AdmLevelsPMUpdate,
  props<{ data: DirCompetenceLevel }>()
);

// attributes
export const AdmSetAttributesAction = createAction(
  AdministrationActions.AdmSetAttributes,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetAttributesSuccessAction = createAction(
  AdministrationActions.AdmSetAttributesSuccess,
  props<{ data: PageDTO<DirAbsAttribute> }>()
);

export const AdmCreateAttributesAction = createAction(
  AdministrationActions.AdmCreateAttributes,
  props<{ data: DirAbsAttributeDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateAttributesAction = createAction(
  AdministrationActions.AdmUpdateAttributes,
  props<{ data: DirAbsAttributeDto; paginationData: PaginationAndSortingDto }>()
);

// AttributesSetting

export const AdmSetAttributesSettingAction = createAction(
  AdministrationActions.AdmSetAttributesSetting,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetAttributesSettingSuccessAction = createAction(
  AdministrationActions.AdmSetAttributesSettingSuccess,
  props<{ data: PageDTO<DirAbsAttributeSetting> }>()
);

export const AdmCreateAttributesSettingAction = createAction(
  AdministrationActions.AdmCreateAttributesSetting,
  props<{ data: DirAbsAttributeSettingDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateAttributesSettingAction = createAction(
  AdministrationActions.AdmUpdateAttributesSetting,
  props<{ data: DirAbsAttributeSettingDto; paginationData: PaginationAndSortingDto }>()
);

// AccountProduct

export const AdmSetAccountProductAction = createAction(
  AdministrationActions.AdmSetAccountProduct,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetAccountProductSuccessAction = createAction(
  AdministrationActions.AdmSetAccountProductSuccess,
  props<{ data: PageDTO<DirAccountProduct> }>()
);

export const AdmCreateAccountProductAction = createAction(
  AdministrationActions.AdmCreateAccountProduct,
  props<{ data: DirAccountProductDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateAccountProductAction = createAction(
  AdministrationActions.AdmUpdateAccountProduct,
  props<{ data: DirAccountProductDto; paginationData: PaginationAndSortingDto }>()
);

// Expense Setting

export const AdmSetExpenseSettingAction = createAction(
  AdministrationActions.AdmSetExpenseSetting,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetExpenseSettingSuccessAction = createAction(
  AdministrationActions.AdmSetExpenseSettingSuccess,
  props<{ data: PageDTO<AbsExpenseSetting> }>()
);

export const AdmCreateExpenseSettingAction = createAction(
  AdministrationActions.AdmCreateExpenseSetting,
  props<{ data: AbsExpenseSettingDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateExpenseSettingAction = createAction(
  AdministrationActions.AdmUpdateExpenseSetting,
  props<{ data: AbsExpenseSettingDto; paginationData: PaginationAndSortingDto }>()
);

// Blacklist

export const AdmSetBlacklistAction = createAction(
  AdministrationActions.AdmSetBlacklist,
  props<{ data: PaginationAndSortingDto }>()
);

export const AdmSetBlacklistSuccessAction = createAction(
  AdministrationActions.AdmSetBlacklistSuccess,
  props<{ data: PageDTO<Blacklist> }>()
);

export const AdmCreateBlacklistAction = createAction(
  AdministrationActions.AdmCreateBlacklist,
  props<{ data: BlacklistDto; paginationData: PaginationAndSortingDto }>()
);

export const AdmUpdateBlacklistAction = createAction(
  AdministrationActions.AdmUpdateBlacklist,
  props<{ data: BlacklistDto; paginationData: PaginationAndSortingDto }>()
);

// Product templates
export const ProductTemplateAction = createAction(
  AdministrationActions.ProductTemplate,
  props<{ data: DirPatternDto[] }>()
);

export const ProductTemplateSuccessAction = createAction(
  AdministrationActions.ProductTemplateSuccess,
  props<{ data: DirPatternDto[] }>()
);
