import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STAGES_PATH } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class StageCanActivateChildGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentAppStage: string = JSON.parse(sessionStorage.getItem('applicationStage'));
    const piceOfPathArr: string[] = state.url.split('/');

    if (state.url.includes('stages') && state.url.includes('view')) {
      return true;
    }

    if (state.url.includes('stages') && !currentAppStage) {
      this.router.navigateByUrl('mode/lending/dashboard');
      return false;
    }

    if (state.url.includes('stages') && currentAppStage) {
      return this.compareStageAndPath(piceOfPathArr, currentAppStage);
    }
  }

  compareStageAndPath(piceOfPath: string[], currentAppStage: string): boolean {
    let isMatch = false;

    piceOfPath.forEach((name: string) => {
      if (name === STAGES_PATH[currentAppStage]) {
        isMatch = true;
      }
    });
    return isMatch;
  }
}
