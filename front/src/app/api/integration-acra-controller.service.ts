import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  AcraCreditInfoResponse,
  AcraLoanFilterDto,
  AcraLoanFilteredDto
} from '@app/_models/api-models/integration-acra';
import { PaginationAndSortingDto, TransformQueryParams } from '@app/_models';
import { VkiAggregates } from '@app/_models/api-models/vki-aggregates';

@Injectable({ providedIn: 'root' })
export class IntegrationAcraControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по получению Справки о занятости
   * @returns Observable of AsanEmploymentResponse
   */
  public getById(id: number): Observable<AcraCreditInfoResponse> {
    return this.http.get<AcraCreditInfoResponse>(`${this.baseUrl}/acra-credit-info/${id}`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса Получение агрегатов ВКИ
   * @returns Observable of VkiAggregates
   */
  public getVkiAggregates(applicationId: number): Observable<VkiAggregates> {
    const params: TransformQueryParams = new TransformQueryParams({ applicationId });
    return this.http.get<VkiAggregates>(`${this.baseUrl}/credit-info-loan/aggregates`, { params });
  }

  /**
   * Получение списка обязательств по фильтрам
   * @param param Параметры для POST запроса
   * @returns Observable of AsanEmploymentResponse
   */
  public getByFiltersAndParams(
    param: PaginationAndSortingDto,
    filterParams: AcraLoanFilterDto
  ): Observable<AcraLoanFilteredDto> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    const filterParamsReq = new TransformQueryParams({
      ...filterParams
    });

    return this.http.post<AcraLoanFilteredDto>(`${this.baseUrl}/acra-credit-info/page`, filterParamsReq, { params });
  }

  public getCreditInfoLoan(
    param: PaginationAndSortingDto,
    filterParams: AcraLoanFilterDto
  ): Observable<AcraLoanFilteredDto> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    const filterParamsReq = new TransformQueryParams({
      ...filterParams
    });

    return this.http.post<AcraLoanFilteredDto>(`${this.baseUrl}/credit-info-loan/page`, filterParamsReq, { params });
  }
}
