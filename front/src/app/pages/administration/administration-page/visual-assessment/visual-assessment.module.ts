import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { VisualAssessmentParentComponent } from './visual-assessment.component';
import { VisualAssessmentComponent } from './visual-assessment-component/visual-assessment.component';
import { VisualAssessmentRoutingModule } from './visual-assessment-routing.module';

@NgModule({
  imports: [VisualAssessmentRoutingModule, ThemeModule],
  declarations: [VisualAssessmentParentComponent, VisualAssessmentComponent],
  providers: []
})
export class VisualAssessmentModule {}
