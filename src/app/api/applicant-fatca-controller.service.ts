import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantFatcaDtoGet, ApplicantFatcaDtoPost } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantFatcaControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка fatca
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantFatcaDtoGet[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantFatcaDtoGet[]> {
    const params = { applicant_id, application_id };
    return this.http
      .get<ApplicantFatcaDtoGet[]>(this.baseUrl + `/applicant-fatca/applicationIdAndApplicantId`, {
        params
      })
      .pipe(
        map((dirItemsArray: ApplicantFatcaDtoGet[]) =>
          dirItemsArray.filter((item: ApplicantFatcaDtoGet) => item.dirFatca.active === true)
        )
      );
  }

  /**
   * Обновление списка fatca
   * @param fatcaInfo: список fatca
   * @returns Observable<ApplicantFatcaDtoGet>
   */
  public update(fatcaInfo: ApplicantFatcaDtoPost): Observable<ApplicantFatcaDtoGet[]> {
    return this.http.post<ApplicantFatcaDtoGet[]>(this.baseUrl + `/applicant-fatca/update`, fatcaInfo);
  }
}
