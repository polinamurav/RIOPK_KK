import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "@app/services/web-socket.service";
import {CredentialsService} from "@app/services/authentication";

@Component({
  selector: 'ngx-dashboard',
  template: `
    <router-outlet></router-outlet>
  `
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    this.connectToWebSocket();
  }

  private connectToWebSocket = () => {
    if (this.credentialsService.isAuthenticated) {
      this.webSocketService.connect();
    }
    // else {
    //   this.credentialsService.isAuthenticatedEvent.subscribe(() => {
    //     this.webSocketService.connect();
    //   });
    // }
  }
}
