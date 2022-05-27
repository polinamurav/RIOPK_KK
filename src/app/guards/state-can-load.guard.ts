import { CanLoad, Route, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STAGES_PATH } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class StageCanLoadGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const currentAppStage: string = JSON.parse(sessionStorage.getItem('applicationStage'));
    const condition: boolean = route.path === STAGES_PATH[currentAppStage];

    if (!condition) {
      this.router.navigateByUrl('mode/lending/dashboard');
      return false;
    }
    return true;
  }
}
