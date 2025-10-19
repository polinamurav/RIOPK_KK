import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateNewPreApprovedBaseModal,
  CreateNewPreApprovedBaseModalComponent
} from '@app/pages/pre-approved-offers/pre-approved-offers/modals/create-new-pre-approved-base-modal/create-new-pre-approved-base-modal.component';
import { EInputType, ValueType } from '@app/_models';
import { FormGroupService } from '@app/services/form-group.service';
import { FormGroup } from '@angular/forms';
import {
  PreApprovedBasesListDataService,
  PreapproveStatusesEnum
} from '@app/pages/pre-approved-offers/pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list-data.service';
import { MimeTypes } from '@app/components/constants/mime-types';
import { FileDownloaderEmitConfig } from '@app/shared/components/file-downloader/file-downloader.component';
import { PreapproveBaseDto } from '@app/_models/api-models/preapprove-base-dto';
import { ActivatedRoute } from '@angular/router';
import {
  ConfirmModalComponent,
  ConfirmModalResult
} from '@app/shared/components/modals/confirm-modal/confirm-modal.component';
import { config } from '../../../../../assets/configurations/configurationFile';

@Component({
  selector: 'ngx-pre-approved-bases-process',
  templateUrl: './pre-approved-bases-process.component.html',
  styleUrls: ['./pre-approved-bases-process.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreApprovedBasesProcessComponent implements OnInit {
  PreapproveStatusesEnum = PreapproveStatusesEnum;
  preApprovedMaxSizeBytes = config.preApprovedMaxSizeBytes;

  EInputType = EInputType;
  ValueType = ValueType;

  uploadedBaseName: string;

  constructor(
    private readonly preApprovedBasesListDataService: PreApprovedBasesListDataService,
    private readonly formGroupService: FormGroupService<any, any>,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute
  ) {}

  get acceptAgreement() {
    return this.preApprovedBasesListDataService.acceptAgreement;
  }

  get currentStatus$() {
    return this.preApprovedBasesListDataService.currentStatus$;
  }

  get baseProcessRunForm() {
    return this.preApprovedBasesListDataService.baseProcessRunForm;
  }

  get strategyActionsConfig() {
    return this.preApprovedBasesListDataService.strategyActionsConfig;
  }

  get baseProcessRunConfig() {
    return this.preApprovedBasesListDataService.baseProcessRunConfig;
  }

  get selectedBase$() {
    return this.preApprovedBasesListDataService.selectedBase$;
  }

  get completedClients$() {
    return this.preApprovedBasesListDataService.completedClients$;
  }

  get selectedBase() {
    return this.preApprovedBasesListDataService.selectedBase;
  }

  get isLoading() {
    return this.preApprovedBasesListDataService.isLoading;
  }

  get errorMessage() {
    return this.preApprovedBasesListDataService.errorMessage;
  }

  get preapproveExecutionList$() {
    return this.preApprovedBasesListDataService.preapproveExecutionList$;
  }

  get preapproveExecutionList() {
    return this.preApprovedBasesListDataService.preapproveExecutionList;
  }

  ngOnInit(): void {}

  createNew() {
    console.log('Добавить новую базу');
    const data: CreateNewPreApprovedBaseModal = {
      isCreateNew: true
    };
    const dialogRef = this.dialog.open(CreateNewPreApprovedBaseModalComponent, {
      width: '50%',
      panelClass: 'custom-panel-cls',
      data
    });
  }

  deleteBase() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '30%',
      data: {
        title: 'Вы уверены что хотите удалить список клиентов?'
      },
      panelClass: 'custom-panel-cls'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === ConfirmModalResult.YES) {
        this.preApprovedBasesListDataService.deleteBase();
      }
    });
  }

  startProcess() {
    this.preApprovedBasesListDataService.startProcess();
  }

  stopProcess() {
    this.preApprovedBasesListDataService.stopProcess();
  }

  uploadBase(file: FileDownloaderEmitConfig, selectedBase: PreapproveBaseDto) {
    console.log('file', file);
    // FileDownloaderComponent
    // const dialogRef = this.dialog.open(SimpleFileDownloaderModalComponent, {
    //   width: '50%',
    //   panelClass: 'custom-panel-cls',
    //   data: {}
    // });
    this.uploadedBaseName = file.file.name;
    this.preApprovedBasesListDataService.uploadBase(file.file, selectedBase.id);
  }

  downloadBase = (): void => {
    this.preApprovedBasesListDataService.downloadBase();
  };

  downloadCalculatedClients() {
    this.preApprovedBasesListDataService.getPreapproveBaseResultsFile();
  }

  updateCalculationClients() {
    this.preApprovedBasesListDataService.fetchPreapproveBaseList();
  }
}
