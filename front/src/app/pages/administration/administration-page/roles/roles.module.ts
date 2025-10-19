import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { RolesRoutingModule } from './roles-routing.component.module';
import { RolesComponent } from './roles.component';
import { RolesPageComponent } from './roles-page/roles-page.component';

@NgModule({
  imports: [RolesRoutingModule, ThemeModule],
  declarations: [RolesComponent, RolesPageComponent],
  providers: []
})
export class RolesModule {}
