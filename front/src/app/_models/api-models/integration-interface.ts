import {
  AbsClientInfoResponseDto,
  AsanInnIntegrationDto,
  AbsProvenIncomeResponseDto,
  CountCreditHistoryDto,
  CreditInfoResponseDto,
  InternalLoanListResponseDto,
  RevenueServiceEmploymentResponseDto,
  Dir
} from '@app/_models';

export class IntegrationInterfaceDto {
  absClientInfoResponseDto: AbsClientInfoResponseDto;
  absProvenIncomeResponseDto: AbsProvenIncomeResponseDto;
  asanInnResponse: AsanInnIntegrationDto;
  created: string | Date;
  id: number;
  innCountCreditHistoryDto: CountCreditHistoryDto;
  innCreditInfoResponse: CreditInfoResponseDto;
  internalLoanListResponseDto: InternalLoanListResponseDto;
  pinCountCreditHistoryDto: CountCreditHistoryDto;
  pinCreditInfoResponse: CreditInfoResponseDto;
  revenueServiceEmploymentResponseDto: RevenueServiceEmploymentResponseDto;
  updated: string | Date;
}

export class IntegrationSetting {
  created: string;
  isServiceOn: boolean;
  serviceCode: string;
  serviceName: string;
  updated: string;
}

export class CreditInfoLoanBase {
  agreementDate: string | Date; // Дата договора
  amount: number; // Сумма
  amountActuallyIssued: number; // Фактически выданная сумма
  amountOfDeposit: number; // Сумма залога
  codeOfFieldOfUseOfLoan: number; // Код сферы использования кредита
  creditSubclass: string; // Подкласс кредита
  currency: string; // Валюта
  currencyOfDeposit: string; // Валюта залога
  dateOfLastRepayment: string | Date; // Дата последнего погашения
  daysOfDelayedPayments: number; // Кол-во дней задержек платежей
  deposit: string; // Залог
  depositCode: { nameRu: string; nameAm: string }; // Код залога
  fieldOfUseOfLoan: string; // Сфера использования кредита
  id: number;
  interestRates: number; // Процентная ставка
  isCreditLine: boolean; // Кредитная линия да/нет
  isCreditLineNameRu?: string; // Кредитная линия да/нет
  isKPZZ: boolean; // КПЗЗ да/нет
  isKPZZNameRu?: string; // КПЗЗ да/нет
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
  status: any; // Статус
  dirLiabilityStatus: Dir;
  dirLiabilityType: Dir;
  typeOfLoan: number; // Вид кредита
  dirLiabilityKind: Dir; // Вид кредита
  worstCreditClass1to24month: string; // Наихудший класс кредита 1-24 мес.
  worstCreditClass25to36month: string; // Наихудший класс кредита 25-36 мес.
  worstRiskClass: string; // Наихудший класс риска
  worstRiskClass13to24month: string; // Наихудший класс риска (13-24 мес)
  worstRiskClass1to12month: string; // Наихудший класс риска (1-12 мес)

  codeOfPledgeRu?: string;
  codeOfPledgeAm?: string;
}
