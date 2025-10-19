import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { APP_BASE_HREF } from '@angular/common';
import { AdministrationEffects } from '@app/store/effects/administration.effects';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@app/core';
import { DashboardEffects } from '@app/store/effects/dashboard.effects';
import { DirectoriesEffects } from '@app/store/effects/directories.effects';
import { EffectsModule } from '@ngrx/effects';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { PreapprovedUploadEffects } from './store/effects/preapproved-upload.effects';
import { QueuesEffects } from './store/effects/queues.effect';
import { RetailDirectoriesEffects } from './store/effects/retail-directories.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ToastrInterceptor } from './interceptors/toastr-interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { appReducers } from '@app/store/reducers/app.reducers';
import { environment } from '@env/environment';
import { ThemeModule } from '@app/theme/theme.module';
import { NbDialogModule } from '@nebular/theme';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: false }),
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      AuthEffects,
      AdministrationEffects,
      DirectoriesEffects,
      DashboardEffects,
      QueuesEffects,
      PreapprovedUploadEffects,
      RetailDirectoriesEffects
    ]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FormsModule,
    ThemeModule,
    // SharedModule,
    ReactiveFormsModule,
    AngularWebStorageModule,
    PerfectScrollbarModule,
    MatDialogModule,
    NbDialogModule.forRoot(),
    TranslateModule.forRoot(),
    CoreModule,
    ThemeModule.forRoot(),
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ToastrInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
