import { Component } from '@angular/core';
import { SidebarLink } from '@app/_models';

export const QUEUES_LINKS = {
  all: 'all',
  userTasks: 'userTasks',
  archive: 'archive',
  error: 'error',
  declines: 'declines',
  monitoring: 'monitoring'
};
@Component({
  selector: 'ngx-queues-page',
  templateUrl: './queues-page.component.html'
})
export class QueuesPageComponent {
  sidebarLinkList: SidebarLink[] = [
    { name: 'Queues.All', link: QUEUES_LINKS.all },
    { name: 'Queues.InProgress', link: QUEUES_LINKS.userTasks },
    { name: 'Queues.Issued', link: QUEUES_LINKS.archive },
    { name: 'Queues.Errors', link: QUEUES_LINKS.error },
    { name: 'Queues.Declines', link: QUEUES_LINKS.declines },
    { name: 'Queues.Monitoring', link: QUEUES_LINKS.monitoring }
  ];
}
