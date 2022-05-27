import { TabsStatesList, TabsStatesListForStage } from './tab-status-models';

import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';
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
  IntegrationInterface = 'integrationInterface', // 1
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

export const INITIAL_TABS_STATE: TabsStatesList<TabsDataNames, MassSegmentDirectoriesNames> = {
  // [TabNames.Acceptance]: {
  //   isVisible: false,
  //   isReadonly: true,
  //   tabDataNamesList: [
  //     TabsDataNames.AccountIssue, // 11
  //     TabsDataNames.ApplicantPhotoInfo // 21
  //   ],
  //   tabDirectoriesNamesList: [MassSegmentDirectoriesNames.paymentCards, MassSegmentDirectoriesNames.accepterDecisionList]
  // },
  // [TabNames.Paperwork]: {
  //   isVisible: false,
  //   isReadonly: true,
  //   tabDataNamesList: [
  //     TabsDataNames.AccountIssue // 11
  //   ],
  //   tabDirectoriesNamesList: [
  //     MassSegmentDirectoriesNames.paymentCards,
  //     MassSegmentDirectoriesNames.paperworkDecisionList,
  //     MassSegmentDirectoriesNames.declineReasons
  //   ]
  // },
  [TabNames.FinalDecision]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      // TabsDataNames.VisualAssessment, // 8
      // TabsDataNames.AccountCardsInfo, // 9
      // TabsDataNames.AccountsInfo, // 10
      // TabsDataNames.AccountIssue, // 11
      // TabsDataNames.ApplicantPhotoInfo // 21
    ],
    tabDirectoriesNamesList: [
      // MassSegmentDirectoriesNames.paymentCards,
      MassSegmentDirectoriesNames.declineReasons
      // MassSegmentDirectoriesNames.currencies,
      // MassSegmentDirectoriesNames.insuranceCompany,
      // MassSegmentDirectoriesNames.insuranceType,
      // MassSegmentDirectoriesNames.insuranceConditions
    ]
  },
  // [TabNames.Aml]: {
  //   isVisible: false,
  //   isReadonly: true,
  //   tabDataNamesList: [
  //     TabsDataNames.ApplicantIncomeInfo, // 12
  //     TabsDataNames.ApplicantOperationInfo, // 13
  //     TabsDataNames.ApplicantOperationFreqInfo, // 14
  //     TabsDataNames.ApplicantIpdl, // 15
  //     TabsDataNames.ApplicantIpdlRelativesInfo, // 16
  //     TabsDataNames.ApplicantIpdlOperationsInfo, //  17
  //     TabsDataNames.ApplicantFatcaInfo, // 18
  //     TabsDataNames.ApplicantFatcaCountryInfo, // 19
  //     TabsDataNames.ApplicantTaxCountryInfo // 20
  //   ],
  //   tabDirectoriesNamesList: [
  //     MassSegmentDirectoriesNames.communicationType,
  //     MassSegmentDirectoriesNames.countries,
  //     MassSegmentDirectoriesNames.regions,
  //     MassSegmentDirectoriesNames.cities,
  //     MassSegmentDirectoriesNames.employmentActivity,
  //     MassSegmentDirectoriesNames.incomeType,
  //     MassSegmentDirectoriesNames.ipdlType,
  //     MassSegmentDirectoriesNames.relationships,
  //     MassSegmentDirectoriesNames.fatca,
  //     MassSegmentDirectoriesNames.innAbsenceReason,
  //     MassSegmentDirectoriesNames.passportType
  //   ]
  // },
  // [TabNames.DecisionMaking]: {
  //   isVisible: false,
  //   isReadonly: true,
  //   tabDataNamesList: [
  //     TabsDataNames.DecisionMaker // 5
  //   ],
  //   tabDirectoriesNamesList: [MassSegmentDirectoriesNames.dirDecisionMakerDecisionList]
  // },
  [TabNames.Verification]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.VerifierInfo, // 4
      TabsDataNames.VerificationData // 7
      // TabsDataNames.VisualAssessment // 8
      // TabsDataNames.ApplicantPhotoInfo // 21
    ],
    tabDirectoriesNamesList: [
      MassSegmentDirectoriesNames.stopListAbsStatusList,
      MassSegmentDirectoriesNames.dirVerifierDecisionList,
      MassSegmentDirectoriesNames.statusData
    ]
  },
  [TabNames.FullForm]: {
    isVisible: true,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.ManagerInfo, // 0
      TabsDataNames.IntegrationInterface, // 1
      TabsDataNames.ApplicantPhotoInfo, // 21
      TabsDataNames.ClientManagerInfo // 23
    ],
    tabDirectoriesNamesList: [
      MassSegmentDirectoriesNames.currencies,
      MassSegmentDirectoriesNames.countries,
      // MassSegmentDirectoriesNames.militaryDutyDir,
      // MassSegmentDirectoriesNames.status,
      MassSegmentDirectoriesNames.productCategories,
      MassSegmentDirectoriesNames.gender,
      MassSegmentDirectoriesNames.maritalStatuses,
      MassSegmentDirectoriesNames.companyActivityTypes,
      // MassSegmentDirectoriesNames.creditPurpose,
      // MassSegmentDirectoriesNames.relationships,
      // MassSegmentDirectoriesNames.numberEmployee,
      // MassSegmentDirectoriesNames.accommodationType,
      // MassSegmentDirectoriesNames.employmentLegalStructure,
      MassSegmentDirectoriesNames.declineReasons,
      MassSegmentDirectoriesNames.declineReasonsCallCenter,
      MassSegmentDirectoriesNames.innType,
      MassSegmentDirectoriesNames.innStatus
    ]
  },
  [TabNames.Inspection]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.BusinessInspection // 22
    ],
    tabDirectoriesNamesList: [
      MassSegmentDirectoriesNames.inspectionResult,
      MassSegmentDirectoriesNames.companyActivityTypes,
      MassSegmentDirectoriesNames.creditPurpose
    ]
  },
  [TabNames.AcbInfoInn]: {
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.IntegrationInterface // 1
    ]
  },
  [TabNames.AcbInfoFin]: {
    isVisible: false,
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
    isVisible: false,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.PreApprovedDto // 2
    ]
  },
  [TabNames.Documents]: {
    isVisible: true,
    isReadonly: false,
    tabDataNamesList: []
  }
};

export const TABS_STATE_FOR: TabsStatesListForStage<TabsDataNames, MassSegmentDirectoriesNames> = {
  [PathForStage.FULL_FORM]: {
    [TabNames.Decision]: {
      isVisible: true,
      isReadonly: false
    },
    [TabNames.FullForm]: {
      isVisible: true,
      isReadonly: false
    }
  },
  [PathForStage.INSPECTION]: {
    [TabNames.FullForm]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.Inspection]: {
      isVisible: true,
      isReadonly: false
    },
    [TabNames.InternalInfo]: {
      isVisible: true,
      isReadonly: true
    }
  },
  [PathForStage.VERIFICATION]: {
    [TabNames.Inspection]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.InternalInfo]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.AcbInfoInn]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.AcbInfoFin]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.Verification]: {
      isVisible: true,
      isReadonly: false
    }
  },
  // [PathForStage.DECISION_MAKING]: {
  //   [TabNames.InternalInfo]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.AcbInfo]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.Verification]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.DecisionMaking]: {
  //     isVisible: true,
  //     isReadonly: false
  //   }
  // },
  [PathForStage.DECISION_FINAL]: {
    // [TabNames.DecisionMaking]: {
    //   isVisible: true,
    //   isReadonly: true
    // },
    [TabNames.Inspection]: {
      isVisible: true,
      isReadonly: true
    },
    [TabNames.FinalDecision]: {
      isVisible: true,
      isReadonly: false
    }
    // [TabNames.Aml]: {
    //   isVisible: true,
    //   isReadonly: false
    // }
  }
  // [PathForStage.PAPERWORK]: {
  //   [TabNames.DecisionMaking]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.FinalDecision]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.Aml]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.Paperwork]: {
  //     isVisible: true,
  //     isReadonly: false
  //   },
  //   [TabNames.Acceptance]: {
  //     isVisible: false,
  //     isReadonly: true
  //   },
  //   [TabNames.Documents]: {
  //     isVisible: true,
  //     isReadonly: false
  //   }
  // },
  // [PathForStage.ACCEPTANCE]: {
  //   [TabNames.DecisionMaking]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.FinalDecision]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.Aml]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.Paperwork]: {
  //     isVisible: true,
  //     isReadonly: true
  //   },
  //   [TabNames.Acceptance]: {
  //     isVisible: true,
  //     isReadonly: false
  //   }
};
