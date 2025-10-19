import { IFilterField } from '@app/_models';

export const DASHBOARD_FILTER: IFilterField[] = [
  {
    label: 'SearchBar.Filter.Status',
    fcName: 'statusId',
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
  // {
  //   label: 'SearchBar.Filter.DateCreation',
  //   fcName: 'createdDate',
  //   val: '',
  //   type: 'singleDate'
  // },
  {
    label: 'Дата с',
    fcName: 'dateFrom',
    val: '',
    type: 'singleDate'
  },
  {
    label: 'Дата по',
    fcName: 'dateTo',
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
    label: 'SearchBar.Filter.Verifier',
    fcName: 'verifierId',
    val: '',
    type: 'string',
    propertyName: 'fio'
  },
  {
    label: 'SearchBar.Filter.DecisionMaker',
    fcName: 'rmId',
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
  },
  {
    label: 'ApplicationAside.Branch',
    fcName: 'branchCode',
    val: '',
    type: 'string',
    propertyName: 'nameAm'
  }
];
