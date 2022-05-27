import { PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelfEmploymentDto } from '@app/_models/api-models/self-employment';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SelfEmploymentControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка Self Employment
   * @returns Observable of SelfEmploymentDto
   */
  public getList(): Observable<SelfEmploymentDto[]> {
    return this.http.get<SelfEmploymentDto[]>(`${this.baseUrl}/self-employment`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<SelfEmploymentDto>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<SelfEmploymentDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<SelfEmploymentDto>>(`${this.baseUrl}/self-employment/page`, {
      params
    });
  }

  /**
   * Создание списка Self Employment
   * @returns Observable of number
   */
  create(selfEmploymentDto: SelfEmploymentDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/self-employment`, selfEmploymentDto);
  }

  /**
   * Обновление списка Self Employment
   * @returns Observable of number
   */
  update(selfEmploymentDto: SelfEmploymentDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/self-employment/update`, selfEmploymentDto);
  }
}
