import { EInputType, TableDataHeader } from '@app/_models';

// tslint:disable-next-line: max-line-length
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const PRINTING_FORM_SETTING_HEADERS: TableDataHeader[] = [
  new TableDataHeader('stage.nameRu', 'Administration.TableHeaders.Stage', 'ru', 'stage.nameRu'),
  new TableDataHeader('stage.nameAm', 'Administration.TableHeaders.Stage', 'am', 'stage.nameAm'),
  new TableDataHeader('product.nameRu', 'Administration.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'Administration.TableHeaders.Product', 'am', 'product.nameAm'),
  new TableDataHeader('printingForm.nameRu', 'Administration.TableHeaders.PrintingForm', 'ru', 'printingForm.nameRu'),
  new TableDataHeader('printingForm.nameAm', 'Administration.TableHeaders.PrintingForm', 'am', 'printingForm.nameAm'),
  new TableDataHeader('active', 'Administration.TableHeaders.ActiveRecord', 'status', 'active')
  // new TableDataHeader('productGroupId', 'Administration.TableHeaders.ProductGroup', 'string', 'productGroupId')
];

export const PRINTING_FORM_SETTING_FORM: AdmBaseModalFormField[] = [
  {
    code: 'stageId',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.Stage',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'stage',
    class: 'col-12'
  },
  {
    code: 'productId',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.Product',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'productCategory',
    class: 'col-12'
  },
  {
    code: 'printingFormId',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.PrintingForm',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'printingForm',
    class: 'col-12'
  },
  // {
  //   code: 'productGroupId',
  //   type: EInputType.Select,
  //   placeholder: 'Administration.TableHeaders.ProductGroup',
  //   required: true,
  //   disabled: false,
  //   readonly: false,
  //   optionsListName: 'productGroup',
  //   class: 'col-12'
  // },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.TableHeaders.Active',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-12'
  }
];
