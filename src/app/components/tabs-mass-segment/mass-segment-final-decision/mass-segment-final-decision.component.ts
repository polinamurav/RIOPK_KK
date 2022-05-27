import * as HEADERS from './constants/table-headers';

import {
  AcbLiabilityDto,
  Application,
  ApplicationDto,
  CreditInfo,
  Directory,
  EInputType,
  PrintFormModalEmit,
  PrintingFormDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import {
  ApplicationControllerService,
  BrmsFinalMatrixFrontControllerService,
  PrintingFormControllerService
} from '@app/api';
import { BRMSFinalMatrix, BRMSFinalMatrixDto } from '@app/_models/api-models/brms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatest, throwError } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, switchMap, take } from 'rxjs/operators';

import { AdditionalPrintFormService } from '@app/services/additional-print-form.service';
import { DeclineReasonModalComponent } from '@app/shared/modals/decline-reason-modal/decline-reason-modal.component';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { MassSegmentDirectoriesNames } from './../../../_models/api-models/mass-segment-directories-names';
import { MatDialog } from '@angular/material';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { PrintFormModalComponent } from '@app/shared/modals/print-form-modal/print-form-modal.component';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectMassSegmentDirectory } from '@app/store/selectors/mass-segment-directories.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-mass-segment-final-decision',
  templateUrl: './mass-segment-final-decision.component.html',
  styleUrls: ['../../common-tabs-scss/final-decision-common.component.scss']
})
export class MassSegmentFinalDecisionComponent implements OnInit, OnDestroy {
  finalDecForm: FormGroup;
  footerConfigSource = 'massSegment.finalDecision';
  itemLimit: number = 20;
  totalCount: number = 0;

  creditConditionsColNameProps: TableDataHeader[] = HEADERS.creditConditionsColNameProps;
  preapprovedColNameProps: TableDataHeader[] = HEADERS.preApprovedColNameProps;
  approvedCreditColNameProps: TableDataHeader[] = HEADERS.approvedCreditColNameProps;
  availRefinanceColmTableProps: TableDataHeader[] = HEADERS.availRefinanceColumnTableProps;

  preapprovedCreditList: BRMSFinalMatrixDto[] = [];
  preapprovedCreditColmInfoData: TableData<any> = new TableData(this.preapprovedColNameProps, []);
  approvedCreditColmInfoData: TableData<BRMSFinalMatrixDto> = new TableData(this.approvedCreditColNameProps, []);
  availRefinanceColmInfoData: TableData<BRMSFinalMatrixDto> = new TableData(this.availRefinanceColmTableProps, []);
  calculatedCreditColmInfoData: TableData<BRMSFinalMatrixDto> = new TableData(this.creditConditionsColNameProps, []);
  choosedCreditColmInfoData: TableData<BRMSFinalMatrixDto | CreditInfo> = new TableData(
    this.creditConditionsColNameProps,
    []
  );

  choosedRefinanceList: AcbLiabilityDto[] = [];
  isRefAcbLiabilityExists: boolean = false;
  finalProduct: BRMSFinalMatrixDto[] = [];
  isLoading: boolean = false;
  submitted: boolean = false;
  isDeclineReasonVisible: boolean = false;
  isAcceptButtonDisabled: boolean = true;
  isCalculateButtonDisabled: boolean = true;
  isChangesAccepted: boolean = false;

  declineReasons: Directory[] = [];
  EInputType = EInputType;

  @Input() appDto: Application;
  @Input() readonlyForm: boolean = false;
  @Input() language: string;

  private choosedMatrix: BRMSFinalMatrixDto;
  private declineReasons$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.declineReasons))
  );

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<IAppState>,
    private brmsFinalService: BrmsFinalMatrixFrontControllerService,
    private formBuilder: FormBuilder,
    private applicationControllerService: ApplicationControllerService,
    private toastService: ToastService,
    private printingFormService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private additionalPrintFormService: AdditionalPrintFormService,
    private routerURLService: RouterURLService
  ) {}

  ngOnInit() {
    this.getDirectories();
    this.createForm();

    // APP INITS
    if (!!this.appDto && !!this.appDto.chosenCreditInfo) {
      this.preapprovedCreditColmInfoData = new TableData(this.preapprovedColNameProps, [this.appDto.chosenCreditInfo]);
    }

    if (!!this.appDto && !!this.appDto.finalCreditInfo) {
      this.choosedCreditColmInfoData = new TableData(this.preapprovedColNameProps, [this.appDto.finalCreditInfo]);
      this.isChangesAccepted = true;
      this.finalProduct.push(this.mapCreditInfoToBRMSFinalMatrixDto(this.appDto.finalCreditInfo));
    }

    if (!!this.appDto.dirManagerDeclineReason) {
      this.isDeclineReasonVisible = true;
    }

    //   // SERVICES
    this.brmsFinalService.getPossibleMatrix(this.appDto.id.toString()).subscribe((matrix: BRMSFinalMatrixDto[]) => {
      this.preapprovedCreditList = matrix;
    });

    this.brmsFinalService.getPreapproveMatrix(this.appDto.id.toString()).subscribe((matrix: BRMSFinalMatrixDto[]) => {
      this.approvedCreditColmInfoData = new TableData(this.approvedCreditColNameProps, matrix);
    });

    if (this.readonlyForm) {
      this.finalDecForm.disable();
    }
  }

  ngOnDestroy(): void {}

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.acceptApp();
        break;
      }
      case 'print': {
        this.printForm();
        break;
      }
      case 'delay': {
        this.delayApp();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      case 'decline': {
        this.openDeclineReasonModal();
        break;
      }
      default: {
        break;
      }
    }
  }

  acceptChanges() {
    this.isChangesAccepted = true;
    this.finalDecForm.get('creditSum').disable();
    this.finalDecForm.get('creditTerm').disable();

    this.choosedCreditColmInfoData = new TableData(this.creditConditionsColNameProps, this.finalProduct);
  }

  cancelChanges() {
    this.isAcceptButtonDisabled = true;
    this.isCalculateButtonDisabled = true;
    this.isChangesAccepted = false;

    this.finalDecForm.get('creditSum').reset();
    this.finalDecForm.get('creditTerm').reset();
    this.finalDecForm.get('creditSum').enable();
    this.finalDecForm.get('creditTerm').enable();

    this.availRefinanceColmInfoData = new TableData(this.availRefinanceColmTableProps, []);
    this.calculatedCreditColmInfoData = new TableData(this.creditConditionsColNameProps, []);
    this.choosedCreditColmInfoData = new TableData(this.creditConditionsColNameProps, []);
  }

  acceptApp() {
    this.submitted = true;

    if (this.finalDecForm.invalid) {
      this.toastService.viewMsg('Заполните обязательные поля', 'warning');
      return;
    }

    if (!this.isChangesAccepted || this.finalProduct.length === 0) {
      this.toastService.viewMsg('Требуется выбрать и подтвердить вариант кредитования', 'warning');
      return;
    }

    this.isLoading = true;

    this.acceptApplication();
  }

  delayApp() {
    this.toastService.viewMsg('Заявка отложена', 'success');

    this.navigateToDashboard();
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

    const data: Partial<ApplicationDto> = { dirManagerDeclineReasonId };

    this.saveApplicationData(data)
      .pipe(
        switchMap(_ => this.applicationControllerService.declineApp(this.appDto.id.toString())),
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

  printForm() {
    this.additionalPrintFormService
      .getPrintFormsWithSigners(this.appDto)
      .pipe(untilDestroyed(this))
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
      data: modalData
    });

    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe((data: PrintFormModalEmit) => {
      this.isLoading = true;

      this.getPrintForm(data);
    });
  }

  calculate() {
    if (!!this.choosedMatrix) {
      const transformedMatrix = this.transformMatrixDtoIntoMatrix(this.choosedMatrix);
      this.brmsFinalService
        .calculateMatrix(this.appDto.id, transformedMatrix)
        .subscribe((matrix: BRMSFinalMatrixDto) => {
          if (!!matrix) {
            this.isRefAcbLiabilityExists = this.isNotNullMatrixExist(matrix);

            if (!!this.isRefAcbLiabilityExists) {
              this.availRefinanceColmInfoData = new TableData(
                this.availRefinanceColmTableProps,
                this.setNotNullMatrixArr(matrix)
              );
              this.choosedRefinanceList = this.setNotNullMatrixArr(matrix);
            } else if (!this.isRefAcbLiabilityExists) {
              this.availRefinanceColmInfoData = new TableData(this.availRefinanceColmTableProps, []);
            }
            this.calculatedCreditColmInfoData = new TableData(this.creditConditionsColNameProps, [matrix]);
            this.isAcceptButtonDisabled = false;
            this.finalProduct = [matrix];
          } else {
            this.calculatedCreditColmInfoData = new TableData(this.creditConditionsColNameProps, []);
            this.isAcceptButtonDisabled = true;
            this.finalProduct = [];
          }
        });
    }
  }

  chooseApprovedCredit(matrix: BRMSFinalMatrixDto) {
    if (!!matrix.creditSum) {
      this.finalDecForm.get('creditSum').setValue(matrix.creditSum);
    }

    if (!!matrix.creditTerm) {
      this.finalDecForm.get('creditTerm').setValue(matrix.creditTerm);
    }

    this.choosedMatrix = matrix;
    this.isCalculateButtonDisabled = false;
  }

  toggleClick(data: AcbLiabilityDto) {
    if (data.selected) {
      this.choosedRefinanceList.push(data);
    }

    if (!data.selected) {
      this.choosedRefinanceList = this.choosedRefinanceList.filter((el: AcbLiabilityDto) => {
        return el.id !== data.id;
      });
    }

    if (data.selected !== null) {
      this.brmsFinalService
        .calculateMatrix(this.appDto.id, this.calcRefinanceList(this.choosedRefinanceList))
        .subscribe((matrix: BRMSFinalMatrixDto) => {
          if (!!matrix) {
            this.finalProduct = [matrix];
            this.calculatedCreditColmInfoData = new TableData(this.creditConditionsColNameProps, [matrix]);
            this.isAcceptButtonDisabled = false;
          } else {
            this.finalProduct = [];
            this.calculatedCreditColmInfoData = new TableData(this.creditConditionsColNameProps, []);
            this.isAcceptButtonDisabled = true;
          }
        });
    }
  }

  /* ------ SAVE APP DATA ------ */
  private acceptApplication() {
    this.applicationControllerService
      .acceptApp(this.appDto.id.toString(), this.language)
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        })
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

  private navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
  }

  private saveApplicationData(data: Partial<ApplicationDto>): Observable<ApplicationDto> {
    const appData: ApplicationDto = new ApplicationDto(this.appDto);

    return this.applicationControllerService.update({
      ...appData,
      ...data
    });
  }
  /* ------ END SAVE APP DATA ------ */

  /* ------ CREATE FORM ------ */
  private createForm() {
    this.finalDecForm = this.formBuilder.group({
      creditSum: '',
      creditTerm: '',

      declineReason: [
        !!this.appDto
          ? {
              value: !!this.appDto.dirManagerDeclineReason ? this.appDto.dirManagerDeclineReason.nameRu : '',
              disabled: true
            }
          : ''
      ]
    });
  }

  // private resetControlValue(formName: string, controlName: string) {
  //   this.finalDecForm
  //     .get(formName)
  //     .get(controlName)
  //     .reset();
  // }

  // private setControlValue(formName: string, controlName: string, value: string | number) {
  //   this.finalDecForm
  //     .get(formName)
  //     .get(controlName)
  //     .setValue(value);
  // }

  private getDirectories() {
    combineLatest([this.declineReasons$])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(([declineReasons]) => {
        this.declineReasons = getOnlyActiveItems<Directory>(declineReasons);
      });
  }
  // /* ------ END CREATE FORM ------ */

  // /* ------ MATRIX ------ */
  private transformMatrixDtoIntoMatrix(matrix: BRMSFinalMatrixDto) {
    const assignObj = Object.assign({}, matrix);
    const refObj = this.transformFromLiabilityToLiabilityId(assignObj);
    this.deleteRefLiabilityKeys(assignObj);
    return {
      ...assignObj,
      ...refObj,
      creditSum: this.finalDecForm.get('creditSum').value,
      creditTerm: this.finalDecForm.get('creditTerm').value
    };
  }

  private transformFromLiabilityToLiabilityId(obj: BRMSFinalMatrixDto) {
    return {
      ref1AcbLiabilityId: !!obj && !!obj.ref1AcbLiability && !!obj.ref1AcbLiability.id ? obj.ref1AcbLiability.id : null,
      ref2AcbLiabilityId: !!obj && !!obj.ref2AcbLiability && !!obj.ref2AcbLiability.id ? obj.ref2AcbLiability.id : null,
      ref3AcbLiabilityId: !!obj && !!obj.ref3AcbLiability && !!obj.ref3AcbLiability.id ? obj.ref3AcbLiability.id : null,
      ref4AcbLiabilityId: !!obj && !!obj.ref4AcbLiability && !!obj.ref4AcbLiability.id ? obj.ref4AcbLiability.id : null,
      ref5AcbLiabilityId: !!obj && !!obj.ref5AcbLiability && !!obj.ref5AcbLiability.id ? obj.ref5AcbLiability.id : null,
      ref6AcbLiabilityId: !!obj && !!obj.ref6AcbLiability && !!obj.ref6AcbLiability.id ? obj.ref6AcbLiability.id : null,
      ref7AcbLiabilityId: !!obj && !!obj.ref7AcbLiability && !!obj.ref7AcbLiability.id ? obj.ref7AcbLiability.id : null,
      ref8AcbLiabilityId: !!obj && !!obj.ref8AcbLiability && !!obj.ref8AcbLiability.id ? obj.ref8AcbLiability.id : null,
      ref9AcbLiabilityId: !!obj && !!obj.ref9AcbLiability && !!obj.ref9AcbLiability.id ? obj.ref9AcbLiability.id : null,
      ref10AcbLiabilityId:
        !!obj && !!obj.ref10AcbLiability && !!obj.ref10AcbLiability.id ? obj.ref10AcbLiability.id : null
    };
  }

  private deleteRefLiabilityKeys(obj: BRMSFinalMatrixDto) {
    delete obj.ref1AcbLiability;
    delete obj.ref2AcbLiability;
    delete obj.ref3AcbLiability;
    delete obj.ref4AcbLiability;
    delete obj.ref5AcbLiability;
    delete obj.ref6AcbLiability;
    delete obj.ref7AcbLiability;
    delete obj.ref8AcbLiability;
    delete obj.ref9AcbLiability;
    delete obj.ref10AcbLiability;
  }

  private isNotNullMatrixExist(matrix: BRMSFinalMatrixDto) {
    const calculatedMatrix = this.getTransformedMatrix(matrix);
    let isExist = false;

    for (const key of Object.keys(calculatedMatrix)) {
      if (!!calculatedMatrix[key]) {
        isExist = true;
      }
    }
    return !!isExist;
  }

  private getTransformedMatrix(matrix: BRMSFinalMatrixDto) {
    return {
      ref1AcbLiability: !!matrix && !!matrix.ref1AcbLiability ? matrix.ref1AcbLiability : null,
      ref2AcbLiability: !!matrix && !!matrix.ref2AcbLiability ? matrix.ref2AcbLiability : null,
      ref3AcbLiability: !!matrix && !!matrix.ref3AcbLiability ? matrix.ref3AcbLiability : null,
      ref4AcbLiability: !!matrix && !!matrix.ref4AcbLiability ? matrix.ref4AcbLiability : null,
      ref5AcbLiability: !!matrix && !!matrix.ref5AcbLiability ? matrix.ref5AcbLiability : null,
      ref6AcbLiability: !!matrix && !!matrix.ref6AcbLiability ? matrix.ref6AcbLiability : null,
      ref7AcbLiability: !!matrix && !!matrix.ref7AcbLiability ? matrix.ref7AcbLiability : null,
      ref8AcbLiability: !!matrix && !!matrix.ref8AcbLiability ? matrix.ref8AcbLiability : null,
      ref9AcbLiability: !!matrix && !!matrix.ref9AcbLiability ? matrix.ref9AcbLiability : null,
      ref10AcbLiability: !!matrix && !!matrix.ref10AcbLiability ? matrix.ref10AcbLiability : null
    };
  }

  private setNotNullMatrixArr(matrix: BRMSFinalMatrixDto) {
    const calculatedMatrix = this.getTransformedMatrix(matrix);
    const calculatedArrNotNull = [];

    for (const key of Object.keys(calculatedMatrix)) {
      if (!!calculatedMatrix[key]) {
        calculatedArrNotNull.push({
          ...calculatedMatrix[key],
          refNumber: key
        });
      }
    }
    return calculatedArrNotNull;
  }

  private calcRefinanceList(arr: AcbLiabilityDto[]): BRMSFinalMatrixDto {
    let assignObj: BRMSFinalMatrixDto = Object.assign({}, this.choosedMatrix);
    this.deleteRefLiabilityKeys(assignObj);

    assignObj = Object.assign(assignObj, this.getTransformedMatrix(assignObj));

    arr.forEach((elem: AcbLiabilityDto) => {
      if (elem.refNumber && elem.selected) {
        assignObj[elem.refNumber] = elem;
      }
    });

    const refObj = this.transformFromLiabilityToLiabilityId(assignObj);
    this.deleteRefLiabilityKeys(assignObj);

    return {
      ...assignObj,
      ...refObj,
      creditSum: this.finalDecForm.get('creditSum').value,
      creditTerm: this.finalDecForm.get('creditTerm').value
    } as BRMSFinalMatrixDto;
  }
  // /* ------ END MATRIX ------ */

  // /* ------ GETTING PRINT FORMS  ------ */

  private getPrintForm(data: PrintFormModalEmit) {
    this.printingFormService
      .getFilledPrintingForm(this.appDto.id, data.form.id, data.signer)
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
  }

  // /* ------ END GETTING PRINT FORMS  ------ */

  private mapCreditInfoToBRMSFinalMatrixDto(creditInfo: CreditInfo) {
    const brmsFinalMatrixDto: BRMSFinalMatrixDto = new BRMSFinalMatrixDto();

    brmsFinalMatrixDto.annPayment = creditInfo.monthlyPayment;
    brmsFinalMatrixDto.applicationId = creditInfo.applicationId;
    brmsFinalMatrixDto.creditSum = creditInfo.creditAmount;
    brmsFinalMatrixDto.creditTerm = creditInfo.creditTerm;
    brmsFinalMatrixDto.product = creditInfo.product;
    brmsFinalMatrixDto.refinanceLiabilities = creditInfo.refinanceLiabilities;

    return brmsFinalMatrixDto;
  }
}
