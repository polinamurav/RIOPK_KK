import { Component, Input } from '@angular/core';

import { ISidebarInfoBlockClients } from '@app/_models';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { RouterURLService } from '@app/services/routerURL.service';

@Component({
  selector: 'app-sidebar-clients',
  templateUrl: './sidebar-clients.component.html',
  styleUrls: ['./sidebar-clients.component.scss']
})
export class SidebarClientsComponent {
  @Input() infoBlock: ISidebarInfoBlockClients;
  @Input() isInfoBlockFixed: boolean = false;

  constructor(private routerURLService: RouterURLService) {}

  onBack() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Clients);
  }
}
