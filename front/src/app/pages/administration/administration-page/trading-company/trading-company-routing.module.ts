import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradingCompanyComponent } from '@app/pages/administration/administration-page/trading-company/trading-company/trading-company.component';
import { TradingCompanyPageComponent } from '@app/pages/administration/administration-page/trading-company/trading-company-page/trading-company-page.component';

const routes: Routes = [
  {
    path: '',
    component: TradingCompanyComponent,
    children: [
      {
        path: '',
        component: TradingCompanyPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingCompanyRoutingModule {}
