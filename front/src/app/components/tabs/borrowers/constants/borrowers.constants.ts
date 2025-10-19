import { EditableTableHeader, EInputType, OptionListNames, TableDataHeader, ValueType } from '@app/_models';
import { PatternsEnum } from '@app/constants/validators-errors';

// * Управление
export const MANAGMENT_INFO_PROPS: EditableTableHeader[] = [
  {
    code: 'dirIncomeTypeId',
    value: 'Borrowers.TableHeaders.IncomeType', // Вид дохода
    type: 'lazySelect',
    isRequired: false,
    isDisabled: true,
    selectDataName: OptionListNames.IncomeType,
    valueType: ValueType.Id,
    size: 'medium'
  },
  {
    code: 'income',
    value: 'Borrowers.TableHeaders.Income', // Доход
    type: 'string',
    isRequired: false,
    isDisabled: true
  },

  {
    code: 'isOPZ',
    value: 'Borrowers.TableHeaders.OPZ', // ОПЗ да/нет
    type: 'toggle',
    isRequired: false
  },
  {
    code: 'opzIncome',
    value: 'Borrowers.TableHeaders.OPZIncome', // Доход ОПЗ
    type: 'string',
    isRequired: false,
    isDisabled: false,
    setDisableIf: (selectedRow: any) => {
      return selectedRow['isOPZ'];
    },
    clearIf: (selectedRow: any) => {
      return selectedRow['isOPZ'];
    },
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/
  }
  // {
  //   code: 'comment',
  //   value: 'Borrowers.TableHeaders.Comment', // Комментарий
  //   type: 'string',
  //   isRequired: false,
  //   isDisabled: false,
  //   size: 'large'
  // }
];

// * Стаж на последнем месте работы
export const LAST_WORK_EXPIRENCE_INFO_PROPS: EditableTableHeader[] = [
  {
    code: 'inn',
    value: 'Borrowers.TableHeaders.Inn', // ИНН
    type: 'string',
    isRequired: false,
    enableIfEdit: false,
    size: 'medium'
  },
  {
    code: 'name',
    value: 'FullForm.TableHeaders.CompanyName', // ИНН
    type: 'string',
    isRequired: false,
    enableIfEdit: false,
    size: 'medium'
  },
  {
    code: 'continuousLos',
    value: 'Borrowers.TableHeaders.Expirence', // Стаж
    type: 'string',
    isRequired: false,
    isDisabled: true,
    enableIfEdit: false
  },
  {
    code: 'isOPZ',
    value: 'Borrowers.TableHeaders.OPZ', // ОПЗ да/нет
    type: 'toggle',
    isRequired: true
  },
  {
    code: 'continuousLosOPZ',
    value: 'Borrowers.TableHeaders.OPZExpirence', // Стаж ОПЗ
    type: 'string',
    isRequired: false,
    isDisabled: false,
    maxLength: 10,
    setDisableIf: (selectedRow: any) => {
      return selectedRow['isOPZ'];
    },
    clearIf: (selectedRow: any) => {
      return selectedRow['isOPZ'];
    },
    pattern: /^([0-9]+|)$/
  }
  // {
  //   code: 'comment',
  //   value: 'Borrowers.TableHeaders.Comment', // Комментарий
  //   type: 'string',
  //   isRequired: false,
  //   isDisabled: false,
  //   size: 'large'
  // }
];

// * Должность
export const JOB_POSITION_INFO_PROPS: EditableTableHeader[] = [
  {
    code: 'inn',
    value: 'Borrowers.TableHeaders.Inn', // Инн
    type: 'string',
    isRequired: false,
    isDisabled: true
  },
  {
    code: 'name',
    value: 'FullForm.TableHeaders.CompanyName', // Инн
    type: 'string',
    isRequired: false,
    isDisabled: true
  },
  {
    code: 'jobPositionId',
    value: 'Borrowers.TableHeaders.JobPosition', // Должность
    type: 'lazySelect',
    selectDataName: OptionListNames.JobPositionType,
    isRequired: false,
    isDisabled: false
  },
  {
    code: 'isBoss',
    value: 'Borrowers.TableHeaders.Constitute', // Является руководителем
    type: 'toggle',
    isRequired: false,
    isDisabled: true
  },
  {
    code: 'isOPZ',
    value: 'Borrowers.TableHeaders.OPZ', // ОПЗ да/нет
    type: 'toggle',
    isRequired: false
  },
  {
    code: 'isBossOPZ', // TODO change
    value: 'Borrowers.TableHeaders.IsHeadOfOPZ', // Является руководителем ОПЗ
    type: 'toggle',
    isRequired: false,
    setDisableIf: (selectedRow: any) => {
      return selectedRow['isOPZ'];
    }
  }
  // {
  //   code: 'comment',
  //   value: 'Borrowers.TableHeaders.Comment', // Комментарий
  //   type: 'string',
  //   isRequired: false,
  //   isDisabled: false,
  //   size: 'medium'
  // }
];

// * Заявки клиента
export const CUSTOMER_REQUESTS_INFO_PROPS: TableDataHeader[] = [
  new TableDataHeader(
    'applicationId',
    'Borrowers.TableHeaders.ApplicationCode', // Номер заявки
    'string',
    'applicationId'
  ),
  new TableDataHeader(
    'matchingKey',
    'Borrowers.TableHeaders.MatchKey', // Ключ совпадения
    'string',
    'matchingKey'
  ),
  new TableDataHeader(
    'branchCode',
    'Borrowers.TableHeaders.BranchCode', // Код филиала
    'string',
    'branchCode'
  ),
  new TableDataHeader(
    'participantRole.nameRu',
    'Borrowers.TableHeaders.PersonRole', // Роль участника
    'ru',
    'participantRole.nameRu'
  ),
  new TableDataHeader(
    'participantRole.nameAm',
    'Borrowers.TableHeaders.PersonRole', // Роль участника
    'am',
    'participantRole.nameAm'
  ),
  new TableDataHeader(
    'identityCardType.nameRu',
    'Borrowers.TableHeaders.DocumentType', // Тип документа
    'ru',
    'identityCardType.nameRu'
  ),
  new TableDataHeader(
    'identityCardType.nameAm',
    'Borrowers.TableHeaders.DocumentType', // Тип документа
    'am',
    'identityCardType.nameAm'
  ),
  new TableDataHeader(
    'identityCardNumber',
    'Borrowers.TableHeaders.DocumentNumber', // Номер документа
    'string',
    'identityCardNumber'
  ),
  new TableDataHeader(
    'socCardNumber',
    'Borrowers.TableHeaders.SocialCardNumber', // Номер социальной карты
    'string',
    'socCardNumber'
  ),
  new TableDataHeader(
    'fullNameOfApplicant',
    'Borrowers.TableHeaders.Fio', // ФИО
    'string',
    'fullNameOfApplicant'
  ),
  new TableDataHeader(
    'requestedAmount',
    'Borrowers.TableHeaders.RequestedAmount', // Запрошенная сумма
    'string',
    'requestedAmount'
  ),
  new TableDataHeader(
    'approvedAmount',
    'Borrowers.TableHeaders.ApprovedAmount', // Утвержденная сумма
    'string',
    'approvedAmount'
  ),
  new TableDataHeader(
    'dirCurrencyId',
    'Borrowers.TableHeaders.Currency', // Валюта
    'string',
    'dirCurrencyId'
  ),
  new TableDataHeader(
    'applicationTypeLoanView.nameRu',
    'Borrowers.TableHeaders.CreditSubtype', // Подтип кредита
    'ru',
    'applicationTypeLoanView.nameRu'
  ),
  new TableDataHeader(
    'applicationTypeLoanView.nameAm',
    'Borrowers.TableHeaders.CreditSubtype', // Подтип кредита
    'am',
    'applicationTypeLoanView.nameAm'
  ),
  new TableDataHeader(
    'applicationTypeLoanViewTest',
    'Borrowers.TableHeaders.Precondition', // Предпосылки
    'string',
    'applicationTypeLoanViewTest'
  ),
  new TableDataHeader(
    'applicationStatusForView.nameRu',
    'Borrowers.TableHeaders.CreditStatus', // Статус заявки
    'ru',
    'applicationStatusForView.nameRu'
  ),
  new TableDataHeader(
    'applicationStatusForView.nameAm',
    'Borrowers.TableHeaders.CreditStatus', // Статус заявки
    'am',
    'applicationStatusForView.nameAm'
  ),
  new TableDataHeader(
    'applicationDate',
    'Borrowers.TableHeaders.AppDate', // Дата заявки
    'date',
    'applicationDate'
  ),
  new TableDataHeader(
    'opzDate',
    'Borrowers.TableHeaders.OPZDate', // Дата ОПЗ
    'date',
    'opzDate'
  ),
  new TableDataHeader(
    'opzEmployee',
    'Borrowers.TableHeaders.OPZEmployee', // Сотрудник ОПЗ
    'string',
    'opzEmployee'
  ),
  new TableDataHeader(
    'commentForRM',
    'Borrowers.TableHeaders.CommentsForPM', // Комментарии для PM
    'string',
    'commentForRM'
  ),
  new TableDataHeader(
    'commentForOPZ',
    'Borrowers.TableHeaders.CommentsForOPZ', // Комментарии для ОПЗ
    'string',
    'commentForOPZ'
  ),
  new TableDataHeader(
    'declineReasonOPZ',
    'Borrowers.TableHeaders.ReasonForOPZFailure', // Причина отказа ОПЗ
    'string',
    'declineReasonOPZ'
  )
];

// * Заявки работодателя
export const EMPLOEYR_APPLICATIONS_INFO_PROPS: TableDataHeader[] = [
  new TableDataHeader(
    'applicationId',
    'Borrowers.TableHeaders.ApplicationCode', // Номер заявки
    'string',
    'applicationId'
  ),
  new TableDataHeader(
    'matchKey',
    'Borrowers.TableHeaders.MatchKey', // Ключ совпадения
    'string',
    'matchKey'
  ),
  new TableDataHeader(
    'innerInformationProductSubTypeDto.nameAm',
    'Borrowers.TableHeaders.CreditSubtype', // Подтип кредита
    'am',
    'innerInformationProductSubTypeDto.nameAm'
  ),
  new TableDataHeader(
    'innerInformationProductSubTypeDto.nameRu',
    'Borrowers.TableHeaders.CreditSubtype', // Подтип кредита
    'ru',
    'innerInformationProductSubTypeDto.nameRu'
  ),
  new TableDataHeader(
    'innerInformationApplicationStatusDto.nameRu',
    'Borrowers.TableHeaders.CreditStatus', // Статус заявки
    'ru',
    'innerInformationApplicationStatusDto.nameRu'
  ),
  new TableDataHeader(
    'innerInformationApplicationStatusDto.nameAm',
    'Borrowers.TableHeaders.CreditStatus', // Статус заявки
    'am',
    'innerInformationApplicationStatusDto.nameAm'
  ),
  new TableDataHeader(
    'dirBranch.code',
    'Borrowers.TableHeaders.BranchCode', // Код филиала
    'string',
    'dirBranch.code'
  ),
  new TableDataHeader(
    'applicantRolesDto.nameRu',
    'Borrowers.TableHeaders.ClientRole', // Роль клиента
    'ru',
    'applicantRolesDto.nameRu'
  ),
  new TableDataHeader(
    'applicantRolesDto.nameAm',
    'Borrowers.TableHeaders.ClientRole', // Роль клиента
    'am',
    'applicantRolesDto.nameAm'
  ),
  new TableDataHeader(
    'inn',
    'Borrowers.TableHeaders.Inn', // ИНН
    'string',
    'inn'
  )
];

// * Чёрный список
export const BLACK_LIST_INFO_PROPS: TableDataHeader[] = [
  new TableDataHeader(
    'persKind.nameRu',
    'Borrowers.TableHeaders.ClientType', // Тип клиента
    'ru',
    'persKind.nameRu'
  ),
  new TableDataHeader(
    'persKind.nameAm',
    'Borrowers.TableHeaders.ClientType', // Тип клиента
    'am',
    'persKind.nameAm'
  ),
  new TableDataHeader(
    'bllistKind.nameRu',
    'Borrowers.TableHeaders.BlacklistType', // Тип чёрного списка
    'ru',
    'bllistKind.nameRu'
  ),
  new TableDataHeader(
    'bllistKind.nameAm',
    'Borrowers.TableHeaders.BlacklistType', // Тип чёрного списка
    'am',
    'bllistKind.nameAm'
  ),
  new TableDataHeader(
    'findCriteria',
    'Borrowers.TableHeaders.MatchKey', // Ключ совпадения
    'string',
    'findCriteria'
  ),
  new TableDataHeader(
    'idCard',
    'Borrowers.TableHeaders.IDNumber', // Номер ID
    'string',
    'idCard'
  ),
  new TableDataHeader(
    'documentNumber',
    'Borrowers.TableHeaders.DocumentNumber', // Номер документа
    'string',
    'documentNumber'
  ),
  new TableDataHeader(
    'documentType.nameRu',
    'Borrowers.TableHeaders.DocumentType', // Тип документа
    'ru',
    'documentType.nameRu'
  ),
  new TableDataHeader(
    'documentType.nameAm',
    'Borrowers.TableHeaders.DocumentType', // Тип документа
    'am',
    'documentType.nameAm'
  ),
  new TableDataHeader(
    'documentCountry.nameRu',
    'Borrowers.TableHeaders.Country', // Страна
    'ru',
    'documentCountry.nameRu'
  ),
  new TableDataHeader(
    'documentCountry.nameAm',
    'Borrowers.TableHeaders.Country', // Страна
    'am',
    'documentCountry.nameAm'
  ),
  new TableDataHeader(
    'fullNameArm',
    'Borrowers.TableHeaders.Name', // Наименование
    'string',
    'fullNameArm'
  ),
  new TableDataHeader(
    'openDate',
    'Borrowers.TableHeaders.OpeningDate', // Дата открытия
    'string',
    'openDate'
  ),
  new TableDataHeader(
    'address',
    'Borrowers.TableHeaders.Address', // Адрес
    'string',
    'address'
  ),
  new TableDataHeader(
    'judgeDecision',
    'Borrowers.TableHeaders.CourtDecision', // Решение суда
    'string',
    'judgeDecision'
  ),
  new TableDataHeader(
    'judgeDate',
    'Borrowers.TableHeaders.DecisionDate', // Дата решения
    'string',
    'judgeDate'
  )
];
