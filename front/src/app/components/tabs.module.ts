// tslint:disable: max-line-length

import { AcceptanceComponent } from './tabs/acceptance/acceptance.component';
import { AmlComponent } from './tabs/aml/aml.component';
import { BrmsDecisionComponent } from './tabs/brms-decision/brms-decision.component';
import { ComparisonPanelModalComponent } from './tabs/verification/comparison-panel-modal/comparison-panel-modal.component';
import { DataFormComponent } from './tabs/data-form/data-form.component';
import { DecisionComponent } from './tabs/decision/decision.component';
import { DecisionMakingComponent } from './tabs/decision-making/decision-making.component';
import { DocumentsComponent } from './tabs/documents/documents.component';
import { EmploymentResponseComponent } from './tabs/employment-response/employment-response.component';
import { FinalDecisionComponent } from './tabs/final-decision/final-decision.component';
import { HistoryResponseComponent } from './tabs/history-response/history-response.component';
import { InsideInfoComponent } from './tabs/inside-info/inside-info.component';
import { NgModule } from '@angular/core';
import { OtpEnterModalComponent } from './modals/otp-enter-modal/otp-enter-modal.component';
import { PaperworkComponent } from './tabs/paperwork/paperwork.component';
import { SelectedConditionComponent } from './tabs/selected-condition/selected-condition.component';
import { SelectedConditionModalComponent } from './tabs/selected-condition/selected-condition-modal/selected-condition-modal.component';
import { ThemeModule } from '@app/theme/theme.module';
import { TabsFooterComponent } from '@app/components/tabs-footer/tabs-footer.component';
import { VerificationComponent } from './tabs/verification/verification.component';
import { BorrowersComponent } from './tabs/borrowers/borrowers.component';
import { EnterPersDataModalComponent } from './enter-pers-data-modal/enter-pers-data-modal.component';
import { MatrixLimitDetailModalComponent } from './modals/matrix-limit-detail-modal/matrix-limit-detail-modal.component';
import { AbsFirstPayDateModalComponent } from './tabs/final-decision/abs-first-pay-date-modal/abs-first-pay-date-modal.component';
import { ValidateMatrixDataService } from '@app/components/comon-services/validate-matrix-data.service';
import { AppDuplicatesModalComponent } from './modals/app-duplicates-modal/app-duplicates-modal.component';
import { InnCompanyDuplecatesModalComponent } from './modals/inn-company-duplecates-modal/inn-company-duplecates-modal.component';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { PosProductInfoComponent } from './tabs/pos-product-info/pos-product-info.component';
import {
  OtpVerificationModalComponent
} from '@app/components/tabs/final-decision/opt-verification-modal/otp-verification-modal.component';
import { DashboardModule } from '@app/pages/dashboard/dashboard.module';

@NgModule({
  declarations: [
    DataFormComponent,
    EmploymentResponseComponent,
    BorrowersComponent,
    HistoryResponseComponent,
    VerificationComponent,
    BrmsDecisionComponent,
    DecisionComponent,
    SelectedConditionComponent,
    SelectedConditionModalComponent,
    ComparisonPanelModalComponent,
    DecisionMakingComponent,
    InsideInfoComponent,
    FinalDecisionComponent,
    DocumentsComponent,
    PaperworkComponent,
    AmlComponent,
    AcceptanceComponent,

    TabsFooterComponent,
    OtpEnterModalComponent,
    EnterPersDataModalComponent,
    MatrixLimitDetailModalComponent,
    AbsFirstPayDateModalComponent,
    OtpVerificationModalComponent,
    AppDuplicatesModalComponent,
    InnCompanyDuplecatesModalComponent,
    InfoModalComponent,
    PosProductInfoComponent
  ],
  imports: [ThemeModule, DashboardModule],
  exports: [
    DataFormComponent,
    EmploymentResponseComponent,
    BorrowersComponent,
    HistoryResponseComponent,
    VerificationComponent,
    BrmsDecisionComponent,
    DecisionComponent,
    SelectedConditionComponent,
    SelectedConditionModalComponent,
    ComparisonPanelModalComponent,
    DecisionMakingComponent,
    InsideInfoComponent,
    FinalDecisionComponent,
    DocumentsComponent,
    PaperworkComponent,
    AmlComponent,
    AcceptanceComponent,
    MatrixLimitDetailModalComponent,
    TabsFooterComponent,
    OtpEnterModalComponent,
    PosProductInfoComponent
  ],
  providers: [ValidateMatrixDataService],
  entryComponents: [
    EnterPersDataModalComponent,
    MatrixLimitDetailModalComponent,
    AbsFirstPayDateModalComponent,
    OtpVerificationModalComponent,
    AppDuplicatesModalComponent,
    InfoModalComponent
  ]
})
export class AppTabsModule {}
