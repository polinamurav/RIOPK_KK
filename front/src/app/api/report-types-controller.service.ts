import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ReportType } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ReportTypesControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка всех видов отчетности
   * @returns Observable<ReportType[]>
   */
  public getAll(): Observable<ReportType[]> {
    return this.http.get<ReportType[]>(`${this.baseUrl}/report-types`);
  }
}
