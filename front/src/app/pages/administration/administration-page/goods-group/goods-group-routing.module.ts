import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsGroupComponent } from '@app/pages/administration/administration-page/goods-group/goods-group.component';
import { GoodsGroupPageComponent } from '@app/pages/administration/administration-page/goods-group/goods-group-page/goods-group-page.component';

const routes: Routes = [
  {
    path: '',
    component: GoodsGroupComponent,
    children: [
      {
        path: '',
        component: GoodsGroupPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsGroupRoutingModule {}
