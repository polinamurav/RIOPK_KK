import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationAndSortingDto, TableData, TableDataHeader } from '@app/_models';
import { select, Store } from '@ngrx/store';
import { filter, pluck, tap } from 'rxjs/operators';

import { AUDIT_LOG_HEADERS } from '../constants/audit-log.constants';
import { AdmSetAuditLogAction } from './../../../../../store/actions/administration.actions';
import { IAppState } from '@app/store/state/app.state';
import { Subject } from 'rxjs';
import { selectAuditLog } from '@app/store/selectors/administration.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class AuditLogComponent implements OnInit, OnDestroy {
  public totalCount: number;
  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<any>;
  public userRole: number;

  public objColNameProps: TableDataHeader[] = AUDIT_LOG_HEADERS;
  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  private auditLog$ = this._store.pipe(select(selectAuditLog));

  constructor(private _store: Store<IAppState>) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit(): void {
    this.getAuditLog();
  }

  ngOnDestroy(): void {}

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    if (this.params.hasOwnProperty('search')) {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString(),
        search: this.params.search
      };
    } else {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString()
      };
    }
    this.dispatchSortAndPaginationData();
  }

  private getAuditLog() {
    this.auditLog$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        untilDestroyed(this)
      )
      .subscribe(res => {
        if (res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetAuditLogAction({
        data: { ...this.params }
      })
    );
  }
}
