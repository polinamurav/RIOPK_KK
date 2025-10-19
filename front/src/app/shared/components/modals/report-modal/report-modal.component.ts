import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemDirectory } from '@app/_models';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss', '../close-modal-btn.scss']
})
export class ReportModalComponent implements OnInit {
  title: string = '';
  reportForm: FormGroup;

  PRODUCTS: SystemDirectory[] = [
    { id: 0, name: 'Все продукты' },
    { id: 1, name: 'Trust loan' },
    { id: 2, name: 'Autocredit' },
    { id: 3, name: 'Credit card' }
  ];

  emitData: EventEmitter<any> = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    // TODO: исправить any
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = this.data.title;
  }

  ngOnInit() {
    this.reportForm = this.fb.group({
      fromDate: [''],
      tillDate: [''],
      selectProduct: ['']
    });
  }

  downloadButtonClick() {
    this.emitData.emit(this.reportForm.value);
  }
}
