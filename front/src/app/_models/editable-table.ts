import { ValueType } from './id-name';
import { RoleAuthority } from '@app/_models/api-models/role';
import { IValidatorError } from '@app/validators/table-inputs-validators';

export class EditableTableHeader {
  code: string;
  targetField?: string;
  value: string;
  type:
    | 'Text'
    | 'Date'
    | 'string'
    | 'number'
    | 'textarea'
    | 'select'
    | 'lazySelect'
    | 'paginationSelect'
    | 'phoneNumber'
    | 'empty-column'
    | 'toggleDisabled'
    | 'toggleDependent'
    | 'toggle';
  isRequired: boolean;
  maxLength?: number;
  pattern?: RegExp;
  size?: 'small' | 'medium' | 'large' | 'auto';
  selectDataName?: string;
  selectSearchCodeName?: string;
  selectPropertyName?: string;
  defaultValueInSelection?: string; // Для выбора дефолтового значения в селекте, прописываем id значения .
  valueType?: ValueType;
  isDisabled?: boolean;
  sortDirections?: 'asc' | 'desc';
  enableIfEdit?: boolean;
  emitOnBlur?: boolean;
  visibleForRolesList?: RoleAuthority[];
  defaultNewValue?: string | boolean;
  isObject?: boolean; // for lazySelect если передается не id, а объект

  setDisableIf?: (selectedRow?: any) => boolean;
  setRequiredField?: (selectedRow?: any) => boolean;
  clearIf?: (selectedRow?: any) => boolean;
  setSortIf?: (col?: EditableTableHeader) => boolean;
  setFilterIf?: (col?: EditableTableHeader) => boolean;
  isBooleanFilter?: boolean;

  isTotal?: boolean;
  emptySelectOption?: boolean;
  availableIdsForOptions?: (selectedRow?: any) => number[];
  availableIdsForOptionsProperty?: string;
  tempOptions?: any[];

  inputValidator?: (val: string) => IValidatorError;
  innerValidation?: InnerValidationFn[];

  clearIfNotValidOnBlur?: boolean;
}

export type InnerValidationFn = (selectedRow: any, headName: string, val: string) => IValidatorError;
