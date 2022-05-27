import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationLogComponent } from './integration-log.component';
import { IntegrationLogPageComponent } from './integration-log-page/integration-log-page.component';

const routes: Routes = [
  {
    path: '',
    component: IntegrationLogComponent,
    children: [
      {
        path: '',
        component: IntegrationLogPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationLogRoutingModule {}
