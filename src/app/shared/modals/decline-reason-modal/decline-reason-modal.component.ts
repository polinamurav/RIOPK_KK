import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dir, Directory, StaticDirectory } from '@app/_models';

export interface DeclineReasonModalData {
  declineReasons: StaticDirectory[] | Dir[];
}
@Component({
  selector: 'app-decline-reason-modal',
  templateUrl: './decline-reason-modal.component.html',
  styleUrls: ['./decline-reason-modal.component.scss']
})
export class DeclineReasonModalComponent implements OnInit {
  public title: string = 'Modals.Title.ChooseDeclineReason';
  public confirmBtnName: string = 'Modals.Buttons.Reject';
  public isLoading: boolean = true;
  public declineForm: FormGroup;
  public declineReasons: Directory[] = [];
  public language: string;

  constructor(
    public dialogRef: MatDialogRef<DeclineReasonModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { declineReasons: Directory[]; language: string }
  ) {}

  ngOnInit() {
    this.language = this.data.language;
    this.getOptions();
    this.createForm();
  }

  createForm() {
    this.declineForm = this.formBuilder.group({
      declineReasonControl: ['', [Validators.required]]
    });
  }

  getOptions() {
    this.declineReasons = this.data.declineReasons;
  }

  sendButtonConfirm() {
    this.dialogRef.close(this.declineForm.get('declineReasonControl').value);
  }
}
