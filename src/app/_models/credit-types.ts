export interface IChosenCredit {
  productType: string;
  autoApproveSum: number;
  currency: string;
  minTermForAutoApproveSum: number;
  maxCreditTerm: number;
  annPaymentForAutoApproveSum: number;
  rateForAutoApproveSum: number;
}

export interface IPossibleCredit {
  productType: string;
  maxCreditSum: number;
  currency: string;
  minTerm: number;
  maxCreditTerm: number;
  annPayment: number;
  rate: number;
}

export enum CheckCreditType {
  '001' = 'initialAmount',
  '002' = 'lineAmount',
  '003' = 'lineAmount',
  '004' = '',
  '005' = 'lineAmount',
  '006' = 'initialAmount',
  '007' = 'initialAmount',
  '008' = 'initialAmount'
}

export enum CheckGuaCreditType {
  '001' = 'guaInitialAmount',
  '002' = 'guaLineAmount',
  '003' = 'guaLineAmount',
  '004' = '',
  '005' = 'guaLineAmount',
  '006' = 'guaInitialAmount',
  '007' = 'guaInitialAmount',
  '008' = 'guaInitialAmount'
}
