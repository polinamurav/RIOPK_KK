import { BRMS2Matrix, BRMS2MatrixDto } from '@app/_models/api-models/brms';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class Brms2MatrixFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMS2Matrix[]
   */
  public getAll(): Observable<BRMS2Matrix[]> {
    return this.http.get<BRMS2Matrix[]>(`${this.baseUrl}/brms2-matrix`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of BRMS2Matrix
   */
  public getById(id: number | string): Observable<BRMS2Matrix> {
    return this.http.get<BRMS2Matrix>(`${this.baseUrl}/brms2-matrix/${id}`);
  }

  /**
   * обновление
   * @param applicationId  string | numberдля GET запроса
   * @param userMatrixItem BRMS2Matrix для GET запроса
   * @returns Observable of BRMS2MatrixDto
   */
  public calculateMatrix(applicationId: string | number, userMatrixItem: BRMS2MatrixDto): Observable<BRMS2MatrixDto> {
    return this.http.post<BRMS2MatrixDto>(
      `${this.baseUrl}/brms2-matrix/calculate-matrix/${applicationId}`,
      userMatrixItem
    );
  }

  /**
   * Получение предварительно одобренных условий
   * @param applicationId id для GET запроса
   * @returns Observable of BRMS2Matrix[]
   */
  public getPreapproveMatrix(applicationId: string): Observable<BRMS2MatrixDto[]> {
    const params = { applicationId };
    return this.http.get<BRMS2MatrixDto[]>(`${this.baseUrl}/brms2-matrix/preapprove-matrix`, { params });
  }
}
