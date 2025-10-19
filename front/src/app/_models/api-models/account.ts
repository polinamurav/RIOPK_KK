import { DirAccountType, DirFeeTermType, GetStatementDto, StaticDirectory } from '..';
import { DirCurrency } from '@app/_models/api-models/dir-currency';

export class AccountDto {
  absClientInfoResponseId: number;
  absId: number;
  acctNum: string;
  accNum: string;
  acctOwner: string;
  applicantId: number;
  applicationId: number;
  balance: number;
  branchId: string;
  cardExp: string | Date;
  cardNum: string;
  cardState: string;
  cardType: string;
  deptId: string;
  descriptionEn: string;
  descriptionAm: string;
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

  accountName: string;
  accountBalance: number;
  accountNumber: number;
  accountType: DirAccountType;
  currency: string;
  name: string;
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
  accountName: string;
  currAccountIban: string;
  createdBy: number;
  dirCurrency: StaticDirectory;
  dirCurrencyId?: number;
  dirPaymentCardId?: number;
  dirPaymentCard: StaticDirectory;
  dirAccountType: DirAccountType;
  dirFeeTermType: DirFeeTermType;
  id: number;
  isGamingSite: boolean;
  isNewAccOrder: boolean;
  isNewCardOrder: boolean;
  isNewInstantCardOrder: boolean;
  isPartnerTransfer: boolean;
  isPinSet: boolean;
  isUrgentCard: boolean;
  isMarketing: boolean | any;
  nameOnCard: string;
  paymentCardType: string;
  surnameOnCard: string;
  updated: string;
  updatedBy: number;
  accountBalance: string;
  changedByUsername: string;
}

export class AccountIssuePostDto {
  absCardDisburseAccountId: number;
  absDisburseAccountId: number;
  accNum: string;
  accountBalance: string; // Остаток по счету
  applicantId: number;
  applicationId: number;
  cardAccNum: string;
  cardAccountIban: string;
  cardNumber: string;
  changedByUsername: string;
  cardTerm: number;
  dirAccountTypeId: number; // Тип счета
  dirFeeTermTypeId: number; // Вид комиссии
  cardTermDate: Date;
  codeword: string;
  createdBy: number;
  currAccountIban: string;
  dirCurrencyId: string;
  dirPaymentCardId: number;
  id: number;
  isGamingSite: boolean;
  isNewAccOrder: boolean;
  isMarketing: boolean;
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
    this.accountBalance = data.accountBalance;
    this.changedByUsername = data.changedByUsername;
    this.cardAccNum = data.cardAccNum;
    this.cardAccountIban = data.cardAccountIban;
    this.cardNumber = data.cardNumber;
    this.cardTerm = data.cardTerm;
    this.cardTermDate = data.cardTermDate;
    this.codeword = data.codeword;
    this.createdBy = data.createdBy;
    this.isMarketing = data.isMarketing;
    this.currAccountIban = data.currAccountIban;
    this.dirCurrencyId = data.dirCurrency ? data.dirCurrency.id.toString() : null;
    this.dirPaymentCardId = data.dirPaymentCard ? +data.dirPaymentCard.id : null;
    this.id = data.id;
    this.isGamingSite = data.isGamingSite;
    this.dirAccountTypeId = data.dirAccountType ? data.dirAccountType.id : null;
    this.dirFeeTermTypeId = data.dirFeeTermType ? data.dirFeeTermType.id : null;
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
