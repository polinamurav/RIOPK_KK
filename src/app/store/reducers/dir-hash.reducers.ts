import { createReducer, on, Action } from '@ngrx/store';
import * as DirHashActions from '@app/store/actions/dir-hash.actions';
import { initialDirHashState } from '@app/store/state/dir-hash.state';
import { DirHashState } from '@app/_models';
import * as cloneDeep from '../../../../node_modules/clone-deep';

export const dirHashReducer = createReducer(
  initialDirHashState,
  on(DirHashActions.DirHashSetAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.hashes = data;
    return copyState;
  })
);

export function reducer(state: DirHashState | undefined, action: Action) {
  return dirHashReducer(state, action);
}
