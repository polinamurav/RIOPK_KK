import { FOOTER_BUTTON_PRESETS } from './footer-buttons-presets';
import { TabFooterState } from '@app/components/tabs-footer/constants/footer-buttons.model';
import {RoleAuthority} from "@app/_models";

export const COMMON_TABS_FOOTER_CONFIGS: { [key: string]: TabFooterState } = {
  acceptance: {
    showCommentsButton: true,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ],
    commentsConfig: [
      {
        eventType: 'loadToSopiok',
        commentListKey: 'chatCradminManagerList'
      }
    ]
  },
  aml: {
    showCommentsButton: false,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.save
      }
    ]
  },
  dataForm: {
    showCommentsButton: true,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay
      },
      {
        ...FOOTER_BUTTON_PRESETS.decline
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ],
    commentsConfig: [
      {
        eventType: 'loadToSopiok',
        commentListKey: 'chatUnderManagerList'
      }
    ]
  },
  otp: {
    showCommentsButton: false,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.decline
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ]
  },
  decisionMaking: {
    showCommentsButton: true,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay
      },
      {
        ...FOOTER_BUTTON_PRESETS.processHistory
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ],
    commentsConfig: [
      {
        eventType: 'loadToSopiok',
        commentListKey: 'chatUnderManagerList'
      },
    ]
  },
  finalDecision: {
    showCommentsButton: true,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay
      },
      {
        ...FOOTER_BUTTON_PRESETS.decline,
        type: 'submit'
      },
      {
        ...FOOTER_BUTTON_PRESETS.print
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ],
    commentsConfig: [
      {
        eventType: 'loadToOwner',
        commentListKey: 'chatManagerVerificatorList'
      }
    ]
  },
  paperwork: {
    showCommentsButton: true,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.decline
      },
      {
        ...FOOTER_BUTTON_PRESETS.print
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ],
    commentsConfig: [
      {
        eventType: 'loadToSopiok',
        commentListKey: 'chatCradminManagerList'
      }
    ]
  },
  selectedCondition: {
    showCommentsButton: false,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay,
        type: 'submit'
      },
      {
        ...FOOTER_BUTTON_PRESETS.decline,
        type: 'submit'
      }
    ]
  },
  verification: {
    showCommentsButton: true,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ],
    commentsConfig: [
      {
        eventType: 'loadToOwner',
        commentListKey: 'chatManagerVerificatorList'
      }
    ]
  },
  documents: {
    showCommentsButton: false,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.save,
        visibleForRolesList: [RoleAuthority.ARCHIVIST]
      },
      {
        ...FOOTER_BUTTON_PRESETS.print,
        visibleForRolesList: [RoleAuthority.CREDIT_MANAGER]
      }
    ]
  }
};

export const CLIENTS_TABS_FOOTER_CONFIGS: { [key: string]: TabFooterState } = {
  fullForm: {
    showCommentsButton: false,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.print
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ],
    commentsConfig: []
  }
};

export const MASS_SEGMENT_TABS_FOOTER_CONFIGS: { [key: string]: TabFooterState } = {
  inspection: {
    showCommentsButton: false,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ]
  },
  finalDecision: {
    showCommentsButton: false,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay
      },
      {
        ...FOOTER_BUTTON_PRESETS.decline
      },
      {
        ...FOOTER_BUTTON_PRESETS.print
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ]
  },
  fullForm: {
    showCommentsButton: true,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay,
        type: 'submit'
      },
      {
        ...FOOTER_BUTTON_PRESETS.decline
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      }
    ],
    commentsConfig: [
      {
        eventType: 'loadToSopiok',
        commentListKey: 'chatUnderManagerList'
      }
    ]
  },
  verification: {
    showCommentsButton: true,
    footerButtons: [
      {
        ...FOOTER_BUTTON_PRESETS.moveForward
      },
      {
        ...FOOTER_BUTTON_PRESETS.delay,
        type: 'submit'
      },
      {
        ...FOOTER_BUTTON_PRESETS.processHistory
      },
      {
        ...FOOTER_BUTTON_PRESETS.comparisonPanel
      },
      {
        ...FOOTER_BUTTON_PRESETS.cancel
      },
    ],
    commentsConfig: [
      {
        labelForTab: 'Чат с СОПИОК/КЦ',
        eventType: 'loadToSopiok',
        commentListKey: 'chatUnderManagerList'
      },
      {
        labelForTab: 'Чат с Владельцем лимита',
        eventType: 'loadToOwner',
        commentListKey: 'chatUnderLimitOwnerList'
      }
    ]
  }
};

export const tabsFooterConfigs = {
  massSegment: MASS_SEGMENT_TABS_FOOTER_CONFIGS,
  clients: CLIENTS_TABS_FOOTER_CONFIGS,
  common: COMMON_TABS_FOOTER_CONFIGS
};
