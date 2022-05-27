import * as DirectoriesActions from '@app/store/actions/directories.actions';
import * as cloneDeep from '../../../../node_modules/clone-deep';

import { Action, createReducer, on } from '@ngrx/store';

import { DirectoriesState } from '@app/_models';
import { initialDirectoriesState } from '@app/store/state/directories.state';

export const directoriesReducer = createReducer(
  initialDirectoriesState,
  on(DirectoriesActions.DirSetDeclinesSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.declines = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetBankBranchSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.bankBranch = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetCountriesSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.countries = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetCurrencySuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.currency = data;
    return copyState;
  }),
  // on(DirectoriesActions.DirSetSalesChanelSuccessAction, (state, { data }) => {
  //   const copyState = cloneDeep(state);
  //   copyState.salesChanel = data;
  //   return copyState;
  // }),
  on(DirectoriesActions.DirSetOperatorCodeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.operatorCode = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetPreApprovedSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.preApproved = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetCreditPurposeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.creditPurpose = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetEducationSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.education = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetActivitiesSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.activities = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetFamilyRelationshipSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.familyRelationship = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetNumberEmployeeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.numberEmployee = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetAccommodationTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.accommodationType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetCallCenterDeclineSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.callCenterDecline = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetEmploymentLegalTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.employmentLegalType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetDepartmentSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.departments = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetIpdlSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.ipdl = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetInnAbsenceReasonSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.innAbsenceReason = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetCommunicationTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.communicationType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetIncomeTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.incomeType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetOperationTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.operationType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetFatcaSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.fatca = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetOperationFreqTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.operationFreqType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetSignerSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.signer = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetCitySuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.city = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetRegionSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.region = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetCallStatusSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.callStatus = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetPaymentCardSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.paymentCard = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetDecisionMakerDeclineReasonSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.decisionMakerDeclineReason = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetInsuranceTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.insuranceType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetSegmentsSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.segments = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetTariffSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.tariff = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetInspectionResultSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.inspectionResult = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetPreApprovedFactorSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.preApprovedFactor = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetAbsCommissionSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.absCommission = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetInnTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.innType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetInnStatusSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.innStatus = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetDirGoodsSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.dirGoods = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetDirEnsureTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.dirEnsureType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetDirScheduleFrequencySuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.dirScheduleFrequency = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetDirIssueTypeSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.dirIssueType = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetDirIncomeFrequencySuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.dirIncomeFrequency = data;
    return copyState;
  }),
  on(DirectoriesActions.DirSetDirJobPositionSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.dirJobPosition = data;
    return copyState;
  }),

  on(DirectoriesActions.DirSetRbpSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.rbp = data;
    return copyState;
  })
);

export function reducer(state: DirectoriesState | undefined, action: Action) {
  return directoriesReducer(state, action);
}
