import {Component, OnDestroy, OnInit} from "@angular/core";
import {
  AuthState,
  PageDTO,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader
} from "@app/_models";
import {
  ATTRIBUTES_FORM,
  ATTRIBUTES_HEADERS
} from "@app/pages/administration/administration-page/attributes/constants/attributes.constants";
import {select, Store} from "@ngrx/store";
import {IAppState} from "@app/store/state/app.state";
import {
  AdmCreateAttributesAction,
  AdmSetAttributesAction,
  AdmUpdateAttributesAction
} from "@app/store/actions/administration.actions";
import {Observable, Subject} from "rxjs";
import {selectAttributes} from "@app/store/selectors/administration.selector";
import {DirAbsAttribute, DirAbsAttributeDto, EmptyDirAbsAttributeDto} from "@app/_models/api-models/dir-abs-attribute";
import {filter, map, pluck, switchMap, takeUntil, tap} from "rxjs/operators";
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from "@app/shared/modals/administration-base-modal/administration-base-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {selectUserData} from "@app/store/selectors/auth.selector";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'attributes-page',
  templateUrl: './attributes-page.component.html',
  styleUrls: ['./attributes-page.component.scss']
})
export class AttributesPageComponent implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  currentUserData: AuthState;
  dataSource: TableData<DirAbsAttribute>;
  objColNameProps: TableDataHeader[] = ATTRIBUTES_HEADERS;

  private newDirAbsAttributeDto: DirAbsAttributeDto = new EmptyDirAbsAttributeDto;
  private selectAttributes$: Observable<PageDTO<DirAbsAttribute>> = this._store.pipe(select(selectAttributes));
  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
  ) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit(): void {
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getTableData(): void {
    this.selectAttributes$
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

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this.dispatchSortAndPaginationData();
  }

  openNewDialog() {
    this.showDialog(
      {
        title: 'Modals.Title.NewAttribute',
        dataInfo: this.newDirAbsAttributeDto,
        formConfig: ATTRIBUTES_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: DirAbsAttributeDto) => {
        this._store.dispatch(
          AdmCreateAttributesAction({
            paginationData: this.params,
            data: {
              ...this.newDirAbsAttributeDto,
              ...attributesBeforeRequest,
              created: new Date(),
              changedByUsername: this.currentUserData.username
            }
          })
        );
      }
    );
  }

  selectedItem(attribute: DirAbsAttribute) {
    const dirAbsAttributeDto: DirAbsAttributeDto = new DirAbsAttributeDto(attribute)

    this.showDialog(
      {
        title: 'Modals.Title.EditAttribute',
        dataInfo: dirAbsAttributeDto,
        formConfig: ATTRIBUTES_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        containerClass: 'grid-two-cols'
      },
      (val) => {
        this._store.dispatch(
          AdmUpdateAttributesAction({
            paginationData: this.params,
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

  private showDialog(
    data: AdministrationBaseModalData<DirAbsAttributeDto, any>,
    callback: (val: DirAbsAttributeDto) => void
  ) {
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
    this._store.dispatch(AdmSetAttributesAction({data: { ...this.params }}));
  }
}
