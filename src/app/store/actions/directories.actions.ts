import {
  Dir,
  DirAbsCode,
  DirBranch,
  DirBusinessInspectionResult,
  DirCityDto,
  DirCountry,
  DirPreApproved,
  DirRiskBasedPrice,
  DirSigner,
  Directory,
  DirectoryVal,
  PageDTO,
  PaginationAndSortingDto,
  Segment,
  UploadOptions
} from '@app/_models';
import { createAction, props } from '@ngrx/store';

export enum DirectoryActions {
  DirSetDeclines = '[Directories Page], Directories set Declines',
  DirUploadDeclines = '[Directories Page], Directories upload Declines',
  DirSetDeclinesSuccess = '[Directories Page], Directories set Declines success',

  DirSetBankBranch = '[Directories Page], Directories set Bank Branch',
  DirUploadBankBranch = '[Directories Page], Directories upload Bank Branch',
  DirSetBankBranchSuccess = '[Directories Page], Directories set Bank Branch success',

  DirSetCountries = '[Directories Page], Directories set Countries',
  DirUploadCountries = '[Directories Page], Directories upload Countries',
  DirSetCountriesSuccess = '[Directories Page], Directories set Countries success',

  DirSetCurrency = '[Directories Page], Directories set Currency',
  DirUploadCurrency = '[Directories Page], Directories upload Currency',
  DirSetCurrencySuccess = '[Directories Page], Directories set Currency success',

  // DirSetSalesChanel = '[Directories Page], Directories set Sales Chanel',
  // DirUploadSalesChanel = '[Directories Page], Directories upload Sales Chanel',
  // DirSetSalesChanelSuccess = '[Directories Page], Directories set Sales Chanel success',

  DirSetOperatorCode = '[Directories Page], Directories set Operator Code',
  DirUploadOperatorCode = '[Directories Page], Directories upload Operator Code',
  DirSetOperatorCodeSuccess = '[Directories Page], Directories set Operator Code success',

  DirSetPreApproved = '[Directories Page], Directories set Pre Approved',
  DirUploadPreApproved = '[Directories Page], Directories upload Pre Approved',
  DirSetPreApprovedSuccess = '[Directories Page], Directories set Pre Approved success',

  DirSetCreditPurpose = '[Directories Page], Directories set Credit Purpose',
  DirUploadCreditPurpose = '[Directories Page], Directories upload Credit Purpose',
  DirSetCreditPurposeSuccess = '[Directories Page], Directories set Credit Purpose success',

  DirSetEducation = '[Directories Page], Directories set Education',
  DirUploadEducation = '[Directories Page], Directories upload Education',
  DirSetEducationSuccess = '[Directories Page], Directories set Education success',

  DirSetActivities = '[Directories Page], Directories set Activities',
  DirUploadActivities = '[Directories Page], Directories upload Activities',
  DirSetActivitiesSuccess = '[Directories Page], Directories set Activities success',

  DirSetFamilyRelationship = '[Directories Page], Directories set Family Relationship',
  DirUploadFamilyRelationship = '[Directories Page], Directories upload Family Relationship',
  DirSetFamilyRelationshipSuccess = '[Directories Page], Directories set Family Relationship success',

  DirSetNumberEmployee = '[Directories Page], Directories set Number Employee',
  DirUploadNumberEmployee = '[Directories Page], Directories upload Number Employee',
  DirSetNumberEmployeeSuccess = '[Directories Page], Directories set Number Employee success',

  DirSetAccommodationType = '[Directories Page], Directories set Accommodation Type',
  DirUploadAccommodationType = '[Directories Page], Directories upload Accommodation Type',
  DirSetAccommodationTypeSuccess = '[Directories Page], Directories set Accommodation Type success',

  DirSetCallCenterDecline = '[Directories Page], Directories set Call Center rDecline',
  DirUploadCallCenterDecline = '[Directories Page], Directories upload Call Center Decline',
  DirSetCallCenterDeclineSuccess = '[Directories Page], Directories set Call Center Decline success',

  DirSetEmploymentLegalType = '[Directories Page], Directories set Employment Legal Type',
  DirUploadEmploymentLegalType = '[Directories Page], Directories upload Employment Legal Type',
  DirSetEmploymentLegalTypeSuccess = '[Directories Page], Directories set Employment Legal Type success',

  DirSetDepartment = '[Directories Page], Directories set Department',
  DirUploadDepartment = '[Directories Page], Directories upload Department',
  DirSetDepartmentSuccess = '[Directories Page], Directories set Department success',

  DirSetIpdl = '[Directories Page], Directories set Ipdl',
  DirUploadIpdl = '[Directories Page], Directories upload Ipdl',
  DirSetIpdlSuccess = '[Directories Page], Directories set Ipdl success',

  DirSetInnAbsenceReason = '[Directories Page], Directories set Inn Absence Reason',
  DirUploadInnAbsenceReason = '[Directories Page], Directories upload Inn Absence Reason',
  DirSetInnAbsenceReasonSuccess = '[Directories Page], Directories set Inn Absence Reason success',

  DirSetCommunicationType = '[Directories Page], Directories set Communication Type',
  DirUploadCommunicationType = '[Directories Page], Directories upload Communication Type',
  DirSetCommunicationTypeSuccess = '[Directories Page], Directories set Communication Type success',

  DirSetIncomeType = '[Directories Page], Directories set Income Type',
  DirUploadIncomeType = '[Directories Page], Directories upload Income Type',
  DirSetIncomeTypeSuccess = '[Directories Page], Directories set Income Type success',

  DirSetOperationType = '[Directories Page], Directories set Operation Type',
  DirUploadOperationType = '[Directories Page], Directories upload Operation Type',
  DirSetOperationTypeSuccess = '[Directories Page], Directories set Operation Type success',

  DirSetFatca = '[Directories Page], Directories set FATCA',
  DirUploadFatca = '[Directories Page], Directories upload FATCA',
  DirSetFatcaSuccess = '[Directories Page], Directories set FATCA success',

  DirSetOperationFreqType = '[Directories Page], Directories set Operation Freq Type',
  DirUploadOperationFreqType = '[Directories Page], Directories upload Operation Freq Type',
  DirSetOperationFreqTypeSuccess = '[Directories Page], Directories set Operation Freq Type success',

  DirSetSigner = '[Directories Page], Directories set Signer',
  DirUploadSigner = '[Directories Page], Directories upload Signer',
  DirSetSignerSuccess = '[Directories Page], Directories set Signer success',

  DirSetCity = '[Directories Page], Directories set City',
  DirUploadCity = '[Directories Page], Directories upload City',
  DirSetCitySuccess = '[Directories Page], Directories set City success',

  DirSetRegion = '[Directories Page], Directories set Region',
  DirUploadRegion = '[Directories Page], Directories upload Region',
  DirSetRegionSuccess = '[Directories Page], Directories set Region success',

  DirSetCallStatus = '[Directories Page], Directories set Call Status',
  DirUploadCallStatus = '[Directories Page], Directories upload Call Status',
  DirSetCallStatusSuccess = '[Directories Page], Directories set Call Status success',

  DirSetPaymentCard = '[Directories Page], Directories set Payment Card',
  DirUploadPaymentCard = '[Directories Page], Directories upload Payment Card',
  DirSetPaymentCardSuccess = '[Directories Page], Directories set Payment Card success',

  DirSetDecisionMakerDeclineReason = '[Directories Page], Directories set DecisionMaker Decline Reason',
  DirUploadDecisionMakerDeclineReason = '[Directories Page], Directories upload DecisionMaker Decline Reason',
  DirSetDecisionMakerDeclineReasonSuccess = '[Directories Page], Directories set DecisionMaker Decline Reason success',

  DirSetInsuranceType = '[Directories Page], Directories set Insurance Type',
  DirUploadInsuranceType = '[Directories Page], Directories upload Insurance Type',
  DirSetInsuranceTypeSuccess = '[Directories Page], Directories set Insurance Type success',

  DirSetSegments = '[Directories Page], Directories set Segments',
  DirUploadSegments = '[Directories Page], Directories upload Segments',
  DirSetSegmentsSuccess = '[Directories Page], Directories set Segments success',

  DirSetInspectionResult = '[Directories Page], Directories set InspectionResult',
  DirUploadInspectionResult = '[Directories Page], Directories upload InspectionResult',
  DirSetInspectionResultSuccess = '[Directories Page], Directories set InspectionResult success',

  DirSetPreApprovedFactor = '[Directories Page], Directories set PreApprovedFactor',
  DirUploadPreApprovedFactor = '[Directories Page], Directories upload PreApprovedFactor',
  DirSetPreApprovedFactorSuccess = '[Directories Page], Directories set PreApprovedFactor success',

  DirSetAbsCommission = '[Directories Page], Directories set AbsCommission',
  DirUploadAbsCommission = '[Directories Page], Directories upload AbsCommission',
  DirSetAbsCommissionSuccess = '[Directories Page], Directories set AbsCommission success',

  DirSetInnType = '[Directories Page], Directories set InnType',
  DirUploadInnType = '[Directories Page], Directories upload InnType',
  DirSetInnTypeSuccess = '[Directories Page], Directories set InnType success',

  DirSetInnStatus = '[Directories Page], Directories set InnStatus',
  DirUploadInnStatus = '[Directories Page], Directories upload InnStatus',
  DirSetInnStatusSuccess = '[Directories Page], Directories set InnStatus success',

  DirSetDirGoods = '[Directories Page], Directories set DirGoods',
  DirUploadDirGoods = '[Directories Page], Directories upload DirGoods',
  DirSetDirGoodsSuccess = '[Directories Page], Directories set DirGoods success',

  DirSetDirEnsureType = '[Directories Page], Directories set DirEnsureType',
  DirUploadDirEnsureType = '[Directories Page], Directories upload DirEnsureType',
  DirSetDirEnsureTypeSuccess = '[Directories Page], Directories set DirEnsureType success',

  DirSetDirIssueType = '[Directories Page], Directories set DirIssueType',
  DirUploadDirIssueType = '[Directories Page], Directories upload DirIssueType',
  DirSetDirIssueTypeSuccess = '[Directories Page], Directories set DirIssueType success',

  DirSetDirPartner = '[Directories Page], Directories set DirPartner',
  DirUploadDirPartner = '[Directories Page], Directories upload DirPartner',
  DirSetDirPartnerSuccess = '[Directories Page], Directories set DirPartner success',

  DirSetDirScheduleFrequency = '[Directories Page], Directories set DirScheduleFrequency',
  DirUploadDirScheduleFrequency = '[Directories Page], Directories upload DirScheduleFrequency',
  DirSetDirScheduleFrequencySuccess = '[Directories Page], Directories set DirScheduleFrequency success',

  DirSetDirIncomeFrequency = '[Directories Page], Directories set DirIncomeFrequency',
  DirUploadDirIncomeFrequency = '[Directories Page], Directories upload DirIncomeFrequency',
  DirSetDirIncomeFrequencySuccess = '[Directories Page], Directories set DirIncomeFrequency success',

  DirSetDirJobPosition = '[Directories Page], Directories set DirJobPosition',
  DirUploadDirJobPosition = '[Directories Page], Directories upload DirJobPosition',
  DirSetDirJobPositionSuccess = '[Directories Page], Directories set DirJobPosition success',

  DirSetTariff = '[Directories Page], Directories set Tariff',
  DirUploadTariff = '[Directories Page], Directories upload Tariff',
  DirSetTariffSuccess = '[Directories Page], Directories set Tariff success',

  DirSetRbp = '[Directories Page], Directories set Rbp',
  DirUploadRbp = '[Directories Page], Directories upload Rbp',
  DirSetRbpSuccess = '[Directories Page], Directories set Rbp success'
}

// declines
export const DirSetDeclinesAction = createAction(
  DirectoryActions.DirSetDeclines,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDeclinesAction = createAction(
  DirectoryActions.DirUploadDeclines,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDeclinesSuccessAction = createAction(
  DirectoryActions.DirSetDeclinesSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Bank Branch
export const DirSetBankBranchAction = createAction(
  DirectoryActions.DirSetBankBranch,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadBankBranchAction = createAction(
  DirectoryActions.DirUploadBankBranch,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetBankBranchSuccessAction = createAction(
  DirectoryActions.DirSetBankBranchSuccess,
  props<{ data: PageDTO<DirBranch> }>()
);

// Countries
export const DirSetCountriesAction = createAction(
  DirectoryActions.DirSetCountries,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadCountriesAction = createAction(
  DirectoryActions.DirUploadCountries,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetCountriesSuccessAction = createAction(
  DirectoryActions.DirSetCountriesSuccess,
  props<{ data: PageDTO<DirCountry> }>()
);

// Currency
export const DirSetCurrencyAction = createAction(
  DirectoryActions.DirSetCurrency,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadCurrencyAction = createAction(
  DirectoryActions.DirUploadCurrency,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetCurrencySuccessAction = createAction(
  DirectoryActions.DirSetCurrencySuccess,
  props<{ data: PageDTO<Directory> }>()
);

// // Sales Chanel
// export const DirSetSalesChanelAction = createAction(
//   DirectoryActions.DirSetSalesChanel,
//   props<{ data: PaginationAndSortingDto }>()
// );
// export const DirUploadSalesChanelAction = createAction(
//   DirectoryActions.DirUploadSalesChanel,
//   props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
// );
// export const DirSetSalesChanelSuccessAction = createAction(
//   DirectoryActions.DirSetSalesChanelSuccess,
//   props<{ data: PageDTO<Directory> }>()
// );

// Operator Code
export const DirSetOperatorCodeAction = createAction(
  DirectoryActions.DirSetOperatorCode,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadOperatorCodeAction = createAction(
  DirectoryActions.DirUploadOperatorCode,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetOperatorCodeSuccessAction = createAction(
  DirectoryActions.DirSetOperatorCodeSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Pre Approved
export const DirSetPreApprovedAction = createAction(
  DirectoryActions.DirSetPreApproved,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadPreApprovedAction = createAction(
  DirectoryActions.DirUploadPreApproved,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetPreApprovedSuccessAction = createAction(
  DirectoryActions.DirSetPreApprovedSuccess,
  props<{ data: PageDTO<DirPreApproved> }>()
);

// Pre Approved
export const DirSetCreditPurposeAction = createAction(
  DirectoryActions.DirSetCreditPurpose,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadCreditPurposeAction = createAction(
  DirectoryActions.DirUploadCreditPurpose,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetCreditPurposeSuccessAction = createAction(
  DirectoryActions.DirSetCreditPurposeSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Pre Approved
export const DirSetEducationAction = createAction(
  DirectoryActions.DirSetEducation,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadEducationAction = createAction(
  DirectoryActions.DirUploadEducation,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetEducationSuccessAction = createAction(
  DirectoryActions.DirSetEducationSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Pre Approved
export const DirSetActivitiesAction = createAction(
  DirectoryActions.DirSetActivities,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadActivitiesAction = createAction(
  DirectoryActions.DirUploadActivities,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetActivitiesSuccessAction = createAction(
  DirectoryActions.DirSetActivitiesSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Pre Approved
export const DirSetFamilyRelationshipAction = createAction(
  DirectoryActions.DirSetFamilyRelationship,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadFamilyRelationshipAction = createAction(
  DirectoryActions.DirUploadFamilyRelationship,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetFamilyRelationshipSuccessAction = createAction(
  DirectoryActions.DirSetFamilyRelationshipSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Number Employee
export const DirSetNumberEmployeeAction = createAction(
  DirectoryActions.DirSetNumberEmployee,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadNumberEmployeeAction = createAction(
  DirectoryActions.DirUploadNumberEmployee,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetNumberEmployeeSuccessAction = createAction(
  DirectoryActions.DirSetNumberEmployeeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// Accommodation Type
export const DirSetAccommodationTypeAction = createAction(
  DirectoryActions.DirSetAccommodationType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadAccommodationTypeAction = createAction(
  DirectoryActions.DirUploadAccommodationType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetAccommodationTypeSuccessAction = createAction(
  DirectoryActions.DirSetAccommodationTypeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// Call Center Decline
export const DirSetCallCenterDeclineAction = createAction(
  DirectoryActions.DirSetCallCenterDecline,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadCallCenterDeclineAction = createAction(
  DirectoryActions.DirUploadCallCenterDecline,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetCallCenterDeclineSuccessAction = createAction(
  DirectoryActions.DirSetCallCenterDeclineSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// Employment Legal Type
export const DirSetEmploymentLegalTypeAction = createAction(
  DirectoryActions.DirSetEmploymentLegalType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadEmploymentLegalTypeAction = createAction(
  DirectoryActions.DirUploadEmploymentLegalType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetEmploymentLegalTypeSuccessAction = createAction(
  DirectoryActions.DirSetEmploymentLegalTypeSuccess,
  props<{ data: PageDTO<DirAbsCode> }>()
);

// Department
export const DirSetDepartmentAction = createAction(
  DirectoryActions.DirSetDepartment,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDepartmentAction = createAction(
  DirectoryActions.DirUploadDepartment,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDepartmentSuccessAction = createAction(
  DirectoryActions.DirSetDepartmentSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Ipdl
export const DirSetIpdlAction = createAction(DirectoryActions.DirSetIpdl, props<{ data: PaginationAndSortingDto }>());
export const DirUploadIpdlAction = createAction(
  DirectoryActions.DirUploadIpdl,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetIpdlSuccessAction = createAction(
  DirectoryActions.DirSetIpdlSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// Inn Absence Reason
export const DirSetInnAbsenceReasonAction = createAction(
  DirectoryActions.DirSetInnAbsenceReason,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadInnAbsenceReasonAction = createAction(
  DirectoryActions.DirUploadInnAbsenceReason,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetInnAbsenceReasonSuccessAction = createAction(
  DirectoryActions.DirSetInnAbsenceReasonSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// Communication Type
export const DirSetCommunicationTypeAction = createAction(
  DirectoryActions.DirSetCommunicationType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadCommunicationTypeAction = createAction(
  DirectoryActions.DirUploadCommunicationType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetCommunicationTypeSuccessAction = createAction(
  DirectoryActions.DirSetCommunicationTypeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// Income Type
export const DirSetIncomeTypeAction = createAction(
  DirectoryActions.DirSetIncomeType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadIncomeTypeAction = createAction(
  DirectoryActions.DirUploadIncomeType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetIncomeTypeSuccessAction = createAction(
  DirectoryActions.DirSetIncomeTypeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// Operation Type
export const DirSetOperationTypeAction = createAction(
  DirectoryActions.DirSetOperationType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadOperationTypeAction = createAction(
  DirectoryActions.DirUploadOperationType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetOperationTypeSuccessAction = createAction(
  DirectoryActions.DirSetOperationTypeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// FATCA
export const DirSetFatcaAction = createAction(DirectoryActions.DirSetFatca, props<{ data: PaginationAndSortingDto }>());
export const DirUploadFatcaAction = createAction(
  DirectoryActions.DirUploadFatca,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetFatcaSuccessAction = createAction(
  DirectoryActions.DirSetFatcaSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Operation Freq Type
export const DirSetOperationFreqTypeAction = createAction(
  DirectoryActions.DirSetOperationFreqType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadOperationFreqTypeAction = createAction(
  DirectoryActions.DirUploadOperationFreqType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetOperationFreqTypeSuccessAction = createAction(
  DirectoryActions.DirSetOperationFreqTypeSuccess,
  props<{ data: PageDTO<Directory> }>()
);

// Signer

export const DirSetSignerAction = createAction(
  DirectoryActions.DirSetSigner,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadSignerAction = createAction(
  DirectoryActions.DirUploadSigner,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetSignerSuccessAction = createAction(
  DirectoryActions.DirSetSignerSuccess,
  props<{ data: PageDTO<DirSigner> }>()
);

// City
export const DirSetCityAction = createAction(DirectoryActions.DirSetCity, props<{ data: PaginationAndSortingDto }>());
export const DirUploadCityAction = createAction(
  DirectoryActions.DirUploadCity,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetCitySuccessAction = createAction(
  DirectoryActions.DirSetCitySuccess,
  props<{ data: PageDTO<DirCityDto> }>()
);

// Region

export const DirSetRegionAction = createAction(
  DirectoryActions.DirSetRegion,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadRegionAction = createAction(
  DirectoryActions.DirUploadRegion,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetRegionSuccessAction = createAction(
  DirectoryActions.DirSetRegionSuccess,
  props<{ data: PageDTO<DirAbsCode> }>()
);

// Call Status

export const DirSetCallStatusAction = createAction(
  DirectoryActions.DirSetCallStatus,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadCallStatusAction = createAction(
  DirectoryActions.DirUploadCallStatus,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetCallStatusSuccessAction = createAction(
  DirectoryActions.DirSetCallStatusSuccess,
  props<{ data: PageDTO<Dir> }>()
);
// Payment Card

export const DirSetPaymentCardAction = createAction(
  DirectoryActions.DirSetPaymentCard,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadPaymentCardAction = createAction(
  DirectoryActions.DirUploadPaymentCard,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetPaymentCardSuccessAction = createAction(
  DirectoryActions.DirSetPaymentCardSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// Under Decline Reason

export const DirSetDecisionMakerDeclineReasonAction = createAction(
  DirectoryActions.DirSetDecisionMakerDeclineReason,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDecisionMakerDeclineReasonAction = createAction(
  DirectoryActions.DirUploadDecisionMakerDeclineReason,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDecisionMakerDeclineReasonSuccessAction = createAction(
  DirectoryActions.DirSetDecisionMakerDeclineReasonSuccess,
  props<{ data: PageDTO<DirectoryVal> }>()
);

// Insurance Type

export const DirSetInsuranceTypeAction = createAction(
  DirectoryActions.DirSetInsuranceType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadInsuranceTypeAction = createAction(
  DirectoryActions.DirUploadInsuranceType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetInsuranceTypeSuccessAction = createAction(
  DirectoryActions.DirSetInsuranceTypeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// SEGMENTS

export const DirSetSegmentsAction = createAction(
  DirectoryActions.DirSetSegments,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadSegmentsAction = createAction(
  DirectoryActions.DirUploadSegments,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetSegmentsSuccessAction = createAction(
  DirectoryActions.DirSetSegmentsSuccess,
  props<{ data: PageDTO<Segment> }>()
);

// TARIFF

export const DirSetTariffAction = createAction(
  DirectoryActions.DirSetTariff,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadTariffAction = createAction(
  DirectoryActions.DirUploadTariff,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetTariffSuccessAction = createAction(
  DirectoryActions.DirSetTariffSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// INSPECTION_RESULT

export const DirSetInspectionResultAction = createAction(
  DirectoryActions.DirSetInspectionResult,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadInspectionResultAction = createAction(
  DirectoryActions.DirUploadInspectionResult,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetInspectionResultSuccessAction = createAction(
  DirectoryActions.DirSetInspectionResultSuccess,
  props<{ data: PageDTO<DirBusinessInspectionResult> }>()
);

// PRE APPROVED FACTOR
export const DirSetPreApprovedFactorAction = createAction(
  DirectoryActions.DirSetPreApprovedFactor,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadPreApprovedFactorAction = createAction(
  DirectoryActions.DirUploadPreApprovedFactor,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetPreApprovedFactorSuccessAction = createAction(
  DirectoryActions.DirSetPreApprovedFactorSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// ABS COMMISSION
export const DirSetAbsCommissionAction = createAction(
  DirectoryActions.DirSetAbsCommission,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadAbsCommissionAction = createAction(
  DirectoryActions.DirUploadAbsCommission,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetAbsCommissionSuccessAction = createAction(
  DirectoryActions.DirSetAbsCommissionSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// INN TYPE
export const DirSetInnTypeAction = createAction(
  DirectoryActions.DirSetInnType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadInnTypeAction = createAction(
  DirectoryActions.DirUploadInnType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetInnTypeSuccessAction = createAction(
  DirectoryActions.DirSetInnTypeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// INN STATUS
export const DirSetInnStatusAction = createAction(
  DirectoryActions.DirSetInnStatus,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadInnStatusAction = createAction(
  DirectoryActions.DirUploadInnStatus,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetInnStatusSuccessAction = createAction(
  DirectoryActions.DirSetInnStatusSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// DirGoods
export const DirSetDirGoodsAction = createAction(
  DirectoryActions.DirSetDirGoods,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDirGoodsAction = createAction(
  DirectoryActions.DirUploadDirGoods,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDirGoodsSuccessAction = createAction(
  DirectoryActions.DirSetDirGoodsSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// DirEnsureType
export const DirSetDirEnsureTypeAction = createAction(
  DirectoryActions.DirSetDirEnsureType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDirEnsureTypeAction = createAction(
  DirectoryActions.DirUploadDirEnsureType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDirEnsureTypeSuccessAction = createAction(
  DirectoryActions.DirSetDirEnsureTypeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// DirIssueType
export const DirSetDirIssueTypeAction = createAction(
  DirectoryActions.DirSetDirIssueType,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDirIssueTypeAction = createAction(
  DirectoryActions.DirUploadDirIssueType,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDirIssueTypeSuccessAction = createAction(
  DirectoryActions.DirSetDirIssueTypeSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// DirIncomeFrequency
export const DirSetDirIncomeFrequencyAction = createAction(
  DirectoryActions.DirSetDirIncomeFrequency,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDirIncomeFrequencyAction = createAction(
  DirectoryActions.DirUploadDirIncomeFrequency,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDirIncomeFrequencySuccessAction = createAction(
  DirectoryActions.DirSetDirIncomeFrequencySuccess,
  props<{ data: PageDTO<Dir> }>()
);

// DirScheduleFrequency
export const DirSetDirScheduleFrequencyAction = createAction(
  DirectoryActions.DirSetDirScheduleFrequency,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDirScheduleFrequencyAction = createAction(
  DirectoryActions.DirUploadDirScheduleFrequency,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDirScheduleFrequencySuccessAction = createAction(
  DirectoryActions.DirSetDirScheduleFrequencySuccess,
  props<{ data: PageDTO<Dir> }>()
);

// DirJobPosition
export const DirSetDirJobPositionAction = createAction(
  DirectoryActions.DirSetDirJobPosition,
  props<{ data: PaginationAndSortingDto }>()
);
export const DirUploadDirJobPositionAction = createAction(
  DirectoryActions.DirUploadDirJobPosition,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetDirJobPositionSuccessAction = createAction(
  DirectoryActions.DirSetDirJobPositionSuccess,
  props<{ data: PageDTO<Dir> }>()
);

// DirRBP
export const DirSetRbpAction = createAction(DirectoryActions.DirSetRbp, props<{ data: PaginationAndSortingDto }>());
export const DirUploadRbpAction = createAction(
  DirectoryActions.DirUploadRbp,
  props<{ sortAndPage: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const DirSetRbpSuccessAction = createAction(
  DirectoryActions.DirSetRbpSuccess,
  props<{ data: PageDTO<DirRiskBasedPrice> }>()
);
