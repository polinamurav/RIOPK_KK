import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebcamModalComponent } from '@app/shared/components/modals/webcam-modal/webcam-modal.component';
import { tap } from 'rxjs/operators';
import { BpmFrontControllerService } from '@app/api';
import { ToastService } from '@app/services/toast.service';
import {WebSocketService} from "@app/services/web-socket.service";
import {TranslateService} from "@ngx-translate/core";
import {
  QrGenerateService
} from "@app/pages/dashboard/dashboard-page/tabs/credit-app/biometric-modal/qr-generate.service";

export interface IBiometricModalConfig {
  title: string;
  shortApplicationId: number;
  applicationId?: number;
}

@Component({
  selector: 'ngx-biometric-modal',
  templateUrl: './biometric-modal.component.html',
  styleUrls: ['./biometric-modal.component.scss']
})
export class BiometricModalComponent implements OnInit , OnDestroy{

  livenessCheckValid: boolean;
  disabledBtns: boolean;
  language: string = this.translate.currentLang;

  private livenessResult: boolean;

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
    private readonly webSocketService: WebSocketService,
    private readonly translate: TranslateService,
    private bpmFrontControllerService: BpmFrontControllerService,
    private qrGenerateService: QrGenerateService,
    private dialogRef: MatDialogRef<BiometricModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBiometricModalConfig
  ) {}

  get generateQr() {
    return `https://tst-rkk-documents.vtbank.am/#/biometric?isBiometric=true&applicationId=${this.data.shortApplicationId}&lang=${this.translate.currentLang}` + this.qrGenerateService.qrToken;
  }

  ngOnInit(): void {
    this.getBiometricFromWebSocket();
    // this.qrGenerateService.generateQrToken();
    console.log(this.generateQr)
  }

  ngOnDestroy() {
    this.webSocketService.unsubscribeOnStream(`/topic/getfile/${this.data.shortApplicationId}`);
  }

  confirm() {
    this.dialogRef.close({
      passed: this.livenessCheckValid,
      result: this.livenessResult
    });
  }

  openWebCam() {
    const dialog = this.dialog.open(WebcamModalComponent, {
      data: {},
      width: '40%'
    });

    dialog
      .afterClosed()
      .pipe(
        tap(res => {
          console.log(res);
          if (res.name) {
            this.checkBiometric(res.imgAsString);
          }
        })
      )
      .subscribe();
  }

  checkBiometric(base64: string) {
    this.disabledBtns = true;
    const content = base64.includes('base64') ?  base64.split('base64,')[1] : base64;

    const requestData: { content: string; shortApplicationId: number; applicationId?: number } = {
      content,
      shortApplicationId: this.data.shortApplicationId
    };

    if (this.data.applicationId) {
      requestData.applicationId = this.data.applicationId;
    }

    this.bpmFrontControllerService
      .livenessCheck(requestData)
      .pipe(
        tap(res => {

          this.bpmFrontControllerService.sendResponseBiometric(res, this.data.shortApplicationId);

          if(res.errorMessageRu || res.errorMessageAm) {
            this.toastService.viewMsg(this.language === 'ru' ? res.errorMessageRu : res.errorMessageAm, 'error');
          }

          this.livenessCheckValid = res.errorMessageAm ? false : !res.errorBiometrics && !res.errorLiveliness;
          this.livenessResult = res.result;
          this.disabledBtns = false;

        })
      )
      .subscribe();
  }

  getBiometricFromWebSocket = () => {
    this.webSocketService.subscribeOnStream(`/topic/getfile/${this.data.shortApplicationId}`, (response: any) => {

      console.log('response from socket')

      if(!response.result) {
        this.toastService.viewMsg(response.errorMessage, 'error');
        return
      }

      this.checkBiometric(response.content)




    });
  }

}
