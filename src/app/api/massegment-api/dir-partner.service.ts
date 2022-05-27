import { Injectable } from '@angular/core';
import { DirCommonService } from '@app/api/massegment-api/dir-common.service';
import { HttpClient } from '@angular/common/http';
import { DirPartner } from '@app/_models/api-models/dir-partner';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DirPartnerService extends DirCommonService<DirPartner> {
  constructor(public http: HttpClient) {
    super('partner', http);
  }

  getPartnersList() {
    return this.http.get<DirPartner[]>(`${this.baseUrl}/partner`);
  }
}
