import { CreditUserInfoDto, ResponseCommonDto } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class BpmFrontControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Создание краткой заявки
   * @param creditUserInfoDto: CreditUserInfoDto
   * @returns Observable<ResponseCommonDto>
   */
  public startProcess(creditUserInfoDto: CreditUserInfoDto): Observable<ResponseCommonDto> {
    return this.http.post<ResponseCommonDto>(this.path + `/bpm-front/init`, creditUserInfoDto);
  }

  /**
   * Перезапуск заявки
   * @param applicationId: applicationId
   * @returns Observable<applicationId>
   */
  public signalRepeat(applicationId: string | number): Observable<string> {
    return this.http.post<string>(this.path + `/bpm-front/signalRepeat`, { applicationId });
  }

  /**
   * Перезапуск всех заявок со stage.id = 'ERROR'
   * @param applicationId: applicationId
   * @returns Observable<applicationId>
   */
  public repeatAll(): Observable<string> {
    return this.http.get<string>(this.path + `/bpm-front/signalRepeat/all`);
  }

  /**
   * Перезапуск заявки Refinance
   * @param applicationId: applicationId
   * @returns Observable<applicationId>
   */
  public refinanceSignalRepeat(applicationId: string | number): Observable<string> {
    return this.http.post<string>(this.path + `/bpm-front/refinance/signalRepeat`, { applicationId });
  }
}
