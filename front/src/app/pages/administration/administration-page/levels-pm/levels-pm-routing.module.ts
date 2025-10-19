import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelsPMComponent } from '@app/pages/administration/administration-page/levels-pm/levels-pm.component';
import { LevelsPMPageComponent } from '@app/pages/administration/administration-page/levels-pm/levels-pm-page/levels-pm-page.component';

const routes: Routes = [
  {
    path: '',
    component: LevelsPMComponent,
    children: [
      {
        path: '',
        component: LevelsPMPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelsPMRoutingModule {}
