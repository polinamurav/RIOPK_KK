import { IAppState } from '../state/app.state';
import { RetailDirectoriesState } from '@app/_models/api-models/retail-directories-state';
import { createSelector } from '@ngrx/store';

const selectRetailDirectories = (state: IAppState) => state.retailDirectories;

export function selectRetailDirectory(propertyName: string) {
  return createSelector(
    selectRetailDirectories,
    (state: RetailDirectoriesState) => state[propertyName]
  );
}
