import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantIpdlGetDto, ApplicantIpdlPostDto } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantIpdlControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка типов должностных лиц
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantIpdlGetDto[]>
   */
  public getByApplicantIdAndApplicationId(
    applicant_id: string,
    application_id: string
  ): Observable<ApplicantIpdlGetDto[]> {
    const params = { applicant_id, application_id };
    return this.http
      .get<ApplicantIpdlGetDto[]>(this.baseUrl + `/applicant-ipdl/applicationIdAndApplicantId`, { params })
      .pipe(
        map((dirItemsArray: ApplicantIpdlGetDto[]) =>
          dirItemsArray.filter((item: ApplicantIpdlGetDto) => item.dirIpdl.active === true)
        )
      );
  }

  /**
   * Обновление списка типов должностных лиц
   * @param applicantIpdlInfo: список типов должностных лиц
   * @returns Observable<ApplicantIpdlGetDto>
   */
  public update(applicantIpdlInfo: ApplicantIpdlPostDto): Observable<ApplicantIpdlGetDto> {
    return this.http.post<ApplicantIpdlGetDto>(this.baseUrl + `/applicant-ipdl/update`, applicantIpdlInfo);
  }

  /**
   * Создание списка типов должностных лиц
   * @param applicantIpdlInfo: список типов должностных лиц
   * @returns Observable<ApplicantIpdlGetDto>
   */
  public create(applicantIpdlInfo: ApplicantIpdlPostDto): Observable<ApplicantIpdlGetDto> {
    return this.http.post<ApplicantIpdlGetDto>(this.baseUrl + `/applicant-ipdl/create`, applicantIpdlInfo);
  }
}
