import {
  AttachmentDto,
  AttachmentSaveData,
  AttachmentType,
  ELocalNames,
  ModalData,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';

import { AttachmentControllerService } from '@app/api/attachment-controller.service';
import { Client } from '@app/_models/api-models/client';
import { ClientControllerService } from '@app/api';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { MatDialog } from '@angular/material/dialog';
import { MimeTypes } from '@app/components/constants/mime-types';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UploadModalComponent } from '@app/shared/modals/upload-modal/upload-modal.component';

@Component({
  selector: 'app-documents-clients',
  templateUrl: './documents-clients.component.html',
  styleUrls: ['./documents-clients.component.scss']
})
export class DocumentsClientsComponent implements OnInit, OnDestroy {
  @Input() clientData: Client;
  @Input() currentRoles: Record<string, boolean>;

  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('attachmentType.nameRu', 'Тип документа', 'string', 'attachmentType.nameRu'),
    new TableDataHeader('filename', 'Файл', 'link', 'filename'),
    new TableDataHeader('created', 'Дата загрузки', 'dateAndTime', 'created'),
    new TableDataHeader('changedByUsername', 'Кем загружен', 'string', 'changedByUsername'),
    new TableDataHeader('isDeletePossible', 'УДАЛИТЬ', 'deletedDoc')
  ];
  tableData: TableData<AttachmentDto>;
  downloadAttachmentLoading: boolean;
  isReadonly: boolean;
  attachmentTypesLoading: boolean;
  uploadAttachmentLoading: boolean;
  isDeleteProcess: boolean = false;

  private attachmentTypes: AttachmentType[];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private downloadUploadFileService: DownloadUploadFileService,
    private attachmentControllerService: AttachmentControllerService,
    private clientService: ClientControllerService
  ) {}

  ngOnInit() {
    this.initIsReadonly();
    this.getDocuments(this.clientData);
    this.getAttachmentTypes(this.clientData.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  linkEvent(attachment: AttachmentDto) {
    this.downloadAttachment(attachment);
  }

  deleteDoc(attachment: AttachmentDto) {
    if (!this.isDeleteProcess) {
      this.isDeleteProcess = true;
      this.attachmentControllerService
        .delete(attachment.id)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.isDeleteProcess = false;
          })
        )
        .subscribe(() => {
          this.uploadAttachmentCallback();
        });
    }
  }

  attachFile() {
    const data: ModalData = {
      placeholder: 'Тип файла',
      pathTitle: 'Выберите файл для загрузки',
      accept: [MimeTypes.PDF],
      viewSearchSelect: true,
      selectPropertyName: ELocalNames.NameRu,
      selectData: this.attachmentTypes,
      returnString: false
    };
    const dialogRef = this.dialog.open(UploadModalComponent, {
      height: 'auto',
      width: '532px',
      data
    });

    dialogRef.afterClosed().subscribe((value: AttachmentSaveData | string) => {
      if (value && typeof value !== 'string') {
        const clientId = this.clientData.id;
        this.uploadAttachment(clientId, value.typeId, value.file);
      }
    });
  }

  private getDocuments(clientData: Client) {
    if (clientData) {
      this.attachmentControllerService.getAllByAClientId(clientData.id).subscribe((value: AttachmentDto[]) => {
        this.setTableData(value);
      });
    }
  }

  private setTableData(value: AttachmentDto[]) {
    this.tableData = new TableData<AttachmentDto>(this.objColNameProps, value);
  }

  private downloadAttachment(attachment: AttachmentDto) {
    if (!this.downloadAttachmentLoading) {
      this.downloadAttachmentLoading = true;
      this.attachmentControllerService
        .downloadAttachment(attachment.ecmUrl)
        .pipe(finalize(() => (this.downloadAttachmentLoading = false)))
        .subscribe(value => {
          this.downloadUploadFileService.downloadFile(value, attachment.filename);
        });
    }
  }

  private initIsReadonly() {
    this.isReadonly = !(
      this.currentRoles.isCreditManager ||
      this.currentRoles.isVideoBank ||
      this.currentRoles.isAdmin
    );
  }

  private getAttachmentTypes(clientId: number) {
    if (!this.attachmentTypesLoading) {
      this.attachmentTypesLoading = true;
      this.clientService
        .getAttachmentTypes(clientId)
        .pipe(finalize(() => (this.attachmentTypesLoading = false)))
        .subscribe(value => (this.attachmentTypes = value));
    }
  }

  private uploadAttachment(clientId: number, attachmentTypeId: string, file: File) {
    if (!this.uploadAttachmentLoading) {
      this.uploadAttachmentLoading = true;
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.attachmentControllerService
        .uploadByClient(clientId, attachmentTypeId, formData)
        .pipe(finalize(() => (this.uploadAttachmentLoading = false)))
        .subscribe(() => {
          this.uploadAttachmentCallback();
        });
    }
  }

  private uploadAttachmentCallback() {
    this.getDocuments(this.clientData);
  }
}
