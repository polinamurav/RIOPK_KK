import { IFilterField } from '@app/_models';

export const DASHBOARD_FILTER: IFilterField[] = [
  {
    label: 'SearchBar.Filter.Status',
    fcName: 'status',
    val: '',
    type: 'string'
  },
  {
    label: 'SearchBar.Filter.Stage',
    fcName: 'stageId',
    val: '',
    type: 'string'
  },
  {
    label: 'SearchBar.Filter.Product',
    fcName: 'productId',
    val: '',
    type: 'string'
  },
  {
    label: 'SearchBar.Filter.DateCreation',
    fcName: 'createdDate',
    val: '',
    type: 'singleDate'
  },
  {
    label: 'SearchBar.Filter.Manager',
    fcName: 'creditManagerId',
    val: '',
    type: 'string',
    propertyName: 'fio'
  },
  {
    label: 'SearchBar.Filter.VideoBank',
    fcName: 'videoBankId',
    val: '',
    type: 'string',
    propertyName: 'fio'
  },
  {
    label: 'SearchBar.Filter.CallCenter',
    fcName: 'callCenterId',
    val: '',
    type: 'string',
    propertyName: 'fio'
  },
  {
    label: 'SearchBar.Filter.Verifier',
    fcName: 'verifierId',
    val: '',
    type: 'string',
    propertyName: 'fio'
  },
  {
    label: 'SearchBar.Filter.DecisionMaker',
    fcName: 'decisionMakerId',
    val: '',
    type: 'string',
    propertyName: 'fio'
  },
  {
    label: 'SearchBar.Filter.DSA',
    fcName: 'dsaId',
    val: '',
    type: 'string',
    propertyName: 'fio'
  },
  {
    label: 'SearchBar.Filter.Accepter',
    fcName: 'accepterId',
    val: '',
    type: 'string',
    propertyName: 'fio'
  }
];
