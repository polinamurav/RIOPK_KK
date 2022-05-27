import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { CredentialsService } from '@app/services/authentication';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsPageGuard implements CanActivate {
  constructor(private credentialsService: CredentialsService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (
      this.credentialsService.isCreditManager ||
      this.credentialsService.isCreditManagerBoss ||
      this.credentialsService.isAdmin ||
      this.credentialsService.isAuditor
    );
  }
}
