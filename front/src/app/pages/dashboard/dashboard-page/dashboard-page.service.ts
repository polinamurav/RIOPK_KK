import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DashboardPageService {
  private readonly _updateDashboardTable$ = new Subject();

  constructor() {}

  get updateDashboardTable$(): Observable<any> {
    return this._updateDashboardTable$.asObservable();
  }

  updateDashboardTable = (): void => {
    this._updateDashboardTable$.next();
  };
}
