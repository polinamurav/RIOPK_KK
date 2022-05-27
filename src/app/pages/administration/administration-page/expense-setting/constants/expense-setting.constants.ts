import {EInputType, TableDataHeader} from "@app/_models";
import {AdmBaseModalFormField} from "@app/shared/modals/administration-base-modal/constants/administration-base-modal.constants";

export const EXPENSE_SETTING_HEADERS: TableDataHeader[] = [
  new TableDataHeader('dirExpenseType.nameRu', 'Administration.TableHeaders.ExpenseSetting.ExpenseType', 'ru', 'dirExpenseType.nameRu'),
  new TableDataHeader('dirExpenseType.nameGe', 'Administration.TableHeaders.ExpenseSetting.ExpenseType', 'ge', 'dirExpenseType.nameGe'),
  new TableDataHeader('dirExpenseType.nameEn', 'Administration.TableHeaders.ExpenseSetting.ExpenseType', 'en', 'dirExpenseType.nameEn'),
  new TableDataHeader('dirAccountProduct.nameRu', 'Administration.TableHeaders.ExpenseSetting.AccountProduct', 'ru', 'dirAccountProduct.nameRu'),
  new TableDataHeader('dirAccountProduct.nameGe', 'Administration.TableHeaders.ExpenseSetting.AccountProduct', 'ge', 'dirAccountProduct.nameGe'),
  new TableDataHeader('dirAccountProduct.nameEn', 'Administration.TableHeaders.ExpenseSetting.AccountProduct', 'en', 'dirAccountProduct.nameEn'),
  new TableDataHeader('value', 'Administration.TableHeaders.ExpenseSetting.Value', 'string', 'value'),
  new TableDataHeader('appearance', 'Administration.TableHeaders.ExpenseSetting.Appearance', 'string', 'appearance'),
  new TableDataHeader('interval', 'Administration.TableHeaders.ExpenseSetting.Interval', 'string', 'interval'),
  new TableDataHeader('intervalStep', 'Administration.TableHeaders.ExpenseSetting.IntervalStep', 'string', 'intervalStep'),
  new TableDataHeader('oneTimeFeeDate', 'Administration.TableHeaders.ExpenseSetting.OneTimeFeeDate', 'date', 'oneTimeFeeDate'),
  new TableDataHeader('active', 'Administration.TableHeaders.ExpenseSetting.Active', 'status', 'active'),
];

export const EXPENSE_SETTING_FORM: AdmBaseModalFormField[] = [
  {
    code: 'dirExpenseTypeId',
    type: EInputType.CustomSelect,
    placeholder: 'Administration.Placeholders.ExpenseType',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'expenseTypeList',
    customListValueName: 'id'
  },
  {
    code: 'dirAccountProductId',
    type: EInputType.CustomSelect,
    placeholder: 'Administration.Placeholders.AccountProduct',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'accountProductList',
    customListValueName: 'id'
  },
  {
    code: 'value',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.ValueExpense',
    required: true,
    disabled: false,
    readonly: false,
  },
  {
    code: 'appearance',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.Appearance',
    required: true,
    disabled: false,
    readonly: false,
  },
  {
    code: 'interval',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.Interval',
    required: false,
    disabled: false,
    readonly: false,
  },
  {
    code: 'intervalStep',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.IntervalStep',
    required: false,
    disabled: false,
    readonly: false,
  },
  {
    code: 'oneTimeFeeDate',
    type: EInputType.Date,
    placeholder: 'Administration.Placeholders.OneTimeFeeDate',
    required: false,
    disabled: false,
    readonly: false,
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.Activ',
    required: false,
    disabled: false,
    readonly: false,
  }
];
