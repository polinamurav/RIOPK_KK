import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantPhoto, ApplicantPhotoDto } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantPhotoControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение фотографий заявителя
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<ApplicantPhoto>
   */
  public getByApplicantIdAndApplicationId(applicantId: string, applicationId: string): Observable<ApplicantPhoto> {
    return this.http.get<ApplicantPhoto>(this.baseUrl + `/applicant-photo/${applicationId}/${applicantId}`);
  }

  /**
   * Обновление фотографий заявителя
   * @returns Observable<number>
   */
  public update(applicantPhotoDto: ApplicantPhotoDto): Observable<number> {
    return this.http.post<number>(this.baseUrl + `/applicant-photo/update`, applicantPhotoDto);
  }
}
