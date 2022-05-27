import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { SharedModule } from '@app/shared';
import { SetPasswordComponent } from '@app/components/set-password/set-password.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, SetPasswordRoutingModule, SharedModule],
  declarations: [SetPasswordComponent]
})
export class SetPasswordModule {}
