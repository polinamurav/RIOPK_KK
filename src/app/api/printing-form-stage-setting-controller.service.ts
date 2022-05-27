import {
  PageDTO,
  PaginationAndSortingDto,
  PrintingFormStageSetting,
  PrintingFormStageSettingDto,
  TransformQueryParams
} from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintingFormStageSettingControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение form-stage-setting
   * @returns Observable<ProductDiscountCondition[]>
   */
  public getList(): Observable<PrintingFormStageSetting[]> {
    return this.http.get<PrintingFormStageSetting[]>(this.baseUrl + `/printing-form-stage-setting`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<ProductDiscountCondition>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<PrintingFormStageSetting>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<PrintingFormStageSetting>>(`${this.baseUrl}/printing-form-stage-setting/page`, {
      params
    });
  }

  /**
   * Создание form-stage-setting
   * @returns Observable of number
   */
  create(formStageSetting: PrintingFormStageSettingDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/printing-form-stage-setting`, formStageSetting);
  }

  /**
   * Обновление form-stage-setting
   * @returns Observable of number
   */
  update(formStageSetting: PrintingFormStageSettingDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/printing-form-stage-setting/update`, formStageSetting);
  }
}
