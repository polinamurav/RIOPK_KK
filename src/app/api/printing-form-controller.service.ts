import {
  DirSignerDto,
  FilledCardApplicationDto,
  PageDTO,
  PaginationAndSortingDto,
  PrintingFormDownloadRq,
  PrintingFormDto,
  PrintingFormSignerDto,
  ResponseEntity,
  TransformQueryParams,
  UploadOptions,
  transformOptions
} from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrintingForm } from '@app/_models/api-models/printing-form';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class PrintingFormControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getList(): Observable<PrintingForm[]> {
    return this.http.get<PrintingForm[]>(`${this.path}/printing_form`);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(printingFormId: string): Observable<Blob> {
    return this.http.get(`${this.path}/printing_form/download/${printingFormId}`, { responseType: 'blob' });
  }

  /**
   * Получение пагинированного списка
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable<PageDTO<PrintingForm[]>>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<PrintingForm[]>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<PrintingForm[]>>(this.path + `/printing_form/page`, { params });
  }

  /**
   * Скачивание необходимого файла
   * @param applicationId number
   * @param printingFormId string
   * @returns Observable of Blob
   */
  // swagger doesn`t contain such method

  // public getFilled(applicationId: number, printingFormId: string): Observable<Blob> {
  //   return this.http.get(`${this.path}/printing_form/filled/${applicationId}/${printingFormId}`, {
  //     responseType: 'blob'
  //   });
  // }

  /**
   * Скачивание согласия
   * @param pin string
   * @param phone string
   * @returns Observable<Blob>
   */
  public getFilledAgreement(pin: string, phone: string): Observable<Blob> {
    return this.http.get(`${this.path}/printing_form/filled/agreement`, {
      params: { pin, phone },
      responseType: 'blob'
    });
  }

  /**
   * Скачивание согласия
   * @returns Observable of Blob
   */
  public fillExternal(agreementFormParams: PrintingFormDownloadRq): Observable<Blob> {
    return this.http.post(`${this.path}/printing_form/fill-external`, agreementFormParams, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.path}/printing_form/upload/${options.id}`, params);
  }

  /**
   * Получение списка подписантов и доп. подписанотов
   * @param branchId number
   * @param formId string ('001' or '004')
   * @returns Observable of DirSignerDto
   */
  public getSigners(branchId: number, formId: string): Observable<DirSignerDto[]> {
    return this.http.get<DirSignerDto[]>(`${this.path}/printing_form/signer/${branchId}/${formId}`);
  }

  /**
   * Получение списка форм с подписантами
   * @param stageId - application stage id
   * @param branchId - application branch id
   * @param productId - credit product id
   * @returns Observable of PrintingFormDto[]
   */
  public getPrintingFormsForStage(
    stageId: string | number,
    branchId: number,
    productId: number
  ): Observable<PrintingFormDto[]> {
    const params: TransformQueryParams = new TransformQueryParams({ branchId, productId });

    return this.http.get<PrintingFormDto[]>(`${this.path}/printing_form/stage/${stageId}`, { params });
  }

  /**
   * Скачивание печатной формы
   * @param applicationId number
   * @param printingFormId string (example 'AGREEMENT')
   * @param signer PrintingFormSignerDto
   * @returns Observable of Blob
   */
  public getFilledPrintingForm(
    applicationId: number,
    printingFormId: string,
    signer: PrintingFormSignerDto
  ): Observable<Blob> {
    return this.http.post(`${this.path}/printing_form/filled/${applicationId}/${printingFormId}`, signer, {
      responseType: 'blob'
    });
  }

  /**
   * Скачивание печатной формы для Клиента
   * @param clientId number
   * @param printingFormId string (example 'AGREEMENT')
   * @returns Observable of Blob
   */
  public getFilledClientPrintingForm(clientId: number, printingFormId: string): Observable<Blob> {
    return this.http.post(
      `${this.path}/printing_form/filled/client/${clientId}/${printingFormId}`,
      {},
      {
        responseType: 'blob'
      }
    );
  }

  /**
   * Скачивание печатной формы ЗАявление на выпуск карты
   * @param applicationId number
   * @param cardApplicationDto  FilledCardApplicationDto
   * @returns Observable of Blob
   */
  public getFilledCardPrintingForm(
    applicationId: number,
    cardApplicationDto: FilledCardApplicationDto
  ): Observable<Blob> {
    return this.http.post(`${this.path}/printing_form/filled/card_app/${applicationId}`, cardApplicationDto, {
      responseType: 'blob'
    });
  }
}
