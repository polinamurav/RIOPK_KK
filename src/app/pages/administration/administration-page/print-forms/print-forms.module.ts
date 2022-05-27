import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { PrintFormsRoutingModule } from './print-forms-routing.component.module';
import { PrintFormsComponent } from './print-forms.component';
import { PrintFormsPageComponent } from './print-forms-page/print-forms-page.component';

@NgModule({
  imports: [PrintFormsRoutingModule, SharedModule],
  declarations: [PrintFormsComponent, PrintFormsPageComponent],
  providers: []
})
export class PrintFormsModule {}
