import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsComponent } from './goods.component';
import { GoodsPageComponent } from './goods-page/goods-page.component';
import { GoodsRoutingModule } from '@app/pages/administration/administration-page/goods/goods-routing.module';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  declarations: [GoodsComponent, GoodsPageComponent],
  imports: [CommonModule, ThemeModule, GoodsRoutingModule]
})
export class GoodsModule {}
