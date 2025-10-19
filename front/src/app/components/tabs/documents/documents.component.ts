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
  PrintingFormDownloadRq, StageType
} from '@app/_models';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, switchMap, take, takeUntil, tap} from 'rxjs/operators';

import {AttachmentControllerService} from '@app/api/attachment-controller.service';
import {AttachmentStageSettingService} from '@app/api/attachment-stage-setting.service';
import {DownloadUploadFileService} from '@app/services/download-upload-file.service';
import {MatDialog} from '@angular/material/dialog';
import {MimeTypes} from '@app/components/constants/mime-types';
import {Router} from '@angular/router';
import {Subject, throwError} from 'rxjs';
import {UploadAttachmentListenerService} from '@app/services/upload-attachment-listener.service';
import {UploadDocumentId} from '@app/constants/upload-document-id';
import {UploadModalComponent} from '@app/shared/components/modals/upload-modal/upload-modal.component';
import {DOCUMENTS_HEADERS} from '@app/components/tabs/documents/constants/documents.constants';
import {DOCUMENTS_INFO, DocumentsGroupKeys} from '@app/components/tabs/documents/constants/documents.config';
import {CURRENT_ROLES, setRoles} from '@app/components/constants/current-roles';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FormGroupService} from '@app/services/form-group.service';
import {FooterButtonClick} from '@app/components/tabs-footer/constants/footer-buttons.model';
import {CredentialsService} from '@app/services/authentication';
import {untilDestroyed} from '@app/core';
import {ApplicationControllerService, PrintingFormControllerService} from '@app/api';
import {AdditionalPrintFormService} from '@app/services/additional-print-form.service';
import {PrintFormModalComponent} from '@app/shared/components/modals/print-form-modal/print-form-modal.component';
import {TranslateService} from '@ngx-translate/core';
import {config} from '../../../../assets/configurations/configurationFile';
import {convertBytesToMBytes} from '@app/shared/sharedUtils';
import {ToastService} from '@app/services/toast.service';
import {WebSocketService} from "@app/services/web-socket.service";
import {AppCommonRequestService} from "@app/services/app-common-request.service";
import {TimerService} from "@app/services/timer.service";
import {PHONE_CODE} from "@app/constants/phone-code";
import {OtpType} from "@app/components/otp/otp-data.service";

type Options = Dir;

@Component({
  selector: 'ng-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  @Input() applicationData: Application;
  @Input() readonlyForm: boolean;
  attachmentMaxSize = config.attachmentMaxSizeBytes;

  documentsData: TableData<AttachmentDto> = new TableData(DOCUMENTS_HEADERS, []);

  infoConfig: BaseFormField[] = DOCUMENTS_INFO;

  downloadAttachmentLoading: boolean;
  isView: boolean;
  attachmentTypesLoading: boolean;
  uploadAttachmentLoading: boolean;
  currentRoles: Record<string, boolean>;
  isDeleteProcess: boolean = false;
  disabledESign: boolean = false;
  isLoading: boolean = false;
  isCreditManager: boolean = false;
  isDSA: boolean = false;
  isVideoBank: boolean = false;
  isArchivist: boolean = false;
  propertyName: string;
  isCurrentLang: string;
  showOtpControl: boolean;
  _isSmsSignPossible: boolean;
  EInputType = EInputType;
  DocumentsGroupKeys = DocumentsGroupKeys;

  otpCode = 111111;

  footerConfigSource = 'common.documents';

  form: FormGroup;

  @Input() language: string;

  otpControl = new FormControl()
  isOtpValidationSend: boolean;

  private attachmentTypes: AttachmentType[];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private _timer = new TimerService(2 * 60 * 1000);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private toastService: ToastService,
    private readonly webSocketService: WebSocketService,
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
    private appCommonRequestService: AppCommonRequestService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.isCurrentLang = this.translateService.currentLang;

    this.currentRoles = _.cloneDeep(CURRENT_ROLES);
    setRoles(this.currentRoles, this.credentialsService);

    this.isSmsSignPossible();
    this.connectToWTopic();
    this.createForm();
    this.filterConfigsByRoles(['infoConfig']);
    this.initIsView();
    this.initIsViewDSARole();
    this.initIsCreditManagerRole();
    this.initIsVideoBankRole();
    this.initIsArchivistRole();

    this.attachmentControllerService.documents$
      .pipe(takeUntil(this.destroy$))
      .subscribe(documents => {
        if (documents && documents.length > 0) {
          this.setTableData(documents);
        }
      });

    this.getDocuments(this.applicationData);
    this.getAttachmentTypes(this.applicationData.stage.id);
    this.createUploadPhotoEventSubscription(this.applicationData);
  }

  get isESignPossible() {
    return this._isSmsSignPossible;
  }

  get isOtpValid() {
    return +this.otpControl.value === +this.otpCode;
  }

  get isSmsSign() {
    return this.applicationData.isSmsSign || false;
  }

  get textDigitalContract() {
    return this.isSmsSign ? 'ShortForm.SIGNED_OTP' : 'ShortForm.DigitalContract'
  }

  get isPaperworkStage() {
    return this.applicationData.stage.id === StageType.PAPERWORK;
  }

  get timer() {
    return this._timer.timer$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.unsubscribeTopic();
  }

  linkEvent(attachment: { row: AttachmentDto, code: string }) {
    console.log(attachment);
    if (attachment.row.attachmentId) {
      this.downloadAttachment(attachment.row);
    }
  }

  deleteDoc(attachment: AttachmentDto) {
    if (!attachment.isDeletePossible) {
      return;
    }

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
      accept: [
        MimeTypes.PDF,
        MimeTypes.PNG,
        MimeTypes.DOC,
        MimeTypes.DOCX,
        MimeTypes.XLS,
        MimeTypes.XLSX,
        MimeTypes.JPG
      ],
      viewSearchSelect: true,
      selectPropertyName: this.language === 'am' ? ELocalNames.NameAm : ELocalNames.NameRu,
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

  getEAgreement() {
    this.getEContract();
  }

  private createForm() {
    this.form = this.fb.group({});

    const infoControls: FormGroup = this.formGroupService.createForm(this.applicationData, this.infoConfig, null);

    this.form.addControl(DocumentsGroupKeys.Info, infoControls);

    this.otpControl.valueChanges.pipe(tap(val => {
      if (val && this.isOtpValid && !this.isOtpValidationSend) {
        this.isOtpValidationSend = true;
        console.log('otp is valid')
        this.checkOtpCode();
      }
    })).subscribe()

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
      data: {modalData, language: this.language}
    });

    (dialogRef.componentInstance as PrintFormModalComponent).emitData
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PrintFormModalEmit) => {
        const agreementFormParams: PrintingFormDownloadRq = new PrintingFormDownloadRq(
          this.applicationData.id,
          data.form.code
        );

        this.printingFormService.fillExternal(agreementFormParams);
      });
  }

  private runTimer() {
    this._timer.stopTimer();
    this._timer.runTimer(() => {
      this.disabledESign = false;
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
        .getAllByApplicationIdAndApplicantId(
          applicationData.id,
          applicationData.applicant.id,
          applicationData.shortApplicationId
        )
        .subscribe((value: AttachmentDto[]) => {
          this.setTableData(value);
        });
    }
  }

  private setTableData(value: AttachmentDto[]) {
    if (value) {
      value.forEach(el => {
        el.fileSizeConcerted = convertBytesToMBytes(el.fileSize);
        el.isDeletePossible = this.readonlyForm ? false : el.isDeletePossible;
      });
      this.documentsData = new TableData(DOCUMENTS_HEADERS, value.filter(el => !el.isDeactivated));
    }
  }

  private downloadAttachment(attachment: AttachmentDto) {
    if (!this.downloadAttachmentLoading) {
      this.downloadAttachmentLoading = true;
      this.attachmentControllerService
        .downloadAttachment(attachment.attachmentId)
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
        .subscribe(res => {
          if (res.errorMessageAm) {
            this.toastService.viewMsg(this.language === 'ru' ? res.errorMessageRu : res.errorMessageAm, 'error');
          }
          this.deleteUploadAttachmentCallback(attachmentTypeId);
        });
    }
  }

  private connectToWTopic = (): void => {
    if (!this.isPaperworkStage) {
      return;
    }
    this.webSocketService.subscribeOnStream(`/topic/otp/${this.applicationData.id}`, (response: any) => {
      this.showOtpControl = true;
      this.otpControl.setValue(null);
      this.toastService.viewMsg('Необходимо ввести код указаный в СМС', 'success');
      // this.notifyService.showSuccess('Необходимо ввести код указаный в СМС');
    });

  };


  private getEContract = (): void => {
    console.log('getEContract');
    this.disabledESign = true;
    this.printingFormService.getEContract(this.applicationData.id)
      .pipe(
        catchError(err => {
          this.disabledESign = false;
          return throwError(err);
        }),
        tap(res => {
          console.log(res);
          this.otpCode = res.code;

          // run timer
          this.runTimer();
          // @ts-ignore
          // this.showOtpControl = true;
          // this._isCodePanelOpen$.next(true);
          this.toastService.viewMsg('SMS успешно отправлено', 'success');
        })).subscribe();
  };

  private isSmsSignPossible() {
    this.printingFormService.isSmsSignPossible({
      applicationId: this.applicationData.id
    }).pipe(tap(res => {
      this._isSmsSignPossible = !!res;
    })).subscribe()
  }

  private checkOtpCode() {
    this.appCommonRequestService.setSubmitBlocked(true);

    this.printingFormService.smsSignCheck(this.applicationData.id, this.otpControl.value).pipe(take(1),
      catchError(err => {
        this.appCommonRequestService.setSubmitBlocked(false);
        return throwError(err);
      }),
      tap(data => {
      if (data) {
        this.toastService.viewMsg(data, 'error');
        this.appCommonRequestService.setSubmitBlocked(false);
      } else {
        this.getDocuments(this.applicationData);
        this.applicationData.isSmsSign = true;
        this.appCommonRequestService.setIsOtpConfirmed(true);
        this.appCommonRequestService.setSubmitBlocked(false);
      }
    })).subscribe()
  }

  private unsubscribeTopic = (): void => {
    this.webSocketService.unsubscribeOnStream(`/topic/otp/${this.applicationData.id}`)
  }

  private deleteUploadAttachmentCallback(attachmentTypeId: string) {
    attachmentTypeId === UploadDocumentId.Photo
      ? this.uploadAttachmentListener.emitUploadedPhotoEvent()
      : this.getDocuments(this.applicationData);
  }
}
