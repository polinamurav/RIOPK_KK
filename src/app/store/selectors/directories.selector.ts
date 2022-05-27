import { DirectoriesState } from '@app/_models';
import { IAppState } from '@app/store/state/app.state';
import { createSelector } from '@ngrx/store';

const selectDirectories = (state: IAppState) => state.directories;

export const selectDeclines = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.declines
);

export const selectBankBranch = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.bankBranch
);

export const selectCountries = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.countries
);

export const selectCurrency = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.currency
);

// export const selectSalesChanel = createSelector(
//   selectDirectories,
//   (state: DirectoriesState) => state.salesChanel
// );

export const selectOperatorCode = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.operatorCode
);

export const selectPreApproved = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.preApproved
);

export const selectCreditPurpose = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.creditPurpose
);

export const selectEducation = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.education
);

export const selectActivities = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.activities
);

export const selectFamilyRelationship = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.familyRelationship
);

export const selectNumberEmployee = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.numberEmployee
);

export const selectAccommodationType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.accommodationType
);

export const selectCallCenterDecline = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.callCenterDecline
);

export const selectLegalStructureType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.employmentLegalType
);

export const selectDepartment = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.departments
);

export const selectIpdl = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.ipdl
);

export const selectInnAbsenceReason = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.innAbsenceReason
);

export const selectCommunicationType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.communicationType
);

export const selectIncomeType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.incomeType
);

export const selectOperationType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.operationType
);

export const selectFatca = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.fatca
);

export const selectOperationFreqType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.operationFreqType
);

export const selectSigner = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.signer
);

export const selectCity = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.city
);

export const selectRegion = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.region
);

export const selectCallStatus = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.callStatus
);

export const selectPaymentCard = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.paymentCard
);

export const selectDecisionMakerDeclineReason = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.decisionMakerDeclineReason
);

export const selectInsuranceType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.insuranceType
);

export const selectSegments = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.segments
);

export const selectInspectionResult = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.inspectionResult
);

export const selectPreApprovedFactor = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.preApprovedFactor
);

export const selectAbsCommission = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.absCommission
);

export const selectInnType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.innType
);

export const selectInnStatus = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.innStatus
);
export const selectDirGoods = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.dirGoods
);
export const selectDirPartner = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.dirGoods
);
export const selectDirEnsureType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.dirEnsureType
);
export const selectDirIssueType = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.dirIssueType
);
export const selectDirScheduleFrequency = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.dirScheduleFrequency
);
export const selectDirIncomeFrequency = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.dirIncomeFrequency
);
export const selectDirJobPosition = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.dirJobPosition
);

export const selectTariff = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.tariff
);

export const selectRbp = createSelector(
  selectDirectories,
  (state: DirectoriesState) => state.rbp
);
