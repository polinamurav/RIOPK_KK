import { Injectable } from '@angular/core';
import { DirCommonService } from '@app/api/massegment-api/dir-common.service';
import { HttpClient } from '@angular/common/http';
import { Dir } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class DirGoodsService extends DirCommonService<Dir> {
  constructor(http: HttpClient) {
    super('goods-category', http);
  }
}
