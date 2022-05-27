import { EInputType, ValueType } from '@app/_models';

import { InspectionGroups } from './groups';

export interface InspectionFormField {
  code: string;
  type: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  readonly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  class?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  optionsListName?: string;
  propertyName?: string;
  selectEmittedValueType?: ValueType;
}

export type InspectionFormConfig = Record<string, InspectionFormField[]>;

export const INSPECTION_FORM: InspectionFormConfig = {
  [InspectionGroups.ClientInfo]: [
    {
      code: 'dirBusinessInspectionResult',
      type: EInputType.Select,
      placeholder: 'Причина отказа',
      required: false,
      disabled: false,
      optionsListName: 'inspectionResult',
      selectEmittedValueType: ValueType.Object,
      class: 'col-4 mr-60'
    },
    {
      code: 'resultComment',
      type: EInputType.Text,
      placeholder: 'Комментарий',
      required: false,
      disabled: false,
      class: 'col-4 mr-60'
    },
    {
      code: 'isLegalEntity',
      type: EInputType.Checkbox,
      placeholder: 'Юридическое лицо',
      required: false,
      disabled: false,
      class: 'col-4 mr-60 mr-b-20 mr-t-20'
    },
    {
      code: 'clientName',
      type: EInputType.Text,
      placeholder: 'Наименование клиента',
      required: true,
      disabled: false,
      class: 'col-8 mr-40'
    },
    {
      code: 'inn',
      type: EInputType.Number,
      placeholder: 'ИНН',
      required: true,
      disabled: false,
      maxLength: 10,
      minLength: 10,
      class: 'col-4'
    },
    {
      code: 'regDate',
      type: EInputType.Date,
      placeholder: 'Дата регистрации',
      maxDate: new Date(),
      required: true,
      disabled: false,
      class: 'col-4  mr-30'
    },
    {
      code: 'innName',
      type: EInputType.Text,
      placeholder: 'ФИО, указанное в ИНН',
      required: true,
      disabled: false,
      class: 'col-8 mr-40'
    },

    {
      code: 'legalAddress',
      type: EInputType.Text,
      placeholder: 'Место нахождения бизнеса',
      required: true,
      disabled: false,
      class: 'col-8 mr-40'
    },
    {
      code: 'factAddress',
      type: EInputType.Text,
      placeholder: 'Фактический адрес проживания клиента',
      required: true,
      disabled: false,
      class: 'col-8 mr-40'
    },
    {
      code: 'clientContact',
      type: EInputType.Text,
      placeholder: 'Контакты клиента',
      required: true,
      disabled: false,
      class: 'col-8 mr-40'
    }
  ],
  [InspectionGroups.ActivityInfo]: [
    {
      code: 'companyActivityType',
      type: EInputType.Select,
      placeholder: 'Сфера деятельности',
      required: true,
      disabled: false,
      optionsListName: 'companyActivityTypes',
      selectEmittedValueType: ValueType.Object,
      class: 'col-8 mr-40'
    },
    {
      code: 'businessTerm',
      type: EInputType.Number,
      placeholder: 'Срок ведения бизнеса, мес',
      required: true,
      disabled: false,
      class: 'col-4 mr-10'
    },
    {
      code: 'isVtbClient',
      type: EInputType.Checkbox,
      placeholder: 'Клиент ВТБ',
      required: false,
      disabled: false,
      class: 'col-4 mr-20 mr-t-10'
    },
    {
      code: 'businessDescription',
      type: EInputType.Text,
      placeholder: 'Описание бизнеса',
      required: true,
      disabled: false,
      class: 'col-8 mr-40'
    },
    {
      code: 'dirCreditPurpose',
      type: EInputType.Select,
      placeholder: 'Цель кредита',
      required: true,
      disabled: false,
      optionsListName: 'creditPurpose',
      selectEmittedValueType: ValueType.Object,
      class: 'col-4 mr-80'
    },
    {
      code: 'isThirdPartyLoan',
      type: EInputType.Checkbox,
      placeholder: 'Кредиты, оформленные на третьих лиц',
      required: false,
      disabled: false,
      class: 'col-4 mr-60 mr-b-20 mr-t-20'
    },
    {
      code: 'thirdPartyInn',
      type: EInputType.Text,
      placeholder: 'ФИН/ИНН',
      required: false,
      disabled: false,
      class: 'col-8 mr-40'
    },
    {
      code: 'addInn',
      type: EInputType.Text,
      placeholder: 'Дополнительные ИНН',
      required: false,
      disabled: false,
      class: 'col-8 mr-40'
    },
    {
      code: 'factBusinessOwner',
      type: EInputType.Text,
      placeholder: 'Фактические собственники бизнеса',
      required: false,
      disabled: false,
      class: 'col-8 mr-40'
    }
  ],
  [InspectionGroups.FinancialInfo]: [
    {
      code: 'earnings',
      type: EInputType.Number,
      placeholder: 'Среднемес. выручка за 6 мес. (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4'
    },
    {
      code: 'netProfit',
      type: EInputType.Number,
      placeholder: 'Ср/мес. чистая прибыль за 6 мес. (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4'
    },
    {
      code: 'grossProfitMargin',
      type: EInputType.Number,
      placeholder: 'Маржа валовой прибыли %',
      required: true,
      disabled: false,
      class: 'col-4'
    },

    {
      code: 'operatingProfitMargin',
      type: EInputType.Number,
      placeholder: 'Ср. Маржа операционной прибыли %',
      required: true,
      disabled: false,
      class: 'col-4'
    },
    {
      code: 'equity',
      type: EInputType.Number,
      placeholder: 'Сумма капитала (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4'
    },
    {
      code: 'accountsReceivable',
      type: EInputType.Number,
      placeholder: 'Дебиторская задолженность (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4'
    },

    {
      code: 'accountsPayable',
      type: EInputType.Number,
      placeholder: 'Кредиторская задолженность (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4'
    },
    {
      code: 'cash',
      type: EInputType.Number,
      placeholder: 'Наличные в кассе (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4 mr-30'
    },

    {
      code: 'nonResidRealEstate',
      type: EInputType.Number,
      placeholder: 'Рын. ст-ть нежилой недвижимости (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4'
    },
    {
      code: 'residRealEstate',
      type: EInputType.Number,
      placeholder: 'Рын. ст-ть жилой недвижимости (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4'
    },
    {
      code: 'transport',
      type: EInputType.Number,
      placeholder: 'Рын. ст-ть автотранспорта (АЗН)',
      required: true,
      disabled: false,
      class: 'col-4'
    }
  ]
};
