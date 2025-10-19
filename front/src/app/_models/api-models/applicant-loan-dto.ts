import { getId } from '@app/services/util/getId';
import { Dir, PageDTO, SuspensiveConditionsType } from '@app/_models';
import { AcraCreditInfoLoan, IntegrationAbsPledge } from '@app/_models/api-models/integration-acra';

export class IntegrationAbsLoanResponse {}

export class ApplicantLoanFilteredDto {
  credits: PageDTO<ApplicantLoanDto>;
  filters: any;
}

export interface ApplicantLoanFilterDto {
  applicationId?: number;
  creditorOrganization?: string;
  isCreditLine?: boolean;
  isReviewed?: boolean;
  kpzz?: boolean;
  status?: number;
  typeOfLoan?: number;
}

export class ApplicantLoanDto {
  applicantId: number;
  applicationId: number;
  agreementDate: string | Date; // Дата договора
  amount: number; // Сумма
  amountActuallyIssued: number; // Фактически выданная сумма
  amountOfDeposit: number; // Сумма залога
  codeOfFieldOfUseOfLoan: string; // ? Код сферы использования кредита
  creditSubclass: Dir; // Подкласс кредита
  creditorOrganization: string; // Организация-кредитор
  dirCurrency: Dir; // Валюта
  currencyOfDeposit: string; // Валюта залога
  dateOfLastRepayment: string | Date; // Дата последнего погашения
  daysOfDelayedPayments: number; // Кол-во дней задержек платежей
  pledgeSubjectId: string;
  deposit: string; // Залог
  dirCurrencyId: string; // Валюта для показа.
  accountYKO: string; // Залог
  creditCode: string; // Залог
  clientAccount: string; // Залог
  loanAgreementNumber: string; // Залог
  depositCode: number; // Код залога
  fieldOfUseOfLoan: string; // Сфера использования кредита
  id: number;
  interestRates: number; // Процентная ставка
  isCreditLine: boolean; // Кредитная линия да/нет
  acceptedTermsRM: boolean; // принятое рещение
  isKPZZ: boolean; // КПЗЗ да/нет
  isPenaltiesAndFines: boolean; // Наличие пеней и штрафов
  issueDate: string | Date; // Дата выдачи
  maturityDate: string | Date; // Дата погашения
  maxNumberOfOverdueDays1to12month: number; // Максимальное кол-во дней просрочек 1-12 мес.
  maxNumberOfOverdueDays13to24month: number; // Максимальное кол-во дней просрочек 13-24 мес.
  maxNumberOfOverdueDays1to2month: number; // Максимальное кол-во дней просрочек 1-2 мес.
  maxNumberOfOverdueDays1to6month: number; // Максимальное кол-во дней просрочек 1-6 мес.
  maxNumberOfOverdueDays25to36month: number; // Максимальное кол-во дней просрочек 25-36 мес.
  monthlyLoanPayment: number; // Ежемесячный взнос по кредиту
  notesAboutDeposit: string; // Заметки по залогу
  numberOfCasesOfDelay: number; // Кол-во случаев просрочки
  numberOfCasesOfDelay1to24month: number; // Кол-во случаев просрочки 1-24 мес.
  numberOfGuarantors: number; // Кол-во поручителей
  numberOfLoanClassReviews: number; // Кол-во пересмотров класса кредитов
  numberOfLoanClassReviews1to36month: number; // Кол-во пересмотров класса кредитов (1-36 мес.)
  numberOfOverdueDays13to24month: number; // Кол-во просроченных дней 13-24 мес.
  numberOfOverdueDays1to12month: number; // Кол-во просроченных дней 1-12 мес.
  numberOfOverdueDays1to24month: number; // Кол-во просроченных дней 1-24 мес.
  numberOfOverdueDays1to2month: number; // Кол-во просроченных дней 1-2 мес.
  numberOfOverdueDays1to6month: number; // Кол-во просроченных дней 1-6 мес.
  numberOfOverdueDays25to36month: number; // Кол-во просроченных дней 25-36 мес.
  overdueAmount: number; // Просроченная сумма
  overdueDaysOfGuarantor: number; // Просроченные дни поручителя
  overdueInterest: number; // Просроченный процент
  referenceInformation: string; // Справочная информация
  remainder: number; // Остаток
  source: string; // Источник, откуда пришли данные: АКРА или АБС
  status: any; // Статус
  dirAbsProductType: Dir; // Статус
  dirLiabilityKind: Dir; // Вид кредита
  dirLiabilityStatus: Dir; // Статус
  dirLiabilityType: Dir;
  type: SuspensiveConditionsType; // Отлагательные условия
  typeId: number | string;
  typeRu: string;
  typeAm: string;
  typeOfLoan: number; // Вид кредита
  worstCreditClass1to24month: string; // Наихудший класс кредита 1-24 мес.
  worstCreditClass25to36month: string; // Наихудший класс кредита 25-36 мес.
  worstRiskClass: Dir; // Наихудший класс риска
  worstRiskClass13to24month: string; // Наихудший класс риска (13-24 мес)
  worstRiskClass1to12month: string; // Наихудший класс риска (1-12 мес)

  creditCodeSource: string;
  loanAgreementNumberSource: string;

  suspensiveConditionsType?: string; // SuspensiveConditionsType name
  creditorOrganizationIsBank?: boolean; //   Организация-кредитор является банком
  creditorOrganizationIsVtb?: boolean; //  Организация-кредитор является банком ВТБ

  creditorBank: string;
  integrationAbsLoanResponse: IntegrationAbsLoanResponse;
  liabilityType: string;
  maxNumberOFOverdueDays1to12month: number;
  stageId: string;
  acraCreditInfoLoan: AcraCreditInfoLoan;

  isRefinancing: boolean; // Доступность для рефинансирования
  isRepayment: boolean; // Доступность для погашения
  isTopup: boolean; // Доступность для топапа

  pledgeList: IntegrationAbsPledge[];

  // Измененные свойства для отоброжения в таблице
  depositNameRu?: string; // залог
  depositNameAm?: string; // залог
  issueDateRemap?: string | Date; // Дата выдачи
  maturityDateRemap?: string | Date; // Дата погашения
  dateOfLastRepaymentRemap?: string | Date; // Дата последнего погашения

  creditSubclassAbsName?: string;
  worstRiskClassRemapAm?: string;
  worstRiskClassAbsName?: string;
  creditSubclassRu?: string;
  creditSubclassAm?: string;
  worstRiskClassRu?: string;
  worstRiskClassAm?: string;

  private _availableOptionsIds: number[] = [];

  constructor(obj: ApplicantLoanDto) {
    this.setAllKeys(obj);
    this.applicantId = obj.applicantId;
    this.applicationId = obj.applicationId;
    this.agreementDate = new Date(obj.agreementDate);
    this.amount = obj.amount;
    this.acraCreditInfoLoan = obj.acraCreditInfoLoan;
    this.creditorBank = obj.creditorBank;
    this.integrationAbsLoanResponse = obj.integrationAbsLoanResponse;
    this.liabilityType = obj.liabilityType;
    this.maxNumberOFOverdueDays1to12month = obj.maxNumberOFOverdueDays1to12month;
    this.stageId = obj.stageId;
    this.amountActuallyIssued = obj.amountActuallyIssued;
    this.amountOfDeposit = obj.amountOfDeposit;
    this.codeOfFieldOfUseOfLoan = obj.codeOfFieldOfUseOfLoan;
    this.creditSubclass = obj.creditSubclass;
    this.creditorOrganization = obj.creditorOrganization;
    this.dirCurrency = obj.dirCurrency;
    this.currencyOfDeposit = obj.currencyOfDeposit;
    this.dirLiabilityType = obj.dirLiabilityType;
    this.dateOfLastRepayment = new Date(obj.dateOfLastRepayment);
    this.daysOfDelayedPayments = obj.daysOfDelayedPayments;
    this.deposit = obj.deposit;
    this.depositCode = obj.depositCode;
    this.pledgeList = obj.pledgeList;
    this.dirAbsProductType = obj.dirAbsProductType;
    this.pledgeSubjectId = obj.pledgeSubjectId;
    this.fieldOfUseOfLoan = obj.fieldOfUseOfLoan;
    this.id = obj.id;
    this.interestRates = obj.interestRates;
    this.isCreditLine = obj.isCreditLine;
    this.acceptedTermsRM = obj.acceptedTermsRM;
    this.isKPZZ = obj.isKPZZ;
    this.isPenaltiesAndFines = obj.isPenaltiesAndFines;
    this.issueDate = new Date(obj.issueDate);
    this.maturityDate = new Date(obj.maturityDate);
    this.maxNumberOfOverdueDays1to12month = obj.maxNumberOfOverdueDays1to12month;
    this.maxNumberOfOverdueDays13to24month = obj.maxNumberOfOverdueDays13to24month;
    this.maxNumberOfOverdueDays1to2month = obj.maxNumberOfOverdueDays1to2month;
    this.maxNumberOfOverdueDays1to6month = obj.maxNumberOfOverdueDays1to6month;
    this.maxNumberOfOverdueDays25to36month = obj.maxNumberOfOverdueDays25to36month;
    this.monthlyLoanPayment = obj.monthlyLoanPayment;
    this.notesAboutDeposit = obj.notesAboutDeposit;
    this.numberOfCasesOfDelay = obj.numberOfCasesOfDelay;
    this.numberOfCasesOfDelay1to24month = obj.numberOfCasesOfDelay1to24month;
    this.numberOfGuarantors = obj.numberOfGuarantors;
    this.numberOfLoanClassReviews = obj.numberOfLoanClassReviews;
    this.numberOfLoanClassReviews1to36month = obj.numberOfLoanClassReviews1to36month;
    this.numberOfOverdueDays13to24month = obj.numberOfOverdueDays13to24month;
    this.numberOfOverdueDays1to12month = obj.numberOfOverdueDays1to12month;
    this.numberOfOverdueDays1to24month = obj.numberOfOverdueDays1to24month;
    this.numberOfOverdueDays1to2month = obj.numberOfOverdueDays1to2month;
    this.numberOfOverdueDays1to6month = obj.numberOfOverdueDays1to6month;
    this.numberOfOverdueDays25to36month = obj.numberOfOverdueDays25to36month;
    this.overdueAmount = obj.overdueAmount;
    this.overdueDaysOfGuarantor = obj.overdueDaysOfGuarantor;
    this.overdueInterest = obj.overdueInterest;
    this.referenceInformation = obj.referenceInformation;
    this.remainder = obj.remainder;
    this.source = obj.source;
    this.status = obj.status;
    this.type = getId(obj.type);
    this.dirCurrencyId = getId(obj.dirCurrency);
    this.suspensiveConditionsType = obj.type ? (obj.type.suspensiveConditionsTypes as string) : null;
    this.dirLiabilityKind = obj.dirLiabilityKind;
    this.dirLiabilityStatus = obj.dirLiabilityStatus;
    this.accountYKO = obj.accountYKO;
    this.creditCode = obj.creditCode;
    this.clientAccount = obj.clientAccount;
    this.loanAgreementNumber = obj.loanAgreementNumber;
    this.creditorOrganizationIsBank = obj.creditorOrganizationIsBank;
    this.creditorOrganizationIsVtb = obj.creditorOrganizationIsVtb;

    this.isRefinancing = obj.isRefinancing;
    this.isRepayment = obj.isRepayment;
    this.isTopup = obj.isTopup;

    this.creditCodeSource = obj.creditCodeSource;
    this.loanAgreementNumberSource = obj.loanAgreementNumberSource;

    this.typeOfLoan = obj.typeOfLoan;
    this.worstCreditClass1to24month = obj.worstCreditClass1to24month;
    this.worstCreditClass25to36month = obj.worstCreditClass25to36month;
    this.worstRiskClass = obj.worstRiskClass;
    this.worstRiskClass13to24month = obj.worstRiskClass13to24month;
    this.worstRiskClass1to12month = obj.worstRiskClass1to12month;

    this.setAvailableOptionsIds(obj);
  }

  // {id: 2, nameRu: 'Погашение', nameAm: 'Մարում', nameEn: null, active: true, …}
  // {id: 3, nameRu: 'Топап', nameAm: 'Սահմանաչափի ավելացում', nameEn: null, active: true, …}
  // {id: 1, nameRu: 'Рефинансирование', nameAm: 'Վերաֆինանսավորում', nameEn: null, active: true, …}

  get availableOptionsIds() {
    return this._availableOptionsIds;
  }

  setAvailableOptionsIds(item: ApplicantLoanDto) {
    if (item.isRefinancing) {
      this._availableOptionsIds.push(1);
    }
    if (item.isTopup) {
      this._availableOptionsIds.push(3);
    }
    if (item.isRepayment) {
      this._availableOptionsIds.push(2);
    }
  }

  private setAllKeys(obj: ApplicantLoanDto) {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
  }
}
