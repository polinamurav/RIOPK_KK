import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import {
  PreapproveBaseDto,
  PreapproveBaseStartDto,
  PreapproveFrontDto
} from '@app/_models/api-models/preapprove-base-dto';
import { AttachmentDto, transformOptions } from '@app/_models';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class PreapproveBaseResourcesService {
  private baseUrl = environment.baseUrl;

  constructor(private readonly downloadUploadFileService: DownloadUploadFileService, private http: HttpClient) {}

  getPreapproveBaseList() {
    return this.http.get<PreapproveBaseDto[]>(`${this.baseUrl}/preapprove-base`);
  }

  getPreapproveBaseById(id: number) {
    return this.http.get<PreapproveFrontDto>(`${this.baseUrl}/preapprove-base/${id}`);
  }

  createBase(data: PreapproveBaseDto) {
    return this.http.post(`${this.baseUrl}/preapprove-base`, data);
  }

  uploadBase(file: File, id: number) {
    const formData = transformOptions({ file });

    return this.http.post<AttachmentDto>(`${this.baseUrl}/preapprove-base/upload?id=${id}`, formData);
  }

  uploadCalculatedBase(file: File, id: number) {
    const formData = transformOptions({ file });

    return this.http.post<AttachmentDto>(`${this.baseUrl}/preapprove-base/upload/calculated?id=${id}`, formData);
  }

  // Загрузка файла базы предодобов с результатами расчетов
  // 'Выгрузить результат стратегии'  isOriginal = true
  // 'Выгрузить скорректированный результат  isOriginal = false
  // Скачать оригинальный файл из fileContent - isFileContent = true
  getPreapproveBaseResultsFile(
    id: number,
    isOriginal: boolean = false,
    isApproved: boolean = true,
    isFileContent: boolean = false,
    callBack: () => void
  ) {
    return this.http
      .get(
        `${
          this.baseUrl
        }/preapprove-base/download?id=${id}&isOriginal=${isOriginal}&isApproved=${isApproved}&isFileContent=${isFileContent}`,
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .toPromise()
      .then(resp => {
        this.downloadUploadFileService.saveFileAsBinary(resp);
        callBack();
      });
  }

  deleteBase(id: number) {
    return this.http.delete(`${this.baseUrl}/preapprove-base/${id}`);
  }

  // Получение количества обсчитанных клиентов
  getCompletedClients(id: number) {
    return this.http.get<number>(`${this.baseUrl}/preapprove-base/completed/${id}`);
  }

  // Загрузка содержимого файла базы предодобов в БД
  uploadPreapproveBase(preapproveBaseId: number, data: PreapproveBaseStartDto) {
    return this.http.post(`${this.baseUrl}/preapprove/bpm/upload?preapproveBaseId=${preapproveBaseId}`, data);
  }

  // activate base
  activateBase(preApproveBase: PreapproveBaseDto) {
    return this.http.post<any>(`${this.baseUrl}/preapprove-base/activate`, preApproveBase);
  }

  // deactivateBase base
  deactivateBase(id: number) {
    return this.http.get(`${this.baseUrl}/preapprove-base/deactivate/${id}`);
  }
}
