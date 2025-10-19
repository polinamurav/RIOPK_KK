import { ApplicationPagedInfoDto } from '@app/_models';
import { Injectable } from '@angular/core';
import { ProductGroup } from './../constants/product-group';

type CurrentAppData = 'applicationStage' | 'applicationProductId';
@Injectable({
  providedIn: 'root'
})
export class CurrentAppService {
  private applicationStage: string = null;
  private applicationProductId: ProductGroup = null;

  constructor() {
    this.applicationStage = JSON.parse(sessionStorage.getItem('applicationStage'));
    this.applicationProductId = JSON.parse(sessionStorage.getItem('applicationProductId'));
  }

  get currentAppStageId(): string {
    return this.applicationStage || null;
  }

  get currentAppProductId(): ProductGroup {
    return this.applicationProductId || null;
  }

  public resetValue(propertyName: CurrentAppData) {
    this[propertyName] = null;
    sessionStorage.removeItem(propertyName);
  }

  public setAppStageId(app: ApplicationPagedInfoDto) {
    this.applicationStage = app.stageId;
    sessionStorage.setItem('applicationStage', JSON.stringify(app.stageId || null));
  }

  public setAppProductId(app: ApplicationPagedInfoDto) {
    this.applicationProductId = app.productGroupId;
    sessionStorage.setItem('applicationProductId', JSON.stringify(app.productGroupId || null));
  }
}
