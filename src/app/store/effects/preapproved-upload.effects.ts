import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  PreapprovedUploadSetAction,
  PreapprovedUploadSetSuccessAction,
  PreapprovedUploadUploadAction
} from '../actions/preapproved-upload.actions';
import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { PaginationAndSortingDto } from '@app/_models';
import { PreapprovedUploadControllerService } from '@app/api';
import { of } from 'rxjs';

@Injectable()
export class PreapprovedUploadEffects {
  getPreapprovedUpload$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PreapprovedUploadSetAction),
      switchMap(action => {
        return this.preapprovedUploadService.getByPage(action.data);
      }),
      switchMap(data => {
        return of(PreapprovedUploadSetSuccessAction({ data }));
      })
    );
  });

  setPreapprovedUpload$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(PreapprovedUploadUploadAction),
      switchMap(data => {
        sortAndPage = data.data;
        return this.preapprovedUploadService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(PreapprovedUploadSetAction({ data }));
      })
    );
  });

  constructor(private actions$: Actions, private preapprovedUploadService: PreapprovedUploadControllerService) {}
}
