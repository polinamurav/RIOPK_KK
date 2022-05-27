import { TabsStatesList, TabsStatesListForStage } from './tab-status-models';

import { PathForStage } from '@app/_models';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { TabNames } from './tab-names';

export class TabStatusClients {}

export enum TabsDataNames {
  ManagerInfo = 'managerInfo' // 0
}

export const INITIAL_TABS_STATE_CLIENTS: TabsStatesList<TabsDataNames, RetailDirectoriesNames> = {
  [TabNames.FullForm]: {
    isVisible: true,
    isReadonly: true,
    tabDataNamesList: [
      TabsDataNames.ManagerInfo // 0
    ],
    tabDirectoriesNamesList: [
      RetailDirectoriesNames.currencies,
      RetailDirectoriesNames.countries,
      RetailDirectoriesNames.regions,
      RetailDirectoriesNames.cities,
      RetailDirectoriesNames.gender,
      RetailDirectoriesNames.maritalStatuses,
      RetailDirectoriesNames.employmentActivity,
      RetailDirectoriesNames.passportType
    ]
  },
  [TabNames.Documents]: {
    isVisible: true,
    isReadonly: false,
    tabDataNamesList: []
  }
};

export const TABS_STATE_CLIENTS_FOR: TabsStatesListForStage<TabsDataNames, RetailDirectoriesNames> = {
  [PathForStage.VIEW]: {
    [TabNames.Decision]: {
      isVisible: true,
      isReadonly: false
    },
    [TabNames.FullForm]: {
      isVisible: true,
      isReadonly: false
    }
  }
};
