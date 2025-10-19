import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditProgramComponent } from './credit-program/credit-program.component';
import { CreditProgramPageComponent } from './credit-program-page/credit-program-page.component';
import { ThemeModule } from '@app/theme/theme.module';
import { CreditProgramRoutingModule } from '@app/pages/administration/administration-page/credit-program/credit-program-routing.module';

@NgModule({
  declarations: [CreditProgramComponent, CreditProgramPageComponent],
  imports: [CommonModule, ThemeModule, CreditProgramRoutingModule]
})
export class CreditProgramModule {}
