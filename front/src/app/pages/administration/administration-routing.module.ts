import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { AdministrationPageComponent } from './administration-page/administration-page.component';
import { NgModule } from '@angular/core';
import { GoodsGroupModule } from '@app/pages/administration/administration-page/goods-group/goods-group.module';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        component: AdministrationPageComponent,
        children: [
          {
            path: 'settings',
            loadChildren: () => import('./administration-page/settings/settings.module').then(m => m.SettingsModule)
          },
          {
            path: 'notification',
            loadChildren: () =>
              import('./administration-page/notification/notification-setting.module').then(
                m => m.NotificationSettingModule
              )
          },
          {
            path: 'forms',
            loadChildren: () =>
              import('./administration-page/print-forms/print-forms.module').then(m => m.PrintFormsModule)
          },
          {
            path: 'users',
            loadChildren: () => import('./administration-page/users/users.module').then(m => m.UsersModule)
          },
          {
            path: 'companyList',
            loadChildren: () =>
              import('./administration-page/company-list/company-list.module').then(m => m.CompanyListModule)
          },
          {
            path: 'stopList',
            loadChildren: () => import('./administration-page/stop-list/stop-list.module').then(m => m.StopListModule)
          },
          {
            path: 'prioritization',
            loadChildren: () =>
              import('./administration-page/prioritization/prioritization.module').then(m => m.PrioritizationListModule)
          },
          {
            path: 'catalog',
            loadChildren: () =>
              import('./administration-page/product-catalog/product-catalog.module').then(m => m.ProductCatalogModule)
          },
          {
            path: 'grocery-catalog-discounts',
            loadChildren: () =>
              import('./administration-page/grocery-catalog-discounts/grocery-catalog-discounts.module').then(
                m => m.GroceryCatalogDiscountsModule
              )
          },
          {
            path: 'roles',
            loadChildren: () => import('./administration-page/roles/roles.module').then(m => m.RolesModule)
          },
          {
            path: 'integration',
            loadChildren: () =>
              import('./administration-page/integration/integration.module').then(m => m.IntegrationModule)
          },
          {
            path: 'integrationLog',
            loadChildren: () =>
              import('./administration-page/integration-log/integration-log.module').then(m => m.IntegrationLogModule)
          },
          {
            path: 'insurance',
            loadChildren: () => import('./administration-page/insurance/insurance.module').then(m => m.InsuranceModule)
          },
          {
            path: 'insurance-condition',
            loadChildren: () =>
              import('./administration-page/insurance-condition/insurance-condition.module').then(
                m => m.InsuranceConditionModule
              )
          },
          {
            path: 'visual-assessment',
            loadChildren: () =>
              import('./administration-page/visual-assessment/visual-assessment.module').then(
                m => m.VisualAssessmentModule
              )
          },
          {
            path: 'product',
            loadChildren: () => import('./administration-page/product/product.module').then(m => m.ProductModule)
          },
          {
            path: 'product-template',
            loadChildren: () =>
              import('./administration-page/product-template/product-template.module').then(
                m => m.ProductTemplateModule
              )
          },
          {
            path: 'levelsPM',
            loadChildren: () => import('./administration-page/levels-pm/levels-pm.module').then(m => m.LevelsPMModule)
          },
          {
            path: 'under-checklist',
            loadChildren: () =>
              import('./administration-page/under-checklist/under-checklist.module').then(m => m.UnderChecklistModule)
          },
          {
            path: 'brms-rules',
            loadChildren: () => import('./administration-page/brms-rules/rules.module').then(m => m.RulesModule)
          },
          {
            path: 'dir-partner',
            loadChildren: () => import('./administration-page/partners/partners.module').then(m => m.PartnersModule)
          },
          {
            path: 'product-discount',
            loadChildren: () =>
              import('./administration-page/product-discount/product-discount.module').then(
                m => m.ProductDiscountModule
              )
          },
          {
            path: 'audit-log',
            loadChildren: () => import('./administration-page/audit-log/audit-log.module').then(m => m.AuditLogModule)
          },
          {
            path: 'commission-config',
            loadChildren: () =>
              import('./administration-page/commission-config/commission-config.module').then(
                m => m.CommissionConfigModule
              )
          },
          {
            path: 'printing-form-setting',
            loadChildren: () =>
              import('./administration-page/printing-form-setting/printing-form-setting.module').then(
                m => m.PrintingFormSettingModule
              )
          },
          {
            path: 'insurance-products',
            loadChildren: () =>
              import('./administration-page/insurance-products/insurance-products.module').then(
                m => m.InsuranceProductsModule
              )
          },
          {
            path: 'attributes',
            loadChildren: () =>
              import('./administration-page/attributes/attributes.module').then(m => m.AttributesModule)
          },
          {
            path: 'attributes-setting',
            loadChildren: () =>
              import('./administration-page/attributes-setting/attributes-setting.module').then(
                m => m.AttributesSettingModule
              )
          },
          {
            path: 'account-product',
            loadChildren: () =>
              import('./administration-page/account-product/account-product.module').then(m => m.AccountProductModule)
          },
          {
            path: 'expense-setting',
            loadChildren: () =>
              import('./administration-page/expense-setting/expense-setting.module').then(m => m.ExpenseSettingModule)
          },
          {
            path: 'blacklist',
            loadChildren: () => import('./administration-page/blacklist/blacklist.module').then(m => m.BlacklistModule)
          },
          {
            path: 'trading-company',
            loadChildren: () =>
              import('./administration-page/trading-company/trading-company.module').then(m => m.TradingCompanyModule)
          },
          {
            path: 'credit-programs',
            loadChildren: () =>
              import('./administration-page/credit-program/credit-program.module').then(m => m.CreditProgramModule)
          },
          {
            path: 'users-pos',
            loadChildren: () => import('./administration-page/pos-users/pos-users.module').then(m => m.PosUsersModule)
          },
          {
            path: 'trading-company-points',
            loadChildren: () =>
              import('./administration-page/trading-company-points/trading-company-points.module').then(
                m => m.TradingCompanyPointsModule
              )
          },
          {
            path: 'goods-group',
            loadChildren: () =>
              import('./administration-page/goods-group/goods-group.module').then(m => m.GoodsGroupModule)
          },
          {
            path: 'goods',
            loadChildren: () => import('./administration-page/goods/goods.module').then(m => m.GoodsModule)
          }
          // { path: '', redirectTo: 'settings', pathMatch: 'full' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
