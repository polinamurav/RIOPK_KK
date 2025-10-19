import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import {
  PaginationAndSortingDto,
  PageDTO,
  TransformQueryParams,
  ReportRunHistoryDto,
  transformOptions
} from '@app/_models';
import {DirOnlineHistoryReportStatusDto, URPAReportBatchDto} from "@app/pages/report/report-page/upra-report/models";
import {DownloadUploadFileService} from "@app/services/download-upload-file.service";
import {ReportOnlineDates} from "@app/pages/report/report-page/report-online/report-online.component";
import { posReportStartDto } from '@app/pages/report/report-page/report-pos/report-pos.component';
import {
  ReportFieldsResponse
} from '@app/pages/report/report-page/report-data/report-data.component';

@Injectable({ providedIn: 'root' })
export class ReportControllerService {
  private baseUrl = environment.baseUrl;

  constructor(
    private readonly downloadUploadFileService: DownloadUploadFileService,
    private http: HttpClient) {}

  /**
   * Скачивание отчета по id
   * @param id string
   * @returns Observable of Blob
   */
  public getReportByRunHistoryId(id: string | number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/report/${id}`, {
      responseType: 'blob'
    });
  }

  /**
   * Скачивание
   * @param dateFrom string
   * @param dateTo string
   * @param reportType string
   * @returns Observable of Blob
   */
  public download(dateFrom: string, dateTo: string, reportType: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/report/download`, {
      params: { dateFrom, dateTo, reportType },
      responseType: 'blob'
    });
  }

  /**
   * Получение выбранной страницы с данными на ней в зависимости от типа отчетности
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @param reportType Параметр для GET запроса по типу отчета
   * @returns Observable of PageDTO<ReportRunHistoryDto>
   */
  public getReportRunHistory(param: PaginationAndSortingDto): Observable<PageDTO<ReportRunHistoryDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ReportRunHistoryDto>>(`${this.baseUrl}/report/history`, { params });
  }


  getUpraPage(param: PaginationAndSortingDto){
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<URPAReportBatchDto>>(`${this.baseUrl}/urpa-report`, { params });
  }

  createURPAReportBatch(file: File, name: string){
    const formData = transformOptions({ file });
    return this.http.post<URPAReportBatchDto>(`${this.baseUrl}/urpa-report?name=${name}`, formData)
  }


  createURPAReport(id: string | number){
    return this.http.get(`${this.baseUrl}/urpa-report/${id}/create-report`)
  }

  getUpraDtoById (id: string | number){
    return this.http.get<URPAReportBatchDto>(`${this.baseUrl}/urpa-report/${id}`);
  }

  downloadClients(id: number){

    this.http.get(`${this.baseUrl}/urpa-report/${id}/download` ,{
      responseType: 'blob',
        observe: 'response'
    }).toPromise()
      .then(resp => {
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
  }


  uploadClients(file: File, id: number, name: string){
    const formData = transformOptions({ file });
    return this.http.post<URPAReportBatchDto>(`${this.baseUrl}/urpa-report/${id}/update?name=${name}`, formData)
  }


  getReportOnlineStart({ dateFrom, dateTo }: ReportOnlineDates){
    return this.http.get(`${this.baseUrl}/online-history/report-start?dateFrom=${dateFrom}&dateTo=${dateTo}` );
  }

  getReportPosStart(posReport: posReportStartDto){
    return this.http.post(`${this.baseUrl}/pos-report/start`, posReport);
  }


  getReportStatus(){
    return this.http.get<DirOnlineHistoryReportStatusDto>(`${this.baseUrl}/online-history/report-status`);
  }

  getPosReportStatus(){
    return this.http.get<DirOnlineHistoryReportStatusDto>(`${this.baseUrl}/pos-report/status`);
  }

  getReportFields(){
    return this.http.get<ReportFieldsResponse>(`${this.baseUrl}/report/fields`);
  }

  getReportOnline( callback?: () => void){
    this.http.get(`${this.baseUrl}/online-history/report-download` ,{
      responseType: 'blob',
      observe: 'response'
    }).toPromise()
      .then(resp => {
        if(callback) {
          callback();
        }
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
  }

  getReportData(reportData: any, callback?: () => void){
    this.http.post(`${this.baseUrl}/report`, reportData, {
      responseType: 'blob',
      observe: 'response'
    }).toPromise()
      .then(resp => {
        if(callback) {
          callback();
        }
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
  }

  getReportPos( callback?: () => void){
    this.http.get(`${this.baseUrl}/pos-report/download` ,{
      responseType: 'blob',
      observe: 'response'
    }).toPromise()
      .then(resp => {
        if(callback) {
          callback();
        }
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
  }

}
