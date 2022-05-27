import * as _ from 'lodash';

import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import { Component, OnInit } from '@angular/core';
import { OPERATIONS_NAMES, OperationList } from './../constants/operations-list';

import { CredentialsService } from '@app/services/authentication';
import { OPERATIONS_LIST } from '../constants/operations-list';

@Component({
  selector: 'app-app-operation-mode',
  templateUrl: './app-operation-mode.component.html',
  styleUrls: ['./app-operation-mode.component.scss']
})
export class AppOperationModeComponent implements OnInit {
  public operationsList: OperationList[] = OPERATIONS_LIST;

  private currentRoles: Record<string, boolean>;

  constructor(private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.currentRoles = _.cloneDeep(CURRENT_ROLES);

    setRoles(this.currentRoles, this.credentialsService);
    this.changeOperationsVisibilityByRole();
  }

  private changeOperationsVisibilityByRole(): void {
    this.operationsList.forEach((element: OperationList) => {
      element.disabled = true;

      if (element.name === OPERATIONS_NAMES.Lending) {
        element.disabled = false;
      }

      if (element.name === OPERATIONS_NAMES.Clients) {
        element.disabled = !(
          this.currentRoles.isCreditManager ||
          this.currentRoles.isCreditManagerBoss ||
          this.currentRoles.isAdmin ||
          this.currentRoles.isAuditor
        );
      }
    });
  }
}
