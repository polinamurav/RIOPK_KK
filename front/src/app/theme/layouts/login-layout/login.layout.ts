import { Component } from '@angular/core';

@Component({
  selector: 'ngx-login-layout',
  styleUrls: ['./login.layout.scss'],
  template: `
    <!--windowMode-->
    <nb-layout class="grid place-items-center" center>
      <nb-layout-column>
        <ng-content></ng-content>
      </nb-layout-column>
    </nb-layout>
  `
})
export class LoginLayoutComponent {}
