import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsGroupComponent } from './goods-group.component';
import { GoodsGroupPageComponent } from './goods-group-page/goods-group-page.component';
import { GoodsGroupRoutingModule } from '@app/pages/administration/administration-page/goods-group/goods-group-routing.module';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  declarations: [GoodsGroupComponent, GoodsGroupPageComponent],
  imports: [CommonModule, ThemeModule, GoodsGroupRoutingModule]
})
export class GoodsGroupModule {}
