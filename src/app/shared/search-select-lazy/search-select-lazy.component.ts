import * as _ from 'lodash';

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ELocalNames, FloatLabel, IDName, SystemDirectory, ValueType } from '@app/_models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ELanguage } from '@app/constants/language';
import { MatFormField } from '@angular/material';
import { MatSelect } from '@angular/material/select';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ReplaySubject } from 'rxjs';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'mat-app-search-select-lazy',
  templateUrl: './search-select-lazy.component.html',
  styleUrls: ['./search-select-lazy.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectLazyComponent),
      multi: true
    }
  ]
})
export class SearchSelectLazyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  /** control for the MatSelect filter keyword */
  optionFilterCtrl: FormControl = new FormControl();

  /** list of options filtered by search keyword */
  filteredOptions: ReplaySubject<SystemDirectory[]> = new ReplaySubject<SystemDirectory[]>(1);

  // change icon male-female
  changeIcon: boolean;

  currentSelectOption: string | number;
  loading: boolean = false;

  fc: FormControl = new FormControl();
  tempPropertyName: string;
  selectValue: string | number = '';
  ELanguage = ELanguage;
  ValueType = ValueType;

  @Input() placeholder: string;
  @Input() floatLabel: string = FloatLabel.auto;
  @Input() options: Array<SystemDirectory> = [];
  @Input() isGenderLabel: boolean = false;
  @Input() selectHeight: 'selectNarrow' | 'selectWide' = 'selectWide';
  @Input() isEmitEvent: boolean = true;
  @Input() propertyName: string;
  @Input() valueType: string = ValueType.Id;
  @Input() isDisabled: boolean = false;
  @Input() required: boolean = false;
  @Input() language: string = ELanguage.Ge;

  @Output() selectChange: EventEmitter<string | number> = new EventEmitter();
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('formField', { static: true }) formField: MatFormField;
  @ViewChild('optionsScrollbar', { static: true }) optionsScrollComponentRef: PerfectScrollbarComponent;

  @Input()
  get value() {
    return this.selectValue;
  }
  set value(val: string | number) {
    this.selectValue = val;
    this.valueChange.emit(this.selectValue);
  }
  @Output() valueChange = new EventEmitter();

  private searchEvent;
  private optionsPartsArray: Array<Array<SystemDirectory>>;
  private optionsPartsMaxId: number;
  private isOptionsOpen: boolean = false;
  private currentPartIndex = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && changes.options.currentValue && changes.options.currentValue.length) {
      this.getOptionsPartsArray(this.options);

      this.filteredOptions.next(this.getInitOptions());
    }

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

      if (val) {
        this.filteredOptions.next(this.getInitOptions());
      }
    });

    this.optionFilterCtrl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe(val => {
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

    this.searchEvent = false;
    this.currentPartIndex = 0;
    this.filteredOptions.next(this.isOptionsAsParts() ? this.optionsPartsArray[this.currentPartIndex] : this.options);
  }

  openedChangeEvent(event: boolean) {
    this.isOptionsOpen = !this.isOptionsOpen;
    this.openedChange.emit(event);

    if (!this.isOptionsOpen) {
      this.filteredOptions.next(this.getInitOptions());
    }
  }

  ngOnDestroy() {}

  trackByFn(index: number, option: SystemDirectory) {
    return option.id;
  }

  psYReachEnd(e: any) {
    if (this.searchEvent) {
      return;
    }

    if (this.isOptionsOpen) {
      this.addToOptionsNextPart();
    }
  }

  protected setInitialValue() {
    this.filteredOptions.pipe(untilDestroyed(this)).subscribe(() => {
      this.singleSelect.compareWith =
        this.valueType === ValueType.Id
          ? (a: number | string, b: number | string) => a && b && a === b
          : (a: IDName, b: IDName) => a && b && a.id === b.id;
    });
  }

  protected filterOptions() {
    if (!this.options && this.options.length) {
      return;
    }

    this.searchEvent = true;

    // get the search keyword
    let search = this.optionFilterCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.options.slice());
      this.searchEvent = false;
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

  private getOptionsPartsArray(options: Array<SystemDirectory>) {
    if (options && options.length > 50) {
      this.optionsPartsArray = this.getOptionsChunks(options);
      this.optionsPartsMaxId = this.optionsPartsArray.length - 1;
    }
  }

  private addToOptionsNextPart() {
    let currentOptions: Array<SystemDirectory> = [];

    if (this.currentPartIndex < this.optionsPartsMaxId) {
      ++this.currentPartIndex;

      let i = 0;
      while (i <= this.currentPartIndex) {
        currentOptions = [...currentOptions, ...this.optionsPartsArray[i]];
        i++;
      }

      this.filteredOptions.next(currentOptions);
      this.cd.detectChanges();
    }
  }

  private getInitOptions() {
    if (this.isOptionsAsParts() && this.fc.value) {
      const id = this.valueType === ValueType.Id ? this.fc.value : this.fc.value.id;
      const index: number = this.findOptionsPartByCurrentValueId(id) || 0;
      return this.optionsPartsArray[index];
    }

    if (this.isOptionsAsParts() && !this.fc.value) {
      return this.optionsPartsArray[0];
    }

    return this.options;
  }

  private getOptionsChunks(options: Array<SystemDirectory>) {
    return _.chunk(options, 20);
  }

  private isOptionsAsParts(): boolean {
    return this.optionsPartsArray && this.optionsPartsArray.length > 0;
  }

  private findOptionsPartByCurrentValueId(id: number) {
    let targetIndex: number;

    this.optionsPartsArray.forEach((part: [], index) => {
      const found = part.find((item: SystemDirectory) => item.id === id);

      if (found) {
        targetIndex = index;
      }
    });

    return targetIndex;
  }
}
