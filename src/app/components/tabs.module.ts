// tslint:disable: max-line-length

import { AcceptanceComponent } from './tabs/acceptance/acceptance.component';
import { AmlComponent } from './tabs/aml/aml.component';
import { BrmsDecisionComponent } from './tabs/brms-decision/brms-decision.component';
import { ClientsFullFormComponent } from './tabs-clients/clients-full-form/clients-full-form.component';
import { ComparisonPanelModalComponent } from './tabs/verification/comparison-panel-modal/comparison-panel-modal.component';
import { DataFormComponent } from './tabs/data-form/data-form.component';
import { DecisionComponent } from './tabs/decision/decision.component';
import { DecisionMakingComponent } from './tabs/decision-making/decision-making.component';
import { DocumentsClientsComponent } from './tabs-clients/documents/documents.component';
import { DocumentsComponent } from './tabs/documents/documents.component';
import { EmploymentResponseComponent } from './tabs/employment-response/employment-response.component';
import { FinalDecisionComponent } from './tabs/final-decision/final-decision.component';
import { HistoryResponseComponent } from './tabs/history-response/history-response.component';
import { InsideInfoComponent } from './tabs/inside-info/inside-info.component';
import { InspectionComponent } from './tabs-mass-segment/inspection/inspection.component';
import { MassSegmentFinalDecisionComponent } from './tabs-mass-segment/mass-segment-final-decision/mass-segment-final-decision.component';
import { MassSegmentFullFormComponent } from './tabs-mass-segment/mass-segment-fullform/mass-segment-full-form.component';
import { MassSegmentVerificationComponent } from './tabs-mass-segment/mass-segment-verification/mass-segment-verification.component';
import { NgModule } from '@angular/core';
import { OtpEnterModalComponent } from './modals/otp-enter-modal/otp-enter-modal.component';
import { PaperworkComponent } from './tabs/paperwork/paperwork.component';
import { SelectedConditionComponent } from './tabs/selected-condition/selected-condition.component';
import { SelectedConditionModalComponent } from './tabs/selected-condition/selected-condition-modal/selected-condition-modal.component';
import { SharedModule } from '@app/shared';
import { TabsFooterComponent } from '@app/components/tabs-footer/tabs-footer.component';
import { VerificationComponent } from './tabs/verification/verification.component';

@NgModule({
  declarations: [
    DataFormComponent,
    EmploymentResponseComponent,
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

    MassSegmentFullFormComponent,
    InspectionComponent,
    MassSegmentVerificationComponent,
    MassSegmentFinalDecisionComponent,

    ClientsFullFormComponent,
    DocumentsClientsComponent,
    TabsFooterComponent,
    OtpEnterModalComponent
  ],
  imports: [SharedModule],
  exports: [
    DataFormComponent,
    EmploymentResponseComponent,
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

    MassSegmentFullFormComponent,
    InspectionComponent,
    MassSegmentVerificationComponent,
    MassSegmentFinalDecisionComponent,

    ClientsFullFormComponent,
    DocumentsClientsComponent,
    TabsFooterComponent,
    OtpEnterModalComponent
  ]
})
export class AppTabsModule {}
