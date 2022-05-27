import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ELocalNames, FloatLabel, IDName, SystemDirectory, ValueType } from '@app/_models';

import { ELanguage } from '@app/constants/language';
import { MatFormField } from '@angular/material';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject } from 'rxjs';
import { untilDestroyed } from '@app/core';
import { FloatLabelType } from '@angular/material/core/typings/label/label-options';

@Component({
  selector: 'mat-app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectComponent),
      multi: true
    }
  ]
})
export class SearchSelectComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  /** control for the MatSelect filter keyword */
  optionFilterCtrl: FormControl = new FormControl();

  /** list of options filtered by search keyword */
  filteredOptions: ReplaySubject<SystemDirectory[]> = new ReplaySubject<SystemDirectory[]>(1);

  // change icon male-female
  changeIcon: boolean;

  currentSelectOption: string | number;

  fc: FormControl = new FormControl();
  tempPropertyName: string;
  selectValue: string | number = '';
  ELanguage = ELanguage;
  ValueType = ValueType;

  @Input() placeholder: string;
  @Input() floatLabel: FloatLabelType = FloatLabel.auto;
  @Input() options = [];
  @Input() isGenderLabel: boolean = false;
  @Input() selectHeight: 'selectNarrow' | 'selectWide' = 'selectWide';
  @Input() isEmitEvent: boolean = true;
  @Input() propertyName: string;
  @Input() valueType: string = ValueType.Id;
  @Input() isDisabled: boolean = false;
  @Input() required: boolean = false;
  @Input() language: string = ELanguage.Ge;
  @Input() compareWithProp: string;

  @Output() selectChange: EventEmitter<string | number> = new EventEmitter();
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('formField', { static: true }) formField: MatFormField;

  @Input()
  get value() {
    return this.selectValue;
  }
  set value(val: string | number) {
    this.selectValue = val;
    this.valueChange.emit(this.selectValue);
  }
  @Output() valueChange = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredOptions.next(this.options);

    if (changes.language && changes.language.currentValue) {
      this.changePropertyNameDependOnLanguage(changes.language.currentValue);
    }
  }

  ngOnInit() {
    this.initPropertyName();

    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      this.selectValue = val;
      this.onChange(val);
      this.cd.detectChanges();
    });

    this.optionFilterCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      this.filterOptions();
    });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  initPropertyName() {
    const nameDependsOnLang = this.language === ELanguage.Ge ? ELocalNames.NameGe : ELocalNames.NameRu;
    this.tempPropertyName = this.propertyName || nameDependsOnLang;
  }

  changePropertyNameDependOnLanguage(language: string) {
    if (language === ELanguage.Ge) {
      this.tempPropertyName = this.propertyName || ELocalNames.NameGe;
    }
    if (language === ELanguage.Ru) {
      this.tempPropertyName = this.propertyName || ELocalNames.NameRu;
    }
  }

  selectionChange(val: string | number) {
    this.currentSelectOption = val;
    this.selectChange.emit(val);
  }

  onChange: (val: string | number) => string | number = () => '';
  onTouched: () => boolean = () => false;

  // сохранение обратного вызова для изменений
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // сохранение обратного вызова для касания
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.fc.disable() : this.fc.enable();
  }

  // сохранение обратного вызова для изменений
  writeValue(val: string | number): void {
    this.fc.setValue(val, {
      emitEvent: this.isEmitEvent
    });
  }

  onOpen() {
    this.formField._elementRef.nativeElement.querySelector('.mat-select-trigger').click();
  }

  openedChangeEvent(event: boolean) {
    this.openedChange.emit(event);
  }

  onSelectOption(e: Event, option: any) {
    // this.selectedVal.emit(option.name);
    const nameOption = option[this.tempPropertyName].toLowerCase();
    if (nameOption === 'male') {
      this.changeIcon = true;
    } else if (nameOption === 'female') {
      this.changeIcon = false;
    }
  }

  ngOnDestroy() {}

  protected setInitialValue() {
    this.filteredOptions.pipe(untilDestroyed(this)).subscribe(val => {
      // if (this.valueType === ValueType.Id) {
      //   return (a: number | string, b: number | string) => a && b && a === b;
      // }
      //
      // if (this.valueType === ValueType.Object) {
      //   console.log('Object');
      //
      //   return (a: IDName, b: IDName) => {
      //     if (a && b && a.id && b.id) {
      //       return a && b && a.id === b.id;
      //     }
      //     else {
      //       return a && b && a[this.compareWithProp] === b[this.compareWithProp] ||
      //         a && b && a === b[this.compareWithProp] ||
      //         a && b && a[this.compareWithProp] === b;
      //     }
      //   };
      // }

      this.singleSelect.compareWith =
        this.valueType === ValueType.Id
          ? (a: number | string, b: number | string) => a && b && a === b
          : (a: IDName, b: IDName) => a && b && a.id === b.id;

      if (this.valueType === ValueType.Object) {
        this.singleSelect.compareWith = (a: IDName, b: IDName) => {
          return a && b && a[this.compareWithProp] === b[this.compareWithProp] ||
            a && b && a === b[this.compareWithProp] ||
            a && b && a[this.compareWithProp] === b;
        }
      }
    });
  }

  protected filterOptions() {
    if (!this.options && this.options.length) {
      return;
    }
    // get the search keyword
    let search = this.optionFilterCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    const filteredOptions = this.options.filter(
      option => option[this.tempPropertyName].toLowerCase().indexOf(search) > -1
    );
    // filter the options
    this.filteredOptions.next(filteredOptions);
  }
}
