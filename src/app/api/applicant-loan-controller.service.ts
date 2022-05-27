import { ApplicantLoanGetDto, ApplicantLoanPostDto } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicantLoanControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}
  /**
   * Получение списка обязательств
   * @param applicant_id: id заявителя
   * @param application_id: id приложения
   * @param stage_id: id этапа
   * @returns Observable<ApplicantLoanGetDto[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string,
    stage_id: string
  ): Observable<ApplicantLoanGetDto[]> {
    const params = { applicant_id, application_id, stage_id };
    return this.http.get<ApplicantLoanGetDto[]>(this.baseUrl + `/applicant-loan/applicationIdAndApplicantId`, {
      params
    });
  }

  /**
   * Обновление списка обязательств
   * @param applicantIncome: доход
   * @returns Observable<ApplicantLoanGetDto>
   */
  public update(applicantIncome: ApplicantLoanPostDto): Observable<ApplicantLoanGetDto[]> {
    return this.http.post<ApplicantLoanGetDto[]>(this.baseUrl + `/applicant-loan/update`, applicantIncome);
  }

  /**
   * Создание списка обязательств
   * @param applicantIncome: доход
   * @returns Observable<ApplicantLoanGetDto>
   */
  public create(applicantIncome: ApplicantLoanPostDto): Observable<ApplicantLoanGetDto> {
    return this.http.post<ApplicantLoanGetDto>(this.baseUrl + `/applicant-loan/create`, applicantIncome);
  }

  /**
   * Удаление обязательств
   * @param id: id записи
   * @returns Observable<any>
   */
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/applicant-loan/${id}`);
  }
}
