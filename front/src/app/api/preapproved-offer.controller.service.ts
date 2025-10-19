import {
  PageDTO,
  PaginationAndSortingDto,
  PreApprovedOfferDto,
  PreapprovedOfferParams,
  TransformQueryParams
} from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreapprovedOfferControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<PreApprovedOfferDto>
   */
  public getByPage(
    shortApplicationId: number,
    param: PaginationAndSortingDto
  ): Observable<PageDTO<PreApprovedOfferDto>> {
    const params: TransformQueryParams = new TransformQueryParams({
      ...param,
      shortApplicationId: shortApplicationId.toString()
      // identityCardTypeId: data.identityCardTypeId,
      // identityCardPin: data.identityCardPin
    });
    return this.http.get<PageDTO<PreApprovedOfferDto>>(`${this.baseUrl}/preapproved-offer`, { params });
  }
}
