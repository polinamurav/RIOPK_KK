import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { BRMSRuleGroupDto } from '@app/_models/api-models-mass-segment/rule-group';

@Injectable({
  providedIn: 'root'
})
export class RuleGroupControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка BRMSRuleGroupDto
   * @returns Observable of BRMSRuleGroupDto
   */
  public getList(): Observable<BRMSRuleGroupDto[]> {
    return this.http.get<BRMSRuleGroupDto[]>(`${this.baseUrl}/brms-rule-group`);
  }
}
