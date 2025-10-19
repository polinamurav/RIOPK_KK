import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ELanguage } from '@app/constants/language';

import { IPrintForm, PrintFormModalEmit, PrintingFormDto, PrintingFormSignerDto, DirSignerDto } from '@app/_models';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-print-form-modal',
  templateUrl: './print-form-modal.component.html',
  styleUrls: ['./print-form-modal.component.scss']
})
export class PrintFormModalComponent implements OnInit, OnDestroy {
  emitData: EventEmitter<PrintFormModalEmit> = new EventEmitter<PrintFormModalEmit>();

  currentForm: IPrintForm;
  currentSigner: PrintingFormSignerDto;
  signersList: PrintingFormSignerDto[] = [];
  printFormsList: PrintingFormDto[];

  printFormTitle = 'Modals.Title.ChoosePrintingForm';
  signerTitle = 'Выберите подписанта';
  downloadBtnName = 'Modals.Buttons.DownloadForm';
  downloadBtnDisabled = true;
  isShowSignersList = false;
  creditContractCode = null;
  isCurrentLang: string;
  ELanguage = ELanguage;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private translateService: TranslateService,
    public dialogRef: MatDialogRef<PrintFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modalData: PrintingFormDto[]; language: string }
  ) {}

  ngOnInit() {
    this.printFormsList = this.data.modalData;
    this.isCurrentLang = this.translateService.currentLang;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSigners(form: PrintingFormDto) {
    console.log(form);
    this.downloadBtnDisabled = true;

    if (this.isCurrentLang === 'am') {
      this.currentForm = { id: form.id, name: form.nameAm, code: form.code };
    } else {
      this.currentForm = { id: form.id, name: form.nameRu, code: form.code };
    }

    this.signersList = this.getSignersList(form.printingFormSignersListDto);

    this.checkSignersListLength(this.signersList);
  }

  getSignersList(signersListDto: DirSignerDto[]): PrintingFormSignerDto[] {
    const signersList: PrintingFormSignerDto[] = [];

    if (signersListDto && signersListDto.length) {
      signersListDto.forEach(signer => signersList.push(new PrintingFormSignerDto(signer)));
    }

    return signersList;
  }

  checkSignersListLength(signersList: PrintingFormSignerDto[]): void {
    if (signersList.length === 0) {
      this.currentSigner = null;
      this.downloadBtnDisabled = false;
    }

    if (signersList.length === 1) {
      this.currentSigner = signersList[0];
      this.downloadBtnDisabled = false;
    }

    if (signersList.length > 1) {
      this.currentSigner = signersList[0];
      this.isShowSignersList = true;
      this.downloadBtnDisabled = false;
    }
  }

  changeBtnStatus() {
    this.downloadBtnDisabled = !this.currentSigner;
  }

  onPrintFormDownload() {
    const data: PrintFormModalEmit = {
      form: this.currentForm,
      signer: this.currentSigner
    };
    this.emitData.emit(data);
  }
}
