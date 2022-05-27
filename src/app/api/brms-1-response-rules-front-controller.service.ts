import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BRMS1ResponseRules } from '@app/_models/api-models/brms';

@Injectable({ providedIn: 'root' })
export class Brms1ResponseRulesFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMS1ResponseRules[]
   */
  public getAll(): Observable<BRMS1ResponseRules[]> {
    return this.http.get<BRMS1ResponseRules[]>(`${this.baseUrl}/brms1-response-rules`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of BRMS1ResponseRules
   */
  public getById(id: number | string): Observable<BRMS1ResponseRules> {
    return this.http.get<BRMS1ResponseRules>(`${this.baseUrl}/brms1-response-rules/${id}`);
  }
}
