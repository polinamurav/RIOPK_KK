import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DirIncomeTypeDto } from '@app/_models/api-models/DirIncomeTypeDto';

@Injectable({
  providedIn: 'root'
})
export class AvailableIncomeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   */

  public getIncomeType(applicantId: number): Observable<DirIncomeTypeDto[]> {
    return this.http.get<DirIncomeTypeDto[]>(`${this.baseUrl}/available_income/income_types/${applicantId}`);
  }
}
