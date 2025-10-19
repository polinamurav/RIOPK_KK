import {Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroupService} from '@app/services/form-group.service';
import {CustomOptionList, Directory, EInputType, Segment, ValueType} from '@app/_models';
import {AdmBaseModalFormField} from './constants/administration-base-modal.constants';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {untilDestroyed} from '@app/core';
import {ELanguage} from '@app/constants/language';
import {PHONE_MASK, PHONE_PREFIX} from '@app/constants/phone-code';
import {Observable, Subject} from "rxjs";
import {debounceTime, takeUntil, tap} from "rxjs/operators";
import {CredentialsService} from "@app/services/authentication";

export interface AdministrationBaseModalData<T, U> {
  title?: string;
  dataInfo: T;
  formConfig: AdmBaseModalFormField[];
  showSaveButton: boolean;
  showAddButton?: boolean;
  showCreateButton: boolean;
  createButtonName?: string;
  showEditButton?: boolean;
  showCancelButton?: boolean;
  showEditActivateDeactivateButtons?: boolean;
  updateFormOnActivateDeactivate?: boolean;
  activateDeactivateProp?: string;
  disabledFields: boolean;
  optionsList?: Record<string, U[]>;
  optionsList$?: Observable<Record<string, U[]>>;
  containerClass?: string;
  ignoreDefaultValueForCheckBox?: boolean;
  selectionChangeValidator?: (control: AdmBaseModalFormField, item: any) => boolean | any;
}

type ItemType = Segment | Directory;

@Component({
  selector: 'app-administration-base-modal',
  templateUrl: './administration-base-modal.component.html',
  styleUrls: ['./administration-base-modal.component.scss', '../close-modal-btn.scss']
})
export class AdministrationBaseModalComponent<T, U> implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  public readonly phonePrefix: string = PHONE_PREFIX;
  public readonly phoneMask: string = PHONE_MASK;

  public title: string = '';
  public dataInfo: T;


  public formConfig: AdmBaseModalFormField[] = [];
  public showEditButton: boolean = true;
  public showCancelButton: boolean = true;
  public showSaveButton: boolean = false;
  public showCreateButton: boolean = false;
  public showAddButton: boolean = false;
  public showEditActivateDeactivateButtons: boolean = false;
  public createButtonName: string = 'Buttons.Create';
  public EInputType = EInputType;
  public ValueType = ValueType;
  public ELanguage = ELanguage;
  public emitData: EventEmitter<T> = new EventEmitter();
  public emitActivateData: EventEmitter<T> = new EventEmitter();
  public emitFormValue: EventEmitter<any> = new EventEmitter();
  public containerClass: string;
  public currentLanguage: string;
  public loadingOptions: boolean;
  public disabledFields: boolean = true;

  private optionsList$: Observable<Record<string, U[]>>;
  private _optionsList: Record<string, U[]>;
  private destroy$ = new Subject();

  constructor(
    private dialogRef: MatDialogRef<T>,
    private formGroupService: FormGroupService<T, U>,
    private fb: FormBuilder,
    private credentialsService: CredentialsService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) private data: AdministrationBaseModalData<T, U>
  ) {
    if (this.data) {
      this.title = this.data.title;
      this.dataInfo = this.data.dataInfo;
      this.formConfig = this.data.formConfig;
      this._optionsList = this.data.optionsList;
      this.optionsList$ = this.data.optionsList$;
      this.showSaveButton = this.data.showSaveButton;
      this.showEditActivateDeactivateButtons = this.data.showEditActivateDeactivateButtons;
      this.showCreateButton = this.data.showCreateButton;
      this.showCancelButton = this.data.showCancelButton;
      this.showEditButton = this.data.hasOwnProperty('showEditButton') ? this.data.showEditButton : true;
      this.showAddButton = this.data.showAddButton;
      this.createButtonName = this.data.createButtonName || this.createButtonName;
      this.disabledFields = this.data.disabledFields || false;
      this.containerClass = this.data.containerClass;
    }
  }

  get optionsList() {
    return this._optionsList;
  }

  get isActive() {
    // @ts-ignore
    return this.data.dataInfo[this.data.activateDeactivateProp];
  }


  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
    this.createLanguageSubscription();
    this.createForm();
    this.setDefaultValueForActive();
    this.disableFields();
    this.subscribeOnOptionList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkVisibility = (role: string[]) => {
    return !!role ?  this.credentialsService.checkAccess(role) : true;
  }

  canEdit(role: string[]) {
    return !!role ? this.credentialsService.checkAccess(role) : true;
  }

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


  close() {
    this.dialogRef.close();
  }

  editButtonClick() {
    this.showEditButton = false;
    this.disabledFields = false;
    this.disableFields();
  }

  activateDeactivate(active: boolean) {
    // @ts-ignore

    this.data.dataInfo[this.data.activateDeactivateProp] = active;

    if (this.data.updateFormOnActivateDeactivate) {
      this.formGroup.get(this.data.activateDeactivateProp).patchValue(active);
    }

    this.emitActivateData.emit({
      ...this.dataInfo,
      ...this.formGroup.getRawValue()
    })
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

  closeButtonClick(closeModal: boolean = false) {
    if (closeModal) {
      this.dialogRef.close();
    }
  }

  selectionChange(selectedItemId: string, formArrayName: string, itemsFullList: ItemType[]) {
    const itemsFromForm: ItemType[] = this.formGroup.get(formArrayName).value;
    const itemFromList: ItemType = itemsFullList.find((item: ItemType) => selectedItemId === item.id);
    if (!!itemFromList && !itemsFromForm.some(item => item.id === selectedItemId)) {
      (this.formGroup.get(formArrayName) as FormArray).push(this.fb.control(itemFromList));
    }
  }

  selectionChangeForTipsLIst(selectedItem: string | any, control: AdmBaseModalFormField, itemsFullList: ItemType[]) {

    const formArray = (this.formGroup.get(control.code) as FormArray);

    const id = control.selectEmittedValueType === ValueType.Object ? selectedItem.id : selectedItem;

    const itemsInList: ItemType[] = this.formGroup.get(control.code).value;

    if(this.data.selectionChangeValidator) {
      if(!this.data.selectionChangeValidator(control, this.formGroup.getRawValue())) {
        return
      }
    }

    if (!itemsInList.some(el => el.id === id)) {
      formArray.push(this.fb.control(selectedItem))
    }

  }


  removeListItem(item: any, formArrayName: string) {
    const index = this.formGroup.get(formArrayName).value.indexOf(item);
    (this.formGroup.get(formArrayName) as FormArray).removeAt(index);
  }

  private subscribeOnOptionList = (): void => {
    if (this.optionsList$) {

      this.loadingOptions = true;

      this.optionsList$.pipe(tap(data => {
        this._optionsList = {};
       setTimeout(() => {
         this._optionsList = {...data}
       })
        this.loadingOptions = false;
      }), takeUntil(this.destroy$)).subscribe()
    }
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
      if (!configItem.readonly && form.controls[configItem.code] && this.canEdit(configItem.editableForRolesList)) {
        form.controls[configItem.code].enable();
      } else {
        form.controls[configItem.code].disable();
      }

      // console.log('configItem', configItem)

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

    this.formConfig.forEach(c => {
      if(c.uniqTextValidation) {
        this.uniqValidate(c);
      }
    })



    this.formConfig.forEach(c => {
      if(c.subscribeOnChange) {
        this.formGroup.get(c.code).valueChanges.pipe(debounceTime(500), tap(value => {
          this.emitFormValue.emit({control: c, value})



        }), takeUntil(this.destroy$)).subscribe()
      }

      this.checkRequiredFieldByRole(c)

    })



  }

  private checkRequiredFieldByRole = (control: AdmBaseModalFormField) => {

    if(!!control.requiredByRole) {
      this.formGroup.get(control.roleFieldName).valueChanges.pipe(debounceTime(100), tap(role => {
        const isRequired = role.some(r =>  control.requiredByRole(r.authority))

        if(isRequired) {
          this.formGroup.get(control.code).setValidators(Validators.required);
          this.formGroup.get(control.code).setErrors({required: isRequired});
          this.formGroup.get(control.code).updateValueAndValidity();
        } else  {
          this.formGroup.get(control.code).removeValidators(Validators.required);
          this.formGroup.get(control.code).updateValueAndValidity();
        }

      }), takeUntil(this.destroy$)).subscribe();
    }
  }

  private uniqValidate = (controlConfig: AdmBaseModalFormField): void => {
    const control =  this.formGroup.get(controlConfig.code)

    const listForCompare = this.optionsList[controlConfig.optionsListName];

    control.valueChanges.pipe(debounceTime(500), tap(value => {
      if(listForCompare.includes(value)) {
        control.setErrors({'equalError': true})
      }
    })).subscribe()

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
    if (!this.data.ignoreDefaultValueForCheckBox) {
      this.formConfig.forEach((item: AdmBaseModalFormField) => {
        if (this.showCreateButton && item.type === EInputType.Checkbox) {
          this.formGroup.get(item.code).setValue(true, {emitEvent: false});
        }
      });
    }
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.currentLanguage = lang.lang;
    });
  }
}
