export interface OperationList {
  name: OPERATIONS_NAMES;
  link: string;
  title: string;
  disabled: boolean;
}

export enum OPERATIONS_NAMES {
  Lending = 'lending',
  Clients = 'clients',
  Deposits = 'deposits',
  PaymentCards = 'paymentCards',
  Accounts = 'accounts'
}

export const OPERATIONS_LIST: OperationList[] = [
  {
    name: OPERATIONS_NAMES.Lending,
    link: OPERATIONS_NAMES.Lending,
    title: 'Operations.Titles.Lending',
    disabled: false
  },
  {
    name: OPERATIONS_NAMES.Clients,
    link: OPERATIONS_NAMES.Clients,
    title: 'Operations.Titles.Clients',
    disabled: false
  },
  {
    name: OPERATIONS_NAMES.Deposits,
    link: OPERATIONS_NAMES.Deposits,
    title: 'Operations.Titles.Deposits',
    disabled: false
  },
  {
    name: OPERATIONS_NAMES.PaymentCards,
    link: OPERATIONS_NAMES.PaymentCards,
    title: 'Operations.Titles.PaymentCards',
    disabled: false
  },
  {
    name: OPERATIONS_NAMES.Accounts,
    link: OPERATIONS_NAMES.Accounts,
    title: 'Operations.Titles.Accounts',
    disabled: false
  }
];
