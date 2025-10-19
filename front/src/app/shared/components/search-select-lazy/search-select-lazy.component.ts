import * as _ from 'lodash';

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
import { BaseFormField, Dir, ELocalNames, FloatLabel, IDName, SystemDirectory, ValueType } from '@app/_models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ELanguage, ELanguageType } from '@app/constants/language';
import { MatSelect } from '@angular/material/select';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ReplaySubject } from 'rxjs';
import { untilDestroyed } from '@app/core';
import { MatFormField } from '@angular/material/form-field';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSelectLazyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  /** control for the MatSelect filter keyword */
  optionFilterCtrl: FormControl = new FormControl();

  /** list of options filtered by search keyword */
  filteredOptions: ReplaySubject<SystemDirectory[]> = new ReplaySubject<SystemDirectory[]>(1);

  // change icon male-female
  changeIcon: boolean;

  calculatedHeight: string = '10rem';

  currentSelectOption: string | number | (string | number)[];
  loading: boolean = false;

  fc: FormControl = new FormControl();
  tempPropertyName: string;
  selectValue: string | number = '';
  ELanguage = ELanguage;
  ValueType = ValueType;

  @Input() allowEmptyValue: boolean;
  @Input() emptyValue: string = null;
  @Input() multiple: boolean = false;
  @Input() selectAllOption: boolean = false;

  @Input() placeholder: string;
  @Input() controlConfig: BaseFormField;
  @Input() floatLabel: string = FloatLabel.auto;
  @Input() options: Array<SystemDirectory> = [];
  @Input() isGenderLabel: boolean = false;
  @Input() selectHeight: 'selectNarrow' | 'selectWide' = 'selectWide';
  @Input() isEmitEvent: boolean = true;
  @Input() propertyName: string;
  @Input() disabled: boolean = false;

  @Input() availableIds: number[];

  @Input() valueType: string = ValueType.Id;
  @Input() isDisabled: boolean = false;
  @Input() required: boolean = false;
  @Input() language: string = ELanguage.Am;

  @Output() selectChange: EventEmitter<string | number | (string | number)[]> = new EventEmitter();
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('formField', { static: true }) formField: MatFormField;
  @ViewChild('optionsScrollbar', { static: true }) optionsScrollComponentRef: PerfectScrollbarComponent;

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  @Input()
  get value() {
    return this.selectValue;
  }

  set value(val: string | number) {
    this.selectValue = val;
    this.valueChange.emit(this.selectValue);
  }

  @Output() valueChange = new EventEmitter();

  selectAllSelected: boolean = false;
  private allOptionsSelected: boolean = false;
  private searchEvent;
  private optionsPartsArray: Array<Array<SystemDirectory>>;
  private optionsPartsMaxId: number;
  private isOptionsOpen: boolean = false;
  private currentPartIndex = 0;

  private _noneOptionValue: string;

  constructor(private cd: ChangeDetectorRef) {}

  get noneOptionValue(): string {
    return this._noneOptionValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && changes.options.currentValue && changes.options.currentValue.length) {
      // this.getOptionsPartsArray(this.options);
      this.filteredOptions.next(this.getInitOptions());
      this.showValueIfOptionsIsEmpty();
      this.calcScrollHeight();
      this.cd.detectChanges();
    }

    if (changes.language && changes.language.currentValue) {
      this.changePropertyNameDependOnLanguage(changes.language.currentValue);
      this.setNoneOptionValue();
      this.cd.detectChanges();
    }
  }

  isAvailableOption(option: any) {
    if (!!this.availableIds) {
      return !this.availableIds.includes(option.id);
    }
    return false;
  }

  ngOnInit() {
    this.initPropertyName();

    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      //
      // if (val) {
      //   this.filteredOptions.next(this.getInitOptions());
      //   this.calcScrollHeight();
      // }

      this.selectValue = val;
      this.updateSelectAllState();
      this.onChange(val);
      this.cd.detectChanges();
    });

    this.optionFilterCtrl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe(val => {
        if (this.isOptionsOpen) {
          this.filterOptions();
        }
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
    setTimeout(() => {
      this.setNoneOptionValue();
    }, 500);
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

  getOptionValue(option: SystemDirectory): any {
    if (this.multiple) {
      return this.valueType === ValueType.Id ? option.id : option;
    }
    return this.valueType === ValueType.Id ? option.id : option;
  }

  toggleSelectAll(): void {
    if (!this.multiple) return;

    this.fc.setValue([]);
    this.selectAllSelected = false;
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
    // this.searchEvent = false;
    // this.currentPartIndex =
    this.calcScrollHeight();
    this.filteredOptions.next(this.getInitOptions());

    // this.filteredOptions.next(this.isOptionsAsParts() ? this.optionsPartsArray[this.currentPartIndex] : this.options);
  }

  openedChangeEvent(event: boolean) {
    this.isOptionsOpen = !this.isOptionsOpen;
    this.calcScrollHeight();
    this.openedChange.emit(event);
    if (!this.isOptionsOpen) {
      this.filteredOptions.next(this.getInitOptions());
    }
  }

  ngOnDestroy() {}

  trackByFn(index: number, option: SystemDirectory) {
    return option.id;
  }

  // psYReachEnd(e: any) {
  //   if (this.searchEvent) {
  //     return;
  //   }
  //
  //   if (this.isOptionsOpen) {
  //     this.addToOptionsNextPart();
  //   }
  // }

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
    if (!this.options || this.options.length === 0) {
      return;
    }

    let search = this.optionFilterCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.options);
      if (this.multiple) {
        this.updateSelectAllState();
      }
      return;
    } else {
      search = search.toLowerCase();
    }

    const filteredOptions = this.options.filter(option =>
      !!option[this.tempPropertyName] ? option[this.tempPropertyName].toLowerCase().includes(search) : false
    );

    this.filteredOptions.next(filteredOptions);

    if (this.multiple) {
      this.updateSelectAllState();
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
    this.selectAllSelected = false;
  }

  private getFilteredOptionsValues(): any[] {
    const filteredOptions = this.options.filter(option =>
      !this.isAvailableOption(option)
    );

    return filteredOptions.map(option =>
      this.valueType === ValueType.Id ? option.id : option
    );
  }

  private getOptionsPartsArray(options: Array<SystemDirectory>) {
    if (options && options.length > 50) {
      this.optionsPartsArray = this.getOptionsChunks(options);
      this.optionsPartsMaxId = this.optionsPartsArray.length - 1;
    } else {
      this.optionsPartsArray = null;
      this.optionsPartsMaxId = null;
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

  private setNoneOptionValue = (): void => {
    if (this.controlConfig && this.controlConfig.showOnlyValueIfExist) {
      if (this.fc.value) {
        this._noneOptionValue =
          typeof this.fc.value === 'object'
            ? this.getLocalizationName(this.fc.value as any)
            : (this.fc.value as string);
        this.cd.markForCheck();
        return;
      }
    }
  };

  private getLocalizationName = (obj: Dir): string => (obj ? obj[ELanguageType[this.language]] : null);

  private showValueIfOptionsIsEmpty = (): void => {
    if (this.controlConfig && this.controlConfig.showValueIfOptionsIsEmpty) {
      if (!this.options || (this.options && !this.options.length)) {
        this._noneOptionValue = this.fc.value as string;
      } else {
        if (this.noneOptionValue) {
          this._noneOptionValue = null;
        }
      }
    }
    this.cd.markForCheck();
  };

  private getInitOptions() {
    if (this.fc.value) {
      const id = this.valueType === ValueType.Id ? this.fc.value : this.fc.value.id;
      const index: number = this.findOptionsPartByCurrentValueId(id) || 0;

      const firstPart = this.options.slice(index);
      const secondPart = this.options.slice(0, index);

      if (index > -1) {
        this.viewPort.scrollToIndex(index);
      }
      return firstPart.concat(secondPart);
    }

    // if (this.isOptionsAsParts() && !this.fc.value) {
    //   return this.optionsPartsArray[0];
    // }
    return this.options;
  }

  private getOptionsChunks(options: Array<SystemDirectory>) {
    return _.chunk(options, 20);
  }

  private isOptionsAsParts(): boolean {
    return this.optionsPartsArray && this.optionsPartsArray.length > 0;
  }

  private findOptionsPartByCurrentValueId(id: number) {
    return this.options ? this.options.findIndex(item => item.id === id) : 0;
  }

  private calcScrollHeight = (): void => {
    const count = this.options.length + (this.allowEmptyValue ? 1 : 0);
    if (count === 1) {
      this.calculatedHeight = '55px';
    } else if (count === 2) {
      this.calculatedHeight = '90px';
    } else if (count < 6) {
      this.calculatedHeight = count * 33 + 'px';
    } else {
      this.calculatedHeight = '10rem';
    }
    this.cd.detectChanges();
  };
}
