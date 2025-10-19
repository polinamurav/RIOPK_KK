import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroupService } from '@app/services/form-group.service';
import { FormGroup } from '@angular/forms';
import { CORP_COMPANY_FORM } from '@app/shared/components/corp-company-search-modal/corp-company-modal-constant';
import { DirCorpCompanyDto } from '@app/_models/api-models/dir-corp-company-dto';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

export interface CorpCompanySearchModalConfig {
  title?: string;
  confirmBtnName?: string;
  language?: string;
  options: DirCorpCompanyDto[];
}

@Component({
  selector: 'app-corp-company-search-modal',
  templateUrl: './corp-company-search-modal.component.html',
  styleUrls: ['./corp-company-search-modal.component.scss']
})
export class CorpCompanySearchModalComponent implements OnInit {
  corpForm: FormGroup;
  corpFormConfig = CORP_COMPANY_FORM;

  selectedVal: any;
  language: string;

  constructor(
    private translateService: TranslateService,
    private formGroupService: FormGroupService<any, any>,
    public dialogRef: MatDialogRef<CorpCompanySearchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CorpCompanySearchModalConfig
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.createLanguageSubscription();
  }

  chooseCompany() {
    const value = this.corpForm.controls.corp.value;
    if (value) {
      this.close(value);
    }
  }

  createForm() {
    this.language = this.data.language;
    this.corpForm = this.formGroupService.createForm({}, this.corpFormConfig, null);
  }

  close(res?: any) {
    this.dialogRef.close(res);
  }

  selectVal(val: number | string, code: string) {
    const controls = ['inn', 'corp', 'code', 'segment'];
    this.selectedVal = val;
    controls.forEach(controlCode => {
      if (controlCode !== code) {
        this.corpForm.controls[controlCode].setValue(val, { emitEvent: false });
      }
    });
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
  }
}
