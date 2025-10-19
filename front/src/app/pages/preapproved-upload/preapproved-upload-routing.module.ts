import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PreapprovedUploadComponent } from './preapproved-upload.component';
import { PreapprovedUploadPageComponent } from './preapproved-upload-page/preapproved-upload-page.component';

const routes: Routes = [
  {
    path: '',
    component: PreapprovedUploadComponent,
    children: [
      {
        path: '',
        component: PreapprovedUploadPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreapprovedUploadRoutingModule {}
