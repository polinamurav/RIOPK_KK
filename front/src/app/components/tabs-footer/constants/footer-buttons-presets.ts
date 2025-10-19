import { FooterButtonConfig } from '@app/components/tabs-footer/constants/footer-buttons.model';

export const FOOTER_BUTTON_PRESETS: { [key: string]: FooterButtonConfig } = {
  moveForward: {
    title: 'Buttons.Next',
    type: 'submit',
    eventType: 'submit',
    backgroundColor: 'blue',
    color: 'white'
  },
  print: {
    title: 'Buttons.Print',
    type: 'button',
    eventType: 'print',
    backgroundColor: 'white',
    color: 'gray',
    hover: 'gray',
    size: 'medium',
    border: true
  },
  delay: {
    title: 'Buttons.SetAside',
    type: 'button',
    eventType: 'delay',
    backgroundColor: 'white',
    color: 'gray',
    hover: 'gray',
    border: true
  },
  decline: {
    title: 'Buttons.Reject',
    type: 'button',
    eventType: 'decline',
    backgroundColor: 'white',
    color: 'gray',
    hover: 'gray',
    border: true
  },
  cancel: {
    title: 'Buttons.Cancel',
    type: 'button',
    eventType: 'cancel',
    backgroundColor: 'blue',
    color: 'white',
    hover: 'gray',
    border: true
  },
  processHistory: {
    title: 'Buttons.HistoryProcess',
    type: 'button',
    eventType: 'processHistory',
    backgroundColor: 'white',
    color: 'gray',
    hover: 'gray',
    size: 'medium',
    border: true
  },
  comparisonPanel: {
    title: 'Панель сравнения',
    type: 'button',
    eventType: 'openComparison',
    backgroundColor: 'white',
    color: 'gray',
    hover: 'gray',
    size: 'medium',
    border: true
  },
  save: {
    title: 'Buttons.Save',
    type: 'submit',
    eventType: 'submit',
    backgroundColor: 'blue',
    color: 'white',
    size: 'medium',
    border: true
  }
};
