import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { TransformQueryParams, PageDTO, PaginationAndSortingDto, StopListAbsDto } from '@app/_models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StopListAbsControllerService {
  private path = environment.baseUrl;
  private integrPath = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<StopListAbsDto>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<StopListAbsDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<StopListAbsDto>>(this.integrPath + `/stop-lists/page`, { params });
  }

  /**
   * Обновление справочника
   * @returns Observable<boolean>
   */
  public update(): Observable<boolean> {
    return this.http.post<boolean>(this.path + `/stop-list-abs`, {});
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(this.integrPath + `/stop-lists/download`, { responseType: 'blob' });
  }
}
