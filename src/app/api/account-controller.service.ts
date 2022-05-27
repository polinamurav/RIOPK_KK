import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AccountDto } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountControllerService {
  private baseUrl = environment.integrationUrl;

  constructor(private http: HttpClient) {}

  /** Получить список кредитных карт
   *
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable of AccountDto[]
   */
  public getOkCards(applicantId: string, applicationId: string): Observable<AccountDto[]> {
    const params = { applicantId, applicationId };
    return this.http.get<AccountDto[]>(this.baseUrl + `/account/ok-cards`, { params });
  }

  /** Получить список счетов
   *
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable of AccountDto[]
   */
  public getOkAccounts(applicantId: string, applicationId: string): Observable<AccountDto[]> {
    const params = { applicantId, applicationId };
    return this.http.get<AccountDto[]>(this.baseUrl + `/account/ok-accounts`, { params });
  }
}
