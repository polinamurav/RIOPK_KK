import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BRMSRule, BRMSRuleDTO, PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrmsRuleControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<BRMSRule>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<BRMSRule>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<BRMSRule>>(`${this.baseUrl}/brms-rule/page`, { params });
  }

  /**
   * Обновление правила
   * @returns Observable of PageDTO<BRMSRule>
   */
  public update(rule: BRMSRuleDTO): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/brms-rule/update`, rule);
  }
}
