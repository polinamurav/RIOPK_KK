import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateTabsStateService {
  tabs: Record<string, boolean> = {
    aml: true
  };

  public currentTabs: Observable<Record<string, boolean>>;
  private tabsSubject: BehaviorSubject<Record<string, boolean>>;

  constructor() {
    this.tabsSubject = new BehaviorSubject<Record<string, boolean>>(this.tabs);
    this.currentTabs = this.tabsSubject.asObservable();
  }

  get currentTabsValue(): Record<string, boolean> {
    return this.tabsSubject.value;
  }

  changeTabState(tabName: string, validState: boolean) {
    this.tabs[tabName] = validState;

    this.tabsSubject.next(this.tabs);
  }
}
