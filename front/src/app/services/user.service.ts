import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { environment } from '@env/environment';

// TODO update permissions according to roles:
const adminPermissions = ['admin_route'];
const userPermissions = [''];

const rolePermissionsList = {
  admin: adminPermissions,
  user: userPermissions
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private permissionsList: string[] = [];

  constructor(private localStorage: LocalStorageService) {
    const userInfo = localStorage.get(environment.userInfoKey);
    // TODO check the block bellow after getting full user's info from local host:
    if (userInfo && userInfo.authorities && userInfo.authorities.lenght) {
      userInfo.authorities.forEach(v => {
        this.permissionsList.push(...rolePermissionsList[v.authority]);
      });
    }
  }

  checkAccess(accessWord: string): boolean {
    return this.permissionsList.some(el => el === accessWord);
  }
}
