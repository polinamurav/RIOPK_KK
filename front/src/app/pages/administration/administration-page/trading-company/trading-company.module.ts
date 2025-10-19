import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../../theme/theme.module';
import { TradingCompanyRoutingModule } from '@app/pages/administration/administration-page/trading-company/trading-company-routing.module';
import { TradingCompanyPageComponent } from './trading-company-page/trading-company-page.component';
import { TradingCompanyComponent } from './trading-company/trading-company.component';

@NgModule({
  declarations: [TradingCompanyComponent, TradingCompanyPageComponent],
  imports: [CommonModule, ThemeModule, TradingCompanyRoutingModule]
})
export class TradingCompanyModule {}
