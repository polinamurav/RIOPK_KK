import { NgModule } from '@angular/core';

import { ThemeModule } from '@app/theme/theme.module';
import { DirectoriesComponent } from './directories.component';
import { DirectoriesRoutingModule } from './directories-routing.module';
import { DirectoriesPageComponent } from './directories-page/directories-page.component';
import { FilterTableComponent } from './directories-page/filter-table/filter-table.component';

@NgModule({
  imports: [DirectoriesRoutingModule, ThemeModule],
  declarations: [DirectoriesComponent, DirectoriesPageComponent, FilterTableComponent],
  providers: []
})
export class DirectoriesModule {}
