import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState, PageDTO, PaginationAndSortingDto, TableData, TableDataHeader } from '@app/_models';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import {
  AdmCreateBlacklistAction,
  AdmSetBlacklistAction,
  AdmUpdateBlacklistAction
} from '@app/store/actions/administration.actions';
import { forkJoin, Observable, Subject } from 'rxjs';
import { selectBlacklist } from '@app/store/selectors/administration.selector';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { Sort } from '@angular/material/sort';
import { Blacklist, BlacklistDto, EmptyBlacklistDto } from '@app/_models/api-models/blacklist';
import {
  BLACKLIST_FORM,
  BLACKLIST_HEADERS
} from '@app/pages/administration/administration-page/blacklist/constants/blacklist.constants';
import { BlacklistControllerService } from '@app/api/blacklist-controller.service';
import { BlacklistItemControllerService } from '@app/api/blacklist-item-controller.service';
import { BlacklistItem } from '@app/_models/api-models/blacklist-item';
import { AllowEditDirective } from '@app/pages/administration/administration-base/base-page';
import { CredentialsService } from '@app/services/authentication';

type Options = BlacklistItem;

@Component({
  selector: 'blacklist-page',
  templateUrl: './blacklist-page.component.html',
  styleUrls: ['./blacklist-page.component.scss']
})
export class BlacklistPageComponent extends AllowEditDirective implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  currentUserData: AuthState;
  dataSource: TableData<Blacklist>;
  objColNameProps: TableDataHeader[] = BLACKLIST_HEADERS;

  private newBlacklistDto: BlacklistDto = new EmptyBlacklistDto();
  private selectBlacklist$: Observable<PageDTO<Blacklist>> = this._store.pipe(select(selectBlacklist));
  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));

  private destroy$: Subject<boolean> = new Subject<boolean>();
  changePage: Subject<number> = new Subject<number>();

  private optionsList: Record<string, Options[]> = {
    blacklistItem: []
  };

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    protected readonly credentialsService: CredentialsService,
    private blacklistService: BlacklistControllerService,
    private blacklistItemService: BlacklistItemControllerService
  ) {
    super(credentialsService);
    this.dispatchSortAndPaginationData();
  }

  ngOnInit(): void {
    this.getTableData();
    this.setOptionsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getTableData(): void {
    this.selectBlacklist$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        switchMap(res => {
          return this.selectCurrentUserData$.pipe(map(userData => ({ res, userData })));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ res, userData }) => {
        this.currentUserData = userData;
        if (res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  setOptionsList(): void {
    forkJoin([this.blacklistItemService.getAll()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([blacklistItem]) => {
        this.optionsList.blacklistItem = blacklistItem;
      });
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this.dispatchSortAndPaginationData();
  }

  openNewDialog() {
    this.showDialog(
      {
        title: 'Modals.Title.NewUserOfBlacklist',
        dataInfo: this.newBlacklistDto,
        formConfig: BLACKLIST_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: BlacklistDto) => {
        const cloneParams = Object.assign({}, this.params);

        this._store.dispatch(
          AdmCreateBlacklistAction({
            paginationData: cloneParams,
            data: {
              ...this.newBlacklistDto,
              ...attributesBeforeRequest,
              created: new Date(),
              changedByUsername: this.currentUserData.username
            }
          })
        );
      }
    );
  }

  selectedItem(attribute: Blacklist) {
    const blacklistDto: BlacklistDto = new BlacklistDto(attribute);

    this.showDialog(
      {
        title: 'Modals.Title.EditUserOfBlacklist',
        dataInfo: blacklistDto,
        formConfig: BLACKLIST_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      val => {
        const cloneParams = Object.assign({}, this.params);

        this._store.dispatch(
          AdmUpdateBlacklistAction({
            paginationData: cloneParams,
            data: {
              ...val,
              updated: new Date(),
              changedByUsername: this.currentUserData.username,
              id: attribute.id
            }
          })
        );
      }
    );
  }

  sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString(),
      sort: sortStr
    };
    this.dispatchSortAndPaginationData();
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params.value = inputVal;
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('value')) {
      delete this.params.search;
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('value')) {
      delete this.params.value;
      this.changePage.next(1);
    }
  }

  private showDialog(data: AdministrationBaseModalData<BlacklistDto, Options>, callback: (val: BlacklistDto) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }

  private dispatchSortAndPaginationData() {
    const cloneParams = { data: Object.assign({}, this.params) };
    this._store.dispatch(AdmSetBlacklistAction(cloneParams));
  }
}
