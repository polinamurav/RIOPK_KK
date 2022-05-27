import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { IFilterSubField } from '@app/_models';
import { untilDestroyed } from '@app/core';
import { FormGroupDirective, FormGroup, ControlContainer, FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-filter-fields',
  templateUrl: './date-filter-fields.component.html',
  styleUrls: ['./date-filter-fields.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DateFilterFieldsComponent implements OnInit, OnChanges, OnDestroy {
  childForm: FormGroup = new FormGroup({});
  initDatesObj: { [key: string]: string | boolean | Date } = {};
  isInitValDate: boolean = true;

  @Input() datesInfo: IFilterSubField[];
  @Input() label: string = '';

  constructor(private parentForm: FormGroupDirective) {}

  ngOnInit() {}

  ngOnChanges(): void {
    this.datesInfo.forEach((date: IFilterSubField) => {
      this.initDatesObj[date.fcName] = date.val;
    });

    this.childForm = this.parentForm.form;
    this.childForm.addControl('dates', this.formGroupCreate(this.datesInfo));

    this.childForm
      .get('dates')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => {
        const isObjEqual = this.initDatesObj === this.childForm.get('dates').value;
        if (isObjEqual) {
          this.isInitValDate = true;
        } else {
          this.isInitValDate = false;
        }
      });
  }

  clearSelectedField() {
    this.childForm.get('dates').setValue(this.initDatesObj);
  }

  ngOnDestroy() {}

  private formGroupCreate(arr: IFilterSubField[]) {
    const newFg = new FormGroup({});
    arr.forEach(date => {
      newFg.addControl(date.fcName, new FormControl(date.val));
    });
    return newFg;
  }
}
