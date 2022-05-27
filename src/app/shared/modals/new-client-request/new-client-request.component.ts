import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientControllerService } from '@app/api';
import { ClientInitDto } from './../../../_models/api-models/client-init-dto';
import { MatDialogRef } from '@angular/material';
import { PHONE_CODE } from '@app/constants/phone-code';
import { SmsControllerService } from '@app/api/sms-controller.service';
import { ToastService } from '@app/services/toast.service';
import { untilDestroyed } from '@app/core';

@Component({
  templateUrl: './new-client-request.component.html',
  styleUrls: ['./new-client-request.component.scss', '../close-modal-btn.scss']
})
export class NewClientRequestComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public title = 'Запрос данных по клиенту';
  public smsCode: string = '';
  public isPinValid: boolean = true;
  public isSmsExist: boolean = false;
  public isLoading: boolean = false;
  public isDynamicShowPinValidation: boolean = false;
  public codeIsTrue: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NewClientRequestComponent>,
    private clientService: ClientControllerService,
    private smsControllerService: SmsControllerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.createPinSubscription();
    this.createCodeSubscription();
  }

  ngOnDestroy(): void {}

  createPinSubscription() {
    this.formGroup
      .get('pin')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(_ => {
        if (!!this.isDynamicShowPinValidation) {
          this.isPinValid = this.formGroup.get('pin').valid;
        }
      });
  }

  createCodeSubscription() {
    this.formGroup
      .get('code')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(val => {
        this.codeIsTrue = !!val && this.smsCode === val;
      });
  }

  sendRequest() {
    this.isLoading = true;
    const clientInit: ClientInitDto = {
      pin: this.formGroup.get('pin').value,
      mobilePhone: PHONE_CODE + this.formGroup.get('phone').value
    };

    this.clientService
      .init(clientInit)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.dialogRef.close();
        this.toastService.viewMsg('Клиент успешно создан', 'success');
      });
  }

  cancelButtonClick() {
    this.dialogRef.close();
  }

  sendSms() {
    this.isDynamicShowPinValidation = true;

    this.isPinValid = this.formGroup.get('pin').valid;

    if (this.isPinValid) {
      this.formGroup.get('phone').disable();
      this.formGroup.get('pin').disable();
      this.isSmsExist = true;

      // this.smsControllerService.sendSms(PHONE_CODE + this.formGroup.get('phone').value).subscribe(res => {
      //   this.smsCode = res.smsCode;
      // });
    }
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(9)]],
      pin: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          // регулярка на разрешение ввода только латинских букв(искл. 'o' и 'O'),
          // и цифр от 0 до 9; запрет на ввод символов:
          Validators.pattern(/^[0-9]+$/)
          //Validators.pattern(/^[a-np-zA-NP-Z0-9]+$/),
          // регулярка на запрет ввода более 4-ех одинаковых символов последовательно:
          //Validators.pattern(/^(?:([\da-np-zA-NP-Z])(?!\1{4}))*$/)
        ]
      ],
      code: ['']
    });
  }
}
