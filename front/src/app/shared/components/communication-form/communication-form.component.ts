import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { COMMUNICATION_FORM } from '@app/shared/components/communication-form/communication-config';
import { Application, EInputType, ELocalNames, OptionListNames, ValueType } from '@app/_models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Communication,
  CommunicationDto,
  CommunicationGetDto,
  CommunicationOwnerType,
  CommunicationType,
  DirCommunicationMethod
} from '@app/_models/api-models/communication-get-dto';
import { take, tap } from 'rxjs/operators';
import { DirCommunicationTypeControllerService } from '@app/api';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { InputErrorKeys } from '@app/constants/validators-errors';
import { validateByPattern } from '@app/validators/validation-by-pattern';
import { PHONE_CODE, PHONE_CODE_OPERATORS_PATTERN, PHONE_MASK, PHONE_PREFIX } from '@app/constants/phone-code';
import { TranslateService } from '@ngx-translate/core';
import {
  OtpVerificationModalComponent
} from '@app/components/tabs/final-decision/opt-verification-modal/otp-verification-modal.component';
import { OtpType } from '@app/components/otp/otp-data.service';
import { untilDestroyed } from '@app/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-communication-form',
  templateUrl: './communication-form.component.html',
  styleUrls: ['./communication-form.component.scss']
})
export class CommunicationFormComponent implements OnInit, OnChanges, OnDestroy {
  EInputType = EInputType;
  ValueType = ValueType;
  ELocalNames = ELocalNames;

  @Input() appDto: Application;
  @Input() communication: Communication;
  @Input() communicationType: string;
  @Input() readonly: boolean;
  @Input() ownerType: CommunicationOwnerType; // CommunicationOwnerType
  @Input() optionsList: any;
  @Input() triggerSubmit: Subject<any>;
  @Input() language: string;

  @Output() emitCommunicationEvent = new EventEmitter();

  communicationConfig = _.cloneDeep(COMMUNICATION_FORM);

  form: FormGroup;
  isMail: boolean;
  address: string;
  phoneValidation: boolean;
  public readonly phonePrefix: string = PHONE_PREFIX;
  public readonly phoneMask: string = PHONE_MASK;
  public readonly phoneCode: string = PHONE_CODE;
  public readonly phoneCodeOperatorsPattern: string = PHONE_CODE_OPERATORS_PATTERN;

  @ViewChild('btnSubmit') btnSubmit: ElementRef;

  private methods: DirCommunicationMethod[];
  private communicationGetDto: CommunicationGetDto;
  private verifiedEmail: string;

  constructor(
    private readonly communicationTypeControllerService: DirCommunicationTypeControllerService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) {}

  get addressType(): string {
    return this.form.get('addressType').value;
  }

  get formValue() {
    return this.form.value;
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(value => {
      value.lang === 'ru' ? (this.language = 'ru') : (this.language = 'am');
    });
    this.setTitleAndOptionsName();
    this.buildForm();
    this.setCommunicationData();
  }

  ngOnChanges() {
    this.setCommunicationData();
  }

  ngOnDestroy(): void {}

  private setCommunicationData() {
    if (this.communication) {

      const isEmail = [1, 4].includes(this.communication.dirCommunicationMethod.id)

      const formData = {
        communication: this.communication.value,
        dirCommunicationMethodId: this.communication.dirCommunicationMethod.id,
        addressType: this.communication.addressType
      };
      if (this.communication.addressType) {
        this.isMail = true;
        this.address = this.communication.addressType ? this.communication.value : null;
      }
      if (this.form) {
        this.clearValidatorsForExistingData();

        this.form.patchValue(formData, { emitEvent: false });
        this.setMailVisible();

        if (this.communication.value) {
          this.form.updateValueAndValidity();
        }

        if (this.readonly) {
          this.form.disable({ emitEvent: false });
        }
      }
      if(isEmail && !!this.communication.value) {
        this.form.get('communication').disable();
      }
    }
  }

  private clearValidatorsForExistingData(): void {
    if (this.communication.id && this.communication.value) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).clearValidators();
        this.form.get(key).updateValueAndValidity();
      });
    }
  }

  private buildForm() {
    this.form = new FormGroup({});
    this.communicationConfig.forEach(control => {
      this.form.addControl(
        control.code,
        new FormControl({ value: null, disabled: this.readonly }, control.required ? [Validators.required] : null)
      );
    });

    this.form
      .get('dirCommunicationMethodId')
      .valueChanges.pipe(
        tap(val => {
          this.isMail = this.getIsMail(val);
          this.setMailVisible();
          this.getCommunicationByType(val);
        })
      )
      .subscribe();

    this.form
      .get('addressType')
      .valueChanges.pipe(tap(this.setAddress))
      .subscribe();

    this.form.valueChanges.pipe(tap(this.emitCommunication)).subscribe();

    this.triggerSubmit.subscribe(() => {
      this.btnSubmit.nativeElement.click();
      this.emitCommunication(this.form.getRawValue());
    });
  }

  private setTitleAndOptionsName() {
    const communicationControl = this.communicationConfig.find(el => el.code === 'dirCommunicationMethodId');
    communicationControl.placeholder =
      this.communicationType === CommunicationType.BANK
        ? 'FinalDecision.Placeholders.BackContactType'
        : 'FinalDecision.Placeholders.ExtractType';
    communicationControl.optionsListName =
      this.communicationType === CommunicationType.BANK
        ? OptionListNames.CommunicationMethodsBank
        : OptionListNames.CommunicationMethodsConnect;
  }

  private setMailVisible = (): void => {
    const communicationControl = this.communicationConfig.find(el => el.code === 'communication');
    const addressTypeControl = this.communicationConfig.find(el => el.code === 'addressType');
    addressTypeControl.isVisible = this.isMail;
    communicationControl.isVisible = !this.isMail;
    if (!this.isMail) {
      this.address = null;
      this.form.get('addressType').disable();
      this.form.get('communication').enable();
    } else {
      this.form.get('addressType').enable();
      this.form.get('communication').disable();
    }
  };

  private getIsMail = (id: number): boolean => {
    const methods = this.getMethodsListMail();
    const method = methods.find(el => el.id === id);
    if (method) {
      return method.code === 'MAIL';
    }
  };

  private getMethodsListMail = (): DirCommunicationMethod[] => {
    return this.communicationType === CommunicationType.BANK
      ? this.optionsList[OptionListNames.CommunicationMethodsBank]
      : this.optionsList[OptionListNames.CommunicationMethodsConnect];
  };

  private customValidationOfFields(type: number, data: any) {
    if ([1,4].includes(type)) {
      // Email - Validation
      this.phoneValidation = false;
      this.form.get('communication').setValue(null, { emitEvent: false });
      this.form
        .get('communication')
        .setValidators([
          Validators.required,
          validateByPattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$', InputErrorKeys.EmailIncorrect)
        ]);
      this.form.get('communication').updateValueAndValidity();

      if (this.verifiedEmail) {
        this.form.get('communication').setValue(this.verifiedEmail, { emitEvent: false });
        this.form.get('communication').disable();
      } else if (!data.communication || data.communication === '') {
        this.form.get('communication').disable();
        this.showEmailVerification();
      }
      else if (!!data.communication) {
        this.form.get('communication').setValue(data.communication, { emitEvent: false });
        this.form.get('communication').disable();
      }
    }


    if([3,6].includes(type)) {
      this.form.get('communication').disable();
    }

    if ([2,5].includes(type)) {
      // regAddress
      this.form.get('communication').setValue(null, { emitEvent: false });
      this.phoneValidation = false;
      if (data && data.address.isRealEqFactAddress) {
        this.form.get('addressType').setValue('regAddress', { emitEvent: false });
        this.form.get('addressType').disable();
        this.form.get('addressType').updateValueAndValidity();
      }
    }

    if (type === 3) {
      // Phone - Validation
      this.phoneValidation = true;
      const replacePhoneNumber: string = (data.communication as string).replace('374', '');
      this.form
        .get('communication')
        .setValidators([
          validateByPattern('^[0-9]{8}$', InputErrorKeys.IncorrectData8),
          validateByPattern(this.phoneCodeOperatorsPattern, InputErrorKeys.PhoneCodeFormat)
        ]);
      this.form.get('communication').setValue(replacePhoneNumber, { emitEvent: false });
      this.form.get('communication').updateValueAndValidity();
    }

    if (type === 6) {
      // Phone - Validation
      this.phoneValidation = true;
      const replacePhoneNumber: string = (data.communication as string).replace('374', '');
      this.form
        .get('communication')
        .setValidators([
          validateByPattern('^[0-9]{8}$', InputErrorKeys.IncorrectData8),
          validateByPattern(this.phoneCodeOperatorsPattern, InputErrorKeys.PhoneCodeFormat)
        ]);
      this.form.get('communication').setValue(replacePhoneNumber, { emitEvent: false });
      this.form.get('communication').updateValueAndValidity();
    }
  }

  private getCommunicationByType = (type: number) => {
    if (type) {
      this.communicationTypeControllerService
        .getCommunication(this.appDto.id, type)
        .pipe(
          take(1),
          tap(data => {
            this.communicationGetDto = data;
            this.address = null;

            if (!this.readonly) {
              this.customValidationOfFields(type, data);
            }

            // this.form.get('communication').updateValueAndValidity()
            // this.form.get('communication').setValue(data.communication, { emitEvent: false },);

            if (this.addressType) {
              this.setAddress(this.addressType);
            }
          })
        )
        .subscribe();
    }
  };

  private showEmailVerification(): void {
    const dialogRef = this.dialog.open(OtpVerificationModalComponent, {
      height: 'auto',
      width: '40vw',
      data: { mode: OtpType.EMAIL, appDto: this.appDto },
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (!this.form.get('communication').value) {
        this.form.get('dirCommunicationMethodId').setValue(null, { emitEvent: false });

        this.verifiedEmail = null;
        this.isMail = false;
        this.setMailVisible();
      }
    });

    (dialogRef.componentInstance as OtpVerificationModalComponent).emitData
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.verifiedEmail = res.email;
        this.form.get('communication').setValue(res.email, { emitEvent: false });

        this.form.get('communication').updateValueAndValidity();
      });
  }

  private setAddress = (addressType: string): void => {
    if (this.communicationGetDto) {
      this.address = this.communicationGetDto.address ? this.communicationGetDto.address[addressType] : null;
    }
  };

  private emitCommunication = (value: any): void => {
    if (this.phoneValidation) {
      value.communication = `${this.phoneCode + value.communication}`;
    }

    const communication: CommunicationDto = {
      applicationId: this.appDto.id,
      id: this.communication ? this.communication.id : null,
      dirCommunicationMethodOwnerId: this.ownerType,
      dirCommunicationMethodId: value.dirCommunicationMethodId,
      addressType: this.isMail ? value.addressType : null,
      value: value.communication ? value.communication : this.address,
      isValidForm: this.form.valid
    };
    this.emitCommunicationEvent.emit(communication);
  };
}
