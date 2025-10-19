import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';
import moment from 'moment';
import { ProductDiscountDto } from '@app/_models/api-models/product-discount-dto';

@Injectable({ providedIn: 'root' })
export class ProductDiscountService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<ProductDiscountDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ProductDiscountDto>>(this.path + `/product-discount/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    const date = moment().format('YYYY-MM-DD');
    return this.http.get(`${this.path}/product-discount/download`, { responseType: 'blob', params: { date } });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(this.path + `/product-discount/upload`, params);
  }
}
