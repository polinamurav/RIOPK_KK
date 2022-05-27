import { SelfEmploymentDto } from './../../../_models/api-models/self-employment';
import { PrintingFormControllerService } from '../../../api/printing-form-controller.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { ToastService } from '@app/services/toast.service';
import { TocService } from '@app/services/toc.service';
import { ChatUnderManagerControllerService } from '@app/api/chat-under-manager-controller.service';
import { CreditInfoControllerService } from '@app/api/credit-info-controller.service';
import { ApplicationControllerService, IdentityCardControllerService } from '@app/api';
import {
  AcbHistoryResponse,
  ApplicantPhoto,
  Application,
  ApplicationDto,
  AttachmentTableData,
  CheckCreditType,
  CheckGuaCreditType,
  CommentDto,
  Dir,
  DirAbsCode,
  DirCountry,
  Directory,
  DirStatus,
  Guarantee,
  Liability,
  PrintFormModalEmit,
  PrintingFormDto,
  ProductRes,
  TableData,
  TableDataHeader,
  UserDto
} from '@app/_models';
import { photoImg, signatureImg } from '@app/constants/imgBase64';
import { CREDIT_NAME_PROPS, GUARANTEE_CREDIT_NAME_PROPS } from './constants/full-form-constants';
import { selectMassSegmentDirectory } from '@app/store/selectors/mass-segment-directories.selector';
import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { ApplicantControllerService } from '@app/api/applicant-controller.service';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { CredentialsService } from '@app/services/authentication';
import { UploadAttachmentListenerService } from '@app/services/upload-attachment-listener.service';
import { AddressControllerService } from '@app/api/address-controller.service';
import { DOCUMENT } from '@angular/common';
import { untilDestroyed } from '@app/core';
import { catchError, switchMap, take } from 'rxjs/operators';
import { PrintFormModalComponent } from '@app/shared/modals/print-form-modal/print-form-modal.component';
import { combineLatest, forkJoin, throwError } from 'rxjs';
import { DeclineReasonModalComponent } from '@app/shared/modals/decline-reason-modal/decline-reason-modal.component';
import { ApplicantDto } from '@app/_models/api-models/applicant';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { SelfEmploymentControllerService } from '@app/api/massegment-api';
import { RouterURLService } from '@app/services/routerURL.service';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { PASSPORT_TYPES } from '@app/constants/passport-types';
import { CREDIT_TYPE } from '@app/constants/credit-type';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';

@Component({
  selector: 'app-mass-segment-full-form',
  templateUrl: './mass-segment-full-form.component.html',
  styleUrls: ['../../common-tabs-scss/full-form-common.component.scss']
})
export class MassSegmentFullFormComponent implements OnInit, OnChanges, OnDestroy {
  fullForm: FormGroup;

  footerConfigSource = 'massSegment.fullForm';
  totalCount: number = 0;
  itemLimit: number = 20;
  selectedPage: number = 0;
  phonePrefix: string = '';

  currencies: Dir[] = [];
  status: DirStatus[] = [];
  productCategories: ProductRes[] = [];
  gender: DirAbsCode[] = [];
  maritalStatuses: Dir[] = [];
  numberEmployee: Dir[] = [];
  countries: DirCountry[] = [];
  creditPurpose: Directory[] = [];
  maxIssueDate: Date;
  newDate: Date = new Date();

  attachedDocs: AttachmentTableData[] = [];
  declineReasons: Dir[] = [];
  companyActivityTypes: Directory[] = [];
  innStatusList: Dir[] = [];
  innTypeList: Dir[] = [];

  isCancelRoleAvail: boolean = false;
  isDeclineReasonVisible: boolean = false;
  isNewMessageExists: boolean = false;
  isLoading: boolean = false;
  submitted: boolean = false;
  isPhotoLoading: boolean = false;

  creditType: Record<string, string> = CREDIT_TYPE;

  creditColNameProps: TableDataHeader[] = CREDIT_NAME_PROPS;
  guaranteeColNameProps: TableDataHeader[] = GUARANTEE_CREDIT_NAME_PROPS;

  activeCreditInfoData: TableData<Liability> = new TableData(this.creditColNameProps, []);
  activeCreditArr: Liability[] = [];
  guaranteeInfoData: TableData<Guarantee> = new TableData(this.guaranteeColNameProps, []);
  guaranteeArr: Guarantee[] = [];

  isFactAdressDisabled: boolean = false;
  defaultPhotoImg = photoImg;
  passportTypes: { id: number; name: string }[] = PASSPORT_TYPES;
  chatUnderManagerList: CommentDto[];
  userData: UserDto;

  @Input() applicationData: Application;
  @Input() managerInfo: UserDto;
  @Input() readonlyForm: boolean = false;
  @Input() innAcbHistoryResponse: AcbHistoryResponse;
  @Input() isMenuVisible: boolean;
  @Input() applicantPhotoInfo: ApplicantPhoto;
  @Input() language: string;

  private validityDateVal: Date;
  private declineReasonsCallCenter: Dir[] = [];
  private declineReasonsManager: Dir[] = [];
  private userName: string = null;

  private selectUserData$ = this.store.pipe(select(selectUserData));
  private currencies$ = this.store.pipe(select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.currencies)));
  private countries$ = this.store.pipe(select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.countries)));
  private productCategories$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.productCategories))
  );
  private gender$ = this.store.pipe(select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.gender)));
  private maritalStatuses$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.maritalStatuses))
  );
  private creditPurpose$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.creditPurpose))
  );
  private declineReasons$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.declineReasons))
  );
  private declineReasonsCallCenter$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.declineReasonsCallCenter))
  );
  private companyActivityTypes$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.companyActivityTypes))
  );
  private innType$ = this.store.pipe(select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.innType)));
  private innStatus$ = this.store.pipe(select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.innStatus)));

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastService: ToastService,
    private tocService: TocService,
    private chatUnderManagerService: ChatUnderManagerControllerService,
    private creditInfoControllerService: CreditInfoControllerService,
    private identityCardControllerService: IdentityCardControllerService,
    private applicationControllerService: ApplicationControllerService,
    private applicantControllerService: ApplicantControllerService,
    private printingFormService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private credentialsService: CredentialsService,
    private uploadAttachmentListener: UploadAttachmentListenerService,
    private addressControllerService: AddressControllerService,
    private selfEmploymentService: SelfEmploymentControllerService,
    private routerURLService: RouterURLService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (
      changes.isMenuVisible &&
      changes.isMenuVisible.currentValue &&
      changes.isMenuVisible.currentValue !== changes.isMenuVisible.previousValue
    ) {
      if (!!this.doc.querySelector('div.data-form-block')) {
        this.tocService.genToc(this.doc.querySelector('div.data-form-block'));
      }
    }
    this.isPhotoLoading = this.uploadAttachmentListener.getAttachmentLoadingStatus();
  }

  ngOnInit() {
    this.createForm();
    this.getDirectories();
    this.setDisabledToggleParameter();

    this.fullForm
      .get('contactDetails')
      .get('isRealEqFactAddress')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(isEqual => {
        if (!!isEqual) {
          this.isFactAdressDisabled = true;
          this.fullForm
            .get('contactDetails')
            .get('factAddress')
            .setValue(this.fullForm.get('contactDetails').get('regAddress').value);
          this.fullForm
            .get('contactDetails')
            .get('factAddress')
            .updateValueAndValidity();
        } else {
          this.isFactAdressDisabled = false;
        }
      });

    // this.customSettingsService.getByKey('Min_oplata_truda').subscribe(res => {
    //   this.fullForm
    //     .get('incomeExpense')
    //     .get('totalIncome')
    //     .setValidators([Validators.required, Validators.min(+res.parameterDouble)]);

    //   this.fullForm
    //     .get('incomeExpense')
    //     .get('totalIncome')
    //     .updateValueAndValidity();
    // });

    this.fullForm
      .get('identityCard')
      .get('series')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((s: string) => {
        this.fullForm
          .get('identityCard')
          .get('passportType')
          .setValue(this.setPassportType(s));
      });

    // tslint:disable-next-line: no-unused-expression
    this.readonlyForm && this.fullForm.disable();

    if (!!this.applicationData && !!this.applicationData.applicant.employment.phone) {
      this.phonePrefix = '+';
    }

    if (!!this.applicationData) {
      if (!!this.validityDateVal) {
        this.maxIssueDate =
          this.validityDateVal.getTime() < new Date(this.applicationData.created).getTime()
            ? this.validityDateVal
            : new Date(this.applicationData.created);
      } else {
        this.maxIssueDate = new Date(this.applicationData.created);
      }
    }

    this.chatUnderManagerService.getAllByApplicationId(this.applicationData.id.toString()).subscribe(res => {
      this.chatUnderManagerList = res;
    });

    this.fullForm
      .get('identityCard')
      .get('validityDate')
      .valueChanges.subscribe((validityDate: Date) => {
        this.validityDateVal = validityDate;
      });

    // TODO dont remove code below:
    if (!!this.innAcbHistoryResponse && !!this.innAcbHistoryResponse.acbLiabilities) {
      const liabilitiesArr = this.innAcbHistoryResponse.acbLiabilities.map(obj => {
        const transformedObj = Object.assign({}, obj);
        transformedObj.initialAmount = CheckCreditType[obj.creditType] ? obj[CheckCreditType[obj.creditType]] : -1;
        return transformedObj;
      });
      this.activeCreditArr = liabilitiesArr.filter(
        (liability: Liability) =>
          liability.creditStatus === '006' ||
          liability.creditStatus === '007' ||
          liability.creditStatus === '008' ||
          liability.creditStatus === '009'
      );
      this.activeCreditInfoData = new TableData(this.creditColNameProps, this.activeCreditArr);
    }

    if (!!this.innAcbHistoryResponse && !!this.innAcbHistoryResponse.acbGuarantee) {
      const guarantee = this.innAcbHistoryResponse.acbGuarantee.map(obj => {
        const transformedObj = Object.assign({}, obj);
        transformedObj.guaInitialAmount = CheckGuaCreditType[obj.guaCreditType]
          ? obj[CheckGuaCreditType[obj.guaCreditType]]
          : -1;
        return transformedObj;
      });

      this.guaranteeArr = guarantee.filter(
        (gua: Guarantee) =>
          gua.guaCreditStatus === '006' ||
          gua.guaCreditStatus === '007' ||
          gua.guaCreditStatus === '008' ||
          gua.guaCreditStatus === '009'
      );

      this.guaranteeInfoData = new TableData(this.guaranteeColNameProps, this.guaranteeArr);
    }

    this.setDeclineReasons();
    if (!!this.applicationData.dirManagerDeclineReason || !!this.applicationData.dirCallCentreDeclineReason) {
      this.isDeclineReasonVisible = true;
    }

    this.isNewMessageExists = this.applicationData.newMessageUMChat;
  }

  ngOnDestroy(): void {
    this.tocService.resetScrollSpyInfo();
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      case 'openComments': {
        this.onCommentClick();
        break;
      }
      case 'loadToSopiok': {
        this.loadCommentToSopiokChat(event.event as string);
        break;
      }
      default: {
        break;
      }
    }
  }

  loadCommentToSopiokChat(comment: string) {
    this.chatUnderManagerService
      .save({
        applicationId: this.applicationData.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .subscribe();
  }

  submitForm() {
    this.submitted = true;

    if (this.fullForm.invalid) {
      this.scrollToFirstInvalid();
      return;
    }

    this.isLoading = true;

    this.requestsPipe()
      .pipe(
        switchMap(_ => this.applicationControllerService.acceptApp(this.applicationData.id.toString(), this.language))
      )
      .subscribe((res: any) => {
        if (!res) {
          this.toastService.viewMsg('SuccessMessage.SentForProcessing', 'success');
          this.navigateToDashboard();
        } else {
          this.isLoading = false;
          this.toastService.viewMsg(res.message, 'warning');
        }
        this.submitted = false;
      });
  }

  openPrintFormModal(modalData: PrintingFormDto[]) {
    const dialogRef = this.dialog.open(PrintFormModalComponent, {
      height: 'auto',
      width: '40vw',
      data: modalData
    });

    (dialogRef.componentInstance as PrintFormModalComponent).emitData
      .pipe(untilDestroyed(this))
      .subscribe((data: PrintFormModalEmit) => {
        this.isLoading = true;

        this.printingFormService
          .getFilledPrintingForm(this.applicationData.id, data.form.id, data.signer)
          .pipe(
            catchError(err => {
              this.isLoading = false;
              return throwError(err);
            }),
            untilDestroyed(this)
          )
          .subscribe(res => {
            this.fileService.downloadFile(res, `${data.form.name}.docx`);
            this.isLoading = false;
          });
      });
  }

  delayApp() {
    this.isLoading = true;

    this.requestsPipe()
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe(res => {
        this.toastService.viewMsg('Сохранено', 'success');
        this.navigateToDashboard();
      });
  }

  openDeclineReasonModal() {
    const dialogRef = this.dialog.open(DeclineReasonModalComponent, {
      width: '40vw',
      maxWidth: '40vw',
      height: '30vh',
      data: this.declineReasons
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: string | number) => {
        if (result && typeof result !== 'string') {
          this.cancelApp(result);
        }
      });
  }

  cancelApp(dirManagerDeclineReasonId: number) {
    this.isLoading = true;
    this.fullForm.get('declineReason').setValue(dirManagerDeclineReasonId);

    this.requestsPipe()
      .pipe(
        switchMap(_ => this.applicationControllerService.declineApp(this.applicationData.id.toString())),
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe(res => {
        this.isLoading = false;
        this.toastService.viewMsg('SuccessMessage.Denied', 'success');
        this.navigateToDashboard();
      });
  }

  requestsPipe() {
    const isPreApproved = this.fullForm.getRawValue().creditInfo.isPreApproved;
    const selfEmployment: SelfEmploymentDto = this.prepareSelfEmployment();

    delete this.fullForm.getRawValue().identityCard.passportType;

    return forkJoin([
      this.identityCardControllerService.update({
        ...this.applicationData.applicant.identityCard,
        ...this.fullForm.getRawValue().identityCard
      }),
      this.selfEmploymentService.update(selfEmployment)
    ]).pipe(
      catchError(err => {
        this.isLoading = false;
        return throwError(err);
      }),
      switchMap(([identityCardId, selfEmploymentId]) => {
        const applicantDto: ApplicantDto = new ApplicantDto(this.applicationData.applicant);

        return forkJoin([
          this.applicantControllerService.update({
            ...applicantDto,
            ...this.fullForm.getRawValue().applicant,
            ...this.fullForm.getRawValue().contactDetails,
            identityCardId,
            selfEmploymentId,
            childrenUnder18: 0,
            educationId: null
          }),
          this.creditInfoControllerService.update({
            ...this.fullForm.getRawValue().creditInfo,
            applicationId: this.applicationData.id,
            creditTerm: this.applicationData.requestedCreditInfo.creditTerm,
            id: this.applicationData.requestedCreditInfo.id
          })
        ]);
      }),
      catchError(err => {
        this.isLoading = false;
        return throwError(err);
      }),
      switchMap(([applicantId, requestedCreditInfoId]) => {
        const appData: ApplicationDto = new ApplicationDto(this.applicationData);
        return forkJoin([
          this.applicationControllerService.update({
            ...appData,
            applicantId,
            requestedCreditInfoId,
            isPreApproved,
            stageId: this.fullForm.getRawValue().stageId,
            dirManagerDeclineReasonId: this.credentialsService.isCreditManager
              ? this.fullForm.getRawValue().declineReason
              : null,
            dirCallCentreDeclineReasonId: this.credentialsService.isCallCenter
              ? this.fullForm.getRawValue().declineReason
              : null
          })
          // this.relativesService.update({ relatives: [this.relatives_1, this.relatives_2] })
        ]);
      }),
      catchError(err => {
        this.isLoading = false;
        return throwError(err);
      })
    );
  }

  onCommentClick() {
    if (!!this.isNewMessageExists && !this.readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.applicationData.id)
        .pipe(untilDestroyed(this))
        .subscribe(_ => (this.isNewMessageExists = false));
    }
  }

  private prepareSelfEmployment(): SelfEmploymentDto {
    const selfEmploymentDto = {
      ...new SelfEmploymentDto(this.applicationData.applicant.selfEmployment),
      ...this.fullForm.getRawValue().selfEmployment
    };

    selfEmploymentDto.companyActivityTypeId = this.fullForm.getRawValue().selfEmployment.companyActivityTypeId;

    return selfEmploymentDto;
  }

  private createForm() {
    this.fullForm = this.formBuilder.group({
      creditInfo: this.formBuilder.group({
        productId:
          !!this.applicationData && !!this.applicationData.requestedCreditInfo.product.id
            ? [{ value: this.applicationData.requestedCreditInfo.product.id, disabled: true }]
            : ['', [Validators.required]],

        creditAmount:
          !!this.applicationData && !!this.applicationData.requestedCreditInfo.creditAmount
            ? [{ value: this.applicationData.requestedCreditInfo.creditAmount, disabled: true }]
            : ['', [Validators.required, Validators.min(300), Validators.max(10000)]],

        dirCurrencyId:
          !!this.applicationData && !!this.applicationData.requestedCreditInfo.dirCurrency.id
            ? [{ value: this.applicationData.requestedCreditInfo.dirCurrency.id, disabled: true }]
            : ['', [Validators.required]],

        creditTerm:
          !!this.applicationData && !!this.applicationData.requestedCreditInfo.creditTerm
            ? [{ value: this.applicationData.requestedCreditInfo.creditTerm, disabled: true }]
            : ['', [Validators.required]]
      }),
      applicant: this.formBuilder.group({
        birthDate:
          !!this.applicationData && !!this.applicationData.applicant.birthDate
            ? [{ value: new Date(this.applicationData.applicant.birthDate), disabled: true }]
            : ['', [Validators.required]],
        firstName:
          !!this.applicationData && !!this.applicationData.applicant.firstName
            ? [{ value: this.applicationData.applicant.firstName, disabled: true }]
            : ['', [Validators.required]],
        middleName:
          !!this.applicationData && !!this.applicationData.applicant.middleName
            ? [{ value: this.applicationData.applicant.middleName, disabled: true }]
            : ['', [Validators.required]],
        lastName:
          !!this.applicationData && !!this.applicationData.applicant.lastName
            ? [{ value: this.applicationData.applicant.lastName, disabled: true }]
            : ['', [Validators.required]],
        email:
          !!this.applicationData && !!this.applicationData.applicant.email
            ? [{ value: this.applicationData.applicant.email, disabled: true }]
            : ['', [Validators.maxLength(500)]],
        birthPlace:
          !!this.applicationData && !!this.applicationData.applicant.birthPlace
            ? [{ value: this.applicationData.applicant.birthPlace, disabled: true }]
            : ['', [Validators.required]],
        genderId:
          !!this.applicationData &&
          !!this.applicationData.applicant.gender &&
          !!this.applicationData.applicant.gender.id
            ? [{ value: this.applicationData.applicant.gender.id, disabled: true }]
            : ['', [Validators.required]],
        citizenshipId:
          !!this.applicationData &&
          !!this.applicationData.applicant.citizenship &&
          !!this.applicationData.applicant.citizenship.id
            ? [{ value: this.applicationData.applicant.citizenship.id, disabled: true }]
            : ['', [Validators.required]],
        maritalStatusId:
          !!this.applicationData &&
          !!this.applicationData.applicant.maritalStatus &&
          !!this.applicationData.applicant.maritalStatus.id
            ? [{ value: this.applicationData.applicant.maritalStatus.id, disabled: true }]
            : ['', [Validators.required]],

        applicationId: [!!this.applicationData ? this.applicationData.applicant.applicationId : ''],

        comment: [
          {
            value:
              this.applicationData && this.applicationData.applicant && this.applicationData.applicant.comment
                ? this.applicationData.applicant.comment
                : '',
            disabled: this.readonlyForm
          },
          [Validators.maxLength(500)]
        ]
      }),
      identityCard: this.formBuilder.group({
        series:
          !!this.applicationData && !!this.applicationData.applicant.identityCard.series
            ? [{ value: this.applicationData.applicant.identityCard.series, disabled: true }]
            : ['', [Validators.required, Validators.pattern(/^AA$|^AZE$/)]],
        number:
          !!this.applicationData && !!this.applicationData.applicant.identityCard.number
            ? [{ value: this.applicationData.applicant.identityCard.number, disabled: true }]
            : ['', [Validators.required]],
        passportType:
          !!this.applicationData && !!this.applicationData.applicant.identityCard.series
            ? [{ value: this.setPassportType(this.applicationData.applicant.identityCard.series), disabled: true }]
            : '',
        pin:
          !!this.applicationData && !!this.applicationData.applicant.identityCard.pin
            ? [{ value: this.applicationData.applicant.identityCard.pin, disabled: true }]
            : ['', [Validators.required]],
        issuedBy:
          !!this.applicationData && !!this.applicationData.applicant.identityCard.issuedBy
            ? [{ value: this.applicationData.applicant.identityCard.issuedBy, disabled: true }]
            : ['', [Validators.required]],
        issueDate:
          !!this.applicationData && !!this.applicationData.applicant.identityCard.issueDate
            ? [{ value: new Date(this.applicationData.applicant.identityCard.issueDate), disabled: true }]
            : ['', [Validators.required]],
        validityDate:
          !!this.applicationData && !!this.applicationData.applicant.identityCard.validityDate
            ? [{ value: new Date(this.applicationData.applicant.identityCard.validityDate), disabled: true }]
            : ['', [Validators.required]],
        signature: [
          !!this.applicationData && !!this.applicationData.applicant.identityCard.signature
            ? this.applicationData.applicant.identityCard.signature
            : signatureImg
        ]
      }),
      contactDetails: this.formBuilder.group({
        regAddress:
          !!this.applicationData && !!this.applicationData.applicant.regAddress
            ? [{ value: this.applicationData.applicant.regAddress, disabled: true }]
            : ['', [Validators.required]],
        isRealEqFactAddress: [
          {
            value: !!this.applicationData && !!this.applicationData.applicant.isRealEqFactAddress,
            disabled: !!this.applicationData && !!this.applicationData.applicant.factAddress ? true : false
          }
        ],
        factAddress:
          !!this.applicationData && !!this.applicationData.applicant.factAddress
            ? [
                {
                  value: this.applicationData.applicant.factAddress,
                  disabled: this.applicationData && this.applicationData.applicant.isRealEqFactAddress ? true : false
                }
              ]
            : ['', [Validators.required]],

        mobilePhone:
          !!this.applicationData && !!this.applicationData.applicant.mobilePhone
            ? [{ value: this.applicationData.applicant.mobilePhone, disabled: true }]
            : ['', [Validators.required, Validators.minLength(9)]]
      }),
      selfEmployment: this.formBuilder.group({
        inn:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.inn
            ? { value: this.applicationData.applicant.selfEmployment.inn, disabled: true }
            : ['', [Validators.required]],
        legalAddress:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.legalAddress
            ? { value: this.applicationData.applicant.selfEmployment.legalAddress, disabled: true }
            : ['', [Validators.required]],
        companyActivityTypeId:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.companyActivityType
            ? { value: this.applicationData.applicant.selfEmployment.companyActivityType.id, disabled: true }
            : ['', [Validators.required]],
        dirInnTypeId:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.dirInnType
            ? { value: this.applicationData.applicant.selfEmployment.dirInnType.id, disabled: true }
            : ['', [Validators.required]],
        dirInnStatusId:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.dirInnStatus
            ? { value: this.applicationData.applicant.selfEmployment.dirInnStatus.id, disabled: true }
            : ['', [Validators.required]],
        created:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.created
            ? [{ value: new Date(this.applicationData.applicant.selfEmployment.created), disabled: true }]
            : ['', [Validators.required]],
        updated:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.updated
            ? [{ value: new Date(this.applicationData.applicant.selfEmployment.updated), disabled: true }]
            : '',

        repLastName:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.repLastName
            ? {
                value: this.applicationData.applicant.selfEmployment.repLastName,
                disabled: true
              }
            : ['', [Validators.required]],
        repFirstName:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.repFirstName
            ? {
                value: this.applicationData.applicant.selfEmployment.repFirstName,
                disabled: true
              }
            : ['', [Validators.required]],
        repMiddleName:
          !!this.applicationData &&
          !!this.applicationData.applicant &&
          !!this.applicationData.applicant.selfEmployment &&
          !!this.applicationData.applicant.selfEmployment.repMiddleName
            ? {
                value: this.applicationData.applicant.selfEmployment.repMiddleName,
                disabled: true
              }
            : ['', [Validators.required]]
      }),

      // documents: '',
      stageId: [!!this.applicationData && !!this.applicationData.stage ? this.applicationData.stage.id : ''],

      declineReason: !!this.applicationData
        ? !!this.applicationData.dirManagerDeclineReason
          ? this.applicationData.dirManagerDeclineReason.nameRu
          : !!this.applicationData.dirCallCentreDeclineReason
          ? this.applicationData.dirCallCentreDeclineReason.nameRu
          : ''
        : ''
      // disapproveCode: [{ value: !!this.applicationData ? this.applicationData.disapproveCode : '', disabled: true }]
    });
  }

  private getDirectories() {
    combineLatest([
      this.selectUserData$,
      this.currencies$,
      this.countries$,
      this.productCategories$,
      this.gender$,
      this.maritalStatuses$,
      this.creditPurpose$,
      this.declineReasons$,
      this.declineReasonsCallCenter$,
      this.companyActivityTypes$,
      this.innStatus$,
      this.innType$
    ])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          selectedUserData,
          currencies,
          countries,
          productCategories,
          gender,
          maritalStatuses,
          creditPurpose,
          declineReasons,
          declineReasonsCallCenter,
          companyActivityTypes,
          innStatus,
          innType
        ]) => {
          this.setCurrentUserData<UserDto>(selectedUserData);
          this.currencies = getOnlyActiveItems<Dir>(currencies);
          this.countries = getOnlyActiveItems<DirCountry>(countries);
          this.productCategories = getOnlyActiveItems<ProductRes>(productCategories);
          this.gender = gender;
          this.maritalStatuses = maritalStatuses;
          this.creditPurpose = getOnlyActiveItems<Directory>(creditPurpose);
          this.declineReasonsManager = getOnlyActiveItems<Dir>(declineReasons);
          this.declineReasonsCallCenter = getOnlyActiveItems<Dir>(declineReasonsCallCenter);
          this.companyActivityTypes = getOnlyActiveItems<Directory>(companyActivityTypes);
          this.innStatusList = getOnlyActiveItems<Dir>(innStatus);
          this.innTypeList = getOnlyActiveItems<Dir>(innType);
          this.setDeclineReasons();
        }
      );
  }

  private setPassportType(ser: string) {
    if (ser === 'AA') {
      return this.passportTypes[0].id;
    } else if (ser === 'AZE') {
      return this.passportTypes[1].id;
    }
  }

  private navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
  }

  private setDisabledToggleParameter() {
    this.addressControllerService
      .getByApplicationId(this.applicationData.id)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if (!res) {
          (this.fullForm.get('contactDetails') as FormGroup).controls.isRealEqFactAddress.disable();
        }
      });
  }

  private setDeclineReasons() {
    this.isCancelRoleAvail = !!this.credentialsService.isCreditManager || !!this.credentialsService.isCallCenter;
    if (!!this.credentialsService.isCreditManager || !!this.applicationData.dirManagerDeclineReason) {
      this.declineReasons = this.declineReasonsManager;
    }

    if (!!this.credentialsService.isCallCenter || !!this.applicationData.dirCallCentreDeclineReason) {
      this.declineReasons = this.declineReasonsCallCenter;
    }
  }

  private scrollToFirstInvalid() {
    const firstElementWithError = document.querySelector('form').querySelector('.ng-invalid');
    if (!!firstElementWithError) {
      firstElementWithError.scrollIntoView();
    }
  }

  private setCurrentUserData<T extends UserDto>(res: T) {
    if (res) {
      this.userData = res;
    }
    if (res && res.username) {
      this.userName = res.username;
    }
  }
}
