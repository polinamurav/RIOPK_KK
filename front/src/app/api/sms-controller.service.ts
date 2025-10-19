import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmsCode } from '@app/_models';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class SmsControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Отправка SMS-кода
   * @param phoneNumber: Телефонный номер
   * @returns Observable<UserDto>
   */
  public sendSms(
    applicantId: number | string,
    applicationId: number | string,
    phoneNumber: number | string
  ): Observable<SmsCode> {
    return this.http.post<SmsCode>(this.path + `/sms/send`, { applicantId, applicationId, phoneNumber });
  }
}
