import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';
import { Observable } from 'rxjs';
import { Blacklist, BlacklistDto } from '@app/_models/api-models/blacklist';

@Injectable({ providedIn: 'root' })
export class BlacklistControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Blacklist>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Blacklist>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Blacklist>>(this.path + `/blacklist/page`, { params });
  }

  /**
   * Создание справочника
   * @param data: any
   * @returns Observable<BlacklistDto>
   */
  public create(data: BlacklistDto): Observable<BlacklistDto> {
    return this.http.post<BlacklistDto>(this.path + `/blacklist`, { ...data });
  }

  /**
   * Обновление справочника
   * @returns Observable of number
   */
  public update(data: BlacklistDto): Observable<number> {
    return this.http.post<number>(`${this.path}/blacklist/update`, data);
  }
}
