import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantDirOperationTypeGetDto, ApplicantDirOperationTypePostDto } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantOperationTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка типов операций
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantDirOperationTypeGetDto[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantDirOperationTypeGetDto[]> {
    const params = { applicant_id, application_id };
    return this.http
      .get<ApplicantDirOperationTypeGetDto[]>(
        this.baseUrl + `/applicant-dir-operation-type/applicationIdAndApplicantId`,
        { params }
      )
      .pipe(
        map((dirItemsArray: ApplicantDirOperationTypeGetDto[]) =>
          dirItemsArray.filter((item: ApplicantDirOperationTypeGetDto) => item.dirOperationType.active === true)
        )
      );
  }

  /**
   * Обновление списка типов операций
   * @param applicantIncomeInfo: тип операции
   * @returns Observable<ApplicantDirOperationTypeGetDto>
   */
  public update(
    applicantOperationInfo: ApplicantDirOperationTypePostDto
  ): Observable<ApplicantDirOperationTypeGetDto[]> {
    return this.http.post<ApplicantDirOperationTypeGetDto[]>(
      this.baseUrl + `/applicant-dir-operation-type/update`,
      applicantOperationInfo
    );
  }
}
