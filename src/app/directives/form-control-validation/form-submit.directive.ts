import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'form'
})
export class FormSubmitDirective {
  submit$ = fromEvent(this.element, 'submit').pipe(
    map(() => {
      if (!this.element.classList.contains('submitted') && !this.element.classList.contains('ng-valid')) {
        this.element.classList.add('submitted');
        return true;
      } else if (this.element.classList.contains('ng-valid')) {
        this.element.classList.remove('submitted');
        return false;
      } else {
        return true;
      }
    }),
    shareReplay(1)
  );

  constructor(private host: ElementRef<HTMLFormElement>) {}

  get element() {
    return this.host.nativeElement;
  }
}
