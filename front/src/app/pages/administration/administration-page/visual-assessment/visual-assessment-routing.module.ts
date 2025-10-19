import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualAssessmentParentComponent } from './visual-assessment.component';
import { VisualAssessmentComponent } from './visual-assessment-component/visual-assessment.component';

const routes: Routes = [
  {
    path: '',
    component: VisualAssessmentParentComponent,
    children: [
      {
        path: '',
        component: VisualAssessmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualAssessmentRoutingModule {}
