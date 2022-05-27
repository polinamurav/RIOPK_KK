import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { NotificationSetting, PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class NotificationSettingControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех settings
   * @returns Observable<NotificationSetting[]>
   */
  public getAll(): Observable<NotificationSetting[]> {
    return this.http.get<NotificationSetting[]>(this.path + `/notification-setting`);
  }

  /**
   * Создание setting
   * @param data: NotificationSetting[]
   * @returns Observable<UpdateNotificationSetting>
   */
  public save(data: NotificationSetting): Observable<NotificationSetting> {
    return this.http.post<NotificationSetting>(this.path + `/notification-setting`, { ...data });
  }

  /**
   * Обновление setting
   * @param data: NotificationSetting
   * @returns Observable<NotificationSetting>
   */
  public update(data: NotificationSetting): Observable<NotificationSetting> {
    return this.http.put<NotificationSetting>(this.path + `/notification-setting`, { ...data });
  }

  /**
   * получение setting по id
   * @param id: number
   * @returns Observable<NotificationSetting>
   */
  public getById(id: number): Observable<NotificationSetting> {
    return this.http.get<NotificationSetting>(this.path + `/notification-setting/${id}`);
  }

  /**
   * получение значения по Key
   * @param key: string
   * @returns Observable<NotificationSetting>
   */
  public getByKey(key: string): Observable<NotificationSetting> {
    return this.http.get<NotificationSetting>(this.path + `/notification-setting/by-key/${key}`);
  }

  /**
   * получение пагинированного списка settings
   * @param param: PaginationAndSortingDto
   * @returns Observable<PageDTO<NotificationSetting>>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<NotificationSetting>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<NotificationSetting>>(this.path + `/notification-setting/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(this.path + `/notification-setting/download`, { responseType: 'blob' });
  }
}
