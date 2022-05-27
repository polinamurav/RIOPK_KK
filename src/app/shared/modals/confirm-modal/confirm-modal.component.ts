import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss', '../close-modal-btn.scss']
})
export class ConfirmModalComponent implements OnInit {
  title: string = '';
  // TODO: исправить any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data && this.data.title) {
      this.title = this.data.title;
    }
  }
  ngOnInit() {}
}
