import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopListComponent } from './stop-list.component';
import { StopListPageComponent } from './stop-list-page/stop-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: StopListComponent,
    children: [
      {
        path: '',
        component: StopListPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopListRoutingModule {}
