import { Component } from '@angular/core';

@Component({
  selector: 'app-clients-pages-module',
  template: `
    <app-header>
      <app-clients-nav></app-clients-nav>
    </app-header>
    <router-outlet></router-outlet>
  `
})
export class ClientsPagesModuleComponent {}
