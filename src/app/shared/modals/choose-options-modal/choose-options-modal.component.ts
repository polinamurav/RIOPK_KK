import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-options-modal',
  templateUrl: './choose-options-modal.component.html',
  styleUrls: ['./choose-options-modal.component.scss', '../close-modal-btn.scss']
})
export class ChooseOptionsModalComponent implements OnInit {
  // TODO: исправить any
  rules: any = {};

  emitData: EventEmitter<any> = new EventEmitter();

  // TODO: исправить any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data && this.data.rules) {
      this.rules = this.data.rules;
    }
  }

  ngOnInit() {}

  setStateRules(checked: boolean, nameOption: any) {
    this.rules[nameOption] = checked;
  }

  saveButtonClick() {
    this.emitData.emit(this.rules);
  }
}
