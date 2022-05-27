import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductToSegment } from '@app/_models/api-models/product-to-segment';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductToSegmentControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение ProductToSegment
   * @returns Observable<ProductToSegment[]>
   */
  public getAll(): Observable<ProductToSegment[]> {
    return this.http.get<ProductToSegment[]>(this.baseUrl + `/product-to-segment`);
  }

  /**
   * Создание ProductToSegment
   * @returns Observable<number>
   */
  public create(productToSegment: ProductToSegment): Observable<ProductToSegment> {
    return this.http.post<ProductToSegment>(this.baseUrl + `/product-to-segment`, productToSegment);
  }

  /**
   * Обновление ProductToSegment
   * @returns Observable<number>
   */
  public update(productToSegment: ProductToSegment): Observable<number> {
    return this.http.post<number>(this.baseUrl + `/product-to-segment/update`, productToSegment);
  }

  /**
   * Удаление ProductToSegment
   * @returns Observable<number>
   */
  public delete(productToSegment: ProductToSegment): Observable<any> {
    return this.http.post<number>(this.baseUrl + `/product-to-segment/delete`, productToSegment);
  }
}
