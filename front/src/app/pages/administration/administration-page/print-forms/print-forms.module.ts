import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { PrintFormsRoutingModule } from './print-forms-routing.component.module';
import { PrintFormsComponent } from './print-forms.component';
import { PrintFormsPageComponent } from './print-forms-page/print-forms-page.component';

@NgModule({
  imports: [PrintFormsRoutingModule, ThemeModule],
  declarations: [PrintFormsComponent, PrintFormsPageComponent],
  providers: []
})
export class PrintFormsModule {}
