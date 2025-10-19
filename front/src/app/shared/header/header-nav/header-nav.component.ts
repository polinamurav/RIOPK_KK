import * as _ from 'lodash';

import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import { Component, HostListener, OnInit } from '@angular/core';

import { CredentialsService } from '@app/services/authentication';
import { RoleAuthority } from '@app/_models';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  public currentRoles: Record<string, boolean>;
  public currentWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.currentWidth = window.innerWidth;
  }

  constructor(private credentialsService: CredentialsService) {}

  get isAdminTabVisible() {
    return this.credentialsService.isAdminTabVisible;
  }

  ngOnInit(): void {
    this.currentWidth = window.innerWidth;
    this.currentRoles = _.cloneDeep(CURRENT_ROLES);
    setRoles(this.currentRoles, this.credentialsService);
    console.log(this.currentRoles);
  }
}
