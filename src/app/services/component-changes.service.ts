import { Injectable, SimpleChanges } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentChangesService<T extends {}> {
  constructor() {}

  public check<TProp extends keyof T>(
    name: TProp,
    changes: SimpleChanges,
    callback: (currentValue: T[TProp], previousValue: T[TProp]) => void
  ) {
    const value = changes[name.toString()];
    if (value && value.currentValue !== value.previousValue) {
      callback(value.currentValue, value.previousValue);
    }
  }
}
