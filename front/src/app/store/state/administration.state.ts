import { AdministrationState } from '@app/_models/administration-models';

export const initialAdministrationState: AdministrationState = {
  settings: getInitPageDto(),
  notificationSetting: getInitPageDto(),
  printingForms: {
    content: [
      {
        attachment: 'string',
        created: '2020-01-20T15:56:03.517Z',
        id: 'Local PF',
        name: 'Local PF',
        updated: '2020-01-20T15:56:03.517Z'
      }
    ],
    empty: true,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: true,
      sort: {
        empty: true,
        sorted: true,
        unsorted: true
      },
      unpaged: true
    },
    size: 0,
    sort: {
      empty: true,
      sorted: true,
      unsorted: true
    },
    totalElements: 0,
    totalPages: 0
  },
  users: null,
  conditions: getInitPageDto(),
  roles: getInitPageDto(),
  integration: getInitPageDto(),
  integrationLog: getInitPageDto(),
  companyList: getInitPageDto(),
  salesChanel: getInitPageDto(),
  product: getInitPageDto(),
  stopList: getInitPageDto(),
  insuranceCompanies: getInitPageDto(),
  insuranceConditions: getInitPageDto(),
  preApprovedOffer: getInitPageDto(),
  visualAssessments: getInitPageDto(),
  underChecklist: getInitPageDto(),
  brmsRule: getInitPageDto(),
  discount: getInitPageDto(),
  auditLog: getInitPageDto(),
  commission: getInitPageDto(),
  printingFormStageSetting: getInitPageDto(),
  partners: getInitPageDto(),
  attributes: getInitPageDto(),
  attributesSetting: getInitPageDto(),
  accountProduct: getInitPageDto(),
  expenseSetting: getInitPageDto(),
  blacklist: getInitPageDto(),
  levelsPm: [],
  productTemplates: []
};

export function getInitPageDto() {
  return {
    content: [],
    first: true,
    last: true,
    empty: true,
    number: 0,
    numberOfElements: 0,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: true,
      sort: {
        sorted: true,
        unsorted: true
      },
      unpaged: true
    },
    size: 0,
    sort: {
      sorted: true,
      unsorted: true
    },
    totalElements: 0,
    totalPages: 0
  };
}
