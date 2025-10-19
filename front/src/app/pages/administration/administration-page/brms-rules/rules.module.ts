import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { RulesRoutingModule } from './rules-routing.component.module';
import { RulesComponent } from './rules.component';

@NgModule({
  imports: [RulesRoutingModule, ThemeModule],
  declarations: [RulesComponent, RulesPageComponent],
  providers: []
})
export class RulesModule {}
