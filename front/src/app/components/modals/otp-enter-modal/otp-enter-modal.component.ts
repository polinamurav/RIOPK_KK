import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CredentialsService } from '@app/services/authentication';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SmsControllerService } from '@app/api/sms-controller.service';
import { ApplicationPagedInfoDto } from '@app/_models';
import { catchError } from 'rxjs/operators';
import { ToastService } from '@app/services/toast.service';
import { ApplicationControllerService } from '@app/api';
import { throwError } from 'rxjs';

@Component({
  templateUrl: './otp-enter-modal.component.html',
  styleUrls: ['./otp-enter-modal.component.scss']
})
export class OtpEnterModalComponent implements OnInit {
  public formGroup: FormGroup;
  public isSubmitted: boolean = false;
  public isSmsExist: boolean = false;
  public isLoading: boolean = false;
  public isCancelRoleAvail: boolean = false;
  public codeMaxLength = 4;
  public footerConfigSource: string = 'common.otp';

  private selectedItem: ApplicationPagedInfoDto;
  private managerDeclineReasonCode: string = '004';

  constructor(
    private dialogRef: MatDialogRef<OtpEnterModalComponent>,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private smsService: SmsControllerService,
    private credentialsService: CredentialsService,
    private applicationControllerService: ApplicationControllerService,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationPagedInfoDto
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setDeclineRole();
  }

  sendSms() {
    this.isLoading = true;
    this.isSmsExist = false;

    this.smsService.sendSms(this.data.applicantId, this.data.id, this.data.mobilePhone).subscribe(
      res => {
        this.isLoading = false;
        this.isSmsExist = true;
        this.toastService.viewMsg('SuccessMessage.SmsSent', 'success');
      },
      err => {
        this.toastService.viewMsg('ErrorMessage.SmsWasNotSent', 'error');
      }
    );
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'decline': {
        this.decline();
        break;
      }
      case 'cancel': {
        this.closeModal();
        break;
      }
      default: {
        break;
      }
    }
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(this.codeMaxLength), Validators.pattern(/^[0-9]+$/)]]
    });
  }

  private setDeclineRole() {
    this.isCancelRoleAvail =
      !!this.credentialsService.isCreditManager ||
      !!this.credentialsService.isCallCenter ||
      !!this.credentialsService.isVideoBank ||
      !!this.credentialsService.isDSA;
  }

  private submitForm() {
    if (this.formGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.isSubmitted = true;

    this.acceptSms(this.formGroup.getRawValue().code);
  }

  private decline() {
    this.isLoading = true;
    this.isSubmitted = true;

    this.declineApp();
  }

  private closeModal(needRefresh: boolean = false) {
    this.dialogRef.close({ needRefresh });
  }

  private acceptSms(code: string) {
    this.applicationControllerService
      .acceptSmsCode(this.data.applicantId.toString(), this.data.id.toString(), code)
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.closeModal(true);

        if (!res) {
          this.toastService.viewMsg('SuccessMessage.SentForProcessing', 'success');
        } else {
          this.toastService.viewMsg(res.message, 'warning');
        }
      });
  }

  private declineApp() {
    this.applicationControllerService
      .declineApp(this.data.id.toString(), this.managerDeclineReasonCode)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      )
      .subscribe(res => {
        this.closeModal(true);
        this.toastService.viewMsg('SuccessMessage.Denied', 'success');
      });
  }
}
