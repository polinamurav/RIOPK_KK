import { Component, OnInit } from '@angular/core';

import {RoleAuthority, SidebarLink} from '@app/_models';
import {CredentialsService} from "@app/services/authentication";


const LINKS =  [
  // { name: 'Партнеры', link: 'dir-partner' },
  // { name: 'Стоп-листы АБС', link: 'stopList' },
  // { name: 'Приоритезация Андеррайтинга', link: 'prioritization' },
  // { name: 'Визуальная оценка', link: 'visual-assessment' },
  // { name: 'Чек-лист андеррайтера', link: 'under-checklist' },
  { name: 'Administration.Aside.Settings', link: 'settings' },
  { name: 'Administration.Aside.Notifications', link: 'notification' },
  { name: 'Administration.Aside.PrintingForms', link: 'forms' },
  { name: 'Administration.Aside.StagePrintingForms', link: 'printing-form-setting' },
  { name: 'Administration.Aside.Users', link: 'users' },
  { name: 'Administration.Aside.Products', link: 'product' },
  { name: 'Administration.Aside.Products-Templates', link: 'product-template' },
  { name: 'Administration.Aside.ProductCatalog', link: 'catalog' },
  { name: 'Administration.Aside.GroceryCatalogDiscounts', link: 'grocery-catalog-discounts' },
  { name: 'Administration.Aside.LevelsPM', link: 'levelsPM' },
  { name: 'Administration.Aside.Integration', link: 'integration' },
  { name: 'Administration.Aside.IntegrationLog', link: 'integrationLog' },
  { name: 'Administration.Aside.Companies', link: 'companyList' },
  // { name: 'Administration.Aside.Insurance', link: 'insurance' },
  // { name: 'Administration.Aside.InsuranceCondition', link: 'insurance-condition' },
  { name: 'Administration.Aside.BrmsRules', link: 'brms-rules' },
  { name: 'Administration.Aside.ProductDiscount', link: 'product-discount' },

  { name: 'Administration.Aside.AuditLog', link: 'audit-log' },
  // { name: 'Administration.Aside.CommissionConfig', link: 'commission-config' },
  // { name: 'Administration.Aside.InsuranceProducts', link: 'insurance-products' },
  // { name: 'Administration.Aside.Attributes', link: 'attributes' },
  // { name: 'Administration.Aside.AttributesSettings', link: 'attributes-setting' },
  // { name: 'Administration.Aside.AccountProduct', link: 'account-product' },
  // { name: 'Administration.Aside.ExpenseSetting', link: 'expense-setting' },
  { name: 'Administration.Aside.BlackList', link: 'blacklist' },


];


@Component({
  selector: 'ngx-administration-page',
  templateUrl: './administration-page.component.html'
})
export class AdministrationPageComponent implements OnInit {
  sidebarLinkList: SidebarLink[] = [];

  constructor(
    private readonly credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.setPosLinks()
  }

  private setPosLinks(){

    const hideUsersPos = this.credentialsService.checkAccess([
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.SECURITY_POS
    ]);

    const hideTradingCompanyPoints = this.credentialsService.checkAccess([
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.SECURITY_POS
    ]);
    const mainLinks = this.credentialsService.isAdmin ? LINKS : [];
    const usersPosLinks = !hideUsersPos ? [{ name: 'Administration.Aside.UsersPos', link: 'users-pos' }] : [];
    const TradingCompanyPointsLinks = !hideTradingCompanyPoints ? [{ name: 'Administration.Aside.TradingCompanyPoints', link: 'trading-company-points' }] : [];

    if(this.credentialsService.checkAccess([
      RoleAuthority.HEAD_POS,
      RoleAuthority.ADMIN,
      RoleAuthority.REG_MANAGER_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.SECURITY_POS,
      RoleAuthority.RM,
      RoleAuthority.RM_BOSS,
    ])) {
      this.sidebarLinkList = [
        ...mainLinks,
        { name: 'Administration.Aside.CreditPrograms', link: 'credit-programs' },
        { name: 'Administration.Aside.TradingCompany', link: 'trading-company' },
        // { name: 'Administration.Aside.TradingCompanyPoints', link: 'trading-company-points' },
        ...TradingCompanyPointsLinks,
        ...usersPosLinks,
        { name: 'Группы товаров', link: 'goods-group' },
        { name: 'Товары', link: 'goods' },
      ]
    } else {
      this.sidebarLinkList = LINKS;
    }
  }


}
