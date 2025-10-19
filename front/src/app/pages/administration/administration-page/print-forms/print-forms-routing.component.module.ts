import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintFormsComponent } from './print-forms.component';
import { PrintFormsPageComponent } from './print-forms-page/print-forms-page.component';

const routes: Routes = [
  {
    path: '',
    component: PrintFormsComponent,
    children: [
      {
        path: '',
        component: PrintFormsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintFormsRoutingModule {}
