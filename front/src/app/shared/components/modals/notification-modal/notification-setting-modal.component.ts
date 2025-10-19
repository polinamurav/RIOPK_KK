import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INotifParameters } from '@app/_models/api-models/notification-setting';
import { UserDto } from '@app/_models';

@Component({
  selector: 'app-notification-setting-modal',
  templateUrl: './notification-setting-modal.component.html',
  styleUrls: ['./notification-setting-modal.component.scss', '../close-modal-btn.scss']
})
export class NotificationSettingModalComponent implements OnInit, OnDestroy {
  setting: INotifParameters;
  isParamError: boolean;
  settingForm: FormGroup;
  emitData: EventEmitter<any> = new EventEmitter();
  currentUserData: UserDto;

  constructor(
    public dialogRef: MatDialogRef<NotificationSettingModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { setting: INotifParameters; currentUserData: UserDto },
    private fb: FormBuilder
  ) {
    if (!!this.data) {
      if (!!this.data) {
        this.setting = this.data.setting;
      }

      if (!!!!this.data.currentUserData) {
        this.currentUserData = this.data.currentUserData;
      }
    }
  }

  ngOnInit() {
    this.settingFormCreate();
  }

  ngOnDestroy(): void {}

  onSave() {
    if (this.settingForm.invalid) {
      return;
    }

    this.emitData.emit({
      valueAm:
        (!!this.settingForm.get('valueAm').value &&
          this.settingForm.get('valueAm').value.replace(/\s+/g, '').length === 0) ||
        !this.settingForm.get('valueAm').value ||
        this.settingForm.get('valueAm').value === null
          ? null
          : this.settingForm.get('valueAm').value,
      valueRu:
        (!!this.settingForm.get('valueRu').value &&
          this.settingForm.get('valueRu').value.replace(/\s+/g, '').length === 0) ||
        !this.settingForm.get('valueRu').value ||
        this.settingForm.get('valueRu').value === null
          ? null
          : this.settingForm.get('valueRu').value,
      valueEn:
        (!!this.settingForm.get('valueEn').value &&
          this.settingForm.get('valueEn').value.replace(/\s+/g, '').length === 0) ||
        !this.settingForm.get('valueEn').value ||
        this.settingForm.get('valueEn').value === null
          ? null
          : this.settingForm.get('valueEn').value,
      extErrorMsg:
        (!!this.settingForm.get('extErrorMsg').value &&
          this.settingForm.get('extErrorMsg').value.replace(/\s+/g, '').length === 0) ||
        !this.settingForm.get('extErrorMsg').value ||
        this.settingForm.get('extErrorMsg').value === null
          ? null
          : this.settingForm.get('extErrorMsg').value,
      key: this.setting.key,
      nameRu: this.setting.nameRu,
      nameAm: this.setting.nameAm,
      nameEn: this.setting.nameEn
    });

    this.dialogRef.close();
  }

  private settingFormCreate() {
    this.settingForm = this.fb.group({
      valueAm: !!this.setting ? this.setting.valueAm : null,
      valueRu: !!this.setting ? this.setting.valueRu : null,
      valueEn: !!this.setting ? this.setting.valueEn : null,
      extErrorMsg: !!this.setting ? this.setting.extErrorMsg : null
    });
  }
}
