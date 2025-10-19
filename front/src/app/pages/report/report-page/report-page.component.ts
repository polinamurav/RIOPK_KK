import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReportType, RoleAuthority, SidebarLink } from '@app/_models';

import { ReportTypesControllerService } from '@app/api';
import { untilDestroyed } from '@app/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ELanguageType } from '@app/constants/language';
import { CredentialsService } from '@app/services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-report-page',
  templateUrl: './report-page.component.html'
})
export class ReportPageComponent implements OnInit, OnDestroy {


  sidebarLinkList: SidebarLink[] = [];
  reports: ReportType[];
  currentLanguage: string;

  constructor(private reportService: ReportTypesControllerService, private translateService: TranslateService,
              private readonly credentialsService: CredentialsService,
              private router: Router) {}

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;

    const hasPosAccess = this.credentialsService.checkAccess([
      RoleAuthority.REG_MANAGER_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.HEAD_POS,
      RoleAuthority.RM,
      RoleAuthority.RM_BOSS
    ]);

    const isAdmin = this.credentialsService.checkAccess([
      RoleAuthority.ADMIN,
      RoleAuthority.ADMIN_IT,
    ]);

    if (hasPosAccess && !isAdmin) {
      this.router.navigate([this.router.url, 'pos-report']);
      this.sidebarLinkList = [{name: 'Report.PosReports', link: 'pos-report'}];
      return;
    }

    this.sidebarLinkList = [
      {name: 'Отчет УРПА', link: 'upra'},
      {name: 'Отчет по онлайн кредитованию', link: 'online-report'},
    ];

    if (isAdmin) {
      this.sidebarLinkList.push({name: 'Report.PosReports', link: 'pos-report'});
      this.sidebarLinkList.push({name: 'Отчет витрины данных', link: 'data-report'});
    }

    // this.createLanguageSubscription();

    // this.reportService.getAll().subscribe((reports: ReportType[]) => {
    //   if (!!reports.length) {
    //     this.reports = reports;
    //     this.sidebarLinkList = this.reports.map((el: ReportType) => {
    //       return { name: el[ELanguageType[this.currentLanguage]], link: el.code };
    //     });
    //
    //
    //     console.log(this.sidebarLinkList)
    //
    //   }
    // });
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
