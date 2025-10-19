import {
  AbsFirstPayDateRsDto,
  AbsSearchClientDto,
  AbsSearchClientRequest,
  AccountDto,
  ShortFormParallelAppsRequest,
  ShortFormParallelAppsResponse
} from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { AbsCardTurnover, AbsProvenIncomeInfo } from '@app/_models/api-models/integration-norq';
import { OpzApplicationsFacadeDto } from '@app/_models/api-models/opz-applications-facade-dto';
import { BlacklistBasedOnAbsResults } from '@app/_models/api-models/blacklist-based-on-abs-results';

@Injectable({
  providedIn: 'root'
})
export class AbsSearchClientControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранного клиента из АБС
   * @param params Параметры для POST запроса во внутреннюю БД для поиска клиента из АБС
   * @returns Observable of AbsSearchClientDto
   */
  public getABSClient(params: AbsSearchClientRequest): Observable<AbsSearchClientDto> {
    return this.http.post<AbsSearchClientDto>(`${this.baseUrl}/abs`, params);
  }

  //  Получение свежих курсов валют
  public getCurrencyRates(date: string) {
    return this.http.get<AbsSearchClientDto>(`${this.baseUrl}/abs/get_currency_rates/${date}`).toPromise();
  }

  //  Обновление списка филиалов
  public getAbsBrunches(code: number) {
    return this.http.get(`${this.baseUrl}/abs/branch/${code}`).toPromise();
  }

  // Возвращает обороты по счетам по результатам интеграции с АБС
  public getAbsCardTurnover(applicationId: number) {
    return this.http.get<AbsCardTurnover[]>(`${this.baseUrl}/abs/card-turnover/${applicationId}`);
  }

  // Возвращает заявки работодателя по результатам интеграции с АБС
  public getEmployerApplications(applicationId: number | string) {
    return this.http.get<OpzApplicationsFacadeDto[]>(`${this.baseUrl}/abs/employer-applications/${applicationId}`);
  }

  // Получение чёрного списка по результатам интеграции с АБС
  public getEmployerBlacklist(applicationId: number | string) {
    return this.http.get<BlacklistBasedOnAbsResults[]>(`${this.baseUrl}/abs/employer-blacklist/${applicationId}`);
  }

  // Получение эффективной ставки по кредиту из ABS
  public getEffectiveRate(brmsMatrixId: number | string) {
    return this.http.get<BlacklistBasedOnAbsResults[]>(`${this.baseUrl}/abs/effective_rate/${brmsMatrixId}`);
  }

  public firstPay(applicationId: number, date: string) {
    return this.http.get<AbsFirstPayDateRsDto>(this.baseUrl + `/abs/first-pay/${applicationId}/${date}`);
  }

  // Проверка на наличие параллельных заявок на краткой анкете
  public getAppDuplicates(data: ShortFormParallelAppsRequest) {
    return this.http.post<ShortFormParallelAppsResponse>(`${this.baseUrl}/parallel-apps/short`, data);
  }

  // Переназначение параллельной заявки
  public resignParallelApp(id: number) {
    return this.http.post<ShortFormParallelAppsResponse>(`${this.baseUrl}/parallel-apps/resign/${id}`, {});
  }
}
