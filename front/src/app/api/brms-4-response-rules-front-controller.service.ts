import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BRMS4ResponseRules } from '@app/_models/api-models/brms';

@Injectable({ providedIn: 'root' })
export class Brms4ResponseRulesFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMS4ResponseRules[]
   */
  public getAll(): Observable<BRMS4ResponseRules[]> {
    return this.http.get<BRMS4ResponseRules[]>(`${this.baseUrl}/brms4-response-rules`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of BRMS4ResponseRules
   */
  public getById(id: number | string): Observable<BRMS4ResponseRules> {
    return this.http.get<BRMS4ResponseRules>(`${this.baseUrl}/brms4-response-rules/${id}`);
  }
}
