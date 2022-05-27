import { AttachmentType } from '@app/_models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductGroup } from '@app/constants/product-group';
import { TransformToHttpParams } from '@app/_models/app-models/transform-to-http-params';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentStageSettingService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getAttachmentTypes(stageId: string | number, productGroupId: ProductGroup) {
    return this.http.get<AttachmentType[]>(`${this.baseUrl}/attachment-stage-setting/by-stage`, {
      params: new TransformToHttpParams({ stageId, productGroupId })
    });
  }
}
