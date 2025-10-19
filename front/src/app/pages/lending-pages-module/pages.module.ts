import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  imports: [PagesRoutingModule, ThemeModule],
  declarations: [PagesComponent],
  providers: []
})
export class PagesModule {}
