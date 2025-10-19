import { RoleAuthority } from '@app/_models';

export type ButtonType = 'submit' | 'button';

export type ButtonEventType =
  | 'submit'
  | 'print'
  | 'cancel'
  | 'delay'
  | 'decline'
  | 'openComments'
  | 'processHistory'
  | 'openComparison';

export type CommentsButtonEventType = 'loadToSopiok' | 'loadToOwner';

export type ButtonBackgroundColor = 'white' | 'blue' | 'light-blue' | 'gray' | 'transparent';

export type ButtonColor = 'white' | 'blue' | 'gray';

export type ButtonHoverColor = 'blue' | 'gray';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'big';

export interface FooterButtonClick {
  event: MouseEvent | string;
  buttonTypeClicked: ButtonEventType | CommentsButtonEventType;
}

export interface FooterButtonConfig {
  title: string;
  type: ButtonType;
  eventType: ButtonEventType;
  backgroundColor?: ButtonBackgroundColor;
  color?: ButtonColor;
  hover?: ButtonHoverColor;
  size?: ButtonSize;
  border?: boolean;
  visibleForRolesList?: RoleAuthority[];
}

export interface FooterCommentConfig {
  labelForTab?: string;
  eventType: CommentsButtonEventType;
  commentListKey: string;
}

export interface TabFooterState {
  footerButtons: FooterButtonConfig[];
  showCommentsButton: boolean;
  commentsConfig?: FooterCommentConfig[];
}
