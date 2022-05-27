import { animate, state, style, transition, trigger } from '@angular/animations';

export const barChartAnimation = [
  trigger('changeDivSize', [
    state(
      'initial',
      style({
        width: '20px',
        height: '0',
        opacity: '0'
      })
    ),
    state(
      'final',
      style({
        width: '100%',
        height: '100%',
        opacity: '1'
      })
    ),
    transition('initial=>final', animate('300ms')),
    transition('final=>initial', animate('300ms'))
  ])
];

export const barChartTopLabelAnimation = [
  trigger('changeTopLabelPosition', [
    state(
      'initial',
      style({
        top: 'calc(100% - 40px)',
        opacity: '0'
      })
    ),
    state(
      'final',
      style({
        top: '-23px',
        opacity: '1'
      })
    ),
    transition('initial=>final', animate('300ms')),
    transition('final=>initial', animate('300ms'))
  ])
];

export const barChartBottomLabelAnimation = [
  trigger('changeBottomLabelOpacity', [
    state(
      'initial',
      style({
        opacity: '0'
      })
    ),
    state(
      'final',
      style({
        opacity: '1'
      })
    ),
    transition('initial=>final', animate('300ms')),
    transition('final=>initial', animate('300ms'))
  ])
];
