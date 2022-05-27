import { Injectable } from '@angular/core';
import { tabsFooterConfigs } from '@app/components/tabs-footer/constants/tabs-footer-configs';
import { TabFooterState } from '@app/components/tabs-footer/constants/footer-buttons.model';

@Injectable({
  providedIn: 'root'
})
export class GetTabsFooterConfigService {
  constructor() {}

  getFooterConfig(configSource: string): TabFooterState {
    const separator = configSource.indexOf('.');

    const tabsGroup = configSource.substring(0, separator);
    const tabName = configSource.replace(tabsGroup + '.', '');

    return tabsFooterConfigs[tabsGroup][tabName];
  }
}
