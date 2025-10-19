import { AppTabsModule } from '@app/components/tabs.module';
// tslint:disable: max-line-length
import { NgModule } from '@angular/core';
import { RetailAppRootComponent } from './retail-app-root.component';
import { RetailAppRootRoutingModule } from './retail-app-root-routing.module';
import { RetailComponent } from '../retail-app-component/retail.component';
import { SelectedConditionModalComponent } from '../../tabs/selected-condition/selected-condition-modal/selected-condition-modal.component';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  imports: [RetailAppRootRoutingModule, ThemeModule, AppTabsModule],
  declarations: [RetailAppRootComponent, RetailComponent],
  entryComponents: [SelectedConditionModalComponent],
  providers: []
})
export class RetailAppRootModule {}
