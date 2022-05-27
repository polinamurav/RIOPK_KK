import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() notificNumber: number;

  eventsSubject: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnInit() {}

  clearAll() {
    this.eventsSubject.next();
  }
}
