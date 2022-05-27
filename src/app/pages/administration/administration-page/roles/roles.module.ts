import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RolesRoutingModule } from './roles-routing.component.module';
import { RolesComponent } from './roles.component';
import { RolesPageComponent } from './roles-page/roles-page.component';

@NgModule({
  imports: [RolesRoutingModule, SharedModule],
  declarations: [RolesComponent, RolesPageComponent],
  providers: []
})
export class RolesModule {}
