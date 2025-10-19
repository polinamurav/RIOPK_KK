import { PageDTO } from '../page-dto';
import { ProductGroup } from './../../constants/product-group';

export class ApplicationPagedInfoDto {
  id: number;
  applicantId: string;
  applicationId: string;
  mobilePhone: string;
  baseProductId: string;
  applicantFullName: string;
  created: string;
  stageId: string;
  stageName: string;
  stageNameAm: string;
  statusId: string;
  statusName: string;
  statusNameAm: string;
  productName: string;
  productNameAm: string;
  errorMessage: string;
  productGroupId: ProductGroup;
  creditAmount: number;
  dirCurrencyName: string;
  creditManager: string;
  regManagerFullName: string;
  nameRuForCreditManager: string;
  nameAmForCreditManager: string;
  verifier?: string;
  rm?: string;
  dsaId?: string;
  accepter?: string;
  isAvailForDeactivation?: boolean;
  userReassignment?: boolean;
  refresh?: boolean;
  appId?: string;
  dirTradingCompanyPointAddress?: string;
  dirTradingCompanyPointNameAm?: string;
  decisionMakerDisplay?: string;
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
