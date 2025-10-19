import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BRMSFinalMatrix, BRMSFinalMatrixDto } from '@app/_models/api-models/brms';

@Injectable({ providedIn: 'root' })
export class BrmsFinalMatrixFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}
  /**
   * обновление
   * @param applicationId  string | number для GET запроса
   * @param userMatrixItem BRMSFinalMatrix для GET запроса
   * @returns Observable of BRMSFinalMatrixDto
   */
  public calculateMatrix(
    applicationId: string | number,
    userMatrixItem: BRMSFinalMatrixDto
  ): Observable<BRMSFinalMatrixDto> {
    return this.http.post<BRMSFinalMatrixDto>(
      `${this.baseUrl}/brms-final-matrix/calculate-matrix/${applicationId}`,
      userMatrixItem
    );
  }

  /**
   * Получение возможных условий
   * @param applicationId id для GET запроса
   * @returns Observable of BRMSFinalMatrixDto[]
   */
  public getPossibleMatrix(applicationId: string): Observable<BRMSFinalMatrixDto[]> {
    const params = { applicationId };
    return this.http.get<BRMSFinalMatrixDto[]>(`${this.baseUrl}/brms-final-matrix/possible-matrix`, { params });
  }

  /**
   * Получение предварительно одобренных условий
   * @param applicationId id для GET запроса
   * @returns Observable of BRMSFinalMatrixDto[]
   */
  public getPreapproveMatrix(applicationId: string): Observable<BRMSFinalMatrixDto[]> {
    const params = { applicationId };
    return this.http.get<BRMSFinalMatrixDto[]>(`${this.baseUrl}/brms-final-matrix/preapprove-matrix`, { params });
  }
}
