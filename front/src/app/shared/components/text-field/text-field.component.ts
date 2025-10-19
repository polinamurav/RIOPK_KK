import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent implements OnInit, ControlValueAccessor, OnDestroy {
  currentValue: number | string;

  fc: FormControl = new FormControl();

  isOverflowHidden: boolean = false;
  lines: number;

  @Input() label: string = 'Textarea';
  @Input() maxlength: number = 100;
  @Input() autosize: 'set-autosize' | 'none' | 'set-autosize-scroll' | null = null;
  @Input() default: boolean = true;
  @Input() scroll: boolean = false;
  @Input() resize: string = 'none';
  @Input() rows: number = 1;
  @Output() valueChange = new EventEmitter();

  get value() {
    return this.currentValue;
  }

  set value(val: string | number) {
    this.currentValue = val;
    this.valueChange.emit(this.currentValue);
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.fc.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      if (val) {
        this.lines = val.split('\n').length;
      }
      this.currentValue = val;
      this.onChange(val);
      this.cd.detectChanges();
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
    this.fc.setValue(val);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.fc.disable() : this.fc.enable();
    if (this.autosize === 'set-autosize-scroll') {
      this.isOverflowHidden = false;
    } else {
      this.isOverflowHidden = isDisabled;
    }
  }

  onBlur() {
    if (!this.currentValue) {
      this.fc.setValue('');
    }
  }

  ngOnDestroy() {}
}
