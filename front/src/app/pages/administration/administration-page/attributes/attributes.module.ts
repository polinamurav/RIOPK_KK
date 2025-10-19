import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { AttributesPageComponent } from './attributes-page/attributes-page.component';
import { AttributesRoutingModule } from './attributes-routing.component.module';
import { AttributesComponent } from './attributes.component';

@NgModule({
  imports: [AttributesRoutingModule, ThemeModule],
  declarations: [AttributesComponent, AttributesPageComponent],
  providers: []
})
export class AttributesModule {}
