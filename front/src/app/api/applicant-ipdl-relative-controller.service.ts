import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantIpdlRelativeGetDto, ApplicantIpdlRelativePostDto } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantIpdlRelativeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка должностных лиц с которыми имеется родство
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantIpdlRelativeGetDto[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantIpdlRelativeGetDto[]> {
    const params = { applicant_id, application_id };
    return this.http.get<ApplicantIpdlRelativeGetDto[]>(
      this.baseUrl + `/applicant-ipdl-relative/applicationIdAndApplicantId`,
      { params }
    );
  }

  /**
   * Обновление списка должностных лиц с которыми имеется родство
   * @param applicantIpdlRelativesInfo: список должностных лиц
   * @returns Observable<ApplicantIpdlRelativeGetDto>
   */
  public update(applicantIpdlRelativesInfo: ApplicantIpdlRelativePostDto): Observable<ApplicantIpdlRelativeGetDto> {
    return this.http.post<ApplicantIpdlRelativeGetDto>(
      this.baseUrl + `/applicant-ipdl-relative/update`,
      applicantIpdlRelativesInfo
    );
  }

  /**
   * Создание списка должностных лиц с которыми имеется родство
   * @param applicantIpdlRelativesInfo: список должностных лиц
   * @returns Observable<ApplicantIpdlRelativeGetDto>
   */
  public create(applicantIpdlRelativesInfo: ApplicantIpdlRelativePostDto): Observable<ApplicantIpdlRelativeGetDto> {
    return this.http.post<ApplicantIpdlRelativeGetDto>(
      this.baseUrl + `/applicant-ipdl-relative/create`,
      applicantIpdlRelativesInfo
    );
  }

  /**
   * Удаление записи из списка должностных лиц с которыми имеется родство
   * @param id: id записи
   * @returns Observable<any>
   */
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/applicant-ipdl-relative/${id}`);
  }
}
