import { DirChecklist, PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DirChecklistControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными факторов чек-листа на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirChecklist>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirChecklist>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirChecklist>>(`${this.baseUrl}/checklist/page`, { params });
  }

  /**
   * Создание факторов чек-листа
   * @returns Observable of number
   */
  create(checklist: DirChecklist): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/checklist`, checklist);
  }

  /**
   * Обновление факторов чек-листа
   * @returns Observable of number
   */
  update(checklist: DirChecklist): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/checklist/update`, checklist);
  }
}
