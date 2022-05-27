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

  private createFieldsFormControls(dataInfo: T, inputConfig: BaseFormField[]): Record<string, FormControl> {
    return inputConfig.reduce((config: {}, item: BaseFormField) => {
      if (item.type === EInputType.Blank) {
        return config;
      }
      config[item.code] = this.createControl(dataInfo, item);
      return config;
    }, {});
  }

  private createControl(dataInfo: T, item: BaseFormField): FormControl | FormArray {
    const value: string | number | boolean | Date = this.getValueForControl(dataInfo, item);

    if (item.type === EInputType.ListForSelect) {
      const listValue = this.getValueForList(dataInfo, item);
      const control: FormArray = new FormArray([]);
      listValue.forEach(element => control.push(new FormControl(element)));
      return control;
    } else {
      const control: FormControl = new FormControl({ value, disabled: item.disabled });
      this.setValidatorsToControl(item, control);
      return control;
    }
  }

  private getValueForControl(dataInfo: T, item: BaseFormField): string | number | boolean | Date {
    if (item.type === EInputType.Select && !item.selectEmittedValueType) {
      return this.getValueForSelect(dataInfo, item);
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

  private getValueForSelect(dataInfo: T, item: BaseFormField) {
    if (dataInfo && item.innerObjectName && item.objectName) {
      return dataInfo[item.objectName] && dataInfo[item.objectName][item.innerObjectName]
        ? dataInfo[item.objectName][item.innerObjectName].id
        : null;
    }

    if (dataInfo && item.objectName) {
      return dataInfo[item.objectName] ? dataInfo[item.objectName].id : null;
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
    if (configFormField.customValidators && !!configFormField.customValidators.length) {
      configFormField.customValidators.forEach((item: CustomValidatorData) => {
        validators.push(validateByPattern(item.pattern, item.errorKey));
      });
    }
    return validators;
  }
}
