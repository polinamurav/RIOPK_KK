import { Component, OnDestroy, OnInit } from '@angular/core';

import { CurrentAppService } from '@app/services/current-app.service';
import { NavigationEnd } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'ngx-pages',
  template: `
    <app-header>
      <app-header-nav></app-header-nav>
    </app-header>
    <router-outlet></router-outlet>
  `
})
export class PagesComponent implements OnInit, OnDestroy {
  constructor(private routerURLService: RouterURLService, private currentAppService: CurrentAppService) {}

  ngOnInit() {
    this.createNavigationEndSubscription();
  }
  ngOnDestroy(): void {}

  private createNavigationEndSubscription(): void {
    this.routerURLService
      .subscribeToNavigationEnd()
      .pipe(untilDestroyed(this))
      .subscribe((res: NavigationEnd) => {
        if (!res.urlAfterRedirects.includes('stages')) {
          this.currentAppService.resetValue('applicationStage');
          this.currentAppService.resetValue('applicationProductId');
        }
      });
  }
}
