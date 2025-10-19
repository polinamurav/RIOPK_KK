import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { AdministrationComponent } from './administration.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationPageComponent } from './administration-page/administration-page.component';

@NgModule({
  imports: [AdministrationRoutingModule, ThemeModule],
  declarations: [AdministrationComponent, AdministrationPageComponent],
  providers: []
})
export class AdministrationModule {}
