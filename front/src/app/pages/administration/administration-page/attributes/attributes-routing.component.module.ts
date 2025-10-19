import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributesPageComponent } from './attributes-page/attributes-page.component';
import { AttributesComponent } from './attributes.component';

const routes: Routes = [
  {
    path: '',
    component: AttributesComponent,
    children: [
      {
        path: '',
        component: AttributesPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule {}
