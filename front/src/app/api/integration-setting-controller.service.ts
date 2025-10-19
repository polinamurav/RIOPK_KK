import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationAndSortingDto, PageDTO, TransformQueryParams, IntegrationSetting } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class IntegrationSettingControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * получение пагинированного списка integration
   * @param param: PaginationAndSortingDto
   * @returns Observable<PageDTO<IntegrationSetting>>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<IntegrationSetting>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<IntegrationSetting>>(this.baseUrl + `/integration-setting/page`, { params });
  }

  /**
   * Сохранение изменений по интеграции
   * @param integrationSetting: IntegrationSetting
   * @returns Observable of IntegrationSetting
   */
  public update(integrationSetting: IntegrationSetting): Observable<IntegrationSetting> {
    return this.http.put<IntegrationSetting>(`${this.baseUrl}/integration-setting/update`, { ...integrationSetting });
  }
}
