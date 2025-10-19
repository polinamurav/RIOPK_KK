import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IParameters } from '@app/_models/api-models/custom-settings';
import { UserDto } from '@app/_models';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss', '../close-modal-btn.scss']
})
export class SettingsModalComponent implements OnInit, OnDestroy {
  setting: IParameters;
  isParamError: boolean;
  settingForm: FormGroup;
  emitData: EventEmitter<any> = new EventEmitter();
  countOfCompletedFields: number = 0;
  currentUserData: UserDto;

  parameterBooleanList = [{ id: 1, name: 'true' }, { id: 2, name: 'false' }, { id: 3, name: 'null' }];

  constructor(
    public dialogRef: MatDialogRef<SettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { setting: IParameters; currentUserData: UserDto },
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
    this.checkAreParametersValid(this.settingForm.value);
    this.settingForm.valueChanges.subscribe(() => {
      this.checkAreParametersValid(this.settingForm.value);
    });
  }

  ngOnDestroy(): void {}

  onSave() {
    if (this.settingForm.invalid) {
      return;
    }

    this.emitData.emit({
      parameterInt:
        this.settingForm.get('parameterInt').value === 0 || !!this.settingForm.get('parameterInt').value
          ? this.settingForm.get('parameterInt').value
          : null,
      parameterString:
        (!!this.settingForm.get('parameterString').value &&
          this.settingForm.get('parameterString').value.replace(/\s+/g, '').length === 0) ||
        !this.settingForm.get('parameterString').value ||
        this.settingForm.get('parameterString').value === null
          ? null
          : this.settingForm.get('parameterString').value,
      parameterDouble:
        this.settingForm.get('parameterDouble').value === 0 || !!this.settingForm.get('parameterDouble').value
          ? this.settingForm.get('parameterDouble').value
          : null,
      parameterBoolean:
        this.settingForm.get('parameterBoolean').value === this.parameterBooleanList[2].id ||
        this.settingForm.get('parameterBoolean').value === null
          ? null
          : !!this.parameterBooleanList.find(param => param.id === this.settingForm.get('parameterBoolean').value)
              .name &&
            this.parameterBooleanList.find(param => param.id === this.settingForm.get('parameterBoolean').value)
              .name === 'true'
          ? true
          : false,
      key: this.setting.key,
      nameRu: this.setting.nameRu
    });

    this.dialogRef.close();
  }

  private settingFormCreate() {
    this.settingForm = this.fb.group({
      parameterInt: !!this.setting ? this.setting.parameterInt : null,
      parameterString: !!this.setting ? this.setting.parameterString : null,
      parameterDouble: !!this.setting ? this.setting.parameterDouble : null,
      parameterBoolean:
        !!this.setting && this.setting.parameterBoolean === null
          ? this.parameterBooleanList[2].id
          : !!this.setting.parameterBoolean
          ? this.parameterBooleanList[0].id
          : this.parameterBooleanList[1].id
    });
  }

  private checkAreParametersValid(obj: { [key: string]: string | number | boolean }) {
    let completedFieldsCount = 0; // Int, String, Double, Boolean
    for (const param of Object.keys(obj)) {
      if (param === 'parameterInt' && obj[param] !== null) {
        if (obj[param] === 0 || !!obj[param]) {
          completedFieldsCount++;
        }
      }
      if (param === 'parameterString' && obj[param] !== null) {
        if (!!obj[param].toString().replace(/\s+/g, '').length) {
          completedFieldsCount++;
        }
      }

      if (param === 'parameterDouble' && obj[param] !== null) {
        if (obj[param] === 0 || !!obj[param]) {
          completedFieldsCount++;
        }
      }

      if (
        (param === 'parameterBoolean' && !!obj[param] && obj[param] === 1) ||
        (param === 'parameterBoolean' && !!obj[param] && obj[param] === 2)
      ) {
        completedFieldsCount++;
      }
    }

    this.isParamError = completedFieldsCount === 1 ? false : true;
  }
}
