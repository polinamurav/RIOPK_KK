import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantIpdlOperationGetDto, ApplicantIpdlOperationPostDto } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantIpdlOperationControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка должностных лиц от имени которых планируется совершать операции
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantIpdlOperationGetDto[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantIpdlOperationGetDto[]> {
    const params = { applicant_id, application_id };
    return this.http.get<ApplicantIpdlOperationGetDto[]>(
      this.baseUrl + `/applicant-ipdl-operation/applicationIdAndApplicantId`,
      { params }
    );
  }

  /**
   * Обновление списка должностных лиц от имени которых планируется совершать операции
   * @param applicantIpdlOperationsInfo: список должностных лиц
   * @returns Observable<ApplicantIpdlOperationGetDto>
   */
  public update(applicantIpdlOperationsInfo: ApplicantIpdlOperationPostDto): Observable<ApplicantIpdlOperationGetDto> {
    return this.http.post<ApplicantIpdlOperationGetDto>(
      this.baseUrl + `/applicant-ipdl-operation/update`,
      applicantIpdlOperationsInfo
    );
  }

  /**
   * Создание списка должностных лиц от имени которых планируется совершать операции
   * @param applicantIpdlOperationsInfo: список должностных лиц
   * @returns Observable<ApplicantIpdlOperationGetDto>
   */
  public create(applicantIpdlOperationsInfo: ApplicantIpdlOperationPostDto): Observable<ApplicantIpdlOperationGetDto> {
    return this.http.post<ApplicantIpdlOperationGetDto>(
      this.baseUrl + `/applicant-ipdl-operation/create`,
      applicantIpdlOperationsInfo
    );
  }

  /**
   * Удаление записи из списка должностных лиц от имени которых планируется совершать операции
   * @param id: id записи
   * @returns Observable<any>
   */
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/applicant-ipdl-operation/${id}`);
  }
}
