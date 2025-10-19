import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderChecklistComponent } from './under-checklist-component/under-checklist.component';
import { UnderChecklistParentComponent } from './under-checklist-parent.component';

const routes: Routes = [
  {
    path: '',
    component: UnderChecklistParentComponent,
    children: [
      {
        path: '',
        component: UnderChecklistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderChecklistRoutingModule {}
