import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";
import {PosUsersResourceService} from "@app/api/pos-users-resource.service";
import {Application, PosRkkDataDto, RoleAuthority} from "@app/_models";
import {CredentialsService} from "@app/services/authentication";

@Injectable({
  providedIn: 'root'
})
export class PosProductInfoDataService {


  private applicationData: Application;
  private _posRkkDataDto: PosRkkDataDto;

  constructor(
    private credentialsService: CredentialsService,
    private posUsersResourceService: PosUsersResourceService
  ) { }


  get posProductInfoVisible() {
    return this.credentialsService.checkAccess([
      RoleAuthority.ADMIN,
      RoleAuthority.RM,
      RoleAuthority.RM_BOSS,
      RoleAuthority.HEAD_POS,
      RoleAuthority.REG_MANAGER_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.BO,
    ]);
  }

  get isPos() {
    return this.applicationData && !!this.applicationData.isPos;
  }

  get posRkkDataDto() {
    return this._posRkkDataDto;
  }

  get managers(){
    return this.posRkkDataDto ? this.joinManagers() : null;
  }

  get totalCost() {
    return this.posRkkDataDto ? this.posRkkDataDto.goods.reduce((sum, item) => sum + (item.quantity * item.cost), 0) : 0;
  }

  init(applicationData: Application) {
    this.applicationData = applicationData;
    this.getDataForRkk();
  }

  destroy(){
    this.applicationData = null;
    this._posRkkDataDto = null;
  }

  getDataForRkk(){
    if(this.posProductInfoVisible) {
      this.posUsersResourceService.getDataForRkk(this.applicationData.id).pipe(tap(data => {
        this._posRkkDataDto = data;
      })).subscribe()
    }

  }

  private  joinManagers = () => {
    if(this.posRkkDataDto && this.posRkkDataDto.dirTradingCompanyPoint.managers) {
      return this.posRkkDataDto.dirTradingCompanyPoint.managers.map(e => e.fio).join(', ');
    }

  }


}
