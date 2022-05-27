import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ELanguage } from '@app/constants/language';
import { ELocalNames } from '@app/_models';
import { SimpleChanges } from '@angular/core';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  fc: FormControl = new FormControl();
  propertyName: string = ELocalNames.NameGe;
  isLabelString: boolean = true;
  ELanguage = ELanguage;

  @Input() isChecked: boolean = false;
  @Input() readonly: boolean = false;
  @Input() labelObj: any;
  @Input() label: string = '';
  @Input() language: string = ELocalNames.NameGe;

  @Output() getStateCheckbox: EventEmitter<boolean> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.language && changes.language.currentValue) {
      this.changePropertyNameDependOnLanguage(changes.language.currentValue);
    }
  }

  ngOnInit() {
    this.checkLabel();

    this.readonly ? this.fc.disable() : this.fc.enable();
    this.fc.setValue(this.isChecked);
    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => this.onChange(val));
  }

  onChange: (val: boolean) => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(val: boolean): void {
    this.fc.setValue(val);
  }

  toggleVisibility(e: Event) {
    this.getStateCheckbox.emit((e.currentTarget as HTMLInputElement).checked);
  }

  checkLabel() {
    if (this.labelObj) {
      this.isLabelString = false;
    }
  }

  changePropertyNameDependOnLanguage(lang: string) {
    if (lang === ELanguage.Ge) {
      this.propertyName = ELocalNames.NameGe;
    }
    if (lang === ELanguage.Ru) {
      this.propertyName = ELocalNames.NameRu;
    }
  }

  ngOnDestroy() {}
}
