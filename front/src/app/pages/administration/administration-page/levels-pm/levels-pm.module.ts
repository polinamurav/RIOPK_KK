import { NgModule } from '@angular/core';
import { LevelsPMRoutingModule } from '@app/pages/administration/administration-page/levels-pm/levels-pm-routing.module';
import { LevelsPMComponent } from './levels-pm.component';
import { LevelsPMPageComponent } from './levels-pm-page/levels-pm-page.component';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  declarations: [LevelsPMComponent, LevelsPMPageComponent],
  imports: [LevelsPMRoutingModule, ThemeModule]
})
export class LevelsPMModule {}
