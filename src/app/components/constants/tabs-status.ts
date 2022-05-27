import { TabsStatesList, TabsStatesListForStage } from './tab-status-models';

import { PathForStage } from '@app/_models';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { TabNames } from '@app/components/constants/tab-names';

export const LIST_PASSED_STAGES: Record<string, boolean> = {
  wasVerification: false,
  wasDecisionMaking: false,
  wasDecisionFinal: false,
  wasPaperwork: false,
  wasAcceptance: false
};

export enum TabsDataNames {
  ManagerInfo = 'managerInfo', // 0
  IntegrationInterface = 'integrationInterface', // 1
  // PreApprovedDto = 'preApprovedDto', // 2
  Relatives = 'relatives', // 3
  VerifierInfo = 'verifierInfo', // 4
  DecisionMaker = 'decisionMaker', // 5
  VerificationData = 'verificationData', // 7
  VisualAssessment = 'visualAssessment', // 8
  // AccountsInfo = 'accountsInfo', // 9
  // AccountCardsInfo = 'accountCardsInfo', // 10
  AccountIssue = 'accountIssue', // 11
  ApplicantIncomeInfoFF = 'applicantIncomeInfoFF', // 12
  ApplicantOperationInfo = 'applicantOperationInfo', // 13
  ApplicantOperationFreqInfo = 'applicantOperationFreqInfo', // 14
  ApplicantIpdl = 'applicantIpdl', // 15
  ApplicantIpdlRelativesInfo = 'applicantIpdlRelativesInfo', // 16
  ApplicantIpdlOperationsInfo = 'applicantIpdlOperationsInfo', //  17
  ApplicantFatcaInfo = 'applicantFatcaInfo', // 18
  ApplicantFatcaCountryInfo = 'applicantFatcaCountryInfo', // 19
  ApplicantTaxCountryInfo = 'applicantTaxCountryInfo', // 20
  ApplicantPhotoInfo = 'applicantPhotoInfo', // 21
  PartnerGoodsList = 'partnerGoodsList', // 22
  ApplicantLoanInfoFF = 'applicantLoanInfoFF', // 23
  ApplicantIncomeInfoDM = 'applicantIncomeInfoDM', // 24
  ApplicantLoanInfoDM = 'applicantLoanInfoDM', // 25
  ApplicantContactPersonInfo = 'applicantContactPersonInfo' // 26
}

export const INITIAL_TABS_STATE: TabsStatesList<TabsDataNames, RetailDirectoriesNames> = {
  [TabNames.Acceptance]: {
    isVisible: false,
    isReadonly: false,
    tabDataNamesList: [
      TabsDataNames.AccountIssue // 11
    ],
    tabDirectoriesNamesList: [
      RetailDirectoriesNames.dirScheduleTypes,
      RetailDirectoriesNames.dirScheduleFrequency,
      RetailDirectoriesNames.dirEnsureType,
      RetailDirectoriesNames.dirIssueType,
      RetailDirectoriesNames.productToPaymentDay,
      RetailDirectoriesNames.accepterDecisionList
    ]
  },
  [TabNames.Paperwork]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.AccountIssue // 11
    ],
    tabDirectoriesNamesList: [
      RetailDirectoriesNames.dirScheduleTypes,
      RetailDirectoriesNames.dirScheduleFrequency,
      RetailDirectoriesNames.dirEnsureType,
      RetailDirectoriesNames.dirIssueType,
      RetailDirectoriesNames.productToPaymentDay,
      RetailDirectoriesNames.paperworkDecisionList,
      RetailDirectoriesNames.declineReasons
    ]
  },
  [TabNames.FinalDecision]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.AccountIssue, // 11
      TabsDataNames.ApplicantContactPersonInfo // 26
    ],
    tabDirectoriesNamesList: [
      RetailDirectoriesNames.paymentCards,
      RetailDirectoriesNames.declineReasons,
      RetailDirectoriesNames.currencies,
      RetailDirectoriesNames.insuranceCompany,
      RetailDirectoriesNames.insuranceType,
      RetailDirectoriesNames.insuranceConditions,
      RetailDirectoriesNames.maritalStatuses,
      RetailDirectoriesNames.dirScheduleTypes,
      RetailDirectoriesNames.dirScheduleFrequency,
      RetailDirectoriesNames.dirEnsureType,
      RetailDirectoriesNames.dirIssueType,
      RetailDirectoriesNames.accepterDecisionList,
      RetailDirectoriesNames.relationships,
      RetailDirectoriesNames.insuranceProduct
    ]
  },
  [TabNames.Aml]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.ApplicantOperationInfo, // 13
      TabsDataNames.ApplicantOperationFreqInfo, // 14
      TabsDataNames.ApplicantFatcaInfo // 18
    ],
    tabDirectoriesNamesList: []
  },
  [TabNames.DecisionMaking]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.VerificationData, // 7
      TabsDataNames.DecisionMaker, // 5
      TabsDataNames.ApplicantLoanInfoDM, // 25
      TabsDataNames.ApplicantIncomeInfoDM // 24
    ],
    tabDirectoriesNamesList: [
      // RetailDirectoriesNames.stopListAbsStatusList,
      RetailDirectoriesNames.bank,
      RetailDirectoriesNames.companies,
      RetailDirectoriesNames.jobPositionType,
      RetailDirectoriesNames.currencies,
      RetailDirectoriesNames.incomeType,
      RetailDirectoriesNames.incomeFrequency,
      RetailDirectoriesNames.employmentActivity,
      RetailDirectoriesNames.dirDecisionMakerDecisionList,
      RetailDirectoriesNames.dirDecisionMakerDeclineReasonList,
      RetailDirectoriesNames.provisionRate
    ]
  },
  [TabNames.Verification]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.VerificationData // 7
    ]
  },
  [TabNames.FullForm]: {
    isVisible: true,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.ManagerInfo, // 0
      TabsDataNames.ApplicantLoanInfoFF, // 23
      TabsDataNames.IntegrationInterface, // 1
      TabsDataNames.ApplicantIncomeInfoFF // 12
    ],
    tabDirectoriesNamesList: [
      RetailDirectoriesNames.bank,
      RetailDirectoriesNames.currencies,
      RetailDirectoriesNames.countries,
      RetailDirectoriesNames.cities,
      RetailDirectoriesNames.companies,
      RetailDirectoriesNames.employmentActivity,
      RetailDirectoriesNames.jobPositionType,
      RetailDirectoriesNames.incomeType,
      RetailDirectoriesNames.incomeFrequency,
      RetailDirectoriesNames.productCategories,
      RetailDirectoriesNames.gender,
      RetailDirectoriesNames.creditPurpose,
      RetailDirectoriesNames.declineReasons,
      RetailDirectoriesNames.declineReasonsCallCenter,
      RetailDirectoriesNames.companyStatuses
    ]
  },
  [TabNames.Employment]: {
    isVisible: true,
    isReadonly: true,
    tabDataNamesList: [
      // TabsDataNames.PreApprovedDto // 2
    ]
  },
  [TabNames.AcbInfo]: {
    isVisible: true,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.IntegrationInterface // 1
    ]
  },
  [TabNames.Decision]: {
    isVisible: true,
    isReadonly: true,
    tabDataNamesList: []
  },
  [TabNames.InternalInfo]: {
    isVisible: true,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.IntegrationInterface // 1
    ]
  },
  [TabNames.Documents]: {
    isVisible: true,
    isReadonly: false,
    tabDataNamesList: []
  }
};

export const TABS_STATE_FOR: TabsStatesListForStage<TabsDataNames, RetailDirectoriesNames> = {
  [PathForStage.FULL_FORM]: {
    [TabNames.Decision]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.FullForm]: {
      isVisible: true,
      isReadonly: false
    }
  },
  [PathForStage.VERIFICATION]: {
    [TabNames.AcbInfo]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.Verification]: {
      isVisible: true,
      isReadonly: false
    },
    [TabNames.DecisionMaking]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.FinalDecision]: {
      isVisible: true,
      isReadonly: true
    },
  },
  [PathForStage.DECISION_MAKING]: {
    [TabNames.AcbInfo]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.DecisionMaking]: {
      isVisible: true,
      isReadonly: false
    }
  },
  [PathForStage.DECISION_FINAL]: {
    [TabNames.DecisionMaking]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.FinalDecision]: {
      isVisible: true,
      isReadonly: false
    },
    [TabNames.Aml]: {
      isVisible: true,
      isReadonly: false
    }
  },
  [PathForStage.PAPERWORK]: {
    [TabNames.DecisionMaking]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.FinalDecision]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.Aml]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.Paperwork]: {
      isVisible: true,
      isReadonly: false
    },
    [TabNames.Acceptance]: {
      isVisible: false,
      isReadonly: true
    },
    [TabNames.Documents]: {
      isVisible: true,
      isReadonly: false
    }
  },
  [PathForStage.ACCEPTANCE]: {
    [TabNames.DecisionMaking]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.FinalDecision]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.Aml]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.Paperwork]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.Acceptance]: {
      isVisible: true,
      isReadonly: false
    }
  }
};
