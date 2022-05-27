import * as MassSegmentDirectoriesActions from '../actions/mass-segment-directories.actions';
import * as cloneDeep from 'clone-deep';

import { Action, createReducer, on } from '@ngrx/store';

import { MassSegmentDirectoriesState } from '@app/_models/api-models/mass-segment-directories-state';
import { initialMassSegmentDirectories } from '../state/mass-segment-directories.state';

export const massSegmentDirectoriesReducer = createReducer(
  initialMassSegmentDirectories,
  on(MassSegmentDirectoriesActions.MassSegmentDirSetValueActionSuccess, (state, { dirListName, value }) => {
    const copyState = cloneDeep(state);
    copyState[dirListName] = value;
    return copyState;
  })
);

export function reducer(state: MassSegmentDirectoriesState | undefined, action: Action) {
  return massSegmentDirectoriesReducer(state, action);
}
