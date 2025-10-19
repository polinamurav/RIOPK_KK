import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OtpDataService, OtpType } from '@app/components/otp/otp-data.service';
import { Application, EInputType } from '@app/_models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  providers: [OtpDataService]
})
export class OtpComponent implements OnInit {
  OtpType = OtpType;
  EInputType = EInputType;

  @Input() shortForm: FormGroup;
  @Input() blockOtp: boolean = true;
  @Input() isAbsLoading: boolean = true;
  @Input() mode: OtpType.SMS | OtpType.EMAIL | null = null;
  @Input() phoneValidation: boolean = false;
  @Input() appDto: Application;

  @Output() smsSendEvent$ = new EventEmitter();
  @Output() emailSendEvent$ = new EventEmitter();
  @Output() otpValidationEvent = new EventEmitter();
  @Output() otpTypeEvent = new EventEmitter();
  @Output() triggerValidation = new EventEmitter();
  @Output() isOtpSuccess = new EventEmitter();

  constructor(private otpDataService: OtpDataService) {}

  get disabledSendSms() {
    if (this.mode === OtpType.SMS) {
      const phoneControl = this.shortForm.get('phone');
      return phoneControl ? phoneControl.invalid : true;
    } else if (this.mode === OtpType.EMAIL) {
      return this.otpEmailControl ? this.otpEmailControl.invalid : true;
    }
    return this.shortForm.invalid;
  }

  get enableResendSms(){
    return this.otpDataService.enableResendSms;
  }

  get disableSendEmail() {
    return this.otpDataService.disableSendEmail;
  }

  get isCodePhoneSuccess() {
    return this.otpDataService.isCodePhoneSuccess;
  }

  get isCodeEmailSuccess() {
    return this.otpDataService.isCodeEmailSuccess;
  }

  get timer() {
    return this.otpDataService.timer;
  }

  get otpCodePhoneControl() {
    return this.otpDataService.otpCodePhoneControl;
  }

  get otpCodeEmailCodeControl() {
    return this.otpDataService.otpCodeEmailCodeControl;
  }

  get isPhoneCodeValid() {
    return this.otpDataService.isPhoneCodeValid;
  }

  get isEmailCodeValid() {
    return this.otpDataService.isEmailCodeValid;
  }

  get otpEmailControl() {
    return this.otpDataService.otpEmailControl;
  }

  get currentOtpType() {
    return this.otpDataService.currentOtpType;
  }

  get otpRadioControl() {
    return this.otpDataService.otpRadioControl;
  }

  get visibleOtpControls() {
    return this.otpDataService.visibleOtpControls;
  }

  get radioInfo() {
    return this.otpDataService.radioInfo;
  }

  get isEmailButtonDisabled(): boolean {
    let result: boolean;

    if (this.mode) {
      result = this.disableSendEmail || this.isEmailCodeValid || this.enableResendSms;
    } else {
      result = this.disableSendEmail || !this.isCodePhoneSuccess || this.isEmailCodeValid;
    }

    return result;
  }

  ngOnInit(): void {
    this.otpDataService.init(this.shortForm, this.smsSendEvent$, this.emailSendEvent$,
      this.otpValidationEvent, this.appDto);

    this.otpDataService.setMode(this.mode);

    const initialType = this.mode === OtpType.EMAIL ? OtpType.EMAIL : OtpType.SMS;
    this.otpTypeEvent.emit(initialType);
    this.otpDataService.setCurrentOtpType(initialType);

    this.otpValidationEvent.subscribe(event => {
      if (event.valid) {
        let result: any;
        if (event.email && this.mode === OtpType.EMAIL) {
          result = {
            email: event.email,
          };
        } else if (event.mobilePhone&& this.mode === OtpType.SMS) {
          result = {
            mobilePhone: event.mobilePhone,
            isOtp: this.otpDataService.currentOtpType === OtpType.SMS
          };
        }

        if (result) {
          this.isOtpSuccess.emit(result);
        }
      }
    });
  }

  sendCode(type: string | any) {
    this.triggerValidation.emit()
    if(!this.disabledSendSms) {
      setTimeout(() => {
        this.otpDataService.setOtpControlVisible(type);
      }, 300)
    }
  }
}
