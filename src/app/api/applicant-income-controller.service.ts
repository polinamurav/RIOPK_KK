import { ApplicantIncomeGetDto, ApplicantIncomePostDto } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicantIncomeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка доходов
   * @param applicant_id: id заявителя
   * @param application_id: id приложения
   * @param stage_id: id этапа
   * @returns Observable<ApplicantIncomeGetDto[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string,
    stage_id: string
  ): Observable<ApplicantIncomeGetDto[]> {
    const params = { applicant_id, application_id, stage_id };
    return this.http.get<ApplicantIncomeGetDto[]>(this.baseUrl + `/applicant-income/applicationIdAndApplicantId`, {
      params
    });
  }

  /**
   * Обновление списка доходов
   * @param applicantIncome: доход
   * @returns Observable<ApplicantIncomeGetDto>
   */
  public update(applicantIncome: ApplicantIncomePostDto): Observable<ApplicantIncomeGetDto[]> {
    return this.http.post<ApplicantIncomeGetDto[]>(this.baseUrl + `/applicant-income/update`, applicantIncome);
  }

  /**
   * Создание списка доходов
   * @param applicantIncome: доход
   * @returns Observable<ApplicantIncomeGetDto>
   */
  public create(applicantIncome: ApplicantIncomePostDto): Observable<ApplicantIncomeGetDto> {
    return this.http.post<ApplicantIncomeGetDto>(this.baseUrl + `/applicant-income/create`, applicantIncome);
  }

  /**
   * Удаление дохода
   * @param id: id записи
   * @returns Observable<any>
   */
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/applicant-income/${id}`);
  }
}
