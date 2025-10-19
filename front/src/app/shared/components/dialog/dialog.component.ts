import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent {
  @Input() title: string;
  @Input() body: string[];

  constructor(protected ref: NbDialogRef<DialogComponent>) {}

  dismiss() {
    this.ref.close();
  }
}
