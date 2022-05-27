import {BaseFormField, EInputType, RoleAuthority} from "@app/_models";

export enum DocumentsGroupKeys {
  Info = 'info'
}

export const DOCUMENTS_INFO: BaseFormField[] = [
  {
    code: 'archivePlace',
    type: EInputType.Text,
    placeholder: 'Documents.Placeholders.ArchivePlace',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-4',
    visibleForRolesList: [RoleAuthority.ARCHIVIST]
  },
  {
    code: 'archivistComment',
    type: EInputType.Text,
    placeholder: 'Documents.Placeholders.Comment',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-6',
    visibleForRolesList: [RoleAuthority.ARCHIVIST]
  }
];
