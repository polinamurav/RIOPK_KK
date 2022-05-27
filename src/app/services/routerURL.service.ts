import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { SidebarLink } from '@app/_models/sidebar';

@Injectable({ providedIn: 'root' })
export class RouterURLService {
  private routerURL: string;
  private subjectURL: Subject<string> = new Subject<string>();

  constructor(private router: Router) {}

  subscribeToNavigationEnd(): Observable<NavigationEnd> {
    this.initRouterURL(this.router.url);
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => {
        this.initRouterURL(event.url);
      })
    );
  }

  getSubjectURL(): Subject<string> {
    return this.subjectURL;
  }

  getTitle(linkList: SidebarLink[], URL: string): string {
    let title: string;
    linkList.forEach(item => {
      if (item.link === URL) {
        title = item.name;
        return;
      }
    });

    return title;
  }

  getMainUrl(): string {
    return this.routerURL.indexOf('#') !== -1
      ? this.routerURL.slice(0, this.routerURL.lastIndexOf('#'))
      : this.routerURL;
  }

  getUrlForLink(): string {
    return this.routerURL.indexOf('#') !== -1
      ? this.routerURL.slice(this.routerURL.lastIndexOf('/') + 1, this.routerURL.lastIndexOf('#'))
      : this.routerURL.slice(this.routerURL.lastIndexOf('/') + 1);
  }

  getUrlForScroll(): string | null {
    return this.routerURL.indexOf('#') !== -1 ? this.routerURL.slice(this.routerURL.lastIndexOf('#') + 1) : null;
  }

  navigateToDashboard(operationName: OPERATIONS_NAMES) {
    this.router.navigate([`/mode/${operationName}/dashboard`]);
  }

  private initRouterURL(URL: string): void {
    this.routerURL = URL;
    this.subjectURL.next(URL);
  }
}
