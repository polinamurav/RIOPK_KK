import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {CreditInfo, CreditInfoDto} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CreditInfoControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Сохранение файла
   * @param data Файл и информация о нём
   * @returns Observable of CreatedUpdatedParam>
   */
  public create(data: CreditInfoDto): Observable<CreditInfo> {
    return this.http.post<CreditInfo>(`${this.baseUrl}/credit-info`, data);
  }

  /**
   * Сохранение файла
   * @param data Файл и информация о нём
   * @returns Observable of CreatedUpdatedParam>
   */
  public update(data: CreditInfoDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/credit-info/update`, data);
  }

  /**
   * Обновление credit-info
   */
  public updateCreditInfo(data: Partial<CreditInfoDto>): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/credit-info/form/update`, data);
  }
}
