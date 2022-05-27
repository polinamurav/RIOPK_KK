import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { RulesRoutingModule } from './rules-routing.component.module';
import { RulesComponent } from './rules.component';

@NgModule({
  imports: [RulesRoutingModule, SharedModule],
  declarations: [RulesComponent, RulesPageComponent],
  providers: []
})
export class RulesModule {}
