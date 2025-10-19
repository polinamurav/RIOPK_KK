import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { CustomSettings, PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';
import { CustomSettingsDto, UpdateCustomSettingsDto } from '@app/_models/api-models/custom-settings';

@Injectable({ providedIn: 'root' })
export class CustomSettingsControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех settings
   * @returns Observable<CustomSettingsDto[]>
   */
  public getAll(): Observable<CustomSettingsDto[]> {
    return this.http.get<CustomSettingsDto[]>(this.path + `/custom-setting`);
  }

  /**
   * Создание setting
   * @param data: CustomSettings[]
   * @returns Observable<UpdateCustomSettingsDto>
   */
  public save(data: UpdateCustomSettingsDto): Observable<UpdateCustomSettingsDto> {
    return this.http.post<UpdateCustomSettingsDto>(this.path + `/custom-setting`, { ...data });
  }

  /**
   * Обновление setting
   * @param data: CustomSettings
   * @returns Observable<CustomSettings>
   */
  public update(data: CustomSettings): Observable<CustomSettings> {
    return this.http.put<CustomSettings>(this.path + `/custom-setting`, { ...data });
  }

  /**
   * получение setting по id
   * @param id: number
   * @returns Observable<CustomSettingsDto>
   */
  public getById(id: number): Observable<CustomSettingsDto> {
    return this.http.get<CustomSettingsDto>(this.path + `/custom-setting/${id}`);
  }

  /**
   * получение значения по Key
   * @param key: string
   * @returns Observable<CustomSettingsDto>
   */
  public getByKey(key: string): Observable<CustomSettingsDto> {
    return this.http.get<CustomSettingsDto>(this.path + `/custom-setting/by-key/${key}`);
  }

  /**
   * получение пагинированного списка settings
   * @param param: PaginationAndSortingDto
   * @returns Observable<PageDTO<CustomSettingsDto>>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<CustomSettingsDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<CustomSettingsDto>>(this.path + `/custom-setting/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(this.path + `/custom-setting/download`, { responseType: 'blob' });
  }

  /**
   * получение телефонных кодов
   */
  public getPhoneCodes(): Observable<any[]> {
    return this.http.get<any[]>(this.path + `/custom-setting/phone-codes`);
  }
}
