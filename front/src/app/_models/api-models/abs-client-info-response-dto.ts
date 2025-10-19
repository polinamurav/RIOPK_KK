import { AccountDto } from '@app/_models';

export class AbsSearchClientRequest {
  dateOfOpeningAValidBankAccount?: string;
  dateOfOpeningAValidCardAccount?: string;
  identityCardPin: string; // Номер документа, удостоверяющего личность
  socCardPin?: string; // Номер социальной карты
  identityCardTypeId: number; // Тип документа, удостоверяющего личность
  socCardTypeId?: number; // Тип соц. карты
  shortApplicationId?: number;
}

export class AbsSearchClientDto {
  agreement: boolean;
  agreement_esign: boolean;
  applicantId: number;
  applicationId: number;
  firstName: string;
  guid: string;
  id: number;
  errorCode: string;
  errorMessage: string;
  errorMessageRu: string;
  errorMessageAm: string;
  lastName: string;
  monitoring: number;
  rqDate: Date;
  rsDate: Date;
  statusCode: string;
  statusDesc: string;
  statusMessage: string;
  statusName: string;
}

export class AbsClientInfo {
  agreement: boolean;
  agreement_esign: boolean;
  applicantId: number;
  applicationId: number;
  firstName: string;
  guid: string;
  id: number;
  lastName: string;
  rqDate: Date;
  rsDate: Date;
  statusCode: string;
  statusMessage: string;
  statusName: string;

  constructor(obj: AbsClientInfo) {
    this.agreement = obj.agreement;
    this.agreement_esign = obj.agreement_esign;
    this.applicantId = obj.applicantId;
    this.applicationId = obj.applicationId;
    this.firstName = obj.firstName;
    this.guid = obj.guid;
    this.id = obj.id;
    this.lastName = obj.lastName;
    this.rqDate = new Date(obj.rqDate);
    this.rsDate = new Date(obj.rsDate);
    this.statusCode = obj.statusCode;
    this.statusMessage = obj.statusMessage;
    this.statusName = obj.statusName;
  }
}

export class AbsClientInfoResponseDto {
  ACCOUNT_PRODUCT_NO: number;
  ACTIVITY_AREA_ID: number;
  CALC_INCOME: number;
  CALC_SALARY: number;
  CITIZENSHIP: string;
  CLIENT_ADDRESS: string;
  CLIENT_ADDRESS_LAT: string;
  CLIENT_AGE: number;
  CLIENT_BIRHT_DATE: string | Date;
  CLIENT_BIRHT_PLACE: string;
  CLIENT_CITIZENSHIP: string;
  CLIENT_CITY: string;
  CLIENT_CITY_ID: number;
  CLIENT_CLASIFF: string;
  CLIENT_COUNTRY: string;
  CLIENT_FATHER_NAME: string;
  CLIENT_GENDER: number;
  CLIENT_INCOME_APPROVED: boolean;
  CLIENT_INCOME_TYPE: number;
  CLIENT_IS_INSIDER: boolean;
  CLIENT_LEGAL_ADDRESS: string;
  CLIENT_MARITAL_STATUS: number;
  CLIENT_MONTHLY_INCOME: number;
  CLIENT_MONTHLY_INCOME_CURRENCY: string;
  CLIENT_NAME: string;
  CLIENT_NO: number;
  CLIENT_NUMBER_OF_CHILDREN: number;
  CLIENT_ORGANIZATION_CATEGORY: string;
  CLIENT_ORGANIZATION_ID: number;
  CLIENT_ORGANIZATION_NAME: string;
  CLIENT_ORGANIZATION_PHONE: string;
  CLIENT_ORGANIZATION_TAX_CODE: string;
  CLIENT_OTH_INCOME_TYPE: number;
  CLIENT_OTH_MONTHLY_INCOME: number;
  CLIENT_OTH_MONTHLY_INCOME_CURRENCY: string;
  CLIENT_PASSPORT_ID: string;
  CLIENT_PERSONAL_ID: string;
  CLIENT_PHONE_HOME: string;
  CLIENT_PHONE_MOB: string;
  CLIENT_POSITION: string;
  CLIENT_RANK_ID: number;
  CLIENT_SALARY_CATEGORY: number;
  CLIENT_SOURCE_ID: number;
  CLIENT_SPOUSE_INCOME: number;
  CLIENT_SPOUSE_INCOME_CURRENCY: string;
  CLIENT_SPOUSE_INCOME_TYPE: number;
  CLIENT_SPOUSE_NAME: string;
  CLIENT_SPOUSE_PERSONAL_ID: string;
  CLIENT_SPOUSE_PLACE_OF_WORK: string;
  CLIENT_SPOUSE_POSITION: string;
  CLIENT_SPOUSE_SURNAME: string;
  CLIENT_SUB_TYPE_ID: number;
  CLIENT_SURNAME: string;
  CLIENT_TOTAL_FAMILY_INCOME: number;
  CLIENT_TOTAL_FAMILY_INCOME_CURRENCY: string;
  CLIENT_TOTAL_FAMILY_MEMBERS: number;
  CLIENT_TOTAL_WORK_EXPERIENCE: number;
  CLIENT_TOTAL_WORK_EXPERIENCE_PERIOD: number;
  CLIENT_TRANSFERS_PERIOD_MONTH: number;
  CLIENT_WORK_EXPERIENCE: number;
  CLIENT_WORK_EXPERIENCE_PERIOD: number;
  CONVERS_LANG_ID: number;
  COUNTRY_OF_BIRTH: string;
  CRA_METHOD: number;
  CURRENT_CALC_NEGATIVE: number;
  CURRENT_NEGATIVE_STATUSES: number;
  DOCUMENT_IS_VALID: boolean;
  DOUBLE_CITIZENSHIP: string;
  EDUCATION_ID: number;
  EMPLOEE_COUNT_ID: number;
  E_MAIL: string;
  FACT_CITY: string;
  FACT_CITY_LAT: string;
  FACT_COUNTRY: string;
  HAS_ACTIVE_ACCOUNTS: boolean;
  INCOME_AMOUNT_RS: number;
  INFORMATION_SOURCE_ID: number;
  INFO_CHECK_DATE: string | Date;
  INFO_IS_VALID: boolean;
  INSURANCE_COMPANY_ID: number;
  IS_ACTIVE_IN_ODB: boolean;
  IS_CRA_STATE_APPROVED: boolean;
  IS_EMPLOYEE: boolean;
  IS_INSIDER: boolean;
  MAX_POSITIVE_AMOUNT: number;
  NEW_CLIENT: number;
  ORGANIZATION_NAME: string;
  PASSPORT_COUNTRY: string;
  PASSPORT_END_DATE: string | Date;
  PASSPORT_ISSUE_DT: string | Date;
  PASSPORT_IS_LIFE: boolean;
  PASSPORT_REG_ORGAN: string;
  PASSPORT_TYPE_ID: number;
  PAYMENT_INSURANCE_GUID: string;
  POSITIVE_STATUSES: number;
  POST_CATEGORY_ID: number;
  PROVEN_INCOME_AMOUNT: number;
  REAL_SALARY: number;
  RELATE_PERSONS: AbsClientInfoRelateDto[];
  RESIDENT_COUNTRY: string;
  RISK_GRADE: string;
  RISK_VAL_RATE: number;
  SEB_CLASS_ID: number;
  SP_EMPLOEE_COUNT: number;
  SP_HEAD_NAME: string;
  SP_HEAD_PHONE: string;
  SP_HEAD_POSITION: string;
  TERMINATED_NEGATIVE_STATUSES: number;
  accounts: AccountDto[];
  applicantId: number;
  applicationId: number;
  guid: string;
  id: number;
  rqDate: string | Date;
  rsDate: string | Date;
  statusCode: string;
  statusMessage: string;
  statusName: string;
}

export class AbsClientInfoRelateDto {
  CLIENT_IS_INSIDER: boolean;
  CLIENT_NAME: string;
  CLIENT_NO: number;
  CLIENT_RELATION_TYPE: string;
  CLIENT_RELATION_TYPE_ID: number;
  RELATED_CLIENT_IS_INSIDER: boolean;
  REL_CLIENT_NAME: string;
  REL_CLIENT_NO: number;
  VALUE: string;
  VALUE_NAME: string;
  VALUE_TYPE: string;
}

export interface ShortFormParallelAppsRequest {
  identityCardPin: string; // Номер документа, удостоверяющего личность
  identityCardTypeId: number; // Тип документа, удостоверяющего личность
}

export interface ShortFormParallelAppsResponse {
  apps: ApplicationForShortForm[]; // Параллельные заявки на краткой анкете
  createPossible: boolean; // Возможность создания новой заявки
}

export interface ApplicationForShortForm {
  applicationId: string; //   Идентификатор в БД

  assignPossible: boolean; //   Возможность переназначения заявки

  branchNameAm: string; //   Наизвание филиала АРМ

  branchNameRu: string; //   Наизвание филиала РУС

  createdBy: string; //   Кем создано

  stageId: string; //   Кем создано

  createdDate: string; //   Дата создания

  id: number; //   Идентификатор в заявки в БД

  stageNameAm: string; //   Наизвание этапа АРМ

  stageNameRu: string; //   Наизвание этапа РУС

  choose?: string;
}
