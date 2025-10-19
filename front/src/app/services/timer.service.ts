import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { finalize, scan, takeWhile, tap } from 'rxjs/operators';

export class TimerService {
  private _timeout = 2 * 60 * 1000;
  private _intervalSmsSubscription: Subscription;
  private _timer$ = new BehaviorSubject<string>('');

  constructor(timeout: number) {
    this._timeout = timeout;
  }

  get timer$() {
    return this._timer$.asObservable();
  }

  runTimer(callBack: () => void) {
    // callBack en timer
    this.stopTimer();
    this._intervalSmsSubscription = timer(1000, 1000)
      .pipe(
        scan(acc => (acc = acc - 1000), this._timeout),
        tap(val => {
          this._timer$.next(sToStr(val / 1000));
        }),
        takeWhile(x => x >= 0),
        finalize(() => {
          callBack();

          console.log('timer finished');
        })
      )
      .subscribe();
  }

  stopTimer() {
    if (this._intervalSmsSubscription) {
      this._intervalSmsSubscription.unsubscribe();
    }
  }
}

function sToStr(ses: number) {
  let m = Math.trunc(ses / 60) + '';
  let s = (ses % 60) + '';
  s = +s === -1 ? '0' : (s as any);
  // @ts-ignore
  return m.padStart(2, 0) + ':' + s.padStart(2, 0);
}
