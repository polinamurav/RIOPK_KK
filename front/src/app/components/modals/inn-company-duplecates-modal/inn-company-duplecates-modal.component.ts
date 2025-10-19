import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DirCorpCompanyDto } from '@app/_models/api-models/dir-corp-company-dto';
import { TableData } from '@app/_models';
import { INN_COMPANY_DUPLICATE_TABLE } from '@app/components/tabs/data-form/constants/data-form-constants';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-inn-company-duplecates-modal',
  templateUrl: './inn-company-duplecates-modal.component.html',
  styleUrls: ['./inn-company-duplecates-modal.component.scss']
})
export class InnCompanyDuplecatesModalComponent implements OnInit {
  title: string;
  inn: string;
  innCompanyTableConfig: TableData<DirCorpCompanyDto> = new TableData(INN_COMPANY_DUPLICATE_TABLE, []);

  constructor(
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<InnCompanyDuplecatesModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DirCorpCompanyDto[]
  ) {}

  ngOnInit(): void {
    this.inn = this.data[0].inn;
    this.innCompanyTableConfig = new TableData(INN_COMPANY_DUPLICATE_TABLE, this.data);
    this.setTitle();
    this.translateService.onLangChange
      .pipe(
        tap(data => {
          this.setTitle();
        })
      )
      .subscribe();
  }

  choose(company: DirCorpCompanyDto) {
    this.dialogRef.close(company);
  }

  private setTitle = (): void => {
    this.title = this.translateService.instant('FullForm.TableHeaders.CompanyName') + `: ${this.inn}`;
  };
}
