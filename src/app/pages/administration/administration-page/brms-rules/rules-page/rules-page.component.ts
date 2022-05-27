import { AdmSetBrmsRuleAction, AdmUpdateBrmsRuleAction } from '@app/store/actions/administration.actions';
import {
  AuthState,
  BRMSRule,
  BRMSRuleDTO,
  PageDTO,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DirProductGroup } from '@app/_models/api-models-mass-segment/product-group';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { ProductGroupControllerService } from '@app/api/massegment-api';
import { RuleModalComponent } from '@app/shared/modals/brms-rule-modal/brms-rule-modal.component';
import { Sort } from '@angular/material';
import { selectBrmsRule } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';

export interface RuleData {
  dirProductGroup?: DirProductGroup[];
  ruleData?: BRMSRule;
  showSendButton?: boolean;
  disabledFields?: boolean;
  title?: string;
  typeId?: string;
}

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.scss']
})
export class RulesPageComponent implements OnInit, OnDestroy {
  dataSource: TableData<BRMSRule>;

  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('id', 'Administration.TableHeaders.Code', 'string', 'id'),
    new TableDataHeader('productGroupId', 'Administration.TableHeaders.ProductGroup', 'string', 'productGroupId'),
    new TableDataHeader('nameRu', 'Administration.TableHeaders.RuleName', 'ru', 'nameRu'),
    new TableDataHeader('nameGe', 'Administration.TableHeaders.RuleName', 'ge', 'nameGe'),
    new TableDataHeader('brmsRuleType.id', 'Administration.TableHeaders.RuleType', 'string', 'brmsRuleType.id'),
    new TableDataHeader(
      'isVisibleForManager',
      'Administration.TableHeaders.IsRuleVisibleForManager',
      'status',
      'isVisibleForManager'
    ),
    new TableDataHeader('active', 'Administration.TableHeaders.Active', 'status', 'active')
  ];

  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  currentUserData: AuthState;
  changePage: Subject<number> = new Subject<number>();
  productGroupList: DirProductGroup[] = [];

  private selectRule$: Observable<PageDTO<BRMSRule>> = this._store.pipe(select(selectBrmsRule));
  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));

  private params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private _store: Store<IAppState>,
    private productGroupService: ProductGroupControllerService
  ) {
    this.dispatchSortAndPaginationAction();
  }

  ngOnInit() {
    this.getProductGroupList();

    this.selectRule$
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

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
    this.dispatchSortAndPaginationAction();
  }

  sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString(),
      sort: sortStr
    };
    this.dispatchSortAndPaginationAction();
  }

  updateRule(ruleData: BRMSRule) {
    this.showDialog(
      {
        dirProductGroup: this.productGroupList,
        disabledFields: true,
        ruleData
      },
      (val: BRMSRuleDTO) => {
        this._store.dispatch(
          AdmUpdateBrmsRuleAction({
            paginationData: this.params,
            data: {
              ...val,
              changedByUsername: this.currentUserData.username
            }
          })
        );
      }
    );
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString(),
        search: inputVal
      };
    } else if (this.params.hasOwnProperty('search')) {
      this.params = {
        page: this.params.page,
        size: this.params.size
      };
    }
    this.changePage.next(1);
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('search')) {
      this.params = {
        page: this.params.page,
        size: this.params.size
      };
      this.changePage.next(1);
    }
  }

  private getProductGroupList() {
    this.productGroupService
      .getList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.productGroupList = res;
      });
  }

  private showDialog(data: RuleData, callback: (val: BRMSRuleDTO) => void) {
    const dialogRef = this.dialog.open(RuleModalComponent, {
      width: '50%',
      height: '40%',
      panelClass: 'custom-panel-cls',
      data
    });
    (dialogRef.componentInstance as RuleModalComponent).emitData.subscribe(callback);
  }

  private dispatchSortAndPaginationAction() {
    this._store.dispatch(AdmSetBrmsRuleAction({ data: this.params }));
  }
}
