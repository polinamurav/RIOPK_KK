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
import { IFilterField, IFilterKeyVal, IFilteredParams } from '@app/_models';
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
  language: string = ELanguage.Ge;

  initObjFields: IFilterKeyVal = {};
  updatedObjFields: IFilterKeyVal = {};

  @Input() filterFields: IFilterField[];
  @Input() currentFilterValues: IFilteredParams;

  filterFieldsObj: IFilterKeyVal = {};

  @Output() selectedFilterFields: EventEmitter<IFilterKeyVal> = new EventEmitter<IFilterKeyVal>();

  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService) {}

  ngOnChanges() {
    this.initFields = this.filterFields;
    this.filterFieldsObj = this.fromArrToObjTransform(this.filterFields);
    this.formField = this.formBuilder.group(this.filterFieldsObj);
    this.initObjFields = this.formField.value;
    this.selectedOptionsNumber = 0;

    this.setCurrentValues(this.currentFilterValues);
  }

  ngOnInit(): void {
    this.createLanguageSubscription();
  }

  setCurrentValues(values: IFilteredParams) {
    this.initObjFields = this.formField.value;
    if (values) {
      Object.keys(values).forEach((valueName: string) => {
        if (this.formField.get(valueName) != null) {
          this.formField.get(valueName).setValue(values[valueName]);
        }
      });
      this.onApplyBtnClick();
    }
  }

  ngAfterViewInit(): void {
    this.updatedObjFields = this.formField.value;
  }

  clearSelectedField(fcName: string) {
    this.formField.get(fcName).setValue(this.initObjFields[fcName]);
  }

  onApplyBtnClick() {
    this.selectedOptionsNumber = 0;
    for (const key in this.initObjFields) {
      if (this.initObjFields[key] !== this.formField.value[key] && key !== 'dates') {
        this.selectedOptionsNumber++;
      } else if (key === 'dates') {
        // блок, позволяющий добавлять в badge только одно изменение при одновременном изменении двух дат
        // и скрывать badge если датам снова возвращениыихв начальные значения:
        const isDatesEqual = this.initObjFields[key] === this.formField.value[key];
        if (!isDatesEqual) {
          this.selectedOptionsNumber++;
        }
      }
    }
    this.updatedObjFields = this.formField.value;
    this.selectedFilterFields.emit(this.updatedObjFields);

    if (this.trigger.menuOpen) {
      this.trigger.closeMenu();
    }
  }

  onResetBtnClick() {
    this.formField.setValue(this.initObjFields);
  }

  onCancelBtnClick() {
    this.formField.setValue(this.updatedObjFields);
    this.trigger.closeMenu();
  }

  ngOnDestroy() {}

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
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
}
