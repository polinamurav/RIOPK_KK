import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <!--windowMode-->
    <nb-layout>
      <nb-layout-header fixed class="blur">
        <ngx-header>
          <app-header-nav></app-header-nav>
        </ngx-header>
      </nb-layout-header>

      <!--<nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>-->

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <!--<nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>-->
    </nb-layout>
  `
})
export class OneColumnLayoutComponent {}
