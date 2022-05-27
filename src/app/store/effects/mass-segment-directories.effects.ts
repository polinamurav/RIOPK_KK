import * as MassSegmentDirectoriesActions from '@app/store/actions/mass-segment-directories.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DIR_SERVICE_FUNC_NAMES_MASS_SEGMENT, DirectoriesService } from '@app/api';
import { concatMap, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MassSegmentDirectoriesModels } from '@app/_models/api-models/mass-segment-directories-state';
import { of } from 'rxjs';

@Injectable()
export class MassSegmentDirectoriesEffects {
  getRetailDirectories$ = createEffect(() => {
    const propArr: string[] = [];

    return this.actions$.pipe(
      ofType(MassSegmentDirectoriesActions.MassSegmentDirSetValueActions),

      concatMap(({ propertyName, productGroupId }) => {
        propArr.push(propertyName);

        return this.directoriesService[DIR_SERVICE_FUNC_NAMES_MASS_SEGMENT[propertyName]](productGroupId);
      }),

      switchMap((res, index) => {
        const value = res as MassSegmentDirectoriesModels;
        return of(
          MassSegmentDirectoriesActions.MassSegmentDirSetValueActionSuccess({ dirListName: propArr[index], value })
        );
      })
    );
  });

  constructor(private actions$: Actions, private directoriesService: DirectoriesService) {}
}
