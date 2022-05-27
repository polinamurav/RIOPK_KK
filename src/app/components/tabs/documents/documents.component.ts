import * as _ from 'lodash';

import {
  Application,
  AttachmentDto,
  AttachmentSaveData,
  AttachmentType,
  BaseFormField,
  ELocalNames,
  ModalData,
  TableData,
  EInputType,
  Dir,
  PrintingFormDto,
  PrintFormModalEmit,
  PrintingFormDownloadRq
} from '@app/_models';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, switchMap, takeUntil } from 'rxjs/operators';

import { AttachmentControllerService } from '@app/api/attachment-controller.service';
import { AttachmentStageSettingService } from '@app/api/attachment-stage-setting.service';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { MatDialog } from '@angular/material/dialog';
import { MimeTypes } from '@app/components/constants/mime-types';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { UploadAttachmentListenerService } from '@app/services/upload-attachment-listener.service';
import { UploadDocumentId } from '@app/constants/upload-document-id';
import { UploadModalComponent } from '@app/shared/modals/upload-modal/upload-modal.component';
import { DOCUMENTS_HEADERS } from '@app/components/tabs/documents/constants/documents.constants';
import { DOCUMENTS_INFO, DocumentsGroupKeys } from '@app/components/tabs/documents/constants/documents.config';
import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupService } from '@app/services/form-group.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { CredentialsService } from '@app/services/authentication';
import { untilDestroyed } from '@app/core';
import { ApplicationControllerService, PrintingFormControllerService } from '@app/api';
import { AdditionalPrintFormService } from '@app/services/additional-print-form.service';
import { PrintFormModalComponent } from '@app/shared/modals/print-form-modal/print-form-modal.component';
import { TranslateService } from '@ngx-translate/core';

type Options = Dir;

@Component({
  selector: 'ng-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  @Input() applicationData: Application;

  documentsData: TableData<AttachmentDto> = new TableData(DOCUMENTS_HEADERS, []);

  infoConfig: BaseFormField[] = DOCUMENTS_INFO;

  downloadAttachmentLoading: boolean;
  isView: boolean;
  attachmentTypesLoading: boolean;
  uploadAttachmentLoading: boolean;
  currentRoles: Record<string, boolean>;
  isDeleteProcess: boolean = false;
  isLoading: boolean = false;
  isCreditManager: boolean = false;
  isDSA: boolean = false;
  isVideoBank: boolean = false;
  isArchivist: boolean = false;
  propertyName: string;
  isCurrentLang: string;

  EInputType = EInputType;
  DocumentsGroupKeys = DocumentsGroupKeys;

  private attachmentTypes: AttachmentType[];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  footerConfigSource = 'common.documents';

  form: FormGroup;

  @Input() language: string;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private formGroupService: FormGroupService<any, Options>,
    private downloadUploadFileService: DownloadUploadFileService,
    private attachmentControllerService: AttachmentControllerService,
    private attachmentStageSettingService: AttachmentStageSettingService,
    private uploadAttachmentListener: UploadAttachmentListenerService,
    private credentialsService: CredentialsService,
    private applicationService: ApplicationControllerService,
    private additionalPrintFormService: AdditionalPrintFormService,
    private printingFormService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.isCurrentLang = this.translateService.currentLang;

    this.currentRoles = _.cloneDeep(CURRENT_ROLES);
    setRoles(this.currentRoles, this.credentialsService);

    this.createForm();
    this.filterConfigsByRoles(['infoConfig']);
    this.initIsView();
    this.initIsViewDSARole();
    this.initIsCreditManagerRole();
    this.initIsVideoBankRole();
    this.initIsArchivistRole();
    this.getDocuments(this.applicationData);
    this.getAttachmentTypes(this.applicationData.stage.id);
    this.createUploadPhotoEventSubscription(this.applicationData);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  linkEvent(attachment: AttachmentDto) {
    if (attachment.ecmUrl) {
      this.downloadAttachment(attachment);
    } else {
      this.attachFile(attachment);
    }
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
          this.deleteUploadAttachmentCallback(attachment.attachmentType.id);
        });
    }
  }

  attachFile(attachment?: AttachmentDto) {
    const data: ModalData = {
      placeholder: 'Documents.Placeholders.FileType',
      pathTitle: 'Documents.Titles.ChooseFile',
      accept: [MimeTypes.PDF],
      viewSearchSelect: true,
      selectPropertyName: this.language === 'ge' ? ELocalNames.NameGe : ELocalNames.NameRu,
      selectData: this.attachmentTypes,
      returnString: false,
      attachmentTypeId: attachment ? attachment.attachmentType.id : null
    };
    const dialogRef = this.dialog.open(UploadModalComponent, {
      height: 'auto',
      width: '532px',
      data
    });

    dialogRef.afterClosed().subscribe((value: AttachmentSaveData | string) => {
      if (value && typeof value !== 'string') {
        const applicationId = this.applicationData.id;
        const applicantId = this.applicationData.applicant.id;
        const attachmentId = attachment ? attachment.id : null;
        if (value.file) {
          this.uploadAttachment(applicationId, applicantId, value.typeId, value.file, attachmentId);
        } else {
          this.uploadAttachment(applicationId, applicantId, value.typeId);
        }
      }
    });
  }

  filterConfigsByRoles(configNames: string[]): void {
    configNames.forEach(configName => {
      this[configName] = this[configName].filter((filed: BaseFormField) => {
        if (filed.visibleForRolesList) {
          return this.credentialsService.checkRoles(filed.visibleForRolesList);
        }
        return true;
      });
    });
  }

  private createForm() {
    this.form = this.fb.group({});

    const infoControls: FormGroup = this.formGroupService.createForm(this.applicationData, this.infoConfig, null);

    this.form.addControl(DocumentsGroupKeys.Info, infoControls);
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'print': {
        this.printForm();
        break;
      }
      default: {
        break;
      }
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.applicationService
        .updateArchive(
          this.applicationData.id,
          this.form.get('info.archivePlace').value,
          this.form.get('info.archivistComment').value
        )
        .pipe(untilDestroyed(this))
        .subscribe();
    }
  }

  printForm() {
    this.additionalPrintFormService
      .getPrintFormsWithSigners(this.applicationData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: PrintingFormDto[]) => {
        if (res) {
          this.openPrintFormModal(res);
        }
      });
  }

  openPrintFormModal(modalData: PrintingFormDto[]) {
    const dialogRef = this.dialog.open(PrintFormModalComponent, {
      height: 'auto',
      width: '40vw',
      data: { modalData, language: this.language }
    });

    (dialogRef.componentInstance as PrintFormModalComponent).emitData
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PrintFormModalEmit) => {
        const agreementFormParams: PrintingFormDownloadRq = new PrintingFormDownloadRq(
          this.applicationData.id,
          data.form.id,
          null,
          this.applicationData.finalCreditInfo.product.id
        );
        this.isLoading = true;
        this.printingFormService
          .fillExternal(agreementFormParams)
          .pipe(
            catchError(err => {
              this.isLoading = false;
              return throwError(err);
            }),
            untilDestroyed(this)
          )
          .subscribe(res => {
            this.fileService.downloadFile(res, `${data.form.name}.pdf`);
            this.isLoading = false;
          });
      });
  }

  private createUploadPhotoEventSubscription(applicationData: Application) {
    this.uploadAttachmentListener.uploadPhotoEvent$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.attachmentControllerService.getAllByApplicationIdAndApplicantId(
            applicationData.id,
            applicationData.applicant.id
          );
        })
      )
      .subscribe(value => {
        this.setTableData(value);
      });
  }

  private getDocuments(applicationData: Application) {
    if (applicationData && applicationData.applicationId) {
      this.attachmentControllerService
        .getAllByApplicationIdAndApplicantId(applicationData.id, applicationData.applicant.id)
        .subscribe((value: AttachmentDto[]) => {
          value.forEach(element => {
            if (!element.ecmUrl) {
              if (this.isCurrentLang === 'ge') {
                element.filename = 'ფაილის ატვირთვა';
              } else {
                element.filename = 'загрузить файл';
              }
            }
          });
          this.setTableData(value);
        });
    }
  }

  private setTableData(value: AttachmentDto[]) {
    this.documentsData = new TableData(DOCUMENTS_HEADERS, value);
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

  private initIsView() {
    this.isView = this.router.url.indexOf('view') !== -1;
  }

  private initIsViewDSARole() {
    this.isDSA = this.currentRoles.isDSA;
  }

  private initIsCreditManagerRole() {
    this.isCreditManager = this.currentRoles.isCreditManager;
  }

  private initIsVideoBankRole() {
    this.isVideoBank = this.currentRoles.isVideoBank;
  }

  private initIsArchivistRole() {
    this.isArchivist = this.currentRoles.isArchivist;
  }

  private getAttachmentTypes(stageId: string | number) {
    if (!this.attachmentTypesLoading) {
      this.attachmentTypesLoading = true;
      this.attachmentStageSettingService
        .getAttachmentTypes(stageId, this.applicationData.productGroupId)
        .pipe(finalize(() => (this.attachmentTypesLoading = false)))
        .subscribe(value => (this.attachmentTypes = value));
    }
  }

  private uploadAttachment(
    applicationId: number,
    applicantId: number,
    attachmentTypeId: string,
    file?: File,
    attachmentId?: number
  ) {
    if (!this.uploadAttachmentLoading) {
      this.uploadAttachmentLoading = true;
      let formData = new FormData();
      if (file) {
        formData.append('file', file, file.name);
      } else {
        formData = null;
      }
      this.attachmentControllerService
        .uploadAttachment(applicationId, applicantId, attachmentTypeId, formData, attachmentId)
        .pipe(finalize(() => (this.uploadAttachmentLoading = false)))
        .subscribe(() => {
          this.deleteUploadAttachmentCallback(attachmentTypeId);
        });
    }
  }

  private deleteUploadAttachmentCallback(attachmentTypeId: string) {
    attachmentTypeId === UploadDocumentId.Photo
      ? this.uploadAttachmentListener.emitUploadedPhotoEvent()
      : this.getDocuments(this.applicationData);
  }
}
