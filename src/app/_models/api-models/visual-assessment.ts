import { BaseDir, DirectoryVal } from './directory';

export interface VisualAssessmentChecklistDto {
  applicantId: number;
  applicationId: number;
  dirVisualAssessmentId: number;
  result: boolean;
}

export class VisualAssessmentChecklistDtoModel implements VisualAssessmentChecklistDto {
  applicantId: number;
  applicationId: number;
  comment: string;
  dirVisualAssessmentId: number;
  id: number;
  result: boolean;
  visualAssessmentId: number;

  constructor(visualAssessmentChecklist: VisualAssessmentChecklist) {
    this.applicantId = visualAssessmentChecklist.applicantId;
    this.applicationId = visualAssessmentChecklist.applicationId;
    this.comment = visualAssessmentChecklist.comment;
    this.dirVisualAssessmentId = visualAssessmentChecklist.dirVisualAssessment.id;
    this.id = visualAssessmentChecklist.id;
    this.result = visualAssessmentChecklist.result;
    this.visualAssessmentId = visualAssessmentChecklist.visualAssessmentId;
  }
}

export class VisualAssessmentChecklist {
  applicantId: number;
  applicationId: number;
  comment: string;
  created: string | Date;
  dirVisualAssessment: DirectoryVal;
  id: number;
  result: boolean;
  updated: string | Date;
  visualAssessmentId: number;
}

export class VisualAssessmentChecklistListDto {
  visualAssessmentChecklistDtoList: VisualAssessmentChecklistDto[];
}

export class DirVisualAssessment extends BaseDir {
  id?: string;
  brmsRuleTypeId: string;
}

export class DirVisualAssessmentDto extends DirVisualAssessment {}
