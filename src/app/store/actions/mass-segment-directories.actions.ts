import { createAction, props } from '@ngrx/store';

import { MassSegmentDirectoriesModels } from '@app/_models/api-models/mass-segment-directories-state';
import { ProductGroup } from './../../constants/product-group';

export enum MassSegmentDirectoriesActions {
  SetMassSegmentDirectoryValue = '[MassSegment Application], MassSegmentDirectories set Value',
  SetMassSegmentDirectoryValueSuccess = '[MassSegment Application], MassSegmentDirectories set ValueSuccess'
}

export const MassSegmentDirSetValueActions = createAction(
  MassSegmentDirectoriesActions.SetMassSegmentDirectoryValue,
  props<{ propertyName: string; productGroupId: ProductGroup }>()
);

export const MassSegmentDirSetValueActionSuccess = createAction(
  MassSegmentDirectoriesActions.SetMassSegmentDirectoryValueSuccess,
  props<{ dirListName: string; value: MassSegmentDirectoriesModels }>()
);
