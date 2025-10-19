import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ELanguage } from '@app/constants/language';
import { ELocalNames } from '@app/_models';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ViewRef } from '@angular/core';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'mat-app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggleComponent),
      multi: true
    }
  ]
})
export class SlideToggleComponent implements OnInit, OnChanges, ControlValueAccessor, OnDestroy {
  fc: FormControl = new FormControl();
  propertyName: string = ELocalNames.NameAm;
  isLabelString: boolean = true;
  ELanguage = ELanguage;

  @Input() label: string = '';
  @Input() labelObj: any;
  @Input() isToggleCheked: boolean = false;
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() isDisabled: boolean = false;
  @Input() language: string = ELocalNames.NameAm;

  selectValue: boolean = false;
  @Input()
  get value() {
    return this.selectValue;
  }
  set value(val: boolean) {
    this.selectValue = val;
    this.valueChange.emit(this.selectValue);
  }
  @Output() valueChange = new EventEmitter();

  @Output() isToggleChecked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.language && changes.language.currentValue) {
      this.changePropertyNameDependOnLanguage(changes.language.currentValue);
    }
  }

  ngOnInit() {
    this.checkLabel();

    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      this.selectValue = val;
      this.onChange(val);
    });
  }

  onChange: (val: boolean) => boolean = () => false;
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
  writeValue(val: boolean): void {
    this.fc.setValue(val);
    if (!(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges();
    }
  }

  checkLabel() {
    if (this.labelObj) {
      this.isLabelString = false;
    }
  }

  changePropertyNameDependOnLanguage(lang: string) {
    if (lang === ELanguage.Am) {
      this.propertyName = ELocalNames.NameAm;
    }
    if (lang === ELanguage.Ru) {
      this.propertyName = ELocalNames.NameRu;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.fc.disable() : this.fc.enable();
  }

  toggle(event: MatSlideToggleChange) {
    this.isToggleChecked.emit(event.checked);
  }

  ngOnDestroy() {}
}
