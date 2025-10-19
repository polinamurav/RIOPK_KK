import {
  CheckCodeRq,
  CreditUserInfoDto,
  LivenessCheckResponseDto,
  ResponseCommonDto,
  SendOtpRq,
  SendOtpRs,
  ShortEkengRqDto
} from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';

@Injectable({ providedIn: 'root' })
export class BpmFrontControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient, private downloadUploadFileService: DownloadUploadFileService) {}

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

  /**
   * Перезапуск заявки Refinance
   * @param applicationId: applicationId
   * @returns Observable<applicationId>
   */
  public refinanceSignalReset(applicationId: string | number): Observable<string> {
    return this.http.post<string>(this.path + `/bpm-front/restart/${applicationId}`, { applicationId });
  }

  public posAppRestart(applicationId: string | number, stageId: string) {
    return this.http.get(this.path + `/bpm-pos-front/restart?applicationId=${applicationId}&stageId=${stageId}`);
  }

  public posAppRestartError(applicationId: string | number) {
    return this.http.get(this.path + `/bpm-pos-front/restart-from-error?applicationId=${applicationId}`);
  }

  public isBiometricPassed(applicationId: string | number): Observable<boolean> {
    return this.http.get<boolean>(this.path + `/bpm-front/biometric_passed/${applicationId}`);
  }

  public callEkengGosRegistr(data: ShortEkengRqDto) {
    return this.http.post<SendOtpRs>(this.path + `/bpm-front/ekeng`, data);
  }

  public sendEmailCode(data: SendOtpRq) {
    return this.http.post<SendOtpRs>(this.path + `/bpm-front/send-email`, data);
  }

  public sendSmsCode(data: SendOtpRq) {
    return this.http.post<SendOtpRs>(this.path + `/bpm-front/send-sms`, data);
  }

  public checkSmsCode(data: CheckCodeRq) {
    return this.http.post<SendOtpRs>(this.path + `/bpm-front/check-sms`, data);
  }

  public checkEmailCode(data: CheckCodeRq) {
    return this.http.post<SendOtpRs>(this.path + `/bpm-front/check-email`, data);
  }

  public livenessCheck(data: { content: string; shortApplicationId: number;  applicationId?: number }) {
    return this.http.post<LivenessCheckResponseDto>(this.path + `/bpm-front/liveness_check`, data);
  }

  sendResponseBiometric(data: LivenessCheckResponseDto, applicationId: number) {
    this.http.post<any>(`/websocket/file/biometrics/${applicationId}`, data).toPromise().then();
  }

  // error-report
  public errorReport(applicationId: number | string) {
    this.http
      .get(`${this.path}/error-report/download?applicationId=${applicationId}`, {
        responseType: 'blob',
        observe: 'response'
      })
      .toPromise()
      .then(resp => {
        this.downloadUploadFileService.saveFileAsBinary(resp);
      });
  }
}
