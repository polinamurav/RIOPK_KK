import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {URPAReportBatchDto} from '@app/pages/report/report-page/upra-report/models';
import {EInputType} from '@app/_models';
import {FormControl, Validators} from "@angular/forms";
import {MimeTypes} from "@app/components/constants/mime-types";
import {FileDownloaderEmitConfig} from "@app/shared/components/file-downloader/file-downloader.component";
import {config} from "../../../../../../assets/configurations/configurationFile";
import {ReportControllerService} from "@app/api";
import {tap} from "rxjs/operators";


export interface ICreateUpraReportModalConfig {
  title: string;
  item?: URPAReportBatchDto;
}

@Component({
  selector: 'ngx-create-upra-report-modal',
  templateUrl: './create-upra-report-modal.component.html',
  styleUrls: ['./create-upra-report-modal.component.scss']
})
export class CreateUpraReportModalComponent implements OnInit {

  EInputType = EInputType;
  loading: boolean;

  fileError: string;
  acceptTypes = [
    MimeTypes.XLS,
    MimeTypes.XLSX,
  ];

  maxSizeBytes = config.preApprovedMaxSizeBytes;
  packageFile: File;

  nameControl = new FormControl('', Validators.required);

  constructor(
    private reportControllerService: ReportControllerService,
    private dialogRef: MatDialogRef<CreateUpraReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalConfig: ICreateUpraReportModalConfig
  ) {
  }

  get isEdit() {
    return !!this.modalConfig.item;
  }

  ngOnInit(): void {
    if (this.modalConfig.item) {
      this.nameControl.setValue(this.modalConfig.item.name);
    }
  }

  uploadEvent(file: FileDownloaderEmitConfig) {
    this.packageFile = file.file;

    if (!this.isEdit) {
      this.validateForm();
    }

  }

  save() {
    if (!this.isEdit) {
      this.validateForm();
      if (this.fileError) {
        return;
      }
    }
    if (this.nameControl.valid) {

      if (this.isEdit) {
        this.reportControllerService.uploadClients(this.packageFile, this.modalConfig.item.id, this.nameControl.value).pipe(tap(res => {
          this.dialogRef.close('SAVED')
        })).subscribe()
      } else {
        this.reportControllerService.createURPAReportBatch(this.packageFile, this.nameControl.value).pipe(tap(res => {
          this.dialogRef.close('SAVED')
        })).subscribe()
      }


    }
  }


  private validateForm = () => {
    this.fileError = null;
    if (!this.packageFile) {
      this.fileError = 'Необходимо прикрепить список клиентов';
    }

  }

}
