import { IAppState } from '../state/app.state';
import { PreapprovedUploadState } from '@app/_models';
import { createSelector } from '@ngrx/store';

const selectPreapproved = (state: IAppState) => state.preapprovedUpload;

export const selectPreapprovedUpload = createSelector(
  selectPreapproved,
  (state: PreapprovedUploadState) => state.preapprovedUpload
);
