import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationComponent } from './integration.component';
import { IntegrationPageComponent } from './integration-page/integration-page.component';

const routes: Routes = [
  {
    path: '',
    component: IntegrationComponent,
    children: [
      {
        path: '',
        component: IntegrationPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationRoutingModule {}
