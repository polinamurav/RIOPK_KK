import { GetStatementDto, StaticDirectory } from '..';

export class AccountDto {
  absClientInfoResponseId: number;
  absId: number;
  acctNum: string;
  acctOwner: string;
  applicantId: number;
  applicationId: number;
  balance: number;
  branchId: string;
  cardExp: string | Date;
  cardNum: string;
  cardState: string;
  cardType: string;
  currency: string;
  deptId: string;
  descriptionEn: string;
  descriptionGe: string;
  embName: string;
  endingBalance: number;
  getStatementDto: GetStatementDto[];
  iban: string;
  id: number;
  isCreditCard: boolean;
  isOkForCredit: boolean;
  isSalaryCard: boolean;
  startingBalance: number;
  type: string;
}

export class AccountHistoryDto {
  accountId: number;
  amount: number;
  applicantId: number;
  applicationId: number;
  currency: string;
  date: string;
  documentDesc: string;
  id: number;
}

export class AccountIssueGetDto {
  absCardDisburseAccountId: number;
  absDisburseAccountId: number;
  accNum: string;
  applicantId: number;
  applicationId: number;
  cardAccNum: string;
  cardAccountIban: string;
  cardNumber: string;
  cardTerm: number;
  cardTermDate: Date;
  codeword: string;
  created: string;
  currAccountIban: string;
  createdBy: number;
  dirCurrency: StaticDirectory;
  dirCurrencyId?: number;
  dirPaymentCardId?: number;
  dirPaymentCard: StaticDirectory;
  id: number;
  isGamingSite: boolean;
  isNewAccOrder: boolean;
  isNewCardOrder: boolean;
  isNewInstantCardOrder: boolean;
  isPartnerTransfer: boolean;
  isPinSet: boolean;
  isUrgentCard: boolean;
  nameOnCard: string;
  paymentCardType: string;
  surnameOnCard: string;
  updated: string;
  updatedBy: number;
}

export class AccountIssuePostDto {
  absCardDisburseAccountId: number;
  absDisburseAccountId: number;
  accNum: string;
  applicantId: number;
  applicationId: number;
  cardAccNum: string;
  cardAccountIban: string;
  cardNumber: string;
  cardTerm: number;
  cardTermDate: Date;
  codeword: string;
  createdBy: number;
  currAccountIban: string;
  dirCurrencyId: string;
  dirPaymentCardId: number;
  id: number;
  isGamingSite: boolean;
  isNewAccOrder: boolean;
  isNewCardOrder: boolean;
  isNewInstantCardOrder: boolean;
  isPartnerTransfer: boolean;
  isPinSet: boolean;
  isUrgentCard: boolean;
  nameOnCard: string;
  paymentCardType: string;
  updatedBy: number;
  surnameOnCard: string;

  constructor(data: AccountIssueGetDto) {
    this.absCardDisburseAccountId = data.absCardDisburseAccountId;
    this.absDisburseAccountId = data.absDisburseAccountId;
    this.accNum = data.accNum;
    this.applicantId = data.applicantId;
    this.applicationId = data.applicationId;
    this.cardAccNum = data.cardAccNum;
    this.cardAccountIban = data.cardAccountIban;
    this.cardNumber = data.cardNumber;
    this.cardTerm = data.cardTerm;
    this.cardTermDate = data.cardTermDate;
    this.codeword = data.codeword;
    this.createdBy = data.createdBy;
    this.currAccountIban = data.currAccountIban;
    this.dirCurrencyId = data.dirCurrency ? data.dirCurrency.id.toString() : null;
    this.dirPaymentCardId = data.dirPaymentCard ? +data.dirPaymentCard.id : null;
    this.id = data.id;
    this.isGamingSite = data.isGamingSite;
    this.isNewAccOrder = data.isNewAccOrder;
    this.isNewCardOrder = data.isNewCardOrder;
    this.isNewInstantCardOrder = data.isNewInstantCardOrder;
    this.isPartnerTransfer = data.isPartnerTransfer;
    this.isPinSet = data.isPinSet;
    this.isUrgentCard = !!data.isUrgentCard;
    this.nameOnCard = data.nameOnCard;
    this.paymentCardType = data.paymentCardType;
    this.updatedBy = data.updatedBy;
    this.surnameOnCard = data.surnameOnCard;
  }
}
export class FilledCardApplicationDto {
  constructor(
    public cardTerm: number,
    public cardType: string,
    public codeWord: string,
    public currency: string,
    public isUrgentCard: boolean,
    public nameOnCard: string,
    public surnameOnCard: string
  ) {}
}
