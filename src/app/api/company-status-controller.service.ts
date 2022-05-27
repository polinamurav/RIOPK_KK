import { CompanyStatus } from './../_models/api-models/company-status';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyStatusControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка статусов компаний
   * @returns Observable<CompanyStatus[]>
   */
  public getList(): Observable<CompanyStatus[]> {
    return this.http.get<CompanyStatus[]>(this.baseUrl + `/abs-company-status`);
  }
}
