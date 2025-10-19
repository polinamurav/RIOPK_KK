import { Component } from '@angular/core';
import { SidebarLink } from '@app/_models';
import { CredentialsService } from '@app/services/authentication';

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
    { name: 'Queues.Declines', link: QUEUES_LINKS.declines }
    // { name: 'Queues.Monitoring', link: QUEUES_LINKS.monitoring }
  ];

  constructor(private credentialsService: CredentialsService) {
    this.checkRole();
  }

  private checkRole() {
    if (
      ![
        this.credentialsService.isAdmin,
        this.credentialsService.isAdminIT,
        this.credentialsService.isRiskManagerBoss,
        this.credentialsService.isRiskManager,
        this.credentialsService.isBO
      ].some(el => el)
    ) {
      this.sidebarLinkList = this.sidebarLinkList.filter(el => el.link !== QUEUES_LINKS.error);
    }
  }
}
