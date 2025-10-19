import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PageDTO, ResponseEntity, transformOptions, TransformQueryParams, UploadOptions } from '@app/_models';
import { Observable } from 'rxjs';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { CreditProgramDto } from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';

@Injectable({
  providedIn: 'root'
})
export class CreditProductService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private downloadUploadFileService: DownloadUploadFileService) {}

  getList() {
    return this.http.get<CreditProgramDto[]>(`${this.baseUrl}/credit-programs`);
  }

  getByPage(param: any) {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<CreditProgramDto>>(`${this.baseUrl}/credit-programs/page`, { params });
  }

  create(data: CreditProgramDto) {
    return this.http.post<CreditProgramDto>(`${this.baseUrl}/credit-programs`, data);
  }

  update(data: CreditProgramDto) {
    return this.http.post<CreditProgramDto>(`${this.baseUrl}/credit-programs/update`, data);
  }

  download() {
    this.http
      .get(`${this.baseUrl}/credit-programs/download`, {
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
    return this.http.post<ResponseEntity>(`${this.baseUrl}/credit-programs/upload`, params);
  }
}
