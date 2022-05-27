import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroupService } from '@app/services/form-group.service';
import { CustomOptionList, Directory, EInputType, Segment, ValueType } from '@app/_models';
import { AdmBaseModalFormField } from './constants/administration-base-modal.constants';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from '@app/core';
import { ELanguage } from '@app/constants/language';

export interface AdministrationBaseModalData<T, U> {
  title?: string;
  dataInfo: T;
  formConfig: AdmBaseModalFormField[];
  showSaveButton: boolean;
  showAddButton?: boolean;
  showCreateButton: boolean;
  showEditButton?: boolean;
  disabledFields: boolean;
  optionsList?: Record<string, U[]>;
  containerClass?: string;
}

type ItemType = Segment | Directory;

@Component({
  selector: 'app-administration-base-modal',
  templateUrl: './administration-base-modal.component.html',
  styleUrls: ['./administration-base-modal.component.scss', '../close-modal-btn.scss']
})
export class AdministrationBaseModalComponent<T, U> implements OnInit {
  public formGroup: FormGroup;

  public title: string = '';
  public dataInfo: T;
  public optionsList: Record<string, U[]>;
  public formConfig: AdmBaseModalFormField[] = [];
  public showEditButton: boolean = true;
  public showSaveButton: boolean = false;
  public showCreateButton: boolean = false;
  public showAddButton: boolean = false;
  public EInputType = EInputType;
  public ValueType = ValueType;
  public ELanguage = ELanguage;
  public emitData: EventEmitter<T> = new EventEmitter();
  public containerClass: string;
  public currentLanguage: string;
  private disabledFields: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<T>,
    private formGroupService: FormGroupService<T, U>,
    private fb: FormBuilder,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) private data: AdministrationBaseModalData<T, U>
  ) {
    if (this.data) {
      this.title = this.data.title;
      this.dataInfo = this.data.dataInfo;
      this.formConfig = this.data.formConfig;
      this.optionsList = this.data.optionsList;
      this.showSaveButton = this.data.showSaveButton;
      this.showCreateButton = this.data.showCreateButton;
      this.showEditButton = this.data.hasOwnProperty('showEditButton') ? this.data.showEditButton : true;
      this.showAddButton = this.data.showAddButton;
      this.disabledFields = this.data.disabledFields || false;
      this.containerClass = this.data.containerClass;
    }
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
    this.createLanguageSubscription();
    this.createForm();
    this.setDefaultValueForActive();
    this.disableFields();
  }

  ngOnDestroy(): void {}

  saveButtonClick() {
    if (this.formGroup.invalid) {
      return;
    }
    this.emitData.emit({
      ...this.dataInfo,
      ...this.formGroup.getRawValue()
    });

    this.dialogRef.close();
  }

  editButtonClick() {
    this.showEditButton = false;
    this.disabledFields = false;
    this.disableFields();
  }

  cancelButtonClick() {
    this.showEditButton = true;

    if (this.disabledFields) {
      return;
    }

    this.setInitialFormValues(this.dataInfo, this.formConfig);
    this.disabledFields = true;
    this.disableFields();
  }

  selectionChange(selectedItemId: string, formArrayName: string, itemsFullList: ItemType[]) {
    const itemsFromForm: ItemType[] = this.formGroup.get(formArrayName).value;
    const itemFromList: ItemType = itemsFullList.find((item: ItemType) => selectedItemId === item.id);

    if (!!itemFromList && !itemsFromForm.some(item => item.id === selectedItemId)) {
      (this.formGroup.get(formArrayName) as FormArray).push(this.fb.control(itemFromList));
    }
  }

  removeListItem(item, formArrayName: string) {
    const index = this.formGroup.get(formArrayName).value.indexOf(item);
    (this.formGroup.get(formArrayName) as FormArray).removeAt(index);
  }

  private disableFields() {
    if (!this.disabledFields) {
      this.disableFormFields(this.formGroup, this.formConfig);
      this.setCodeFieldDisabled();
    } else {
      this.formGroup.disable();
    }
  }

  private disableFormFields(form: FormGroup, config: AdmBaseModalFormField[]) {
    config.forEach((configItem: AdmBaseModalFormField) => {
      if (configItem.readonly && form.controls[configItem.code]) {
        form.controls[configItem.code].disable();
      }
      if (!configItem.readonly && form.controls[configItem.code]) {
        form.controls[configItem.code].enable();
      }
    });
  }

  private setCodeFieldDisabled() {
    if (!this.showCreateButton && this.formGroup.get('code')) {
      this.formGroup.get('code').disable();
    }
  }

  private setInitialFormValues(dataInfo: T, config: AdmBaseModalFormField[]) {
    let value: Date | string | number | [];

    config.forEach((field: AdmBaseModalFormField) => {
      value = dataInfo[field.code];

      if (field.type === EInputType.Blank) {
        return;
      }

      if (field.type === EInputType.ListForSelect) {
        (this.formGroup.get(field.code) as FormArray).clear();
        (value as []).forEach(element => {
          const control = new FormControl(element);
          (this.formGroup.get(field.code) as FormArray).push(control);
        });
      }

      if (field.type === EInputType.Date) {
        value = dataInfo[field.code] ? new Date(dataInfo[field.code]) : '';
      }

      if (field.type === EInputType.CustomSelect) {
        const listItem: CustomOptionList = this.getCustomListItem(dataInfo, field);

        value = listItem ? listItem.id : '';
      }

      this.formGroup.controls[field.code].patchValue(value);
    });
  }

  private createForm() {
    this.formGroup = this.formGroupService.createForm(this.dataInfo, this.formConfig, this.optionsList);
  }

  private getCustomListItem(dataInfo: T, item: AdmBaseModalFormField): CustomOptionList {
    return (this.getDirectoryFromListById(dataInfo, item) as unknown) as CustomOptionList;
  }

  private getDirectoryFromListById(dataInfo: T, item: AdmBaseModalFormField): U {
    return this.optionsList[item.optionsListName].find(
      option => option[item.customListValueName] === dataInfo[item.code]
    );
  }

  private setDefaultValueForActive() {
    this.formConfig.forEach((item: AdmBaseModalFormField) => {
      if (this.showCreateButton && item.type === EInputType.Checkbox) {
        this.formGroup.get(item.code).setValue(true);
      }
    });
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.currentLanguage = lang.lang;
    });
  }
}
