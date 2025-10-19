import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlacklistComponent } from '@app/pages/administration/administration-page/blacklist/blacklist.component';
import { BlacklistPageComponent } from '@app/pages/administration/administration-page/blacklist/blacklist-page/blacklist-page.component';

const routes: Routes = [
  {
    path: '',
    component: BlacklistComponent,
    children: [
      {
        path: '',
        component: BlacklistPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlacklistRoutingModule {}
