import { ValueType } from './id-name';
import { RoleAuthority } from '@app/_models/api-models/role';

export class EditableTableHeader {
  code: string;
  targetField?: string;
  value: string;
  type:
    | 'Text'
    | 'Date'
    | 'string'
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
  size?: 'small' | 'medium' | 'large';
  selectDataName?: string;
  selectSearchCodeName?: string;
  selectPropertyName?: string;
  valueType?: ValueType;
  isDisabled?: boolean;
  visibleForRolesList?: RoleAuthority[];
  defaultNewValue?: string | boolean;
  isObject?: boolean; // for lazySelect если передается не id, а объект
}
