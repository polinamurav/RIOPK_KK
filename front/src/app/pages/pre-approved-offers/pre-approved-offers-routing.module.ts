import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreApprovedOffersComponent } from '@app/pages/pre-approved-offers/pre-approved-offers/pre-approved-offers.component';

const routes: Routes = [{ path: '', component: PreApprovedOffersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PreApprovedOffersRoutingModule {}
