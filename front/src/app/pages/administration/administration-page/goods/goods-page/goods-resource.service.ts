import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
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
export class GoodsResourceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private downloadUploadFileService: DownloadUploadFileService) {}

  getList() {
    return this.http.get<Dir[]>(`${this.baseUrl}/goods`);
  }

  getByPage(param: Dir) {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Dir>>(`${this.baseUrl}/goods/page`, { params });
  }

  create(data: Dir) {
    return this.http.post<Dir>(`${this.baseUrl}/goods`, data);
  }

  update(data: Dir) {
    return this.http.post<Dir>(`${this.baseUrl}/goods/update`, data);
  }

  download() {
    this.http
      .get(`${this.baseUrl}/goods/download`, {
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
    return this.http.post<ResponseEntity>(`${this.baseUrl}/goods/upload`, params);
  }
}
