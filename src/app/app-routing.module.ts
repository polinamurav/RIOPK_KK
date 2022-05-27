import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Fallback when no prior route is matched
  // {
  //   path: 'pages',
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  //   canActivate: [AuthenticationGuard]
  // },
  {
    path: 'mode',
    loadChildren: () => import('./app-operation-mode/app-operation-mode.module').then(m => m.AppOperationModeModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'set-password',
    loadChildren: () => import('./components/set-password/set-password.module').then(m => m.SetPasswordModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'login' }
];

const config: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  scrollOffset: [110, 110]
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
