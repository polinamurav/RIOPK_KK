import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ProgressBar } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ProgressBarControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение информации о маршруте прохождения заявки по applicationId
   * @param applicationId: number | string
   * @returns Observable<ProgressBar[]>
   */
  public getProgressBarByApplicationId(applicationId: number | string): Observable<ProgressBar[]> {
    return this.http.get<ProgressBar[]>(`${this.baseUrl}/progressBar/${applicationId}`);
  }
}
