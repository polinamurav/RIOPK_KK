import { PageDTO } from '../page-dto';
import { ProductGroup } from './../../constants/product-group';

export class ApplicationPagedInfoDto {
  id: number;
  applicantId: string;
  applicationId: string;
  customerFullName: string;
  created: string;
  stageId: string;
  stageName: string;
  statusId: string;
  statusName: string;
  productName: string;
  creditAmount: number;
  dirCurrencyName: string;
  creditManager: string;
  videoBank?: string;
  callCenter?: string;
  verifier?: string;
  decisionMaker?: string;
  mobilePhone: string;
  productGroupId: ProductGroup;
  dsa?: string;
  dsaUtm?: string;
  accepter?: string;
  countReturnFullForm?: number;
  countReturnVerification?: number;
  countReturnFinalDecision?: number;
  // для определения, может ли заявка быть деактиворована, или нет (поле с бэка не приходит):
  isAvailForDeactivation?: boolean;
  userReassignment?: boolean;
  refresh?: boolean;
  appId?: string;
}

export class ApplicationState {
  dashboard: PageDTO<ApplicationPagedInfoDto>;
  myTasks: PageDTO<ApplicationPagedInfoDto>;
}

export class QueuesState {
  decline: PageDTO<ApplicationPagedInfoDto>;
  archive: PageDTO<ApplicationPagedInfoDto>;
  error: PageDTO<ApplicationPagedInfoDto>;
  all: PageDTO<ApplicationPagedInfoDto>;
  userTasks: PageDTO<ApplicationPagedInfoDto>;
  monitoring: PageDTO<ApplicationPagedInfoDto>;
}
