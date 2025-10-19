import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { InsuranceProductFrontDto } from '@app/_models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceProductControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение справочника страховых продуктов
   * @returns Observable<InsuranceProductFrontDto[]>
   */
  public getAll(productId?: string): Observable<InsuranceProductFrontDto[]> {
    if (productId) {
      let params: HttpParams = new HttpParams();
      params = params.append('productId', productId);

      return this.http.get<InsuranceProductFrontDto[]>(`${this.baseUrl}/insurance-products/all`, { params });
    }

    return this.http.get<InsuranceProductFrontDto[]>(`${this.baseUrl}/insurance-products/all`);
  }

  /**
   * Обновление справочника страховых продуктов
   * @returns Observable<null>
   */
  public update(): Observable<null> {
    return this.http.get<null>(`${this.baseUrl}/insurance-products`);
  }
}
