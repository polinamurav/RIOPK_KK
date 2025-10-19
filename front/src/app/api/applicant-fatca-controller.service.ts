import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantFatcaDtoGet, ApplicantFatcaDtoPost } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicantFatcaAdditionalDto } from '@app/_models/api-models/applicant-fatca-additional-dto';

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

  public getByAdditionalFatca(
    applicant_id: string | number,
    application_id: string | number
  ): Observable<ApplicantFatcaAdditionalDto> {
    const params = { applicant_id, application_id };
    return this.http.get<ApplicantFatcaAdditionalDto>(
      this.baseUrl + `/applicant-fatca-additional/applicationIdAndApplicantId`,
      {
        params
      }
    );
  }

  public create(fatcaInfo: ApplicantFatcaAdditionalDto): Observable<ApplicantFatcaAdditionalDto> {
    return this.http.post<ApplicantFatcaAdditionalDto>(this.baseUrl + `/applicant-fatca-additional/create`, fatcaInfo);
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
