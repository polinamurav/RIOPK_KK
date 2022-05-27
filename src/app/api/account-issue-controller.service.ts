import { AccountIssueGetDto, AccountIssuePostDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AccountIssueControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * @param applicantId applicantId для GET запроса
   * @returns Observable of AccountIssueGetDto[]
   */
  public getByApplicantId(applicantId: number | string): Observable<AccountIssueGetDto[]> {
    return this.http.get<AccountIssueGetDto[]>(`${this.baseUrl}/account-issue/${applicantId}`);
  }

  /**
   * @param applicationId applicationId для GET запроса
   * @returns Observable of AccountIssueGetDto
   */
  public getByApplicationId(applicationId: number | string): Observable<AccountIssueGetDto> {
    return this.http.get<AccountIssueGetDto>(`${this.baseUrl}/account-issue/${applicationId}`);
  }

  /**
   * @param applicant_id applicantId для GET запроса
   * @param application_id applicationId для GET запроса
   * @returns Observable of AccountIssueGetDto
   */
  public getByApplicantIdAndApplicationId(
    applicantId: number | string,
    applicationId: number | string
  ): Observable<AccountIssueGetDto> {
    const params: TransformQueryParams = new TransformQueryParams({
      applicantId,
      applicationId
    });
    return this.http.get<AccountIssueGetDto>(`${this.baseUrl}/account-issue`, {
      params
    });
  }

  /**
   * Создание
   * @returns Observable of AccountIssueGetDto
   */
  public create(dtoPost: AccountIssueGetDto): Observable<AccountIssueGetDto> {
    return this.http.post<AccountIssueGetDto>(`${this.baseUrl}/account-issue/create`, dtoPost);
  }

  /**
   * Обновление
   * @returns Observable of AccountIssueGetDto
   */
  public update(dtoPost: AccountIssuePostDto): Observable<AccountIssueGetDto> {
    return this.http.post<AccountIssueGetDto>(`${this.baseUrl}/account-issue/update`, dtoPost);
  }
}
