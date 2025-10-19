import { ApplicantLoanDto, ApplicantLoanFilterDto, ApplicantLoanFilteredDto, TransformQueryParams } from '@app/_models';
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
   * @param applicationId: id приложения
   * @returns Observable<ApplicantLoanDto[]>
   */
  public getLoanObligationsOfApplicant(
    applicationId: number,
    filterParams: ApplicantLoanFilterDto
  ): Observable<ApplicantLoanFilteredDto> {
    const filterParamsReq = new TransformQueryParams({
      ...filterParams
    });
    return this.http.post<ApplicantLoanFilteredDto>(this.baseUrl + `/applicant-loan/${applicationId}`, filterParamsReq);
  }

  public clearSuspensive(applicationId: number): Observable<ApplicantLoanDto[]> {
    return this.http.get<ApplicantLoanDto[]>(this.baseUrl + `/applicant-loan/clear-suspensive/${applicationId}`);
  }

  /**
   * Обновление списка обязательств
   * @param applicantIncome: доход
   * @returns Observable<ApplicantLoanDto>
   */
  public update(applicantIncome: ApplicantLoanDto): Observable<ApplicantLoanDto[]> {
    return this.http.post<ApplicantLoanDto[]>(this.baseUrl + `/applicant-loan/update`, applicantIncome);
  }

  public setLoanObligationsOfApplicant(applicantLoanDto: ApplicantLoanDto | any): Observable<ApplicantLoanDto> {
    return this.http.post<ApplicantLoanDto>(this.baseUrl + `/applicant-loan`, applicantLoanDto);
  }

  public applicantLoanFiltered(applicationId: number) {
    return this.http.get<ApplicantLoanDto[]>(this.baseUrl + `/applicant-loan/filtered/${applicationId}`);
  }
}
