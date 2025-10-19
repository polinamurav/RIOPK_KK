import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { RulesComponent } from './rules.component';

const routes: Routes = [
  {
    path: '',
    component: RulesComponent,
    children: [
      {
        path: '',
        component: RulesPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule {}
