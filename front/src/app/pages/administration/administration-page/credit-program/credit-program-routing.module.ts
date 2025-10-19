import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditProgramComponent } from '@app/pages/administration/administration-page/credit-program/credit-program/credit-program.component';
import { CreditProgramPageComponent } from '@app/pages/administration/administration-page/credit-program/credit-program-page/credit-program-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreditProgramComponent,
    children: [
      {
        path: '',
        component: CreditProgramPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditProgramRoutingModule {}
