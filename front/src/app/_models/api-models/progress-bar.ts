import { DirStage } from '..';

export class ProgressBar {
  applicationId: number;
  stage: DirStage;
  isPassed: boolean;
  isCurrent?: boolean;
  isHorizontalLineBlue?: boolean;
  id: number;
}
