import { TabsStatesList, TabsStatesListForStage } from './tab-status-models';

import { PathForStage } from '@app/_models';
import { TabNames } from '@app/components/constants/tab-names';

export const LIST_PASSED_STAGES: Record<string, boolean> = {
  wasVerification: false,
  wasBusinessInspection: false,
  wasDecisionMaking: false,
  wasDecisionFinal: false,
  wasPaperwork: false,
  wasAcceptance: false
};

export enum TabsDataNames {
  ManagerInfo = 'managerInfo', // 0
  // IntegrationInterface = 'integrationInterface', // 1
  PreApprovedDto = 'preApprovedDto', // 2
  // Relatives = 'relatives', // 3
  VerifierInfo = 'verifierInfo', // 4
  // DecisionMaker = 'decisionMaker', // 5
  VerificationData = 'verificationData', // 7
  VisualAssessment = 'visualAssessment', // 8
  // AccountsInfo = 'accountsInfo', // 9
  // AccountCardsInfo = 'accountCardsInfo', // 10
  // AccountIssue = 'accountIssue', // 11
  // ApplicantIncomeInfo = 'applicantIncomeInfo', // 12
  // ApplicantOperationInfo = 'applicantOperationInfo', // 13
  // ApplicantOperationFreqInfo = 'applicantOperationFreqInfo', // 14
  // ApplicantIpdl = 'applicantIpdl', // 15
  // ApplicantIpdlRelativesInfo = 'applicantIpdlRelativesInfo', // 16
  // ApplicantIpdlOperationsInfo = 'applicantIpdlOperationsInfo', //  17
  // ApplicantFatcaInfo = 'applicantFatcaInfo', // 18
  // ApplicantFatcaCountryInfo = 'applicantFatcaCountryInfo', // 19
  // ApplicantTaxCountryInfo = 'applicantTaxCountryInfo', // 20
  ApplicantPhotoInfo = 'applicantPhotoInfo', // 21
  BusinessInspection = 'businessInspection', // 22
  ClientManagerInfo = 'clientManagerInfo' // 23
}
