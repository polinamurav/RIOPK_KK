import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BRMSRuleType } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrmsRuleTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение типов правил BRMS
   * @returns Observable of BRMSRuleType
   */
  public getAll(): Observable<BRMSRuleType[]> {
    return this.http.get<BRMSRuleType[]>(`${this.baseUrl}/brms-rule-type`);
  }
}
