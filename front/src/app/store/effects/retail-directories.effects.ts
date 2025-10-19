import * as RetailDirectoriesActions from '@app/store/actions/retail-directories.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DIR_SERVICE_FUNC_NAMES, DirectoriesService } from '@app/api';
import { concatMap, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { PaginationAndSortingDto } from '@app/_models';
import { RetailDirectoriesModels } from '@app/_models/api-models/retail-directories-state';
import { of } from 'rxjs';

@Injectable()
export class RetailDirectoriesEffects {
  getRetailDirectories$ = createEffect(() => {
    const propArr: string[] = [];

    return this.actions$.pipe(
      ofType(RetailDirectoriesActions.RetailDirSetValueActions),
      concatMap(({ propertyName, productGroupId }) => {
        propArr.push(propertyName);
        return this.directoriesService[DIR_SERVICE_FUNC_NAMES[propertyName]](productGroupId);
      }),

      switchMap((res, index) => {
        const value = res as RetailDirectoriesModels;
        return of(RetailDirectoriesActions.RetailDirSetValueActionSuccess({ dirListName: propArr[index], value }));
      })
    );
  });

  setDirectoriesNextPart$ = createEffect(() => {
    // let sortAndPage: PaginationAndSortingDto;\
    let listName: string;

    return this.actions$.pipe(
      ofType(RetailDirectoriesActions.SetDirectoryNextPartActions),
      switchMap(({ propertyName, sortAndPage }) => {
        listName = propertyName;
        // sortAndPage = data.sortAndPage;
        return this.directoriesService[DIR_SERVICE_FUNC_NAMES[propertyName]](sortAndPage);
        // return this.countryService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(res => {
        const value = res as RetailDirectoriesModels[];
        return of(RetailDirectoriesActions.SetDirectoryNextPartActionSuccess({ dirListName: listName, value }));
      })
    );
  });

  constructor(private actions$: Actions, private directoriesService: DirectoriesService) {}
}
