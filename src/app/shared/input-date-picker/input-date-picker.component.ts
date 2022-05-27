import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'mat-app-input-date-picker',
  templateUrl: './input-date-picker.component.html',
  styleUrls: ['./input-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDatePickerComponent),
      multi: true
    }
  ]
})
export class InputDatePickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @ViewChild('datepickerToggle', { static: true }) datepickerToggle: any;
  @Input() date: Date = new Date(); // format '22-11-2019'
  @Output() valueDate = new EventEmitter();
  dateControl: FormControl = new FormControl();
  constructor() {}

  ngOnInit() {
    this.dateControl.valueChanges.pipe(untilDestroyed(this)).subscribe(val => this.onChange(val));
  }

  onChange: (val: Date) => Date = () => new Date();
  onTouched: () => boolean = () => false;

  writeValue(val: Date): void {
    this.dateControl.setValue(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onOpen() {
    const matButton: any = this.datepickerToggle._button;
    const elementRef: ElementRef = matButton._elementRef;
    elementRef.nativeElement.click();
  }

  onDate(e: any) {
    this.valueDate.emit(e.target.value);
  }

  ngOnDestroy() {}
}
