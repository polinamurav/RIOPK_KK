import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { AttributesPageComponent } from './attributes-page/attributes-page.component';
import { AttributesRoutingModule } from './attributes-routing.component.module';
import { AttributesComponent } from './attributes.component';

@NgModule({
  imports: [AttributesRoutingModule, SharedModule],
  declarations: [AttributesComponent, AttributesPageComponent],
  providers: []
})
export class AttributesModule {}
