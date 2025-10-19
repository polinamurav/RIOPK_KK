import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersComponent } from './partners/partners.component';
import { ThemeModule } from '@app/theme/theme.module';
import { PartnersRoutingModule } from '@app/pages/administration/administration-page/partners/partners-routing.module';

@NgModule({
  imports: [CommonModule, PartnersRoutingModule, ThemeModule],
  declarations: [PartnersComponent]
})
export class PartnersModule {}
