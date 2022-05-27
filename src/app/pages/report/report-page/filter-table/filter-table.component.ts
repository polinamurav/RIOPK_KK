import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TableData, PaginationAndSortingDto, TableDataHeader, ReportRunHistoryDto } from '@app/_models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap, pluck } from 'rxjs/operators';
import { ReportControllerService } from '@app/api';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { ELanguageType } from '@app/constants/language';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, OnDestroy {
  reportForm: FormGroup;
  changePage: Subject<number> = new Subject<number>();
  selectedPage: number = 1;
  totalCount: number = 0;
  itemLimit: number = 20;
  reportCode: string;
  params: PaginationAndSortingDto = {
    page: this.selectedPage - 1,
    size: this.itemLimit
  };
  isOnBtnStartDisabled: boolean = true;
  dataSource: TableData<ReportRunHistoryDto> = new TableData();
  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('dateFrom', 'TableHeader.DateFrom', 'date', 'dateFrom'),
    new TableDataHeader('dateTo', 'TableHeader.DateTo', 'date', 'dateTo'),
    new TableDataHeader('createdDate', 'TableHeader.StartDate', 'date', 'createdDate'),
    new TableDataHeader('reportFinishDate', 'TableHeader.FinishDate', 'date', 'reportFinishDate'),
    new TableDataHeader('changedByUsername', 'TableHeader.User', 'string', 'changedByUsername'),
    new TableDataHeader('cloud_download', 'TableHeader.Report', 'staticIconButton')
  ];

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _store: Store<IAppState>,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private reportService: ReportControllerService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.reportFormCreate();
    this.activatedRoute.params.pipe(takeUntil(this.destroy)).subscribe(params => this.checkRoute(params.title));

    this.reportForm.valueChanges.pipe(takeUntil(this.destroy)).subscribe(_ => {
      if (
        !!this.reportForm.get('dateFrom').value &&
        !!this.reportForm.get('dateTo').value &&
        this.reportForm.get('dateFrom').value <= this.reportForm.get('dateTo').value
      ) {
        this.isOnBtnStartDisabled = false;
      } else {
        this.isOnBtnStartDisabled = true;
      }
    });
  }

  onBtnStart() {
    this.isOnBtnStartDisabled = true;

    this.reportService
      .download(
        this.getCorrectString(this.reportForm.get('dateFrom').value),
        this.getCorrectString(this.reportForm.get('dateTo').value),
        this.reportCode
      )
      .subscribe(res => {
        const a: HTMLAnchorElement = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = URL.createObjectURL(new Blob([res]));
        a.download = this.translateTitle('FilesNames.Report');
        a.click();

        this.clearFormFields();
        this.setTableContent();
      });
  }

  selectedPageEvent(pageNumber: number): void {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString(),
      reportType: this.reportCode
    };
    this.setTableContent();
  }

  onButtonEvent(ev: ReportRunHistoryDto) {
    const currentLanguage = this.translateService.currentLang;
    if (!!ev.id) {
      this.reportService
        .getReportByRunHistoryId(ev.id)
        .pipe(takeUntil(this.destroy))
        .subscribe(result => {
          const a: HTMLAnchorElement = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = URL.createObjectURL(new Blob([result]));
          a.download =
            !!ev.reportType && !!ev.reportType[ELanguageType[currentLanguage]]
              ? ev.reportType[ELanguageType[currentLanguage]] + '.xlsx'
              : 'emptyName.xlsx';
          a.click();
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private reportFormCreate() {
    this.reportForm = this.formBuilder.group({
      dateFrom: '',
      dateTo: ''
    });
  }

  private checkRoute(code: string) {
    this.clearFormFields();
    this.reportCode = code;
    this.params.reportType = code;
    this.setTableContent();
  }

  private setTableContent() {
    this.reportService
      .getReportRunHistory(this.params)
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        pluck('content'),
        takeUntil(this.destroy)
      )
      .subscribe(res => (this.dataSource = new TableData(this.objColNameProps, res)));
  }

  private getCorrectString(dateTimeString: string) {
    const a = new Date(dateTimeString);
    return (
      a.getFullYear() +
      '-' +
      ('00' + (a.getMonth() + 1)).substring(('00' + (a.getMonth() + 1)).length - 2) +
      '-' +
      ('00' + a.getDate()).substring(('00' + a.getDate()).length - 2) +
      'T' +
      ('00' + a.getHours()).substring(('00' + a.getHours()).length - 2) +
      ':' +
      ('00' + a.getMinutes()).substring(('00' + a.getMinutes()).length - 2) +
      ':' +
      ('00' + a.getSeconds()).substring(('00' + a.getSeconds()).length - 2)
    );
  }

  private clearFormFields() {
    this.reportForm.get('dateFrom').reset();
    this.reportForm.get('dateTo').reset();
  }

  private translateTitle(key: string): string {
    let title: string;
    this.translateService.get(key).subscribe((data: string) => (title = data));
    return `${title}.xlsx` || 'emptyName.xlsx';
  }
}
