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
import { PrintingFormAgreementDto, PrintingFormEsignDto } from '@app/_models/api-models/printing-form-agreement-dto';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class PrintingFormControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient, private downloadUploadFileService: DownloadUploadFileService) {}

  public getList(): Observable<PrintingForm[]> {
    return this.http.get<PrintingForm[]>(`${this.path}/printing_form`);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(printingFormId: string): Observable<Blob> {
    const date = moment().format('YYYY-MM-DD');
    return this.http.get(`${this.path}/printing_form/download/${printingFormId}`, {
      responseType: 'blob',
      params: { date }
    });
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
  public getFilledAgreement(data: PrintingFormAgreementDto): void {
    this.http
      .post(`${this.path}/printing_form/filled/agreement`, data, {
        responseType: 'blob',
        observe: 'response'
      })
      .toPromise()
      .then(resp => {
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
  }

  getEContract(applicationId: number) {
    return this.http.get<any>(`${this.path}/bpm/sms-sign/link/${applicationId}`);
  }

  // checkOtp
  smsSignCheck(applicationId: number, code: number) {
    return this.http.post(`${this.path}/bpm/sms-sign/code/check`, {
      applicationId, code
    }, {
      responseType: 'text'
    });
  }


  isSmsSignPossible(data: any){
    return this.http.post<boolean>(`${this.path}/bpm-front/sms_sign_possible`, data);
  }


  public getFilledAgreementEsign(data: PrintingFormEsignDto, isAgree?: boolean): void {
    this.http
      .post(`${this.path}/printing_form/filled/esign?isAgree=${isAgree}`, data, {
        responseType: 'blob',
        observe: 'response'
      })
      .toPromise()
      .then(resp => {
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
  }

  // post(`${this.path}/conclusions/${taskId}/compose`, data, {
  // responseType: 'blob',
  // observe: 'response',
  // headers: headers
  // }).pipe(tap(
  // (resp: HttpResponse<Blob>) => {
  // this.fileDownloaderService.saveFile(resp);
  // }
  // ));

  /**
   * Скачивание согласия
   * @returns Observable of Blob
   */
  public fillExternal(agreementFormParams: PrintingFormDownloadRq): void {
    const params: TransformQueryParams = new TransformQueryParams({ ...agreementFormParams });

    this.http
      .post(
        `${this.path}/printing_form/filled/form`,
        {},
        {
          responseType: 'blob',
          observe: 'response',
          params
        }
      )
      .toPromise()
      .then(resp => {
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
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
   * @param appId - application appId id
   * @param branchId - application branch id
   * @param productId - credit product id
   * @returns Observable of PrintingFormDto[]
   */
  public getPrintingFormsForStage(
    appId: string | number,
    branchId: number,
    productId: number
  ): Observable<PrintingFormDto[]> {
    const params: TransformQueryParams = new TransformQueryParams({ branchId, productId });

    return this.http.get<PrintingFormDto[]>(`${this.path}/printing_form/stage/${appId}`, { params });
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
