import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { NorqEkengAbsResponses } from '@app/_models/api-models/integration-norq';

@Injectable({ providedIn: 'root' })
export class IntegrationNorqControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение данных по вкладке "Информация о занятости"
   * @param param Параметры для GET запроса
   * @returns Observable of NorqEkengAbsResponses
   */
  public getById(applicationId: number): Observable<NorqEkengAbsResponses> {
    return this.http.get<NorqEkengAbsResponses>(`${this.baseUrl}/norq/norq-ekeng-abs/${applicationId}`);
  }
}
