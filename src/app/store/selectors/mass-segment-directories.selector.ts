import { IAppState } from '../state/app.state';
import { MassSegmentDirectoriesState } from '@app/_models/api-models/mass-segment-directories-state';
import { createSelector } from '@ngrx/store';

const selectMassSegmentDirectories = (state: IAppState) => state.massSegmentDirectories;

export function selectMassSegmentDirectory(propertyName: string) {
  return createSelector(
    selectMassSegmentDirectories,
    (state: MassSegmentDirectoriesState) => state[propertyName]
  );
}
