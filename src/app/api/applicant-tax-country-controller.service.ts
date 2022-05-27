import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantTaxCountryDtoGet, ApplicantTaxCountryDtoPost } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantTaxCountryControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка tax-country
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantTaxCountryDtoGet[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantTaxCountryDtoGet[]> {
    const params = { applicant_id, application_id };
    return this.http.get<ApplicantTaxCountryDtoGet[]>(
      this.baseUrl + `/applicant-tax-country/applicationIdAndApplicantId`,
      { params }
    );
  }

  /**
   * Обновление списка tax-country
   * @param taxCountrylInfo: список стран
   * @returns Observable<ApplicantTaxCountryDtoGet>
   */
  public update(taxCountrylInfo: ApplicantTaxCountryDtoPost): Observable<ApplicantTaxCountryDtoGet[]> {
    return this.http.post<ApplicantTaxCountryDtoGet[]>(this.baseUrl + `/applicant-tax-country/update`, taxCountrylInfo);
  }

  /**
   * Создание списка tax-country
   * @param taxCountrylInfo: список стран
   * @returns Observable<ApplicantTaxCountryDtoGet>
   */
  public create(taxCountrylInfo: ApplicantTaxCountryDtoPost): Observable<ApplicantTaxCountryDtoGet> {
    return this.http.post<ApplicantTaxCountryDtoGet>(this.baseUrl + `/applicant-tax-country/create`, taxCountrylInfo);
  }

  /**
   * Удаление записи из списка tax-country
   * @param id: id записи
   * @returns Observable<any>
   */
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/applicant-tax-country/${id}`);
  }
}
