import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { BaseFormField, CustomOptionList, CustomValidatorData, EInputType } from '@app/_models';
import { Injectable } from '@angular/core';
import { validateByPattern } from '@app/validators/validation-by-pattern';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FormGroupService<T, U> {
  private optionsList: Record<string, U[]>;

  constructor(private formBuilder: FormBuilder) {}

  public createForm(dataInfo: T, config: BaseFormField[], optionsList: Record<string, U[]>): FormGroup {
    this.optionsList = optionsList;

    const controls = this.createFieldsFormControls(dataInfo, config);

    return this.formBuilder.group(controls);
  }

  public controlValidators(configFormField: BaseFormField): ValidatorFn[] {
    return this.getValidators(configFormField);
  }

  public disableAllControlsFormGroup(control: FormGroup, condition: boolean) {
    return Object.keys(control.controls).forEach(controlName => {
      const action = condition ? 'disable' : 'enable';
      control.controls[controlName][action]();
    });
  }

  public createControl(dataInfo: T, item: BaseFormField): FormControl | FormArray {
    const value: string | number | boolean | Date = this.getValueForControl(dataInfo, item);
    if (item.type === EInputType.ListForSelect) {
      const listValue = this.getValueForList(dataInfo, item);
      const control: FormArray = new FormArray([]);
      listValue.forEach(element => control.push(new FormControl(element)));
      this.setValidatorsToControl(item, control);
      return control;
    } else {
      const control: FormControl = new FormControl({
        value,
        disabled: item.disabledIfValue && value ? !!value : item.disabled
      });
      this.setValidatorsToControl(item, control);
      return control;
    }
  }

  public updateFormValues(
    dataInfo: T,
    formGroup: FormGroup,
    inputConfig: BaseFormField[],
    emitEvent?: boolean,
    useExistValues?: boolean
  ) {
    const formValues = formGroup.getRawValue();
    inputConfig.forEach(item => {
      const value: string | number | boolean | Date = this.getValueForControl(dataInfo, item);
      const formValue = formValues[item.code];
      formGroup.get(item.code).setValue(useExistValues && !!formValue ? formValue : value, { emitEvent });
    });
  }

  private createFieldsFormControls(dataInfo: T, inputConfig: BaseFormField[]): Record<string, FormControl> {
    return inputConfig.reduce((config: {}, item: BaseFormField) => {
      if (item.type === EInputType.Blank) {
        return config;
      }
      config[item.code] = this.createControl(dataInfo, item);
      return config;
    }, {});
  }

  private getValueForControl(dataInfo: T, item: BaseFormField): string | number | boolean | Date {
    if (item.type === EInputType.Select && !item.selectEmittedValueType) {
      return item.valuePath ? this.getDeepValueByPath(dataInfo, item) : this.getValueForSelect(dataInfo, item);
    }

    if (item.type === EInputType.CustomSelect) {
      const targetOption = this.getCustomListItem(dataInfo, item);
      return targetOption ? targetOption.id : '';
    }

    if (item.type === EInputType.Date) {
      const date = this.getValueForTextOrCheckbox(dataInfo, item);
      return !!date ? new Date(date) : null;
    }

    return this.getValueForTextOrCheckbox(dataInfo, item);
  }

  private getCustomListItem(dataInfo: T, item: BaseFormField): CustomOptionList {
    return (this.getDirectoryFromListById(dataInfo, item) as unknown) as CustomOptionList;
  }

  private getDirectoryFromListById(dataInfo: T, item: BaseFormField): U {
    if (dataInfo) {
      return this.optionsList[item.optionsListName].find(
        option => option[item.customListValueName] === dataInfo[item.code]
      );
    }
    return null;
  }

  private getValueForTextOrCheckbox(dataInfo: T, item: BaseFormField) {
    if (item.valuePath) {
      return this.getDeepValueByPath(dataInfo, item);
    }

    if (dataInfo && item.innerObjectName && item.objectName) {
      return dataInfo[item.objectName] && dataInfo[item.objectName][item.innerObjectName]
        ? dataInfo[item.objectName][item.innerObjectName][item.code]
        : '';
    }

    if (dataInfo && item.objectName) {
      return dataInfo[item.objectName] ? dataInfo[item.objectName][item.code] : '';
    }

    return dataInfo ? dataInfo[item.code] : '';
  }

  private getValueForList(dataInfo: T, item: BaseFormField) {
    if (dataInfo && item.objectName) {
      return dataInfo[item.objectName] ? dataInfo[item.objectName][item.code] : '';
    }
    return dataInfo ? dataInfo[item.code] : '';
  }

  private getDeepValueByPath(dataInfo: T, item: BaseFormField) {
    return dataInfo ? _.get(dataInfo, item.valuePath) : '';
  }

  private getValueForSelect(dataInfo: T, item: BaseFormField) {
    if (item.valuePath) {
      return this.getDeepValueByPath(dataInfo, item);
    }

    if (dataInfo && item.innerObjectName && item.objectName) {
      return dataInfo[item.objectName] && dataInfo[item.objectName][item.innerObjectName]
        ? dataInfo[item.objectName][item.innerObjectName].id
        : null;
    }

    if (dataInfo && item.objectName) {
      return dataInfo[item.objectName] ? dataInfo[item.objectName].id : null;
    }

    if (dataInfo && dataInfo[item.code] && !dataInfo[item.code].id) {
      return dataInfo[item.code] ? dataInfo[item.code] : null;
    }

    return dataInfo && dataInfo[item.code] ? dataInfo[item.code].id : null;
  }

  private setValidatorsToControl(configFormField: BaseFormField, control: AbstractControl) {
    control.setValidators(this.getValidators(configFormField));
  }

  private getValidators(configFormField: BaseFormField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (configFormField.required) {
      validators.push(Validators.required);
    }
    if (configFormField.pattern) {
      validators.push(Validators.pattern(configFormField.pattern));
    }
    if (configFormField.minLength) {
      validators.push(Validators.minLength(configFormField.minLength));
    }
    if (configFormField.maxLength) {
      validators.push(Validators.maxLength(configFormField.maxLength));
    }
    if (configFormField.min) {
      validators.push(Validators.min(configFormField.min));
    }
    if (configFormField.max) {
      validators.push(Validators.max(configFormField.max));
    }
    if (!!configFormField.validatorsFns && !!configFormField.validatorsFns.length) {
      configFormField.validatorsFns.forEach((item: ValidatorFn) => {
        validators.push(item);
      });
    }
    if (configFormField.customValidators && !!configFormField.customValidators.length) {
      configFormField.customValidators.forEach((item: CustomValidatorData) => {
        validators.push(validateByPattern(item.pattern, item.errorKey));
      });
    }

    return validators;
  }
}
