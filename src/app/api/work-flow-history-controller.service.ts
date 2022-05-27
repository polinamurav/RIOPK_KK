import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { WorkFlowHistoryDto } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowHistoryControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получить историю процесса
   * @param applicationId для GET запроса
   * @returns Observable of WorkFlowHistoryDto[]
   */
  public getByApplicationId(applicationId: string): Observable<WorkFlowHistoryDto[]> {
    const params = { applicationId };
    return this.http.get<WorkFlowHistoryDto[]>(`${this.baseUrl}/work-flow-history/findByApplicationId`, { params });
  }
}
