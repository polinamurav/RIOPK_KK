import { animate, state, style, transition, trigger } from '@angular/animations';

export const notificationCmpAnimation = [
  trigger('changeDivSize', [
    state(
      'initial',
      style({
        width: '100%',
        height: '60px',
        opacity: '1'
      })
    ),
    state(
      'final',
      style({
        width: '70%',
        height: '0',
        opacity: '0',
        display: 'none'
      })
    ),
    transition('initial=>final', animate('300ms'))
  ])
];
