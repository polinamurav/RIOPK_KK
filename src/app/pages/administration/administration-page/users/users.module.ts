import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.component.module';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
  imports: [UsersRoutingModule, SharedModule],
  declarations: [UsersComponent, UsersPageComponent],
  providers: []
})
export class UsersModule {}
