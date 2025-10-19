export class AsanEmploymentResponse {
  asanEmployments: AsanEmployment[];
  created: string;
  id: number;
  updated: string;
}

export class AsanEmployment {
  active: boolean;
  asanInn: AsanInnIntegrationDto;
  contractBeginDate: string;
  contractEndDate: string;
  contractNumber: string;
  contractSignDate: string;
  contractNextEndDate: string;
  contractStatus: string;
  contractType: string;
  created: string;
  factualAddress: string;
  id: number;
  legalAddress: string;
  monthlySalary: string;
  name: string;
  phones: string;
  position: string;
  positionLaborContract: string;
  socialSecurityNumber: string;
  taxNumber: string;
  updated: string;
  workCasualType: string;
  workPlace: string;
  workPlaceType: string;
}

export class AsanInnIntegrationDto {
  createDate: string | Date;
  description: string;
  guid: string;
  id: number;
  lastUpdateDate: string | Date;
  name: string;
  patronymic: string;
  rqDate: string | Date;
  rsDate: string | Date;
  state: string;
  stateDescription: string;
  statusCode: string;
  statusMessage: string;
  statusName: string;
  surname: string;
  type: string;
}
