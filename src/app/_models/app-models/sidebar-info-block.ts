import { Directory } from '..';

export interface ISidebarInfoBlock {
  applicationId: string;
  mainApplicationId: string;
  mainApplication: string;
  date: string;
  applicant: string;
  sourceChannel?: Directory;
  manager?: string;
  videoBank?: string;
  dsa?: string;
  callCenter?: string;
  clientManager?: string;
  branch?: Directory;
  verifier?: string;
  decisionMaker?: string;
}

export interface ISidebarInfoBlockClients {
  fio: string;
  requestDate: string;
  clientManager: string;
  branch: Directory;
}
