import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationAndSortingDto, PageDTO, TransformQueryParams, ReportRunHistoryDto } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ReportControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

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
}
