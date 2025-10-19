import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { DirTradingCompanyDto } from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import { PageDTO, ResponseEntity, transformOptions, TransformQueryParams, UploadOptions } from '@app/_models';
import { Observable } from 'rxjs';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class TradingCompaniesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private downloadUploadFileService: DownloadUploadFileService) {}

  getList() {
    return this.http.get<DirTradingCompanyDto[]>(`${this.baseUrl}/trading-companies`);
  }

  getByPage(param: DirTradingCompanyDto) {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirTradingCompanyDto>>(`${this.baseUrl}/trading-companies/page`, { params });
  }

  create(data: DirTradingCompanyDto) {
    return this.http.post<DirTradingCompanyDto>(`${this.baseUrl}/trading-companies`, data);
  }

  update(data: DirTradingCompanyDto) {
    return this.http.post<DirTradingCompanyDto>(`${this.baseUrl}/trading-companies/update`, data);
  }

  download() {
    this.http
      .get(`${this.baseUrl}/trading-companies/download`, {
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
    return this.http.post<ResponseEntity>(`${this.baseUrl}/trading-companies/upload`, params);
  }
}
