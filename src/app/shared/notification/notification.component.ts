import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { notificationCmpAnimation } from '@app/animations/notification-cmp-animation';
import { Observable } from 'rxjs';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [notificationCmpAnimation]
})
export class NotificationComponent implements OnInit, OnDestroy {
  currentAnimationState = 'initial';

  @Input() statusViewed = false;
  @Input() events: Observable<void>;

  constructor() {}

  ngOnInit() {
    this.events.pipe(untilDestroyed(this)).subscribe(() => this.hideComponent());
  }

  hideComponent() {
    this.currentAnimationState = 'final';
  }

  ngOnDestroy(): void {}
}
