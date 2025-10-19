import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosUsersComponent } from './pos-users.component';
import { PosUsersPageComponent } from './pos-users-page/pos-users-page.component';
import { ThemeModule } from '@app/theme/theme.module';
import { PosUsersRoutingModule } from '@app/pages/administration/administration-page/pos-users/pos-users-routing.module';

@NgModule({
  declarations: [PosUsersComponent, PosUsersPageComponent],
  imports: [CommonModule, ThemeModule, PosUsersRoutingModule]
})
export class PosUsersModule {}
