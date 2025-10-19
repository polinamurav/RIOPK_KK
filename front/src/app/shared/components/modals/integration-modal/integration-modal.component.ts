import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IntegrationSetting, PaginationAndSortingDto } from '@app/_models';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { AdmUpdateIntegrationAction } from '@app/store/actions/administration.actions';

@Component({
  selector: 'app-integration-modal',
  templateUrl: './integration-modal.component.html',
  styleUrls: ['./integration-modal.component.scss']
})
export class IntegrationModalComponent implements OnInit {
  emitData: EventEmitter<any> = new EventEmitter();
  integrationForm: FormGroup;
  integrationData: IntegrationSetting;
  title: string = '';
  params: PaginationAndSortingDto;

  constructor(
    private _store: Store<IAppState>,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<IntegrationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { settings: IntegrationSetting; pagination: PaginationAndSortingDto }
  ) {
    this.integrationData = data.settings;
    this.params = data.pagination;
  }

  ngOnInit() {
    this.integrationForm = this.fb.group({
      serviceName: [!!this.integrationData && this.integrationData.serviceName ? this.integrationData.serviceName : ''],
      isServiceOn: [!!this.integrationData ? this.integrationData.isServiceOn : false],
      serviceCode:
        !!this.integrationData && this.integrationData.serviceCode
          ? [{ value: this.integrationData.serviceCode, disabled: true }]
          : '',
      created:
        !!this.integrationData && this.integrationData.created
          ? [{ value: this.integrationData.created, disabled: true }]
          : '',
      updated:
        !!this.integrationData && this.integrationData.updated
          ? [{ value: this.integrationData.updated, disabled: true }]
          : ''
    });
  }

  onSave() {
    const updatedIntegration: IntegrationSetting = {
      created: this.integrationData.created,
      isServiceOn: this.integrationForm.get('isServiceOn').value,
      serviceCode: this.integrationData.serviceCode,
      serviceName: this.integrationForm.get('serviceName').value,
      updated: this.integrationData.updated
    };

    this._store.dispatch(AdmUpdateIntegrationAction({ data: updatedIntegration, paginationData: this.params }));
    this.dialogRef.close();
  }
}
