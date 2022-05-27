import { ChatbotStatus, DirBusinessInspectionResult, DirRiskBasedPrice, Segment, Status } from '..';

import { PageDTO } from '@app/_models/page-dto';
import { PrintingForm } from '@app/_models';

export enum ELocalNames {
  NameGe = 'nameGe',
  NameEn = 'nameEn',
  NameRu = 'nameRu'
}
export interface LocalNames {
  [ELocalNames.NameGe]: string;
  [ELocalNames.NameEn]?: string;
  [ELocalNames.NameRu]: string;
}

export class BaseDir implements LocalNames {
  active: boolean;
  changedByUsername: string;
  code: string;
  created: string | Date;
  nameGe: string;
  nameEn: string;
  nameRu: string;
  updated: string | Date;
}

export class Dir extends BaseDir {
  id: number;
}

export class Decision extends BaseDir {
  id: string;
}

export class DirFatca extends Dir {
  isCountryNeed: boolean;
}

export class DirAbsCode extends Dir {
  absCode: string;
  abs_code?: string;
}

export class DirCompanyList extends Dir {
  dirCompanyStatus: Status;
  inn: string;
}

export interface DirCompanyListDto {
  id?: number;
  active?: boolean;
  code: string;
  dirCompanyStatusId: number;
  inn: string;
  name: string;
  changedByUsername: string;
}

export class DirSigner extends Dir {
  beginDate: string | Date;
  dirBranch: DirBranch;
  endDate: string | Date;
  positionAz: string;
  positionRu: string;
  principal: boolean;
  printingForm: PrintingForm;
}

export class DirBranch extends BaseDir {
  id: number;
  absCode: string;
  deptNo: string;
  dirCity: DirAbsCode;
}

export class DirStage implements LocalNames {
  chatbotStatus: ChatbotStatus;
  id: string;
  isProgbarVisible: boolean;
  isUserTask: boolean;
  nameGe: string;
  nameEn: string;
  nameRu: string;
  orderNum: number;
}

export class DirStatus implements LocalNames {
  chatbotStatus: ChatbotStatus;
  id: string;
  nameGe: string;
  nameEn: string;
  nameRu: string;
}

export interface DirCityDto extends DirAbsCode {
  dirRegion: DirAbsCode;
}

export interface DirectoryVal extends Dir {
  value: string;
}

export class Directory extends Dir {
  nameInternational?: string;
  oecdMember?: boolean;
  stSix?: boolean;
  threeCharValue?: boolean;
  twoCharValue?: boolean;
  absCode?: string;
  suspicious?: boolean;
  priority?: number;
  limit?: number;
}

export class DirSalesChannel extends Dir {
  limit: number;
  online: boolean;
  priority: number;
}

export class DirCountry extends Dir {
  nameInternational: string;
  oecdMember: boolean;
  stSix: boolean;
  threeCharValue: string;
  twoCharValue: string;
  zoneType: number;
}

export class DirPreApproved {
  address: string;
  agreement: string;
  creditPayment: number;
  creditSum12: number;
  creditSum24: number;
  creditSum36: number;
  creditSum48: number;
  currency: string;
  fin: string;
  fi: string;
  id: number;
  income: number;
  percent12: number;
  percent24: number;
  percent36: number;
  percent48: number;
  productName: string;
  salary: number;
}

export class DirectoriesState {
  declines: PageDTO<Directory>;
  bankBranch: PageDTO<DirBranch>;
  countries: PageDTO<DirCountry>;
  currency: PageDTO<Directory>;
  // salesChanel: PageDTO<Directory>;
  operatorCode: PageDTO<Directory>;
  preApproved: PageDTO<DirPreApproved>;
  creditPurpose: PageDTO<Directory>;
  education: PageDTO<Directory>;
  activities: PageDTO<Directory>;
  familyRelationship: PageDTO<Directory>;
  numberEmployee: PageDTO<Dir>;
  accommodationType: PageDTO<Dir>;
  callCenterDecline: PageDTO<Dir>;
  employmentLegalType: PageDTO<DirAbsCode>;
  departments: PageDTO<Directory>;
  ipdl: PageDTO<Dir>;
  innAbsenceReason: PageDTO<Dir>;
  communicationType: PageDTO<Dir>;
  incomeType: PageDTO<Dir>;
  operationType: PageDTO<Dir>;
  fatca: PageDTO<Directory>;
  operationFreqType: PageDTO<Directory>;
  signer: PageDTO<DirSigner>;
  city: PageDTO<DirCityDto>;
  region: PageDTO<DirAbsCode>;
  callStatus: PageDTO<Dir>;
  paymentCard: PageDTO<Dir>;
  decisionMakerDeclineReason: PageDTO<DirectoryVal>;
  insuranceType: PageDTO<Dir>;
  segments: PageDTO<Segment>;
  inspectionResult: PageDTO<DirBusinessInspectionResult>;
  preApprovedFactor: PageDTO<Dir>;
  absCommission: PageDTO<Dir>;
  innType: PageDTO<Dir>;
  innStatus: PageDTO<Dir>;
  dirGoods: PageDTO<Dir>;
  dirPartner: PageDTO<Dir>;
  dirEnsureType: PageDTO<Dir>;
  dirScheduleFrequency: PageDTO<Dir>;
  dirIssueType: PageDTO<Dir>;
  dirIncomeFrequency: PageDTO<Dir>;
  dirJobPosition: PageDTO<Dir>;
  tariff: PageDTO<Dir>;
  rbp: PageDTO<DirRiskBasedPrice>;
}
