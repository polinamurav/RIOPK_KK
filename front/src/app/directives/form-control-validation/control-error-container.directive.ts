import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomControlErrorContainer]'
})
export class ControlErrorContainerDirective {
  constructor(public vcr: ViewContainerRef) {}
}
