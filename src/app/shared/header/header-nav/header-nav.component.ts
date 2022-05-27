import * as _ from 'lodash';

import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import { Component, OnInit } from '@angular/core';

import { CredentialsService } from '@app/services/authentication';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['../common-nav.scss']
})
export class HeaderNavComponent implements OnInit {
  public currentRoles: Record<string, boolean>;

  constructor(private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.currentRoles = _.cloneDeep(CURRENT_ROLES);
    setRoles(this.currentRoles, this.credentialsService);
  }
}
