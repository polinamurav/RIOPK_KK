import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrioritizationComponent } from './prioritization.component';
import { PrioritizatuionPageComponent } from './prioritizatuion-page/prioritizatuion-page.component';

const routes: Routes = [
  {
    path: '',
    component: PrioritizationComponent,
    children: [
      {
        path: '',
        component: PrioritizatuionPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrioritizationRoutingModule {}
