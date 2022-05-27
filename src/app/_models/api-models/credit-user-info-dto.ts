export interface CreditUserInfoDto {
  agreement: boolean;
  birthDate: string | Date;
  branchCode: string;
  companyActivityType: string;
  creditAmount: number;
  creditTerm?: number;
  currencyId: string;
  fb_id?: string;
  firstName: string;
  language: string;
  lastName: string;
  pin: string;
  income: number;
  inn: number;
  phone: string;
  productId: string;
  initUsername?: string;
  website?: string;
  dsaUtmUsername?: string;
  isAddIncome: boolean;
}
