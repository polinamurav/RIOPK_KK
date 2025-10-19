import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';
import { Observable } from 'rxjs';
import { DirAbsAttribute, DirAbsAttributeDto } from '@app/_models/api-models/dir-abs-attribute';

@Injectable({ providedIn: 'root' })
export class DirAbsAttributeControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of Directory
   */
  public getList(): Observable<DirAbsAttribute[]> {
    return this.http.get<DirAbsAttribute[]>(`${this.path}/dir-abs-attribute`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<IntegrationLog>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirAbsAttribute>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirAbsAttribute>>(this.path + `/dir-abs-attribute/page`, { params });
  }

  /**
   * Создание справочника
   * @param data: any
   * @returns Observable<ProductDto>
   */
  public create(data: DirAbsAttributeDto): Observable<DirAbsAttributeDto> {
    return this.http.post<DirAbsAttributeDto>(this.path + `/dir-abs-attribute`, { ...data });
  }

  /**
   * Обновление справочника
   * @returns Observable of number
   */
  public update(data: DirAbsAttributeDto): Observable<number> {
    return this.http.post<number>(`${this.path}/dir-abs-attribute/update`, data);
  }
}
