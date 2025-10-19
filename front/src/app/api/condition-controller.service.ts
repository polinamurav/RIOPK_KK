import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  ConditionDto,
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';
import { Condition } from '@app/_models/api-models/condition-dto';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class ConditionControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка conditions
   * @returns Observable<Condition>
   */
  public getAll(): Observable<Condition[]> {
    return this.http.get<Condition[]>(this.path + `/conditions`);
  }

  /**
   * Создание condition
   * @param data: ConditionReq
   * @returns Observable<Condition>
   */
  public createOrUpdate(data: ConditionDto): Observable<Condition> {
    return this.http.post<Condition>(this.path + `/conditions`, { ...data });
  }

  /**
   * получение condition по id
   * @param id: number
   * @returns Observable<Condition>
   */
  public getById(id: number): Observable<Condition> {
    return this.http.get<Condition>(this.path + `/conditions/${id}`);
  }

  /**
   * получение пагинированного списка conditions
   * @param param: PaginationAndSortingDto
   * @returns Observable<PageDTO<Condition>>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Condition>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Condition>>(this.path + `/conditions/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    const date = moment().format('YYYY-MM-DD');
    return this.http.get(`${this.path}/conditions/download`, { responseType: 'blob', params: { date } });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(this.path + `/conditions/upload`, params);
  }
}
