import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { DirectoriesComponent } from './directories.component';
import { DirectoriesRoutingModule } from './directories-routing.module';
import { DirectoriesPageComponent } from './directories-page/directories-page.component';
import { FilterTableComponent } from './directories-page/filter-table/filter-table.component';

@NgModule({
  imports: [DirectoriesRoutingModule, SharedModule],
  declarations: [DirectoriesComponent, DirectoriesPageComponent, FilterTableComponent],
  providers: []
})
export class DirectoriesModule {}
