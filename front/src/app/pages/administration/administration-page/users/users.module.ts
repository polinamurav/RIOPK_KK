import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.component.module';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
  imports: [UsersRoutingModule, ThemeModule],
  declarations: [UsersComponent, UsersPageComponent],
  providers: []
})
export class UsersModule {}
