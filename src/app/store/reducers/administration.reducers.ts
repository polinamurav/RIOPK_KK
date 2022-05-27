import * as AdministrationActions from '@app/store/actions/administration.actions';
import * as cloneDeep from '../../../../node_modules/clone-deep';

import { Action, createReducer, on } from '@ngrx/store';

import { AdministrationState } from '@app/_models/administration-models';
import { initialAdministrationState } from '@app/store/state/administration.state';

export const administrationReducer = createReducer(
  initialAdministrationState,
  on(AdministrationActions.AdmSetConditionSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.conditions = data;
    return copyState;
  }),
  on(AdministrationActions.AdmUpdateConditionSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    const content = copyState.conditions.content;
    const indexEl = content.findIndex(prop => prop.id === data.id);
    if (indexEl >= 0) {
      content.splice(indexEl, 1);
      content.splice(indexEl, 0, data);
    }
    return copyState;
  }),
  on(AdministrationActions.AdmSetPrintingFormSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.printingForms = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetUserSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.users = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetSettingsSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.settings = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetNotificationSettingSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.notificationSetting = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetIntegrationSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.integration = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetIntegrationLogSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.integrationLog = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetCompanyListSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.companyList = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetSalesChanelSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.salesChanel = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetProductSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.product = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetStopListSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.stopList = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetInsuranceCompaniesSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.insuranceCompanies = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetInsuranceConditionsSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.insuranceConditions = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetVisualAssessmentSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.visualAssessments = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetUnderChecklistSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.underChecklist = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetBrmsRuleSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.brmsRule = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetDiscountConditionSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.discount = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetAuditLogSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.auditLog = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetCommissionConfigSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.commission = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetPrintingFormStageSettingSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.printingFormStageSetting = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetPartnersSuccessAction, (state: AdministrationState, { data }) => {
    const copyState: AdministrationState = cloneDeep(state);
    copyState.partners = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetAttributesSuccessAction, (state: AdministrationState, { data }) => {
    const copyState: AdministrationState = cloneDeep(state);
    copyState.attributes = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetAttributesSettingSuccessAction, (state: AdministrationState, { data }) => {
    const copyState: AdministrationState = cloneDeep(state);
    copyState.attributesSetting = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetAccountProductSuccessAction, (state: AdministrationState, { data }) => {
    const copyState: AdministrationState = cloneDeep(state);
    copyState.accountProduct = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetExpenseSettingSuccessAction, (state: AdministrationState, { data }) => {
    const copyState: AdministrationState = cloneDeep(state);
    copyState.expenseSetting = data;
    return copyState;
  }),
  on(AdministrationActions.AdmSetBlacklistSuccessAction, (state: AdministrationState, { data }) => {
    const copyState: AdministrationState = cloneDeep(state);
    copyState.blacklist = data;
    return copyState;
  }),
);

export function reducer(state: AdministrationState | undefined, action: Action) {
  return administrationReducer(state, action);
}
