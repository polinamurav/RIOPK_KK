import {
  Company,
  Dir,
  DirAbsCode,
  DirCurrency,
  DirStage,
  Directory,
  DirIncomeType,
  IntegrationAbsLoanResponse
} from '..';

import { getId } from '@app/services/util/getId';
import { DirCorpCompanyDto } from '@app/_models/api-models/dir-corp-company-dto';
import { DirAbsProductType } from '@app/_models/api-models/inner-information';

export interface AbsInnerCreditHistoryResponse {
  applicantId: number;
  applicationId: number;
  guid: string;
  id: number;
  request: string;
  response: string;
  rqDate: string;
  rsDate: string;
  statusCode: string;
  statusMessage: string;
  statusName: string;
}

export class ApplicantIncomeGetDto {
  amount: number;
  applicationId: number;
  continuousLos: number; // Стаж
  corpCompany: DirCorpCompanyDto;
  dirIncomeType: DirIncomeType;
  id: number;
  income: number;
  inn: string;
  isBoss: boolean;
  isIncomeConsider: boolean;
  isSalaryTransfer: boolean;
  patternid: string;
  pledgeSubjectId: string;
  referenceInformation: string;
  name: string;
  incomeSource: string;
  availableOptionsIds?: any[];
  absInnerCreditHistoryResponse: AbsInnerCreditHistoryResponse;
  dirAbsProductSubType: Dir;
  dirAbsProductType: DirAbsProductType;
  dirCurrency: Dir;
  dirLiabilityKind: Dir;
  dirLiabilityStatus: Dir;
  dirLiabilityType: Dir;
  integrationAbsLoanResponse: IntegrationAbsLoanResponse;
}

export class ApplicantIncomePostDto {
  id?: number;
  applicationId?: number;
  absInnerCreditHistoryResponse: AbsInnerCreditHistoryResponse;
  continuousLos: number; // Стаж
  dirCurrencyId: number; // Валюта
  corpCompanyId?: number; // ID Корп. компании
  dirIncomeTypeId?: number; // ID Типа дохода
  income?: number; //  Доход
  inn?: string; // // ИНН
  corpCompany?: DirCorpCompanyDto;
  isBoss?: boolean; // Руководитель
  isIncomeConsider?: boolean; //   Учитывать доход
  isSalaryTransfer?: boolean; // Готовность перевода з/п ВТБ
  name?: string; // Наименование компании
  incomeSource?: string; // Источник дохода
  availableOptionsIds?: any[]; //
  dirAbsProductSubType: Dir;
  dirAbsProductType: DirAbsProductType;
  dirCurrency: Dir;
  dirLiabilityKind: Dir;
  dirLiabilityStatus: Dir;
  dirLiabilityType: Dir;
  integrationAbsLoanResponse: IntegrationAbsLoanResponse;
  patternid: string;
  pledgeSubjectId: string;
  referenceInformation: string;

  code?: string;
  industry?: string;
  segment?: string;

  constructor(private item: ApplicantIncomeGetDto) {
    this.setAllKeys();
    this.id = item.id;
    this.availableOptionsIds = item.availableOptionsIds;
    this.dirAbsProductSubType = item.dirAbsProductSubType;
    this.dirAbsProductType = item.dirAbsProductType;
    this.dirCurrency = item.dirCurrency;
    this.dirLiabilityKind = item.dirLiabilityKind;
    this.dirLiabilityStatus = item.dirLiabilityStatus;
    this.dirLiabilityType = item.dirLiabilityType;
    this.integrationAbsLoanResponse = item.integrationAbsLoanResponse;
    this.absInnerCreditHistoryResponse = item.absInnerCreditHistoryResponse;
    this.corpCompanyId = item.corpCompany ? item.corpCompany.id : null;
    this.dirIncomeTypeId = item.dirIncomeType ? item.dirIncomeType.id : null;
    this.income = item.income;
    this.continuousLos = item.continuousLos;
    this.dirCurrencyId = item.dirCurrency ? item.dirCurrency.id : null;
    this.inn = item.inn;
    this.patternid = item.patternid;
    this.pledgeSubjectId = item.pledgeSubjectId;
    this.referenceInformation = item.referenceInformation;
    this.incomeSource = item.incomeSource;
    this.isBoss = item.isBoss;
    this.isIncomeConsider = item.isIncomeConsider;
    this.isSalaryTransfer = item.isSalaryTransfer;
    this.name = item.corpCompany ? item.corpCompany.nameAm : item.name ? item.name : null;

    this.code = this.item.corpCompany ? this.item.corpCompany.code : null;
    this.industry = this.item.corpCompany ? this.item.corpCompany.industry : null;
    this.segment = this.item.corpCompany ? this.item.corpCompany.segment : null;
  }

  private setAllKeys() {
    Object.keys(this.item).forEach(key => {
      this[key] = this.item[key];
    });
  }

  // get code(): string {
  //   return this.item.corpCompany ? this.item.corpCompany.code : null;
  // }
  //
  // set code(val: string) {
  //   if(this.item.corpCompany) {
  //     this.item.corpCompany.code = val;
  //   }
  // }
  //
  // get industry(): string {
  //   return this.item.corpCompany ? this.item.corpCompany.industry : null;
  // }
  //
  // set industry(val:string) {
  //   if(this.item.corpCompany) {
  //     this.item.corpCompany.industry = val;
  //   }
  // }
  //
  // get segment(): string {
  //   return this.item.corpCompany ? this.item.corpCompany.segment : null;
  // }
  //
  // set segment(val:string) {
  //   if(this.item.corpCompany) {
  //     this.item.corpCompany.segment = val;
  //   }
  // }
}
