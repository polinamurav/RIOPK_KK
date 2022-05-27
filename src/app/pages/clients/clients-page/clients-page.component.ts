import { Component } from '@angular/core';
import { SidebarLink } from '@app/_models';

export const CLIENTS_LINKS = {
  all: 'all',
  inProgress: 'inProgress',
  error: 'error',
  completed: 'completed'
};

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html'
})
export class ClientsPageComponent {
  clientsSidebarLinkList: SidebarLink[] = [
    { name: 'Все', link: CLIENTS_LINKS.all },
    { name: 'В работе', link: CLIENTS_LINKS.inProgress },
    { name: 'Завершено', link: CLIENTS_LINKS.completed },
    { name: 'Ошибки', link: CLIENTS_LINKS.error }
  ];
}
