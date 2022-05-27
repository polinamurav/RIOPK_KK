import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {PageDTO, PaginationAndSortingDto, TransformQueryParams} from '@app/_models';
import { HttpClient } from '@angular/common/http';
import {AbsExpenseSetting, AbsExpenseSettingDto} from "@app/_models/api-models/abs-expense-setting";

@Injectable({
  providedIn: 'root'
})
export class AbsExpenseSettingControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<IntegrationLog>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<AbsExpenseSetting>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<AbsExpenseSetting>>(this.baseUrl + `/abs-expense-setting/page`, { params });
  }

  /**
   * Создание справочника
   * @param data: any
   * @returns Observable<ProductDto>
   */
  public create(data: AbsExpenseSettingDto): Observable<AbsExpenseSettingDto> {
    return this.http.post<AbsExpenseSettingDto>(this.baseUrl + `/abs-expense-setting`, { ...data });
  }

  /**
   * Обновление справочника
   * @returns Observable of number
   */
  public update(data: AbsExpenseSettingDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/abs-expense-setting/update`, data);
  }
}
