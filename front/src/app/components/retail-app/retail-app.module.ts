import { NgModule } from '@angular/core';

import { RetailAppComponent } from './retail-app.component';
import { RetailAppRoutingModule } from './retail-app-routing.module';

@NgModule({
  imports: [RetailAppRoutingModule],
  declarations: [RetailAppComponent],
  providers: []
})
export class RetailAppModule {}
