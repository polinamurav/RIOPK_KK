import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFilterField, IFilterKeyVal, IFilteredParams, ValueType } from '@app/_models';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { ELanguage } from '@app/constants/language';
import { MatMenuTrigger } from '@angular/material/menu';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  formField: FormGroup;
  selectedOptionsNumber: number = 0;
  initFields: IFilterField[];
  language: string;

  initObjFields: IFilterKeyVal = {};
  updatedObjFields: IFilterKeyVal = {};
  ValueType = ValueType;

  @Input() filterFields: IFilterField[];
  @Input() currentFilterValues: IFilteredParams;

  filterFieldsObj: IFilterKeyVal = {};

  @Output() selectedFilterFields: EventEmitter<IFilterKeyVal> = new EventEmitter<IFilterKeyVal>();

  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;

  private isRestoringValues = false;
  private formValuesOnOpen: IFilterKeyVal = {};

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService) {}

  ngOnChanges() {
    this.initFields = this.filterFields;
    this.filterFieldsObj = this.fromArrToObjTransform(this.filterFields);
    this.formField = this.formBuilder.group(this.filterFieldsObj);
    this.initObjFields = this.formField.value;
    this.selectedOptionsNumber = 0;
    this.initObjFields = this.getInitialValues();

    this.setCurrentValues(this.currentFilterValues);
  }

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
    this.createLanguageSubscription();

    this.trigger.menuOpened.pipe(untilDestroyed(this)).subscribe(() => {
      this.formValuesOnOpen = { ...this.formField.value };
    });
  }

  setCurrentValues(values: IFilteredParams, shouldApply: boolean = true) {
    this.isRestoringValues = true;

    if (values) {
      Object.keys(values).forEach((valueName: string) => {
        if (this.formField.get(valueName) != null) {
          this.formField.get(valueName).setValue(values[valueName]);
        }
      });

      if (shouldApply) {
        this.onApplyBtnClick();
      } else {
        this.updatedObjFields = this.formField.value;
      }
    }

    this.isRestoringValues = false;
  }

  ngAfterViewInit(): void {
    this.updatedObjFields = this.formField.value;
  }

  clearSelectedField(fcName: string) {
    this.formField.get(fcName).setValue(this.initObjFields[fcName]);
  }

  onApplyBtnClick() {
    if (this.isRestoringValues) {
      this.updateSelectedOptionsCount();
      return;
    }

    this.updateSelectedOptionsCount();

    for (const param in this.currentFilterValues) {
      this.updatedObjFields[param] = this.currentFilterValues[param];
    }
    for (const param in this.formField.value) {
      this.updatedObjFields[param] = this.formField.value[param];
    }

    this.selectedFilterFields.emit(this.updatedObjFields);

    if (this.trigger.menuOpen) {
      this.trigger.closeMenu();
    }
  }

  onResetBtnClick() {
    this.formField.setValue(this.initObjFields);
  }

  onCancelBtnClick() {
    this.formField.setValue(this.formValuesOnOpen);
    this.trigger.closeMenu();
  }

  ngOnDestroy() {}

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
  }

  private getInitialValues(): IFilterKeyVal {
    const initialValues: IFilterKeyVal = {};

    this.filterFields.forEach(field => {
      if (field.type !== 'date' && field.type !== 'radio' &&
        (typeof field.val === 'string' || typeof field.val === 'boolean')) {
        initialValues[field.fcName] = field.val;
      } else if (field.type === 'radio') {
        initialValues[field.fcName] = field.val[0].fcName;
      } else {
        initialValues[field.fcName] = '';
      }
    });

    return initialValues;
  }

  private fromArrToObjTransform(arr: IFilterField[]) {
    const targetObj: IFilterKeyVal = {};

    arr.forEach(item => {
      if (
        item.type !== 'date' &&
        item.type !== 'radio' &&
        (typeof item.val === 'string' || typeof item.val === 'boolean')
      ) {
        targetObj[item.fcName] = item.val;
      } else if (item.type === 'radio') {
        targetObj[item.fcName] = item.val[0].fcName;
      }
    });
    return targetObj;
  }

  private getMinDate(field: IFilterField): Date | null {
    if (field.fcName !== 'dateTo') return null;

    const dateFromValue = this.formField.get('dateFrom').value;
    return dateFromValue ? new Date(dateFromValue) : null;
  }

  private getMaxDate(field: IFilterField): Date | null {
    if (field.fcName === 'dateFrom') {
      const dateToValue = this.formField.get('dateTo').value;
      return dateToValue ? new Date(dateToValue) : null;
    }
    return null;
  }

  private updateSelectedOptionsCount() {
    this.selectedOptionsNumber = 0;
    for (const key in this.initObjFields) {
      if (this.initObjFields[key] !== this.formField.value[key] && key !== 'dates') {
        this.selectedOptionsNumber++;
      } else if (key === 'dates') {
        const isDatesEqual = this.initObjFields[key] === this.formField.value[key];
        if (!isDatesEqual) {
          this.selectedOptionsNumber++;
        }
      }
    }
  }
}
