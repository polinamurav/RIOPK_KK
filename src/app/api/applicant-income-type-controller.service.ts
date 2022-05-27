import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantIncomeTypeGetDto, ApplicantIncomeTypePostDto } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantIncomeTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка типов дохода
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantIncomeTypeGetDto[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantIncomeTypeGetDto[]> {
    const params = { applicant_id, application_id };
    return this.http.get<ApplicantIncomeTypeGetDto[]>(
      this.baseUrl + `/applicant-income-type/applicationIdAndApplicantId`,
      { params }
    );
  }

  /**
   * Обновление списка типов дохода
   * @param applicantIncomeInfo: тип дохода
   * @returns Observable<ApplicantIncomeTypeGetDto>
   */
  public update(applicantIncomeInfo: ApplicantIncomeTypePostDto): Observable<ApplicantIncomeTypeGetDto[]> {
    return this.http.post<ApplicantIncomeTypeGetDto[]>(
      this.baseUrl + `/applicant-income-type/update`,
      applicantIncomeInfo
    );
  }

  /**
   * Создание списка типов дохода
   * @param applicantIncomeInfo: тип дохода
   * @returns Observable<ApplicantIncomeTypeGetDto>
   */
  public create(applicantIncomeInfo: ApplicantIncomeTypePostDto): Observable<ApplicantIncomeTypeGetDto> {
    return this.http.post<ApplicantIncomeTypeGetDto>(
      this.baseUrl + `/applicant-income-type/create`,
      applicantIncomeInfo
    );
  }

  /**
   * Удаление типа дохода
   * @param id: id записи
   * @returns Observable<any>
   */
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/applicant-income-type/${id}`);
  }
}
