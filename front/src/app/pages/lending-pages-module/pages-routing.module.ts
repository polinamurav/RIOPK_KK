import { RouterModule, Routes } from '@angular/router';

import { AdminRoleGuard } from '../../guards/admin-role.guard';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PreapprovedPageGuard } from '@app/guards/preapproved-page.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('../administration/administration.module').then(m => m.AdministrationModule),
        canActivate: [AdminRoleGuard]
      },
      {
        path: 'directories',
        loadChildren: () => import('../directories/directories.module').then(m => m.DirectoriesModule),
        canActivate: [AdminRoleGuard]
      },
      {
        path: 'queues',
        loadChildren: () => import('../queues/queues.module').then(m => m.QueuesModule)
      },
      {
        path: 'pre-approved-offers',
        loadChildren: () =>
          import('../pre-approved-offers/pre-approved-offers.module').then(m => m.PreApprovedOffersModule)
      },
      {
        path: 'report',
        loadChildren: () => import('../report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'preapproved',
        loadChildren: () =>
          import('../preapproved-upload/preapproved-upload.module').then(m => m.PreapprovedUploadModule),
        canActivate: [PreapprovedPageGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
