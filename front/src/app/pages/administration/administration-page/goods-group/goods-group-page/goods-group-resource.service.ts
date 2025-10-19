import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { DirTradingCompanyDto } from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import {
  Dir,
  DirGoodsGroup,
  PageDTO,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodsGroupResourceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private downloadUploadFileService: DownloadUploadFileService) {}

  getList() {
    return this.http.get<DirGoodsGroup[]>(`${this.baseUrl}/goods-group`);
  }

  getByPage(param: DirGoodsGroup) {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirGoodsGroup>>(`${this.baseUrl}/goods-group/page`, { params });
  }

  create(data: DirGoodsGroup) {
    return this.http.post<DirGoodsGroup>(`${this.baseUrl}/goods-group`, data);
  }

  update(data: DirGoodsGroup) {
    return this.http.post<DirGoodsGroup>(`${this.baseUrl}/goods-group/update`, data);
  }

  download() {
    this.http
      .get(`${this.baseUrl}/goods-group/download`, {
        responseType: 'blob',
        observe: 'response'
      })
      .toPromise()
      .then(resp => {
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
  }

  upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/goods-group/upload`, params);
  }
}
