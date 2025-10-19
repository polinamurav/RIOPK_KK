import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectoriesComponent } from './directories.component';
import { DirectoriesPageComponent } from './directories-page/directories-page.component';
import { FilterTableComponent } from './directories-page/filter-table/filter-table.component';

const routes: Routes = [
  {
    path: '',
    component: DirectoriesComponent,
    children: [
      {
        path: '',
        component: DirectoriesPageComponent,
        children: [
          {
            path: ':title',
            component: FilterTableComponent
          },
          { path: '', redirectTo: 'declines', pathMatch: 'full' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoriesRoutingModule {}
