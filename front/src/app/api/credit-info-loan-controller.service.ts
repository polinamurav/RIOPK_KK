import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CreditInfoLoanDto } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CreditInfoLoanControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Обновление обязательств
   * @param data
   * @returns Observable of CreditInfoLoanDto
   */
  public updateCreditInfo(data: CreditInfoLoanDto): Observable<CreditInfoLoanDto> {
    return this.http.post<CreditInfoLoanDto>(`${this.baseUrl}/credit-info`, data);
  }
}
