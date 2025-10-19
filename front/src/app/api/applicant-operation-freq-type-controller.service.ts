import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantOperationFreqTypeGetDto, ApplicantOperationFreqTypePostDto } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantOperationFreqTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка частоты и объема операций
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantOperationFreqTypeGetDto[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantOperationFreqTypeGetDto[]> {
    const params = { applicant_id, application_id };
    return this.http
      .get<ApplicantOperationFreqTypeGetDto[]>(
        this.baseUrl + `/applicant-operation-freq-type/applicationIdAndApplicantId`,
        { params }
      )
      .pipe(
        map((dirItemsArray: ApplicantOperationFreqTypeGetDto[]) =>
          dirItemsArray.filter((item: ApplicantOperationFreqTypeGetDto) => item.dirOperationFreqType.active === true)
        )
      );
  }

  /**
   * Обновление списка частоты и объема операций
   * @param applicantIncomeInfo: тип операции
   * @returns Observable<ApplicantDirOperationTypeGetDto>
   */
  public update(
    applicantOperationFreqInfo: ApplicantOperationFreqTypePostDto
  ): Observable<ApplicantOperationFreqTypeGetDto[]> {
    return this.http.post<ApplicantOperationFreqTypeGetDto[]>(
      this.baseUrl + `/applicant-operation-freq-type/update`,
      applicantOperationFreqInfo
    );
  }
}
