import { NgModule } from '@angular/core';
import { CodeValTransformPipe, CustomDatePipe } from './pipes';

@NgModule({
  declarations: [CodeValTransformPipe, CustomDatePipe],
  imports: [],
  exports: [CodeValTransformPipe, CustomDatePipe]
})
export class PipesModule {}
