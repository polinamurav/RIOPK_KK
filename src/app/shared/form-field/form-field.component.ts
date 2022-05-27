import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PHONE_CODE, PHONE_MASK } from '@app/constants/phone-code';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ]
})
export class FormFieldComponent implements OnInit, ControlValueAccessor, OnChanges, OnDestroy {
  currentValue: string | number | Date;

  fc: FormControl = new FormControl();

  @Input() type: string | null = null;
  @Input() placeholder: string;
  @Input() isShowDoableLabel: boolean;
  @Input() maxLength: number;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  // префикс к маске телефона
  @Input() prefix: string = `+`;
  @Input() phoneMask: string;

  selectValue: string | number = '';
  @Input()
  get value() {
    return this.selectValue;
  }
  set value(val: string | number) {
    this.selectValue = val;
    this.valueChange.emit(this.selectValue);
  }
  @Output() valueChange = new EventEmitter();
  @Output() inputOnBlur = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      this.currentValue = val;
      this.selectValue = val;
      this.onChange(val);
      this.cd.detectChanges();
    });

    if (!this.phoneMask) {
      this.phoneMask = PHONE_MASK;
    }
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (!!changes.prefix && changes.prefix.currentValue && !this.phoneMask) {
      this.phoneMask = PHONE_MASK;
    }
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

  // сохранение обратного вызова для изменений
  writeValue(val: string | number): void {
    this.fc.setValue(val);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.fc.disable() : this.fc.enable();
  }

  onBlur() {
    if (this.isShowDoableLabel && (!this.currentValue || +this.currentValue <= 0)) {
      this.fc.setValue('');
    }
    this.inputOnBlur.emit(this.selectValue);
  }

  iteratePrev() {
    if (this.currentValue && +this.currentValue !== 1) {
      this.currentValue = +this.currentValue - 1;
    } else {
      this.currentValue = '';
    }
    this.fc.setValue(this.currentValue);
  }

  iterateNext() {
    if (this.currentValue) {
      this.currentValue = +this.currentValue + 1;
    } else {
      this.currentValue = 1;
    }
    this.fc.setValue(this.currentValue);
  }

  ngOnDestroy() {}
}
