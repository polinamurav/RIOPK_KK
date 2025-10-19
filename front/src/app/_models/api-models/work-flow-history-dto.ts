import { Application, Dir, HistoryStatus, SystemDirectory, UserDto } from '..';

export class WorkFlowHistoryDto {
  applicationWorkFlow: Application;
  callCenter: UserDto;
  callCentreDeclineReason: Dir;
  changeDate: string;
  createdBy: UserDto;
  creditManager: UserDto;
  managerDeclineReason: Dir;
  videoBank: UserDto;
  dsa: UserDto;
  dsaUtm: UserDto;
  id: number;
  decisionMaker: UserDto;
  decisionMakerDecision: SystemDirectory;
  decisionMakerDecisionDate: string;
  prevStage: HistoryStatus;
  stage: HistoryStatus;
  status: HistoryStatus;
  verifier: UserDto;
  verifierDecision: SystemDirectory;
}
