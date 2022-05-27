import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersComponent } from './partners/partners.component';
import { SharedModule } from '@app/shared';
import { PartnersRoutingModule } from '@app/pages/administration/administration-page/partners/partners-routing.module';

@NgModule({
  imports: [CommonModule, PartnersRoutingModule, SharedModule],
  declarations: [PartnersComponent]
})
export class PartnersModule {}
