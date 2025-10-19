import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mat-app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  // className - кастомный класс, реализовывать в родительском компоненте, пример: ':host ::ng-deep mat-app-button .test{}'
  @Input() className: string = '';
  @Input() radius: 'semiRound' | 'default' | 'round' = 'default';
  @Input() backgroundColor: 'white' | 'blue' | 'light-blue' | 'gray' | 'transparent' = 'gray';
  @Input() size: 'xsmall' | 'small' | 'medium' | 'big' = 'medium';
  @Input() color: 'white' | 'blue' | 'gray' = 'blue';
  @Input() hover: 'blue' | 'gray' | null = 'blue';
  @Input() border: boolean = false;
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;

  @Output() clickEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() {}

  click(event: MouseEvent) {
    this.clickEvent.emit(event);
  }
}
