import { Directive } from '@angular/core';

/**
 * Directive for providing a custom clear-icon.
 * e.g.
 * <ngx-mat-select-search [formControl]="bankFilterCtrl">
 *   <mat-icon ngxMatSelectSearchClear>delete</mat-icon>
 * </ngx-mat-select-search>
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngxMatSelectSearchClear]'
})
export class MatSelectSearchClearDirective {}
