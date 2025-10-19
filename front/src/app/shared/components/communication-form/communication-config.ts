import { BaseFormField, EInputType, OptionListNames } from '@app/_models';

export const COMMUNICATION_FORM: BaseFormField[] = [
  {
    code: 'dirCommunicationMethodId',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.BackContactType', // Метод связи с банком
    required: true,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.CommunicationMethodsBank,
    // propertyName: ELocalNames.NameRu,
    class: 'col-6',
    isVisible: true
  },
  {
    code: 'communication',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.SendAddress', // Адрес отправки оповещений
    required: true,
    readonly: false,
    disabled: false,
    class: 'col-6',
    isVisible: true
  },
  {
    code: 'addressType',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.SendAddress', // Адрес отправки оповещений
    required: true,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.CommunicationAddressType,
    // propertyName: ELocalNames.NameRu,
    class: 'col-6',
    isVisible: false
  },
  {
    code: 'address',
    type: EInputType.Inner,
    placeholder: '',
    required: false,
    readonly: false,
    disabled: false,
    isVisible: false
  }
];
