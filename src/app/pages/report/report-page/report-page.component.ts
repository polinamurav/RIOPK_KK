import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReportType, SidebarLink } from '@app/_models';

import { ReportTypesControllerService } from '@app/api';
import { untilDestroyed } from '@app/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ELanguageType } from '@app/constants/language';

@Component({
  selector: 'ngx-report-page',
  templateUrl: './report-page.component.html'
})
export class ReportPageComponent implements OnInit, OnDestroy {
  sidebarLinkList: SidebarLink[] = [];
  reports: ReportType[];
  currentLanguage: string;

  constructor(private reportService: ReportTypesControllerService, private translateService: TranslateService) {}

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
    this.createLanguageSubscription();

    this.reportService.getAll().subscribe((reports: ReportType[]) => {
      if (!!reports.length) {
        this.reports = reports;
        this.sidebarLinkList = this.reports.map((el: ReportType) => {
          return { name: el[ELanguageType[this.currentLanguage]], link: el.code };
        });
      }
    });
  }

  ngOnDestroy(): void {}

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.currentLanguage = lang.lang;
      this.sidebarLinkList = this.reports.map((el: ReportType) => {
        return { name: el[ELanguageType[this.currentLanguage]], link: el.code };
      });
    });
  }
}
