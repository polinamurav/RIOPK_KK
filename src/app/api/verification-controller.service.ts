import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import {
  VerificationDto,
  VerificationFrontDtoGet,
  VerificationFrontDtoPost,
  VerificationPhone
} from '@app/_models';

@Injectable({ providedIn: 'root' })
export class VerificationControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение данных формы верификации
   * @param applicantId id пользователя
   * @param applicationId id приложения
   * @returns Observable<VerificationDto>
   */
  public getVerification(applicantId: string, applicationId: string): Observable<VerificationFrontDtoGet> {
    return this.http.get<VerificationFrontDtoGet>(this.path + `/verification/getAll`, {
      params: { applicantId, applicationId }
    });
  }

  /**
   * Сохранение данных формы верификации
   * @param data: Verification
   * @returns Observable<VerificationFrontDtoPost>
   */
  public saveVerification(data: VerificationFrontDtoPost): Observable<VerificationFrontDtoPost> {
    return this.http.post<VerificationFrontDtoPost>(this.path + `/verification/saveAll`, data);
  }

  /**
   * Сохранение данных верификации phone
   * @param data: VerificationPhone
   * @returns Observable<VerificationPhone>
   */
  public saveVerificationPhone(data: VerificationPhone): Observable<VerificationPhone> {
    return this.http.post<VerificationPhone>(this.path + `/verification-phone`, data);
  }
}
