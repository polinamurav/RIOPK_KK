import { AdministrationState } from '@app/_models/administration-models';
import { IAppState } from '@app/store/state/app.state';
import { createSelector } from '@ngrx/store';

const selectAdministration = (state: IAppState) => state.administration;

export const selectSettings = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.settings
);

export const selectNotificationSetting = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.notificationSetting
);

export const selectPrintingForms = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.printingForms
);

export const selectUsers = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.users
);

export const selectConditions = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.conditions
);

export const selectRoles = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.roles
);

export const selectIntegration = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.integration
);

export const selectIntegrationLog = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.integrationLog
);

export const selectCompanyList = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.companyList
);

export const selectSalesChanel = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.salesChanel
);

export const selectProduct = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.product
);

export const selectStopList = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.stopList
);

export const selectInsuranceCompanies = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.insuranceCompanies
);

export const selectInsuranceConditions = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.insuranceConditions
);

export const selectVisualAssessments = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.visualAssessments
);

export const selectUnderChecklist = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.underChecklist
);

export const selectBrmsRule = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.brmsRule
);

export const selectDiscountCondition = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.discount
);

export const selectAuditLog = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.auditLog
);

export const selectCommissionConfig = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.commission
);

export const printingFormStageSetting = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.printingFormStageSetting
);

export const selectPartners = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.partners
);

export const selectAttributes = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.attributes
);

export const selectAttributesSetting = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.attributesSetting
);

export const selectAccountProduct = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.accountProduct
);

export const selectExpenseSetting = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.expenseSetting
);

export const selectBlacklist = createSelector(
  selectAdministration,
  (state: AdministrationState) => state.blacklist
);
