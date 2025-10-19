import { Dir, DirAbsCode, Directory, SuspensiveConditionsType } from './directory';
import { ProductCondition, ProductDto } from './product';
import { BRMSMatrixConditionType, BRMSMatrixDto } from '@app/_models/api-models/brms';
import { DirCurrency } from '@app/_models/api-models/dir-currency';
import { getId } from '@app/services/util/getId';
import { SummaryIndividualsDataDto } from './inner-information';

export class CreditInfo {
  absPenaltySchema: number;
  altRate: number;
  applicationId: number;
  brmsMatrixConditionType: BRMSMatrixConditionType;
  coefDti: number;
  brmsMatrix: BRMSMatrixDto;
  confirmedAmount: number;
  brmsMatrixId?: number;
  created: string | Date;
  creditAmount: number;
  creditRefPayment: number;
  creditTerm: number;
  brmsMatrixOnlineTermId: number;
  creditTermWithType: string;
  creditTermWithTypeAm?: string;
  productCondition: ProductCondition; // maybe not exist
  dirCreditPurpose: DirAbsCode;
  dirCurrency: DirCurrency;
  dirEnsureType: DirAbsCode;
  dirIssueType: DirAbsCode;
  dirProvisionRate: Dir;
  dirScheduleFrequency: Dir;
  dirScheduleFrequencyId: number;
  dirLoanTermType: Dir;
  dirScheduleType: DirAbsCode;
  dtiAfterScoring: number;
  dtiOutcoming: number;
  expenseDti: number;
  firstTrancheAmount: number;
  freshMoney: number;
  gracePeriod: number;
  id: number;
  incomeNet: number;
  isTopUp: boolean;
  isGraceInterest: boolean;
  isIndivTerms: boolean;
  isInsurance: boolean;
  issueFee: number;
  issueFeeMin: number;
  monthlyPayment: number;
  overpayPrepaymentRate: number;
  paymentDay: number;
  paymentInOtherBankRate: number;
  prepaymentRate: number;
  product: ProductDto;
  rate: number;
  refinanceLiabilities: string;
  restructureFee: number;
  secondPaymentDay: number;
  trancheAmount: number;
  updated: string | Date;
  maxCreditSum?: number;
  maxAnnPayment?: number;
  maxLimit?: number;
}

// absPenaltySchema	integer($int32)
// altRate	number($double)
// applicationId	integer($int64)
// coefDti	number($double)
// confirmedAmount	number($double)
// creditAmount	number($double)
// creditRefPayment	number($double)
// creditTerm	integer($int32)
// dirCreditPurposeId	integer($int64)
// dirCurrencyId	string
// dirEnsureTypeId	integer($int64)
// dirIssueTypeId	integer($int64)
// dirProvisionRateId	integer($int64)
// dirScheduleFrequencyId	integer($int64)
// dirScheduleTypeId	integer($int64)
// dtiAfterScoring	number($double)
// dtiOutcoming	number($double)
// effectiveRate	number
// Эффективная ставка
//
// expenseDti	number($double)
// firstTrancheAmount	number($double)
// freshMoney	number($double)
// gracePeriod	integer($int32)
// id	integer($int64)
// incomeNet	number($double)
// isGraceInterest	boolean
// isIndivTerms	boolean
// isInsurance	boolean
// issueFee	number($double)
// issueFeeMin	number($double)
// monthlyFeeLoanAccAddInt	number
// Ежемесячная комиссия за дополнительное обслуживание ссудного счета (в процентах)
//
// monthlyFeeLoanAccAddSum	number
// Ежемесячная комиссия за дополнительное обслуживание ссудного счета (сумма)
//
// monthlyFeeLoanAccInt	number
// Ежемесячная комиссия за обслуживание ссудного счета (в процентах)
//
// monthlyFeeLoanAccSum	number
// Ежемесячная комиссия за обслуживание ссудного счета (сумма)
//
// monthlyPayment	number($double)
// overpayPrepaymentRate	number($double)
// paymentDay	integer($int32)
// paymentInOtherBankRate	number($double)
// prepaymentRate	number($double)
// productId	integer($int64)
// rate	number($double)
// refinanceLiabilities	string
// restructureFee	number($double)
// secondPaymentDay	integer($int32)
// singleFeeLoanIssueInt	number
// Единовременная комиссия за выдачу кредита (в процентах)
//
// singleFeeLoanIssueSum	number
// Единовременная комиссия за выдачу кредита (сумма)
//
// trancheAmount	number($double)
// yearlyFeeMaintenanceInt	number
// Ежегодная комиссия обслуживание (в процентах)
//
// yearlyFeeMaintenanceSum	number
// Ежегодная комиссия обслуживание (сумма)

export class CreditInfoDto {
  altRate: number;
  applicationId: number;
  confirmedAmount: number;
  creditAmount: number;
  creditRefPayment: number;
  creditTerm: number;
  brmsMatrix: BRMSMatrixDto;
  dirCreditPurposeId: number;
  dirCurrencyId: string | number;
  dirEnsureTypeId: number;
  dirIssueTypeId: number;
  dirProvisionRateId: number;
  dirScheduleFrequencyId: number;
  dirScheduleTypeId: number;
  dirLoanTermTypeId: number;
  dtiOutcoming: number;
  expenseDti: number;
  firstTrancheAmount: number;
  freshMoney: number;
  gracePeriod: number;
  id: number;
  incomeNet: number;
  isGraceInterest: boolean;
  isIndivTerms: boolean;
  isInsurance: boolean;
  isTopUp: boolean;
  issueFee: number;
  monthlyPayment: number;
  overpayPrepaymentRate: number;
  paymentDay: number;
  paymentInOtherBankRate: number;
  prepaymentRate: number;
  productId: number;
  brmsMatrixId: number;
  rate: number;
  refinanceLiabilities: string;
  restructureFee: number;
  secondPaymentDay: number;
  trancheAmount: number;
  coefDti: number;
  dtiAfterScoring: number;

  constructor(obj: CreditInfo) {
    this.altRate = obj.altRate;
    this.applicationId = obj.applicationId;
    this.confirmedAmount = obj.confirmedAmount;
    this.creditAmount = obj.creditAmount;
    this.creditRefPayment = obj.creditRefPayment;
    this.creditTerm = obj.creditTerm;
    this.brmsMatrix = obj.brmsMatrix;
    this.brmsMatrixId = getId(obj.brmsMatrix);
    this.dirCreditPurposeId = getId(obj.dirCreditPurpose);
    this.dirCurrencyId = getId(obj.dirCurrency);
    this.dirEnsureTypeId = getId(obj.dirEnsureType);
    this.dirIssueTypeId = getId(obj.dirIssueType);
    this.dirProvisionRateId = getId(obj.dirProvisionRate);
    this.dirScheduleFrequencyId = getId(obj.dirScheduleFrequency);
    this.dirScheduleTypeId = getId(obj.dirScheduleType);
    this.dirLoanTermTypeId = getId(obj.dirLoanTermType);
    this.dtiOutcoming = obj.dtiOutcoming;
    this.expenseDti = obj.expenseDti;
    this.firstTrancheAmount = obj.firstTrancheAmount;
    this.freshMoney = obj.freshMoney;
    this.gracePeriod = obj.gracePeriod;
    this.id = obj.id;
    this.incomeNet = obj.incomeNet;
    this.isGraceInterest = obj.isGraceInterest;
    this.isIndivTerms = obj.isIndivTerms;
    this.isInsurance = obj.isInsurance;
    this.isTopUp = obj.isTopUp;
    this.issueFee = obj.issueFee;
    this.monthlyPayment = obj.monthlyPayment;
    this.overpayPrepaymentRate = obj.overpayPrepaymentRate;
    this.paymentDay = obj.paymentDay;
    this.paymentInOtherBankRate = obj.paymentInOtherBankRate;
    this.prepaymentRate = obj.prepaymentRate;
    this.productId = getId(obj.product);
    this.rate = obj.rate;
    this.refinanceLiabilities = obj.refinanceLiabilities;
    this.restructureFee = obj.restructureFee;
    this.secondPaymentDay = obj.secondPaymentDay;
    this.trancheAmount = obj.trancheAmount;
    this.coefDti = obj.coefDti;
    this.dtiAfterScoring = obj.dtiAfterScoring;
  }
}

export class CreditInfoLoanDto {
  acceptedTermsRM: boolean; // Принятое условие РМ
  accountYKO: string; // * Счёт УКО
  agreementDate: Date; // Дата договора
  amount: number; // Сумма
  amountActuallyIssued: number; // * Фактически выданная сумма
  amountOfDeposit: number; // * Сумма залога
  clientAccount: string; // * Счёт клиента
  codeOfFieldOfUseOfLoan: number; // * Код сферы использования кредита
  creditCode: string; // Кредитный код
  creditSubclass: string; // * Подкласс кредита
  creditorBank: string; // Банк-кредитор
  currency: string; // Валюта
  currencyOfDeposit: string; // * Валюта залога
  dateOfLastRepayment: Date; // * Дата последнего погашения
  daysOfDelayedPayments: number; // * Кол-во дней задержек платежей
  deposit: string; // Залог
  depositCode: number; // * Код залога
  fieldOfUseOfLoan: string; // * Сфера использования кредита
  id: number;
  interestRates: number; // Процентная ставка
  isCreditLine: boolean; // * Кредитная линия да/нет
  isKPZZ: boolean; // * КПЗЗ да/нет
  isPenaltiesAndFines: boolean; // * Наличие пеней и штрафов
  issueDate: Date; // Дата выдачи
  loanAgreementNumber: string; // * Номер кредитного договора
  maturityDate: Date; // Дата погашения
  maxNumberOfOverdueDays13to24month: number; // * Максимальное кол-во дней просрочек 13-24 мес.
  maxNumberOfOverdueDays1to12month: number; // * Максимальное кол-во дней просрочек 1-12 мес.
  maxNumberOfOverdueDays1to2month: number; // * Максимальное кол-во дней просрочек 1-2 мес.
  maxNumberOfOverdueDays1to6month: number; // * Максимальное кол-во дней просрочек 1-6 мес.
  maxNumberOfOverdueDays25to36month: number; // * Максимальное кол-во дней просрочек 25-36 мес.
  monthlyLoanPayment: number; // Ежемесячный взнос по кредиту
  notesAboutDeposit: string; // * Заметки по залогу
  numberOfCasesOfDelay: number; // * Кол-во случаев просрочки
  numberOfCasesOfDelay1to24month: number; // * Кол-во случаев просрочки 1-24 мес.
  numberOfGuarantors: number; // * Кол-во поручителей
  numberOfLoanClassReviews: number; // * Кол-во пересмотров класса кредитов
  numberOfLoanClassReviews1to36month: number; // * Кол-во пересмотров класса кредитов (1-36 мес.)
  numberOfOverdueDays13to24month: number; // * Кол-во просроченных дней 13-24 мес.
  numberOfOverdueDays1to12month: number; // * Кол-во просроченных дней 1-12 мес.
  numberOfOverdueDays1to24month: number; // * Кол-во просроченных дней 1-24 мес.
  numberOfOverdueDays1to2month: number; // * Кол-во просроченных дней 1-2 мес.
  numberOfOverdueDays1to6month: number; // * Кол-во просроченных дней 1-6 мес.
  numberOfOverdueDays25to36month: number; // * Кол-во просроченных дней 25-36 мес.
  overdueAmount: number; // * Просроченная сумма
  overdueDaysOfGuarantor: number; // * Просроченные дни поручителя
  overdueInterest: number; // * Просроченный процент
  referenceInformation: string; // * Справочная информация
  remainder: number; // Остаток
  status: number; // * Статус
  summaryIndividualsDataDto: SummaryIndividualsDataDto; // * Обобщенные данные по отдельным лицам
  suspensiveConditionsType: SuspensiveConditionsType;
  typeOfLoan: number; // Вид кредита
  worstCreditClass1to24month: string; // * Наихудший класс кредита 1-24 мес.
  worstCreditClass25to36month: string; // * Наихудший класс кредита 25-36 мес.
  worstRiskClass: string; // * Наихудший класс риска
  worstRiskClass13to24month: string; // * Наихудший класс риска (13-24 мес)
  worstRiskClass1to12month: string; // * Наихудший класс риска (1-12 мес)
}

export class CreditInfoByPinDto {
  applicationId: number;
  created: string;
  creditAmount: number;
  creditTerm: number;
  dirCreditPurpose: Directory;
  dirCurrency: Directory;
  id: number;
  product: ProductDto;
  freshMoney: number;
  monthlyPaymen: number;
  updated: string;
  rate: number;
}

export class CreditInfoUpdateDto {
  dirEnsureTypeId: number;
  dirIssueTypeId: number;
  dirScheduleFrequencyId: number;
  dirScheduleTypeId: number;
  id: number;
  isGraceInterest: boolean;
  paymentDay: number;
  secondPaymentDay: number;
}
