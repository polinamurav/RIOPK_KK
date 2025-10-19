import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsComponent } from '@app/pages/administration/administration-page/goods/goods.component';
import { GoodsPageComponent } from '@app/pages/administration/administration-page/goods/goods-page/goods-page.component';

const routes: Routes = [
  {
    path: '',
    component: GoodsComponent,
    children: [
      {
        path: '',
        component: GoodsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsRoutingModule {}
