import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsFirstPayDateRsDto, Application, EInputType } from '@app/_models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import moment from 'moment';
import { PHONE_MASK, PHONE_PREFIX } from '@app/constants/phone-code';
import {OtpType} from '@app/components/otp/otp-data.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { validateByPattern } from '@app/validators/validation-by-pattern';
import { InputErrorKeys } from '@app/constants/validators-errors';
import { DirectoriesService } from '@app/api';

@Component({
  selector: 'ngx-abs-first-pay-date-modal',
  templateUrl: './otp-verification-modal.component.html',
  styleUrls: ['./otp-verification-modal.component.scss']
})
export class OtpVerificationModalComponent implements OnInit {
  emitData: EventEmitter<string> = new EventEmitter<string>();
  verificationOtpForm: FormGroup;
  otpValidationValid = false;
  isPhoneMode: boolean = true;
  otpType: OtpType;
  phoneValidation$ = new BehaviorSubject<boolean>(true);
  blockOtpEmit: boolean = false;
  appDto: Application;
  readonly phonePrefix: string = PHONE_PREFIX;

  private destroy$ = new Subject<void>();
  private phoneValidationCod: string;

  constructor(
    private dialogRef: MatDialogRef<OtpVerificationModalComponent>,
    private directoriesService: DirectoriesService,
    @Inject(MAT_DIALOG_DATA) public config: any
  ) {
    const initialPhone = config.initialPhone ? this.extractPhoneNumber(config.initialPhone) : '';

    this.verificationOtpForm = new FormGroup({
      phone: new FormControl(initialPhone, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.appDto = config.appDto;

    this.dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit(): void {
    this.determineMode();
    this.setupPhoneValidation();
  }

  otpValidationEvent(event: any) {
    this.otpValidationValid = !!event.valid;
    if(event.valid && event.email) {
      this.verificationOtpForm.get('email').setValue(event.email)
    }
  }

  emailSendEvent(event: boolean) {}

  smsSendEvent(event: boolean) {
    event ? this.verificationOtpForm.get('phone').disable() : this.verificationOtpForm.get('phone').enable();
  }

  otpTypeEvent(e: any) {
    if (e) {
      this.otpType = e;
    }
  }

  phoneCodes() {
    this.directoriesService.getPhoneCodes().subscribe(data => {
      this.phoneValidationCod = `^((?:${data.join('|')}))`;
      this.verificationOtpForm
        .get('phone')
        .setValidators([
          Validators.required,
          validateByPattern('^[0-9]{8}$', InputErrorKeys.IncorrectData8),
          validateByPattern(this.phoneValidationCod, InputErrorKeys.PhoneCodeFormat)
        ]);
      this.verificationOtpForm.get('phone').updateValueAndValidity();
    });
  }

  isOtpSuccess(result: any) {
    if (result.email) {
      this.verificationOtpForm.get('email').setValue(result.email);
    }

    this.dialogRef.close(result);

    this.emitData.emit(result);
  }

  getPhoneErrorMessage(): string {
    const errors = this.verificationOtpForm.get('phone').errors;

    if (!errors) return '';

    if (errors[InputErrorKeys.IncorrectData8]) {
      return 'ErrorMessage.IncorrectData8';
    }

    if (errors[InputErrorKeys.PhoneCodeFormat]) {
      return 'ErrorMessage.PhoneCodeFormat';
    }

    return '';
  }

  private extractPhoneNumber(fullPhone: string): string {
    if (!fullPhone) return '';
    return fullPhone.replace('374', '');
  }

  private setupPhoneValidation(): void {
    const phoneControl = this.verificationOtpForm.get('phone');

    this.phoneCodes();

    if (phoneControl) {
      phoneControl.valueChanges
        .pipe(
          debounceTime(300),
          takeUntil(this.destroy$)
        )
        .subscribe(value => {
          this.updatePhoneValidation();
        });

      phoneControl.statusChanges
        .pipe(
          debounceTime(100),
          takeUntil(this.destroy$)
        )
        .subscribe(status => {
          this.updatePhoneValidation();
        });

      this.updatePhoneValidation();
    }
  }

  private updatePhoneValidation(): void {
    const phoneControl = this.verificationOtpForm.get('phone');
    if (phoneControl) {
      const isInvalid = phoneControl.invalid || phoneControl.disabled || !phoneControl.value;
      this.phoneValidation$.next(isInvalid);
    }
  }

  private determineMode(): void {
    if (this.config.mode === OtpType.EMAIL) {
      this.isPhoneMode = false;
    } else {
      this.isPhoneMode = true;
    }

    if (this.config.email && !this.config.phone) {
      this.isPhoneMode = false;
    }
  }

  protected readonly EInputType = EInputType;
  protected readonly phoneMask = PHONE_MASK;


}
