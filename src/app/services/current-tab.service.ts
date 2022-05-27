import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentTabService {
  public tabName: Observable<string>;
  private tabNameSubject: BehaviorSubject<string>;

  constructor() {
    this.tabNameSubject = new BehaviorSubject<string>(null);
    this.tabName = this.tabNameSubject.asObservable();
  }

  get currentTabName(): string {
    return this.tabNameSubject.value;
  }

  setCurrentTabName(tabName: string) {
    this.tabNameSubject.next(tabName);
  }
}
