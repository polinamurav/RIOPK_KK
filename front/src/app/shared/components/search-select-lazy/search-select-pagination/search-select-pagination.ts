import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { BaseFormField, ELocalNames, FloatLabel, IDName, ValueType } from '@app/_models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ELanguage } from '@app/constants/language';
import { MatSelect } from '@angular/material/select';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ReplaySubject } from 'rxjs';
import { SystemDirectory } from '@app/_models';
import { untilDestroyed } from '@app/core';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'mat-app-search-select-pagination',
  templateUrl: '../search-select-lazy.component.html',
  styleUrls: ['../search-select-lazy.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectPaginationComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSelectPaginationComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  /** control for the MatSelect filter keyword */
  optionFilterCtrl: FormControl = new FormControl();

  /** list of options filtered by search keyword */
  filteredOptions: ReplaySubject<SystemDirectory[]> = new ReplaySubject<SystemDirectory[]>(1);

  calculatedHeight: string;
  // change icon male-female
  changeIcon: boolean;

  currentSelectOption: string | number | (string | number)[];

  fc: FormControl = new FormControl();
  tempPropertyName: string;
  selectValue: string | number | (string | number)[] = '';
  loading: boolean = false;
  page: number = 0;
  ELanguage = ELanguage;
  ValueType = ValueType;

  @Input() allowEmptyValue: boolean = true;
  @Input() emptyValue: string = null;
  @Input() multiple: boolean = false;
  @Input() selectAllOption: boolean = false;

  @Input() controlConfig: BaseFormField;
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
  @Input() language: string = ELanguage.Am;
  @Input() pageForSelect: number;

  @Input() disabled: boolean = false;
  @Input() showSearchOption: boolean = true;

  @Input() availableIds: number[];

  @Output() selectChange: EventEmitter<string | number | (string | number)[]> = new EventEmitter();
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() getNextPartEvent: EventEmitter<number> = new EventEmitter();
  @Output() getSortPartEvent: EventEmitter<string> = new EventEmitter();

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('formField', { static: true }) formField: MatFormField;
  @ViewChild('optionsScrollbar', { static: true }) optionsScrollComponentRef: PerfectScrollbarComponent;

  noneOptionValue: string;
  selectAllSelected: boolean = false;

  @Input()
  get value(): string | number | (string | number)[] {
      return this.selectValue;
  }
  set value(val: string | number | (string | number)[]) {
      this.selectValue = val;
    this.valueChange.emit(this.selectValue);
  }
  @Output() valueChange = new EventEmitter();

  private searchEvent;
  private isOptionsOpen: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && changes.options.currentValue && changes.options.currentValue.length) {
      this.loading = false;
      this.page = this.pageForSelect || this.page;
      this.filteredOptions.next(this.options);
    }
    this.setNoneOptionValue();
    if (changes.language && changes.language.currentValue) {
      this.changePropertyNameDependOnLanguage(changes.language.currentValue);
    }
  }

  ngOnInit() {
    this.initPropertyName();

    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      this.selectValue = val;
      this.updateSelectAllState();
      this.onChange(val);
      this.cd.detectChanges();

      if (val) {
        this.filteredOptions.next(this.options);
      }
    });

    this.optionFilterCtrl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe(() => this.filterOptions());
  }

  isAvailableOption(option: any) {
    if (!!this.availableIds) {
      return !this.availableIds.includes(option.id);
    }
    return false;
  }

  getOptionValue(option: SystemDirectory): any {
    if (this.multiple) {
      return this.valueType === ValueType.Id ? option.id : option;
    }
    return this.valueType === ValueType.Id ? option.id : option;
  }

  toggleSelectAll(): void {
    if (!this.multiple) return;

    if (this.selectAllSelected) {
      this.fc.setValue([]);
    } else {
      const allValues = this.getFilteredOptionsValues();
      this.fc.setValue(allValues);
    }
    this.selectAllSelected = !this.selectAllSelected;
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  initPropertyName() {
    const nameDependsOnLang = this.language === ELanguage.Am ? ELocalNames.NameAm : ELocalNames.NameRu;
    this.tempPropertyName = this.propertyName || nameDependsOnLang;
  }

  changePropertyNameDependOnLanguage(language: string) {
    if (language === ELanguage.Am) {
      this.tempPropertyName = this.propertyName || ELocalNames.NameAm;
    }
    if (language === ELanguage.Ru) {
      this.tempPropertyName = this.propertyName || ELocalNames.NameRu;
    }
  }

  selectionChange(val: string | number | (string | number)[]) {
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
  writeValue(val: string | number | (string | number)[]): void {
    this.fc.setValue(val, {
      emitEvent: this.isEmitEvent
    });

    if (this.multiple) {
      this.updateSelectAllState();
    }
  }

  onOpen() {
    this.formField._elementRef.nativeElement.querySelector('.mat-select-trigger').click();
    this.searchEvent = false;
    this.getNextPartEvent.emit(null);
  }

  openedChangeEvent(event: boolean) {
    this.isOptionsOpen = !this.isOptionsOpen;
    this.openedChange.emit(event);

    if (!this.isOptionsOpen) {
      this.filteredOptions.next(this.options);
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
      this.loading = true;
      this.page += 1;
      this.getNextPartEvent.emit(this.page);
    }
  }

  protected setInitialValue() {
    this.filteredOptions.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.multiple) {
        this.singleSelect.compareWith = (a: any, b: any) => {
          if (this.valueType === ValueType.Id) {
            return Array.isArray(a) && Array.isArray(b)
              ? a.length === b.length && a.every(val => b.includes(val))
              : a === b;
          } else {
            return this.compareObjects(a, b);
          }
        };
      } else {
        this.singleSelect.compareWith =
          this.valueType === ValueType.Id
            ? (a: number | string, b: number | string) => a && b && a === b
            : (a: IDName, b: IDName) => a && b && a.id === b.id;
      }
    });
  }

  protected filterOptions() {
    if (!this.options && this.options.length) {
      return;
    }

    this.searchEvent = true;
    this.loading = true;

    let search = this.optionFilterCtrl.value;
    if (!search) {
      this.getNextPartEvent.emit(null);
      this.searchEvent = false;
    } else {
      search = search.toLowerCase();
      this.getSortPartEvent.emit(search);
    }
  }

  private compareObjects(a: any, b: any): boolean {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((obj, index) =>
        obj && b[index] && obj.id === b[index].id
      );
    }
    return a && b && a.id === b.id;
  }

  private updateSelectAllState(): void {
    if (!this.multiple || !this.selectAllOption) return;

    const currentValues = this.fc.value || [];
    const filteredOptionsValues = this.getFilteredOptionsValues();

    this.selectAllSelected = filteredOptionsValues.length > 0 &&
      filteredOptionsValues.every(val =>
        currentValues.includes(val)
      );
  }

  private getFilteredOptionsValues(): any[] {
    const filteredOptions = this.options.filter(option =>
      !this.isAvailableOption(option)
    );

    return filteredOptions.map(option =>
      this.valueType === ValueType.Id ? option.id : option
    );
  }

  private setNoneOptionValue = (): void => {
    if (this.controlConfig && this.controlConfig.showValueIfOptionsIsEmpty) {
      if (!this.options || (this.options && !this.options.length)) {
        this.noneOptionValue = this.fc.value as string;
      } else {
        this.noneOptionValue = null;
      }
    }
  };
}
