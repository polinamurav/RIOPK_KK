import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuranceInfo, InsuranceInfoDto } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceInfoControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение информации о страховании
   * @returns Observable of InsuranceInfo
   */
  public getList(): Observable<InsuranceInfo> {
    return this.http.get<InsuranceInfo>(`${this.baseUrl}/insurance-info`);
  }

  /**
   * Создание информации о страховании
   * @returns Observable of AccountIssueGetDto
   */
  public create(insuranceInfo: InsuranceInfoDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/insurance-info`, insuranceInfo);
  }

  /**
   * Обновление информации о страховании
   * @returns Observable of AccountIssueGetDto
   */
  public update(insuranceInfo: InsuranceInfoDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/insurance-info/update`, insuranceInfo);
  }
}
