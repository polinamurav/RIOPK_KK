import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list.component';
import { CompanyListPageComponent } from './company-list-page/company-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent,
    children: [
      {
        path: '',
        component: CompanyListPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyListRoutingModule {}
