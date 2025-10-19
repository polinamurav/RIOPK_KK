import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosUsersComponent } from '@app/pages/administration/administration-page/pos-users/pos-users.component';
import { PosUsersPageComponent } from '@app/pages/administration/administration-page/pos-users/pos-users-page/pos-users-page.component';

const routes: Routes = [
  {
    path: '',
    component: PosUsersComponent,
    children: [
      {
        path: '',
        component: PosUsersPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosUsersRoutingModule {}
