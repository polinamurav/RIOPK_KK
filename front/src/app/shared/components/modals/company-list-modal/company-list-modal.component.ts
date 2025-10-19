import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { PaginationAndSortingDto, Status, DirCompanyListDto } from '@app/_models';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectoriesService } from '@app/api';

@Component({
  selector: 'app-company-list-modal',
  templateUrl: './company-list-modal.component.html',
  styleUrls: ['./company-list-modal.component.scss']
})
export class CompanyListModalComponent implements OnInit {
  emitData: EventEmitter<any> = new EventEmitter();
  companyListForm: FormGroup;
  companyListData: DirCompanyListDto;
  title: string = '';
  params: PaginationAndSortingDto;
  statusList: Status[] = [];
  showEditButtons: boolean = false;
  showSendButton: boolean = false;
  controlsList: { [key: string]: AbstractControl } | null = null;

  constructor(
    private _store: Store<IAppState>,
    public fb: FormBuilder,
    private directoriesService: DirectoriesService,
    public dialogRef: MatDialogRef<CompanyListModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { companyData: DirCompanyListDto; showSendButton: boolean; paginationData: PaginationAndSortingDto }
  ) {
    if (!!data && !!data.companyData) {
      this.companyListData = data.companyData;
    }
    if (!!data && !!data.paginationData) {
      this.params = data.paginationData;
    }
    this.showSendButton = data.showSendButton;
  }

  ngOnInit() {
    this.companyListFormCreate();

    this.directoriesService.getCompanyStatusDir().subscribe(statusList => {
      this.statusList = statusList;
    });
  }

  onSave() {
    if (!this.companyListForm.valid) {
      return;
    }

    this.emitData.emit({
      active: this.companyListForm.get('active').value,
      code: this.companyListData.id,
      dirCompanyStatusId: this.companyListForm.get('dirCompanyStatusId').value,
      id: this.companyListData.id,
      inn: this.companyListForm.get('inn').value,
      name: this.companyListForm.get('nameRu').value,
      changedByUsername: this.companyListData.changedByUsername
    });
    this.dialogRef.close();
  }

  editButtonClick() {
    this.showEditButtons = true;
    this.companyListForm.enable();
  }

  cancelButtonClick(cancelChanges: boolean) {
    this.showEditButtons = false;
    this.companyListForm.disable();

    if (!!cancelChanges) {
      this.setInitialFormValues();
    }
  }

  sendButtonClick() {
    if (this.companyListForm.invalid) {
      return;
    }
    this.emitData.emit({
      dirCompanyStatusId: this.companyListForm.get('dirCompanyStatusId').value,
      id: this.companyListData.id,
      inn: this.companyListForm.get('inn').value,
      name: this.companyListForm.get('name').value,
      active: this.companyListForm.get('active').value,
      changedByUsername: this.companyListData.changedByUsername
    });
    this.dialogRef.close();
  }

  // TODO:
  private companyListFormCreate() {
    this.companyListForm = this.fb.group({
      name: [
        { value: !!this.companyListData ? this.companyListData.name : '', disabled: !this.showSendButton },
        Validators.required
      ],
      active: [{ value: !!this.companyListData ? this.companyListData.active : false, disabled: !this.showSendButton }],
      inn: [{ value: !!this.companyListData ? this.companyListData.inn : '', disabled: !this.showSendButton }],
      dirCompanyStatusId: [
        {
          value: !!this.companyListData ? this.companyListData.dirCompanyStatusId : '',
          disabled: !this.showSendButton
        },
        Validators.required
      ]
    });
    this.controlsList = this.companyListForm.controls;
  }

  private setInitialFormValues() {
    for (const control in this.controlsList) {
      if (control) {
        this.controlsList[control].setValue(this.companyListData[control]);
      }
    }
  }
}
