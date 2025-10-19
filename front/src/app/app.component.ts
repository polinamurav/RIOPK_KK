import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { I18nService, Logger, untilDestroyed } from '@app/core';
import { MatIconRegistry } from '@angular/material/icon';
import { LocalStorageService } from 'angular-web-storage';
import { NbThemeService } from '@nebular/theme';
import {VersionCheckerService} from "@app/core/version-checker.service";

const log = new Logger('App');

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private localStorage: LocalStorageService,
    private theme: NbThemeService,
    private versionCheckerService: VersionCheckerService
  ) {
    iconRegistry.addSvgIcon('filter_list', sanitizer.bypassSecurityTrustResourceUrl('assets/img/filter.svg'));
    iconRegistry.addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('assets/img/close-1.svg'));
    iconRegistry.addSvgIcon('check', sanitizer.bypassSecurityTrustResourceUrl('assets/img/tick.svg'));
    iconRegistry.addSvgIcon('delete_forever', sanitizer.bypassSecurityTrustResourceUrl('assets/img/bin.svg'));
    iconRegistry.addSvgIcon('add_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/more-else.svg'));
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/search.svg'));
    iconRegistry.addSvgIcon('keyboard_arrow_right', sanitizer.bypassSecurityTrustResourceUrl('assets/img/next.svg'));
    iconRegistry.addSvgIcon('not_interested', sanitizer.bypassSecurityTrustResourceUrl('assets/img/block.svg'));
    iconRegistry.addSvgIcon('description', sanitizer.bypassSecurityTrustResourceUrl('assets/img/description.svg'));
    iconRegistry.addSvgIcon('cloud_upload', sanitizer.bypassSecurityTrustResourceUrl('assets/img/upload.svg'));
    iconRegistry.addSvgIcon('cloud_download', sanitizer.bypassSecurityTrustResourceUrl('assets/img/download.svg'));
    iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/img/refresh.svg'));
    iconRegistry.addSvgIcon(
      'restart-process',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons8-restart.svg')
    );
    iconRegistry.addSvgIcon('change-user', sanitizer.bypassSecurityTrustResourceUrl('assets/img/change-user.svg'));
    iconRegistry.addSvgIcon('notification', sanitizer.bypassSecurityTrustResourceUrl('assets/img/notification.svg'));
    iconRegistry.addSvgIcon('hourglass', sanitizer.bypassSecurityTrustResourceUrl('assets/img/hourglass.svg'));
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.versionCheckerService.startChecking();

    log.debug('init');

    // Setup translations
    let lang = this.translateService.getBrowserLang();

    const userInfo = this.localStorage.get(environment.userInfoKey);
    if (!!userInfo && !!userInfo.defaultLang) {
      lang = userInfo.defaultLang;
    }

    this.i18nService.init(
      environment.supportedLanguages.includes(lang) ? lang : environment.defaultLanguage,
      environment.supportedLanguages
    );

    if (!!userInfo && !!userInfo.defaultTheme) {
      this.theme.changeTheme(userInfo.defaultTheme);
    }

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data),
        untilDestroyed(this)
      )
      .subscribe(event => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
