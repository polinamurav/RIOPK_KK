import * as PreapprovedUploadActions from '@app/store/actions/preapproved-upload.actions';
import * as cloneDeep from '../../../../node_modules/clone-deep';

import { Action, createReducer, on } from '@ngrx/store';

import { PreapprovedUploadState } from '@app/_models';
import { initialPreapprovedUploadState } from '../state/preapproved-upload.state';

export const preapprovedUploadReducer = createReducer(
  initialPreapprovedUploadState,
  on(PreapprovedUploadActions.PreapprovedUploadSetSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.preapprovedUpload = data;
    return copyState;
  })
);

export function reducer(state: PreapprovedUploadState | undefined, action: Action) {
  return preapprovedUploadReducer(state, action);
}
