import { BRMS4MatrixDto, BRMSFinalMatrixDto } from '@app/_models/api-models/brms';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CommentDto } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class Brms4MatrixFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMS4Matrix[]
   */
  public getAll(): Observable<BRMS4MatrixDto[]> {
    return this.http.get<BRMS4MatrixDto[]>(`${this.baseUrl}/brms4-matrix`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of BRMS4Matrix
   */
  public getById(id: number | string): Observable<BRMS4MatrixDto> {
    return this.http.get<BRMS4MatrixDto>(`${this.baseUrl}/brms4-matrix/${id}`);
  }

  /**
   * Расчет Matrix:
   * @param applicationId applicationId для GET запроса
   * @param income income для GET запроса
   * @param limitUnder limitUnder для GET запроса
   * @param numberOfEnrolment numberOfEnrolment для GET запроса
   * @returns Observable of BRMS4Matrix
   */
  public calculateMatrix(
    applicationId: string,
    income: string,
    limitUnder?: string,
    numberOfEnrolment?: string
  ): Observable<BRMS4MatrixDto[]> {
    const params =
      limitUnder != null && numberOfEnrolment != null
        ? { applicationId, income, limitUnder, numberOfEnrolment }
        : limitUnder != null
        ? { applicationId, income, limitUnder }
        : numberOfEnrolment != null
        ? { applicationId, income, numberOfEnrolment }
        : { applicationId, income };

    return this.http.get<BRMS4MatrixDto[]>(`${this.baseUrl}/brms4-matrix/calculate-matrix`, { params });
  }

  /**
   * Получение расчета Matrix:
   * @param applicationId applicationId для GET запроса
   * @returns Observable of BRMS4Matrix
   */
  public getCalculatedMatrix(applicationId: string): Observable<BRMS4MatrixDto[]> {
    const params = { applicationId };
    return this.http.get<BRMS4MatrixDto[]>(`${this.baseUrl}/brms4-matrix/calculated-matrix`, { params });
  }
}
