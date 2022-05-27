import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [PagesRoutingModule, SharedModule],
  declarations: [PagesComponent],
  providers: []
})
export class PagesModule {}
