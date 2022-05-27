import { BusinessInspection, BusinessInspectionDto } from '@app/_models/api-models-mass-segment';
import { PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessInspectionControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * @param applicant_id applicantId для GET запроса
   * @param application_id applicationId для GET запроса
   * @returns Observable of BusinessInspectionDto
   */
  public getByApplicantAndApplication(
    applicantId: number | string,
    applicationId: number | string
  ): Observable<BusinessInspection> {
    return this.http.get<BusinessInspection>(`${this.baseUrl}/business-inspection/${applicationId}/${applicantId}`);
  }

  /**
   * Получение Business Inspection
   * @returns Observable<BusinessInspectionDto[]>
   */
  public getList(): Observable<BusinessInspectionDto[]> {
    return this.http.get<BusinessInspectionDto[]>(`${this.baseUrl}/business-inspection`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<BusinessInspectionDto>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<BusinessInspectionDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<BusinessInspectionDto>>(`${this.baseUrl}/business-inspection/page`, { params });
  }

  /**
   * Создание Business Inspection
   * @returns Observable of PageDTO<BusinessInspectionDto>
   */
  public create(businessInspection: BusinessInspectionDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/business-inspection`, businessInspection);
  }

  /**
   * Обновление Business Inspection
   * @returns Observable of PageDTO<BusinessInspectionDto>
   */
  public update(businessInspection: BusinessInspectionDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/business-inspection/update`, businessInspection);
  }
}
