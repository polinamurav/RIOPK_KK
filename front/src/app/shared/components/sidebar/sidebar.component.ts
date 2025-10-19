import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ISidebarInfoBlock, SidebarLink } from '@app/_models';

import { ELanguage } from '@app/constants/language';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { TocService } from '@app/services/toc.service';
import { asapScheduler } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';
import { environment } from '@env/environment';
import {PosProductInfoDataService} from "@app/components/tabs/pos-product-info/pos-product-info-data.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() applicationNumber: string = '';
  @Input() linkList: SidebarLink[] = [];
  @Input() infoBlock: ISidebarInfoBlock;
  @Input() isInfoBlockFixed: boolean = false;
  @Input() isSidebarContentVisible: boolean = true;
  @Input() isQueueApp: boolean = false;
  @Input() language: string;

  title: string = '';
  baseURL: string = '';
  URL: string | null = '';
  viewInfo: boolean = false;
  activeIndex: number | null = null;
  ELanguage = ELanguage;

  constructor(
    private routerURLService: RouterURLService,
    private tocService: TocService,
    private posProductInfoDataService: PosProductInfoDataService,
    private router: Router) {}


  get managersPos(){
    return this.posProductInfoDataService.managers;
  }

  get isPos(){
    return this.posProductInfoDataService.isPos;
  }

  ngOnChanges(): void {
    this.routerURLService
      .subscribeToNavigationEnd()
      .pipe(untilDestroyed(this))
      .subscribe((res: NavigationEnd) => {
        this.checkUrls();
      });

    if (!!this.applicationNumber) {
      this.activeIndex = 0;
    }

    this.checkUrls();
  }

  ngAfterViewInit(): void {
    if (!!this.applicationNumber) {
      this.tocService.activeItemIndex
        .pipe(
          subscribeOn(asapScheduler),
          untilDestroyed(this)
        )
        .subscribe(index => {
          if (index === null) {
            this.viewInfo = false;
            this.activeIndex = 0;
          } else {
            this.viewInfo = Object.keys(this.infoBlock).length ? true : false;
            this.activeIndex = index;
          }
        });
    }
  }

  onBack() {
    if (this.isQueueApp) {
      const prevQueueRoute = localStorage.getItem(environment.previousRoute);
      this.router.navigate([prevQueueRoute]);
    } else {
      this.routerURLService.navigateToDashboard();
    }
  }

  ngOnDestroy(): void {}

  private checkUrls(): void {
    if (!!this.applicationNumber) {
      this.baseURL = this.routerURLService.getMainUrl();
      this.URL = this.routerURLService.getUrlForScroll()
        ? this.routerURLService.getUrlForScroll()
        : this.linkList[0].link;
    } else {
      this.URL = this.routerURLService.getUrlForLink();
      this.title = this.routerURLService.getTitle(this.linkList, this.URL);
    }
  }
}
