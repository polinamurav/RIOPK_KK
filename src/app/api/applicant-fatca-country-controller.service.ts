import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantFatcaCountryDtoGet, ApplicantFatcaCountryDtoPost } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantFatcaCountryControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка fatca-country
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantFatcaCountryDtoGet[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantFatcaCountryDtoGet[]> {
    const params = { applicant_id, application_id };
    return this.http.get<ApplicantFatcaCountryDtoGet[]>(
      this.baseUrl + `/applicant-fatca-country/applicationIdAndApplicantId`,
      { params }
    );
  }

  /**
   * Обновление списка fatca-country
   * @param fatcaCountryInfo: список fatca-country
   * @returns Observable<ApplicantFatcaCountryDtoGet>
   */
  public update(fatcaCountryInfo: ApplicantFatcaCountryDtoPost): Observable<ApplicantFatcaCountryDtoGet> {
    return this.http.post<ApplicantFatcaCountryDtoGet>(
      this.baseUrl + `/applicant-fatca-country/update`,
      fatcaCountryInfo
    );
  }

  /**
   * Создание списка fatca-country
   * @param fatcaCountryInfo: список fatca-country
   * @returns Observable<ApplicantFatcaCountryDtoGet>
   */
  public create(fatcaCountryInfo: ApplicantFatcaCountryDtoPost): Observable<ApplicantFatcaCountryDtoGet> {
    return this.http.post<ApplicantFatcaCountryDtoGet>(
      this.baseUrl + `/applicant-fatca-country/create`,
      fatcaCountryInfo
    );
  }

  /**
   * Удаление записи из списка fatca-country
   * @param id: id записи
   * @returns Observable<any>
   */
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/applicant-fatca-country/${id}`);
  }
}
