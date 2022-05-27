import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { IFilterSubField } from '@app/_models';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective } from '@angular/forms';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-radio-filter-fields',
  templateUrl: './radio-filter-fields.component.html',
  styleUrls: ['./radio-filter-fields.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioFilterFieldsComponent),
      multi: true
    }
  ]
})
export class RadioFilterFieldsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  fc: FormControl = new FormControl();
  isInitVal: boolean = true;
  initFieldVal: string;
  childForm: FormGroup = new FormGroup({});

  @Input() radioInfo: IFilterSubField[];
  @Input() label: string = '';
  @Input() isEmitEvent: boolean = true;

  constructor(private parentForm: FormGroupDirective) {}

  ngOnInit() {
    this.initFieldVal = this.radioInfo[0].fcName;
    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => this.onChange(val));

    this.childForm = this.parentForm.form;
    this.childForm.get('status').valueChanges.subscribe(val => {
      if (this.initFieldVal === val) {
        this.isInitVal = true;
      } else {
        this.isInitVal = false;
      }
    });
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
    this.fc.setValue(val, {
      emitEvent: this.isEmitEvent
    });
  }

  clearSelectedField() {
    this.fc.setValue(this.radioInfo[0].fcName);
    this.isInitVal = true;
  }

  ngOnDestroy() {}
}
