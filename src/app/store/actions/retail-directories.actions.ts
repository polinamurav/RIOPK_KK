import { createAction, props } from '@ngrx/store';

import { PaginationAndSortingDto } from '@app/_models';
import { ProductGroup } from '@app/constants/product-group';
import { RetailDirectoriesModels } from '@app/_models/api-models/retail-directories-state';

export enum RetailDirectoriesActions {
  SetRetailDirectoryValue = '[Retail Application], RetailDirectories set Value',
  SetRetailDirectoryValueSuccess = '[Retail Application], RetailDirectories set ValueSuccess',

  SetDirectoryNextPart = '[Retail Application], RetailDirectories set directory next part',
  SetDirectoryNextPartSuccess = '[Retail Application], RetailDirectories set directory next part Success'
}

export const RetailDirSetValueActions = createAction(
  RetailDirectoriesActions.SetRetailDirectoryValue,
  props<{ propertyName: string; productGroupId: ProductGroup }>()
);

export const RetailDirSetValueActionSuccess = createAction(
  RetailDirectoriesActions.SetRetailDirectoryValueSuccess,
  props<{ dirListName: string; value: RetailDirectoriesModels }>()
);

export const SetDirectoryNextPartActions = createAction(
  RetailDirectoriesActions.SetDirectoryNextPart,
  props<{ propertyName: string; sortAndPage: PaginationAndSortingDto }>()
);

export const SetDirectoryNextPartActionSuccess = createAction(
  RetailDirectoriesActions.SetDirectoryNextPartSuccess,
  props<{ dirListName: string; value: RetailDirectoriesModels[] }>()
);
