import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BRMS3ResponseRules } from '@app/_models/api-models/brms';

@Injectable({ providedIn: 'root' })
export class Brms3ResponseRulesFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMS3ResponseRules[]
   */
  public getAll(): Observable<BRMS3ResponseRules[]> {
    return this.http.get<BRMS3ResponseRules[]>(`${this.baseUrl}/brms3-response-rules`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of BRMS3ResponseRules
   */
  public getById(id: number | string): Observable<BRMS3ResponseRules> {
    return this.http.get<BRMS3ResponseRules>(`${this.baseUrl}/brms3-response-rules/${id}`);
  }

  /**
   * Получение деталей по brms3Response id
   * @param brms3ResponseId brms3ResponseId для GET запроса
   * @returns Observable of BRMS3ResponseRules
   */
  public getWarningBrmsRules(brms3ResponseId: string | number): Observable<BRMS3ResponseRules[]> {
    return this.http.get<BRMS3ResponseRules[]>(`${this.baseUrl}/brms3-response-rules/warning/${brms3ResponseId}`);
  }

  /**
   * Получение сработавших правил
   * @param brms3ResponseId brms3ResponseId для GET запроса
   * @returns Observable of BRMS3ResponseRules
   */
  public getReferBrmsRules(brms3ResponseId: string | number): Observable<BRMS3ResponseRules[]> {
    return this.http.get<BRMS3ResponseRules[]>(`${this.baseUrl}/brms3-response-rules/refer/${brms3ResponseId}`);
  }
}
