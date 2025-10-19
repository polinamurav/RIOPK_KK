import { PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';

import { DirProductGroup } from '@app/_models/api-models-mass-segment/product-group';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка DirProductGroup
   * @returns Observable of DirProductGroup
   */
  public getList(): Observable<DirProductGroup[]> {
    return this.http.get<DirProductGroup[]>(`${this.baseUrl}/product-group`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirProductGroup>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirProductGroup>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirProductGroup>>(`${this.baseUrl}/product-group/page`, {
      params
    });
  }

  /**
   * Создание списка DirProductGroup
   * @returns Observable of number
   */
  create(dirProductGroup: DirProductGroup): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/product-group`, dirProductGroup);
  }

  /**
   * Обновление списка DirProductGroup
   * @returns Observable of number
   */
  update(dirProductGroup: DirProductGroup): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/product-group/update`, dirProductGroup);
  }
}
