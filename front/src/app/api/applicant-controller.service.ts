import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PageDTO } from '@app/_models';
import { HttpClient } from '@angular/common/http';
import { ApplicantDto, Applicant, ApplicantLiteDto, ApplicantPersDataDto } from '@app/_models/api-models/applicant';

@Injectable({ providedIn: 'root' })
export class ApplicantControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение деталей страницы по id:
   * @param id id для GET запроса по получению деталей страницы
   * @returns Observable of PageDTO<Applicant>>
   */
  public getById(id: number | string): Observable<PageDTO<Applicant>> {
    return this.http.get<PageDTO<Applicant>>(`${this.baseUrl}/applicants/${id}`);
  }

  /**
   * Сохранение заявки на кредит
   * @returns Observable of ApplicantDto
   */
  public update(appDto: ApplicantDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/applicants/update`, appDto);
  }

  public getApplicantLite(id: number | string): Observable<ApplicantLiteDto> {
    return this.http.get<ApplicantLiteDto>(`${this.baseUrl}/applicants/lite/${id}`);
  }

  public updatePersData(data: ApplicantPersDataDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/applicants/updatePersData`, data);
  }
}
