import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradingCompanyPointsComponent } from '@app/pages/administration/administration-page/trading-company-points/trading-company-points.component';
import { TradingCompanyPointsPageComponent } from '@app/pages/administration/administration-page/trading-company-points/trading-company-points-page/trading-company-points-page.component';

const routes: Routes = [
  {
    path: '',
    component: TradingCompanyPointsComponent,
    children: [
      {
        path: '',
        component: TradingCompanyPointsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingCompanyPointsRoutingModule {}
