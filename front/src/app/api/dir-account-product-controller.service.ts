import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DirAbsCode, PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';
import { HttpClient } from '@angular/common/http';
import { DirAccountProduct, DirAccountProductDto } from '@app/_models/api-models/dir-account-product';

@Injectable({
  providedIn: 'root'
})
export class DirAccountProductControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of Directory
   */
  public getList(): Observable<DirAbsCode[]> {
    return this.http.get<DirAbsCode[]>(`${this.baseUrl}/account-product`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<IntegrationLog>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirAccountProduct>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirAccountProduct>>(this.baseUrl + `/account-product/page`, { params });
  }

  /**
   * Создание справочника
   * @param data: any
   * @returns Observable<ProductDto>
   */
  public create(data: DirAccountProductDto): Observable<DirAccountProductDto> {
    return this.http.post<DirAccountProductDto>(this.baseUrl + `/account-product`, { ...data });
  }

  /**
   * Обновление справочника
   * @returns Observable of number
   */
  public update(data: DirAccountProductDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/account-product/update`, data);
  }
}
