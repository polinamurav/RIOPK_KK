import { createSelector } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { DirHashState } from '@app/_models';

const selectDirHashState = (state: IAppState) => state.dirHashes;

export const selectDirHash = createSelector(
  selectDirHashState,
  (state: DirHashState) => state
);
