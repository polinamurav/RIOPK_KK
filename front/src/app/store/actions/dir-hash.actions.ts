import { DirHash } from '@app/_models';
import { createAction, props } from '@ngrx/store';

export enum DirHashActions {
  DirHashSet = '[DirHash], DirHash set',
  DirHashSetSuccess = '[DirHash], DirHash set success'
}

export const DirHashSetAction = createAction(DirHashActions.DirHashSet, props<{ data: DirHash[] }>());
export const DirHashSetSuccessAction = createAction(DirHashActions.DirHashSetSuccess, props<{ data: DirHash[] }>());
