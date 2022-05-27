import * as RetailDirectoriesActions from '../actions/retail-directories.actions';
import * as cloneDeep from '../../../../node_modules/clone-deep';

import { Action, createReducer, on } from '@ngrx/store';

import { RetailDirectoriesState } from '@app/_models/api-models/retail-directories-state';
import { initialRetailDirectories } from '../state/retail-directories.state';

export const retailDirectoriesReducer = createReducer(
  initialRetailDirectories,
  on(RetailDirectoriesActions.RetailDirSetValueActionSuccess, (state, { dirListName, value }) => {
    const copyState = cloneDeep(state);
    copyState[dirListName] = value;
    return copyState;
  }),
  on(RetailDirectoriesActions.SetDirectoryNextPartActionSuccess, (state, { dirListName, value }) => {
    const copyState = cloneDeep(state);
    copyState[dirListName] = [...copyState[dirListName], ...value];
    return copyState;
  })
);

export function reducer(state: RetailDirectoriesState | undefined, action: Action) {
  return retailDirectoriesReducer(state, action);
}
