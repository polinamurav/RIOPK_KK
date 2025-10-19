import { Component, OnInit, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import {
  PaginationAndSortingDto,
  TableDataHeader,
  TableData,
  PageDTO,
  AuthState,
  PreApprovedOfferDto,
  PreapprovedOfferParams
} from '@app/_models';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Sort } from '@angular/material/sort';
import { filter, map, pluck, switchMap, tap } from 'rxjs/operators';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';
import { selectPreApproved } from '@app/store/selectors/administration.selector';
import { PRE_APPROVED_OFFERS } from '../constants/short-form-config';
import {
  AdmSetPreapprovedOfferAction,
  AdmSetPreapprovedOfferSuccessAction
} from '@app/store/actions/administration.actions';

@Component({
  selector: 'app-credit-app-table-modal',
  templateUrl: './credit-app-table-modal.component.html',
  styleUrls: ['./credit-app-table-modal.component.scss']
})
export class CreditAppTableModalComponent implements OnInit, OnDestroy {
  public totalCount: number;
  public objColNameProps: TableDataHeader[] = PRE_APPROVED_OFFERS;
  public currentUserData: AuthState;
  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<PreApprovedOfferDto> = new TableData(this.objColNameProps, []);

  public selectedPage: number = 0;
  public itemLimit: number = 10;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  public offerParams: PreapprovedOfferParams;
  public posForm: FormGroup;
  public title: string;

  public selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  public selectPreApproved$: Observable<PageDTO<PreApprovedOfferDto>> = this._store.pipe(select(selectPreApproved));

  public emitData: EventEmitter<PreApprovedOfferDto> = new EventEmitter();
  public emitNoData: EventEmitter<any> = new EventEmitter();
  public closeModal: EventEmitter<any> = new EventEmitter();

  constructor(
    private _store: Store<IAppState>,
    public dialogRef: MatDialogRef<CreditAppTableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // TODO Romanovski: change type any
  ) {
    if (!!this.data) {
      this.currentUserData = this.data.userData;
      this.offerParams = this.data.offerParams;
    }

    this.params.sort = this.objColNameProps[0].sortBy + ',asc';
    this.dispatchSortAndPaginationData();
  }

  public ngOnInit(): void {
    console.log(this.data);
    this.getTableData();
  }

  public createNewRequest() {
    this.dialogRef.close();
    this.emitData.emit();
  }

  public ngOnDestroy(): void {
    this._store.dispatch(AdmSetPreapprovedOfferSuccessAction({ data: null }));
  }

  public dispatchSortAndPaginationData(): void {
    this._store.dispatch(AdmSetPreapprovedOfferAction({ data: this.offerParams, paginationData: this.params }));
  }

  public selectedPageEvent(pageNumber: number): void {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this.dispatchSortAndPaginationData();
  }

  public sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params.sort = sortStr;
    this.dispatchSortAndPaginationData();
  }

  public selectedItem(item: PreApprovedOfferDto): void {
    this.dialogRef.close();
    this.emitData.emit(item);
  }

  public close() {
    this.closeModal.emit();
    this.dialogRef.close();
  }

  private getTableData() {
    this.selectPreApproved$
      .pipe(
        tap((res: PageDTO<PreApprovedOfferDto>) => {
          if (res) {
            this.totalCount = res.totalElements;
          }
        }),
        filter(res => !!res),
        pluck('content'),
        switchMap(res => {
          return this.selectCurrentUserData$.pipe(map(userData => ({ res, userData })));
        }),
        untilDestroyed(this)
      )
      .subscribe(({ res, userData }) => {
        this.currentUserData = userData;
        if (res.length) {
          this.title = this.data.title;
          this.dataSource = new TableData(this.objColNameProps, res);
        } else {
          this.title = 'Modals.Title.NoPreApprovedOffers';
          this.emitNoData.emit();
        }
      });
  }
}
