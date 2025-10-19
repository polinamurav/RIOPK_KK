import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { PreApprovedOffersComponent } from './pre-approved-offers/pre-approved-offers.component';
import { PreApprovedOffersRoutingModule } from '@app/pages/pre-approved-offers/pre-approved-offers-routing.module';
import { PreApprovedBasesListComponent } from './pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list.component';
import { PreApprovedBasesProcessComponent } from './pre-approved-offers/pre-approved-bases-process/pre-approved-bases-process.component';
import { PreApprovedBasesListInWorkComponent } from './pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list-in-work/pre-approved-bases-list-in-work.component';
import { PreApprovedBasesListActiveComponent } from './pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list-active/pre-approved-bases-list-active.component';
import { PreApprovedBasesListDataService } from '@app/pages/pre-approved-offers/pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list-data.service';
import { CreateNewPreApprovedBaseModalComponent } from './pre-approved-offers/modals/create-new-pre-approved-base-modal/create-new-pre-approved-base-modal.component';

@NgModule({
  declarations: [
    PreApprovedOffersComponent,
    PreApprovedBasesListComponent,
    PreApprovedBasesProcessComponent,
    PreApprovedBasesListInWorkComponent,
    PreApprovedBasesListActiveComponent,
    CreateNewPreApprovedBaseModalComponent
  ],
  imports: [CommonModule, PreApprovedOffersRoutingModule, ThemeModule, TranslateModule, InlineSVGModule],
  providers: [PreApprovedBasesListDataService],
  entryComponents: [CreateNewPreApprovedBaseModalComponent]
})
export class PreApprovedOffersModule {}
