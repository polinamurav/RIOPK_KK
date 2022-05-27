import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { I18nService, Logger, untilDestroyed } from '@app/core';
import { MatIconRegistry } from '@angular/material';

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
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('filter_list', sanitizer.bypassSecurityTrustResourceUrl('../../assets/filter.svg'));
    iconRegistry.addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('../../assets/close-1.svg'));
    iconRegistry.addSvgIcon('check', sanitizer.bypassSecurityTrustResourceUrl('../../assets/tick.svg'));
    iconRegistry.addSvgIcon('delete_forever', sanitizer.bypassSecurityTrustResourceUrl('../../assets/bin.svg'));
    iconRegistry.addSvgIcon('add_circle', sanitizer.bypassSecurityTrustResourceUrl('../../assets/more-else.svg'));
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('../../assets/search.svg'));
    iconRegistry.addSvgIcon('keyboard_arrow_right', sanitizer.bypassSecurityTrustResourceUrl('../../assets/next.svg'));
    iconRegistry.addSvgIcon('not_interested', sanitizer.bypassSecurityTrustResourceUrl('../../assets/block.svg'));
    iconRegistry.addSvgIcon('description', sanitizer.bypassSecurityTrustResourceUrl('../../assets/description.svg'));
    iconRegistry.addSvgIcon('cloud_upload', sanitizer.bypassSecurityTrustResourceUrl('../../assets/upload.svg'));
    iconRegistry.addSvgIcon('cloud_download', sanitizer.bypassSecurityTrustResourceUrl('../../assets/download.svg'));
    iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('../../assets/refresh.svg'));
    iconRegistry.addSvgIcon('change-user', sanitizer.bypassSecurityTrustResourceUrl('../../assets/change-user.svg'));
    iconRegistry.addSvgIcon('notification', sanitizer.bypassSecurityTrustResourceUrl('../../assets/notification.svg'));
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

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
