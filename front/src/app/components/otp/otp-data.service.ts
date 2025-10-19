import {EventEmitter, Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap, take, tap} from 'rxjs/operators';
import {TimerService} from '@app/services/timer.service';
import {validateByPattern} from '@app/validators/validation-by-pattern';
import {InputErrorKeys} from '@app/constants/validators-errors';
import { ApplicationControllerService, BpmFrontControllerService } from '@app/api';
import {PHONE_CODE} from '@app/constants/phone-code';
import {ToastService} from '@app/services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { FullFormGroupKeys } from '@app/components/tabs/data-form/constants/data-form-config';
import { ApplicantDto } from '@app/_models/api-models/applicant';
import { Application, ApplicationDto } from '@app/_models';
import { ApplicantControllerService } from '@app/api/applicant-controller.service';

export enum OtpType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PRINTING_FORM = 'PRINTING_FORM'
}

export interface IOTPRadio {
  label: string;
  value: any;
  checked: boolean;
}

@Injectable()
export class OtpDataService {
  testOtp = 222222;

  enableResendSms: boolean = false;

  isCodePhoneSuccess: boolean;
  isCodeEmailSuccess: boolean;
  language: string = this.translateService.currentLang;
  private _isPhoneCodeValid: boolean;
  private _isEmailCodeValid: boolean;
  private _mode: OtpType;

  private _appDto: Application;
  private _otpRadioControl = new FormControl();
  private _otpCodePhoneControl = new FormControl();
  private _otpEmailControl = new FormControl('', [
    validateByPattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$', InputErrorKeys.EmailIncorrect)
  ]);
  private _otpCodeEmailCodeControl = new FormControl();

  private _radioInfo: IOTPRadio[] = [
    {
      label: 'ShortForm.SMSConsent',
      value: OtpType.SMS,
      checked: true
    },
    {
      label: 'ShortForm.PrintPaperForm',
      value: OtpType.PRINTING_FORM,
      checked: false
    }
  ];

  private _visibleOtpControls = {
    phoneControlVisible: false,
    emailControlVisible: false
  };

  private _otpValidation = {sms: false, email: false};
  private _otpValidationEvent: EventEmitter<any> = new EventEmitter();
  private _smsEvent: EventEmitter<boolean> = new EventEmitter();
  private _emailEvent: EventEmitter<boolean> = new EventEmitter();
  private _shortForm: FormGroup;

  private _timer = new TimerService(2 * 60 * 1000);

  private _currentOtpType: OtpType | string | null = OtpType.SMS;

  constructor(
    private translateService: TranslateService,
    private toastService: ToastService,
    private bpmFrontControllerService: BpmFrontControllerService,
    private applicantControllerService: ApplicantControllerService,
    private applicationControllerService: ApplicationControllerService,
  ) {
  }

  get disableSendEmail() {
    return !this._otpEmailControl.value || this._otpEmailControl.invalid;
  }

  setMode(mode: OtpType) {
    this._mode = mode;
  }

  get isPhoneCodeValid() {
    return this._isPhoneCodeValid;
  }

  get isEmailCodeValid() {
    return this._isEmailCodeValid;
  }

  get timer() {
    return this._timer.timer$;
  }

  get visibleOtpControls() {
    return this._visibleOtpControls;
  }

  get currentOtpType() {
    return this._currentOtpType;
  }

  get shortApplicationId() {
    if (this._appDto && this._appDto.shortApplicationId !== null && this._appDto.shortApplicationId !== undefined) {
      return this._appDto.shortApplicationId;
    }

    if (this._shortForm && this._shortForm.contains('shortApplicationId')) {
      const control = this._shortForm.get('shortApplicationId');
      return control ? control.value : null;
    }

    return null;
  }

  get otpCodePhoneControl() {
    return this._otpCodePhoneControl;
  }

  get otpEmailControl() {
    return this._otpEmailControl;
  }

  get otpCodeEmailCodeControl() {
    return this._otpCodeEmailCodeControl;
  }

  get otpRadioControl() {
    return this._otpRadioControl;
  }

  get radioInfo() {
    return this._radioInfo;
  }

  init(
    shortForm: FormGroup,
    smsEvent: EventEmitter<boolean>,
    emailEvent: EventEmitter<boolean>,
    otpValidationEvent: EventEmitter<any>,
    appDto?: Application
  ) {
    this._otpValidationEvent = otpValidationEvent;
    this._smsEvent = smsEvent;
    this._emailEvent = emailEvent;
    this._shortForm = shortForm;
    this._appDto = appDto || null;

    this.subscribtions();
  }

  setOtpControlVisible(type: string | any) {
    this.enableResendSms = true;
    if (type === OtpType.SMS) {
      this.runTimerSms();
    } else if (type === OtpType.EMAIL) {
      this.runTimerEmail();
    }
  }

  setCurrentOtpType(type: OtpType | string): void {
    this._currentOtpType = type;
    this._otpRadioControl.setValue(type);
  }

  private runTimerSms() {
    if (this._shortForm.get('phone').value) {
      this._timer.stopTimer();
      const phoneControl = this._shortForm.get('phone');

      if (this._mode === OtpType.SMS) {
        phoneControl.disable();
      }
      const phone = this._shortForm.get('phone').value;
      const shortApplicationId = this.shortApplicationId;
      this.bpmFrontControllerService
        .sendSmsCode({
          shortApplicationId,
          isSms: this.currentOtpType === OtpType.SMS,
          phone: !!phone ? PHONE_CODE + phone : null
        })
        .pipe(
          take(1),
          tap(data => {
            if (data.success) {
              this._visibleOtpControls.phoneControlVisible = true;

              if (this._mode === OtpType.SMS) {
                phoneControl.disable();
              }
              this._smsEvent.emit(true);
              this._timer.runTimer(() => {
                if (this._mode === OtpType.SMS) {
                  phoneControl.disable();
                }
                this._smsEvent.emit(false);
                this.enableResendSms = false;
              });
            } else {
              this.isCodePhoneSuccess = false;
              this._visibleOtpControls.phoneControlVisible = false;
              this._smsEvent.emit(false);
              this.enableResendSms = false;
              this.toastService.viewMsg(this.language === 'ru' ? data.errorMessageRu : data.errorMessageAm, 'error');
            }
          })
        )
        .subscribe();
    }
  }

  private runTimerEmail() {
    if (!this.disableSendEmail) {
      this._timer.stopTimer();
      this._visibleOtpControls.emailControlVisible = true;
      this.enableResendSms = true;
      if (this._mode === OtpType.EMAIL) {
        this._otpEmailControl.disable();
      }

      const shortApplicationId = this.shortApplicationId;
      this.bpmFrontControllerService
        .sendEmailCode({
          shortApplicationId,
          email: this.otpEmailControl.value,
          lang: this.translateService.currentLang
        })
        .pipe(
          take(1),
          tap(data => {
            if (data.success) {
              if (this._mode === OtpType.EMAIL) {
                this._otpEmailControl.disable();
              }
              this._emailEvent.emit(true);
              this._timer.runTimer(() => {
                if (this._mode === OtpType.EMAIL) {
                  this._otpEmailControl.enable();
                }
                this._emailEvent.emit(false);
                this.enableResendSms = false;
              });
            } else {
              this.enableResendSms = false;
            }
          })
        )
        .subscribe();
    }
  }

  private validateSmsCode() {
    const phone = this._shortForm.get('phone').value;
    const shortApplicationId = this.shortApplicationId;
    this.bpmFrontControllerService
      .checkSmsCode({
        code: this.otpCodePhoneControl.value,
        phone: !!phone ? PHONE_CODE + phone : null,
        shortApplicationId
      })
      .pipe(
        take(1),
        tap(res => {
          this._isPhoneCodeValid = res.success;
          if (res.success) {
            this.isCodePhoneSuccess = true;
            this._otpValidation.sms = true;
            this._otpValidationEvent.emit({
              valid: true,
              email: null,
              mobilePhone: !!phone ? PHONE_CODE + phone : null,
            });
            const updateApplicant$ = this.updateApplicant({
              mobilePhone: !!phone ? PHONE_CODE + phone : null,
              isMobilePhoneConfirmed: true
            });
            if (this._mode === OtpType.SMS) {
              if (this.currentOtpType === OtpType.SMS) {
                updateApplicant$.pipe(
                  switchMap(() => this.updateApplication())
                ).subscribe();
              } else {
                updateApplicant$.subscribe();
              }
            }
            this._timer.stopTimer();
            this._smsEvent.emit(true);
          } else {
            this.isCodePhoneSuccess = false;
            this._visibleOtpControls.phoneControlVisible = true;
            this.toastService.viewMsg(this.language === 'ru' ? res.errorMessageRu : res.errorMessageAm, 'error');
          }
        })
      )
      .subscribe();
  }

  private updateApplicant(updateData: { mobilePhone?: string; email?: string;
    isMobilePhoneConfirmed?: boolean }): Observable<number> {
    const applicantDto: ApplicantDto = new ApplicantDto(this._appDto.applicant);

    if (updateData.mobilePhone !== undefined) {
      applicantDto.mobilePhone = updateData.mobilePhone;
    }
    if (updateData.email !== undefined) {
      applicantDto.email = updateData.email;
    }
    if (updateData.isMobilePhoneConfirmed !== undefined) {
      applicantDto.isMobilePhoneConfirmed = updateData.isMobilePhoneConfirmed;
    }

    const updateDataDto = {
      ...applicantDto,
      shortApplicationId: this._appDto.shortApplicationId
    };

    return this.applicantControllerService.update(updateDataDto);
  }

  private updateApplication(): Observable<ApplicationDto> {
    const isOtpSelected = this.currentOtpType === OtpType.SMS;

    const appData: ApplicationDto = new ApplicationDto({
      ...this._appDto,
      isOtp: isOtpSelected
    });
    return this.applicationControllerService.update(appData);
  }

  private validateEmailCode() {
    const shortApplicationId = this.shortApplicationId;
    this.bpmFrontControllerService
      .checkEmailCode({
        code: this.otpCodeEmailCodeControl.value,
        shortApplicationId
      })
      .pipe(
        take(1),
        tap(res => {
          this._isEmailCodeValid = res.success;
          if (res.success) {
            this.isCodeEmailSuccess = true;
            this._otpValidation.email = true;
            this._otpEmailControl.disable();
            this.enableResendSms = false;
            this._otpValidationEvent.emit({
              valid: true,
              email: this.otpEmailControl.value
            });
            if (this._mode === OtpType.EMAIL) {
              this.updateApplicant({ email: this.otpEmailControl.value }).subscribe();
            }
            this._timer.stopTimer();
          } else {
            this.toastService.viewMsg(this.language === 'ru' ? res.errorMessageRu : res.errorMessageAm, 'error');
          }
        })
      )
      .subscribe();
  }

  private subscribtions() {
    this.otpRadioControl.valueChanges
      .pipe(
        tap(val => {
          this._currentOtpType = val;
        })
      )
      .subscribe();

    this.otpCodePhoneControl.valueChanges
      .pipe(
        debounceTime(300),
        tap(val => {
          if (val && val.length === 6) {
            this.validateSmsCode();
          }
        })
      )
      .subscribe();

    this._otpEmailControl.valueChanges
      .pipe(
        tap(val => {

          if (val && !this.isEmailCodeValid) {

            this._otpValidationEvent.emit(
              {
                valid: false,
              }
            );

          } else if (!val && this.isCodePhoneSuccess) {
            this._otpValidationEvent.emit({
              valid: true,
              email: val
            });
          }

        })
      )
      .subscribe();

    this._otpCodeEmailCodeControl.valueChanges
      .pipe(
        debounceTime(300),
        tap(val => {
          if (val && val.length === 6) {
            this.validateEmailCode();
          }
        })
      )
      .subscribe();
  }
}
