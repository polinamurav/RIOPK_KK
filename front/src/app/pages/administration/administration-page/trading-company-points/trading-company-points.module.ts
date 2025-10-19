import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradingCompanyPointsComponent } from './trading-company-points.component';
import { TradingCompanyPointsPageComponent } from './trading-company-points-page/trading-company-points-page.component';
import { TradingCompanyPointsRoutingModule } from './trading-company-points-routing.module';
import { ThemeModule } from '../../../../theme/theme.module';

@NgModule({
  declarations: [TradingCompanyPointsComponent, TradingCompanyPointsPageComponent],
  imports: [CommonModule, ThemeModule, TradingCompanyPointsRoutingModule]
})
export class TradingCompanyPointsModule {}
