import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BRMS2ResponseRules } from '@app/_models/api-models/brms';

@Injectable({ providedIn: 'root' })
export class Brms2ResponseRulesFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMS2ResponseRules[]
   */
  public getAll(): Observable<BRMS2ResponseRules[]> {
    return this.http.get<BRMS2ResponseRules[]>(`${this.baseUrl}/brms2-response-rules`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of BRMS2ResponseRules
   */
  public getById(id: number | string): Observable<BRMS2ResponseRules> {
    return this.http.get<BRMS2ResponseRules>(`${this.baseUrl}/brms2-response-rules/${id}`);
  }
}
