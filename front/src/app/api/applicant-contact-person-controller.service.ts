import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApplicantContactPerson, ApplicantContactPersonDto } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class ApplicantContactPersonControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка контаков
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantContactPerson[]>
   */
  public getByApplicantIdAndApplicationId(
    applicantId: string,
    applicationId: string
  ): Observable<ApplicantContactPerson[]> {
    return this.http.get<ApplicantContactPerson[]>(
      this.baseUrl + `/applicant-contact-person/${applicationId}/${applicantId}`
    );
  }

  /**
   * Создание контакта
   * @param applicantContact: контакт
   * @returns Observable<ApplicantContactPersonDto>
   */
  public create(applicantContact: Partial<ApplicantContactPersonDto>): Observable<ApplicantContactPersonDto> {
    return this.http.post<ApplicantContactPersonDto>(this.baseUrl + `/applicant-contact-person`, applicantContact);
  }

  /**
   * Обновление контакта
   * @param applicantContact: контакт
   * @returns Observable<ApplicantContactPersonDto>
   */
  public update(applicantContact: Partial<ApplicantContactPersonDto>): Observable<ApplicantContactPersonDto> {
    return this.http.post<ApplicantContactPersonDto>(
      this.baseUrl + `/applicant-contact-person/update`,
      applicantContact
    );
  }

  /**
   * Удаление контакта
   * @param id: id контакта
   * @returns Observable<null>
   */
  public delete(id: number): Observable<null> {
    return this.http.delete<null>(this.baseUrl + `/applicant-contact-person/${id}`);
  }
}
