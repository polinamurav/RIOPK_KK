import { Component, OnInit } from '@angular/core';

import { SidebarLink } from '@app/_models';

@Component({
  selector: 'ngx-administration-page',
  templateUrl: './administration-page.component.html'
})
export class AdministrationPageComponent implements OnInit {
  sidebarLinkList: SidebarLink[] = [
    // { name: 'Печатные формы', link: 'forms' },
    // { name: 'Партнеры', link: 'dir-partner' },
    // { name: 'Стоп-листы АБС', link: 'stopList' },
    // { name: 'Приоритезация Андеррайтинга', link: 'prioritization' },
    // { name: 'Визуальная оценка', link: 'visual-assessment' },
    // { name: 'Чек-лист андеррайтера', link: 'under-checklist' },
    { name: 'Administration.Aside.Settings', link: 'settings' },
    { name: 'Administration.Aside.Notifications', link: 'notification' },
    { name: 'Administration.Aside.StagePrintingForms', link: 'printing-form-setting' },
    { name: 'Administration.Aside.Users', link: 'users' },
    { name: 'Administration.Aside.Products', link: 'product' },
    { name: 'Administration.Aside.ProductCatalog', link: 'catalog' },
    { name: 'Administration.Aside.Integration', link: 'integration' },
    { name: 'Administration.Aside.IntegrationLog', link: 'integrationLog' },
    { name: 'Administration.Aside.Companies', link: 'companyList' },
    // { name: 'Administration.Aside.Insurance', link: 'insurance' },
    // { name: 'Administration.Aside.InsuranceCondition', link: 'insurance-condition' },
    { name: 'Administration.Aside.BrmsRules', link: 'brms-rules' },
    { name: 'Administration.Aside.ProductDiscount', link: 'product-discount' },
    { name: 'Administration.Aside.AuditLog', link: 'audit-log' },
    // { name: 'Administration.Aside.CommissionConfig', link: 'commission-config' },
    { name: 'Administration.Aside.InsuranceProducts', link: 'insurance-products' },
    { name: 'Administration.Aside.Attributes', link: 'attributes' },
    { name: 'Administration.Aside.AttributesSettings', link: 'attributes-setting' },
    { name: 'Administration.Aside.AccountProduct', link: 'account-product' },
    { name: 'Administration.Aside.ExpenseSetting', link: 'expense-setting' },
    { name: 'Administration.Aside.BlackList', link: 'blacklist' }
  ];
  constructor() {}

  ngOnInit(): void {}
}
