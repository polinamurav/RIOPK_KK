import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirTradingCompanyPointDto } from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import { BlacklistDto } from '@app/_models/api-models/blacklist';
import {
  Dir,
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class TradingCompanyPointsService {
  private baseUrl = environment.baseUrl;

  constructor(private downloadUploadFileService: DownloadUploadFileService, private http: HttpClient) {}

  getList() {
    return this.http.get<DirTradingCompanyPointDto[]>(`${this.baseUrl}/trading-company-points`);
  }

  getByPage(param: PaginationAndSortingDto) {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirTradingCompanyPointDto>>(`${this.baseUrl}/trading-company-points/page`, { params });
  }

  create(data: DirTradingCompanyPointDto) {
    return this.http.post<DirTradingCompanyPointDto>(`${this.baseUrl}/trading-company-points`, data);
  }

  update(data: DirTradingCompanyPointDto) {
    return this.http.post<DirTradingCompanyPointDto>(`${this.baseUrl}/trading-company-points/update`, data);
  }

  getForUser() {
    return this.http.get<DirTradingCompanyPointDto[]>(`${this.baseUrl}/trading-company-points/user`);
  }

  getCompanyStatuses() {
    return this.http.get<Dir[]>(`${this.baseUrl}/dir-company-statuses`);
  }

  getCreditPrograms() {
    return this.http.get<Dir[]>(`${this.baseUrl}/credit-programs`);
  }

  download() {
    this.http
      .get(`${this.baseUrl}/trading-company-points/download`, {
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
    return this.http.post<ResponseEntity>(`${this.baseUrl}/trading-company-points/upload`, params);
  }
}
