import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { VisualAssessmentParentComponent } from './visual-assessment.component';
import { VisualAssessmentComponent } from './visual-assessment-component/visual-assessment.component';
import { VisualAssessmentRoutingModule } from './visual-assessment-routing.module';

@NgModule({
  imports: [VisualAssessmentRoutingModule, SharedModule],
  declarations: [VisualAssessmentParentComponent, VisualAssessmentComponent],
  providers: []
})
export class VisualAssessmentModule {}
