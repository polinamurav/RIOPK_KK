import { AppOperationModeComponent } from './app-operation-mode-component/app-operation-mode.component';
import { AppOperationModeRootComponent } from './app-operation-mode-root.component';
import { AppOperationModeRoutingModule } from './app-operation-mode-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [AppOperationModeRootComponent, AppOperationModeComponent],
  imports: [AppOperationModeRoutingModule, SharedModule]
})
export class AppOperationModeModule {}
