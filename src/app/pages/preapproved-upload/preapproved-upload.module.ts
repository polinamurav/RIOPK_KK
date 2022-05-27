import { InlineSVGModule } from 'ng-inline-svg';
import { NgModule } from '@angular/core';
import { PreapprovedUploadComponent } from './preapproved-upload.component';
import { PreapprovedUploadPageComponent } from './preapproved-upload-page/preapproved-upload-page.component';
import { PreapprovedUploadRoutingModule } from './preapproved-upload-routing.module';
import { PreapprovedUploadTableComponent } from './preapproved-upload-table/preapproved-upload-table.component';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [PreapprovedUploadRoutingModule, SharedModule, TranslateModule, InlineSVGModule],
  declarations: [PreapprovedUploadComponent, PreapprovedUploadPageComponent, PreapprovedUploadTableComponent],
  providers: []
})
export class PreapprovedUploadModule {}
