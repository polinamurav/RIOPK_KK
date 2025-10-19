import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { PageDTO, TableData, TypeDto } from '@app/_models';
import { Store, select } from '@ngrx/store';
import { pluck, takeUntil, tap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { FilterTableService } from './directories-page.service';
import { IAppState } from '@app/store/state/app.state';
import { Sort } from '@angular/material/sort';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
  providers: [FilterTableService]
})
export class FilterTableComponent implements OnInit, OnDestroy {
  changePage: Subject<number> = new Subject<number>();
  totalCount: number = 0;
  itemLimit: number = 20;
  selectedPage: number = 0;
  tableBlockWidth: string | null = null;
  dataSource: TableData<TypeDto> = new TableData();
  userRole: number;

  subscription: Subscription;
  firstInitPage: boolean = true;

  private destroy: Subject<boolean> = new Subject<boolean>();
  private selectUserData$ = this._store.pipe(select(selectUserData));

  constructor(
    private activatedRoute: ActivatedRoute,
    private filterTableService: FilterTableService,
    private _store: Store<IAppState>
  ) {}

  get buttonsParams() {
    return this.filterTableService.buttonsParams;
  }

  get showPagination() {
    return this.filterTableService.showPagination;
  }

  ngOnInit() {
    this.filterTableService.subscribeToUserData();
    this.filterTableService.selectItemLimit(this.itemLimit);
    this.activatedRoute.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      this.dispatchAndSetData(this.filterTableService.getSelect(params.title));
      this.tableBlockWidth = this.filterTableService.getTableBlockWidth();
    });
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.filterTableService.destroy();
  }

  selectedPageEvent(pageNumber: number): void {
    this.filterTableService.selectedPage(pageNumber);
  }

  sortingDataEvent(sortData: Sort): void {
    this.filterTableService.sortingData(sortData);
  }

  onSearchEvent(inputVal: string): void {
    this.changePage.next(1);
  }

  downloadExel() {
    this.filterTableService.downloadExel();
  }

  uploadExel() {
    this.filterTableService.uploadExel();
  }

  otherButton() {
    this.filterTableService.otherButtonEvent();
  }

  private dispatchAndSetData(select$: Observable<PageDTO<TypeDto>>) {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = select$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        pluck('content'),
        takeUntil(this.destroy)
      )
      .subscribe(res => {
        this.dataSource = this.filterTableService.getTableData(res);
      });

    if (!this.firstInitPage) {
      this.changePage.next(1);
      this.filterTableService.dispatchData();
    } else {
      this.filterTableService.dispatchData();
      this.firstInitPage = false;
    }
  }

  private getCurrentUser() {
    this.selectUserData$.pipe(untilDestroyed(this)).subscribe(res => {
      if (res && res.username) {
        this.userRole = res.authorities[0].id;
      }
    });
  }
}
