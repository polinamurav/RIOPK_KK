import { AttachmentDto, AttachmentSaveData, ResponseEntity, transformOptions } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransformToHttpParams } from '@app/_models/app-models/transform-to-http-params';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AttachmentControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Сохранение файла
   * @param fileData Файл и информация о нём
   * @returns Observable of CreatedUpdatedParam>
   */
  public save(fileData: AttachmentSaveData): Observable<AttachmentDto> {
    const formData = transformOptions(fileData);

    return this.http.post<AttachmentDto>(`${this.baseUrl}/attachment`, formData);
  }

  /**
   * Получение файла по id
   * @param id Id файла
   * @returns Observable of CreatedUpdatedParam
   */
  public getById(id: string | number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/attachment/${id}`, { responseType: 'blob' });
  }

  /**
   * Удаление файла по id
   * @param id Id файла
   * @returns Observable of {}
   */
  public delete(id: string | number): Observable<{}> {
    return this.http.delete<{}>(`${this.baseUrl}/attachment/${id}`);
  }

  /**
   * Получить список файлов
   * @param applicationId -
   * @param applicantId -
   */
  public getAllByApplicationIdAndApplicantId(applicationId: number, applicantId?: number) {
    return this.http.get<AttachmentDto[]>(`${this.baseUrl}/attachment`, {
      params: new TransformToHttpParams({
        applicationId,
        applicantId
      })
    });
  }

  /**
   * Получить список файлов для Клиента
   * @param applicationId -
   * @param applicantId -
   */
  public getAllByAClientId(clientId: number) {
    const params = new TransformToHttpParams({ clientId });

    return this.http.get<AttachmentDto[]>(`${this.baseUrl}/attachment/by-client`, { params });
  }

  /**
   * Скачать файл
   * @param ecmUrl -
   */
  public downloadAttachment(ecmUrl: string) {
    return this.http.get(`${this.baseUrl}/attachment/download`, {
      params: { ecmUrl },
      responseType: 'blob'
    });
  }

  /**
   * Загрузить файл
   * @param applicationId -
   * @param applicantId -
   * @param attachmentTypeId - ID типа файла
   * @param file - файл запакованный в FormData
   * @param attachmentId -
   */
  public uploadAttachment(
    applicationId: number,
    applicantId: number,
    attachmentTypeId: string | number,
    file: FormData,
    attachmentId: number
  ) {
    return this.http.post<ResponseEntity>(`${this.baseUrl}/attachment/upload`, file, {
      params: new TransformToHttpParams({ applicationId, applicantId, attachmentTypeId, attachmentId })
    });
  }

  /**
   * Загрузить файл для Клиента
   * @param clientId -
   * @param attachmentTypeId - ID типа файла
   * @param file - файл запакованный в FormData
   */
  public uploadByClient(clientId: number, attachmentTypeId: string | number, file: FormData) {
    return this.http.post<ResponseEntity>(`${this.baseUrl}/attachment/upload-by-client`, file, {
      params: new TransformToHttpParams({ clientId, attachmentTypeId })
    });
  }
}
