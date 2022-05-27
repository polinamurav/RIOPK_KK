import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, forwardRef } from '@angular/core';

import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, OnChanges, ControlValueAccessor, Validator, OnDestroy {
  dateMask = {
    mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    showMask: false,
    guide: true,
    keepCharPositions: true,
    placeholderChar: '_'
  };

  fc: FormControl = new FormControl();

  @Input() minDate: Date;
  @Input() maxDate: Date = new Date('9999-12-31T23:59:59');
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => this.onChange(val));
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }

  onChange: (val: Date | null) => Date | null = () => null;
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

  writeValue(val: Date | null) {
    this.fc.setValue(val);
  }

  validate(fc: AbstractControl) {
    let isNotValid = false;

    if (
      fc &&
      fc.value &&
      ((this.minDate && fc.value.getTime() < this.minDate.getTime()) ||
        (this.maxDate && fc.value.getTime() > this.maxDate.getTime()))
    ) {
      isNotValid = true;
    }
    return !isNotValid
      ? null
      : {
          invalid: true
        };
  }

  saveRange(inputVal: string) {
    if (!!inputVal) {
      const date =
        new Date(inputVal.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')).toString() !== 'Invalid Date'
          ? new Date(inputVal.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'))
          : new Date(inputVal);
      if (
        (this.minDate && date.getTime() < this.minDate.getTime()) ||
        (this.maxDate && date.getTime() > this.maxDate.getTime())
      ) {
        this.fc.reset();
      } else {
        this.fc.setValue(date.toString() !== 'Invalid Date' ? date : '');
      }
    } else {
      this.fc.reset();
    }
  }

  ngOnDestroy() {}
}
