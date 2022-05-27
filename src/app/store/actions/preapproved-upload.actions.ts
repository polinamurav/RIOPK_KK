import { PageDTO, PaginationAndSortingDto, PreapprovedUpload, UploadOptions } from '@app/_models';
import { createAction, props } from '@ngrx/store';

export enum PreapprovedUploadActions {
  PreapprovedUploadSet = '[PreapprovedUpload page], PreapprovedUpload set',
  PreapprovedUploadSetSuccess = '[PreapprovedUpload page], PreapprovedUpload set success',
  PreapprovedUploadUpload = '[PreapprovedUpload page], PreapprovedUpload upload'
}

// PreapprovedUpload
export const PreapprovedUploadSetAction = createAction(
  PreapprovedUploadActions.PreapprovedUploadSet,
  props<{ data: PaginationAndSortingDto }>()
);
export const PreapprovedUploadUploadAction = createAction(
  PreapprovedUploadActions.PreapprovedUploadUpload,
  props<{ data: PaginationAndSortingDto; uploadFile: UploadOptions }>()
);
export const PreapprovedUploadSetSuccessAction = createAction(
  PreapprovedUploadActions.PreapprovedUploadSetSuccess,
  props<{ data: PageDTO<PreapprovedUpload> }>()
);
