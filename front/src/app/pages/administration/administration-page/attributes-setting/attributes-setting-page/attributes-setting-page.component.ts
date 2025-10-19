import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState, PageDTO, PaginationAndSortingDto, ProductDto, TableData, TableDataHeader } from '@app/_models';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import {
  AdmCreateAttributesSettingAction,
  AdmSetAttributesSettingAction,
  AdmUpdateAttributesSettingAction
} from '@app/store/actions/administration.actions';
import { forkJoin, Observable, Subject } from 'rxjs';
import { selectAttributesSetting } from '@app/store/selectors/administration.selector';
import { DirAbsAttribute } from '@app/_models/api-models/dir-abs-attribute';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { Sort } from '@angular/material/sort';
import {
  DirAbsAttributeSetting,
  DirAbsAttributeSettingDto,
  EmptyDirAbsAttributeSettingDto
} from '@app/_models/api-models/dir-abs-attribute-setting';
import {
  ATTRIBUTES_SETTING_FORM,
  ATTRIBUTES_SETTING_HEADERS
} from '@app/pages/administration/administration-page/attributes-setting/constants/attributes-setting.constants';
import { ProductCategoryControllerService } from '@app/api';
import { DirAbsAttributeControllerService } from '@app/api/dir-abs-attribute-controller.service';
import { CredentialsService } from '@app/services/authentication';
import { AllowEditDirective } from '@app/pages/administration/administration-base/base-page';

type Options = ProductDto | DirAbsAttribute;

@Component({
  selector: 'attributes-setting-page',
  templateUrl: './attributes-setting-page.component.html',
  styleUrls: ['./attributes-setting-page.component.scss']
})
export class AttributesSettingPageComponent extends AllowEditDirective implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  currentUserData: AuthState;
  dataSource: TableData<DirAbsAttributeSetting>;
  objColNameProps: TableDataHeader[] = ATTRIBUTES_SETTING_HEADERS;

  private newDirAbsAttributeSettingDto: DirAbsAttributeSettingDto = new EmptyDirAbsAttributeSettingDto();
  private selectAttributesSetting$: Observable<PageDTO<DirAbsAttributeSetting>> = this._store.pipe(
    select(selectAttributesSetting)
  );
  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private optionsList: Record<string, Options[]> = {
    productList: [],
    attributeList: []
  };

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private productCategoryService: ProductCategoryControllerService,
    protected readonly credentialsService: CredentialsService,
    private dirAbsAttributeService: DirAbsAttributeControllerService
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
    this.selectAttributesSetting$
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
    forkJoin([this.productCategoryService.getAll(), this.dirAbsAttributeService.getList()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([productCategory, attributes]) => {
        this.optionsList.productList = productCategory;
        this.optionsList.attributeList = attributes;
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
        title: 'Modals.Title.NewAttributeSetting',
        dataInfo: this.newDirAbsAttributeSettingDto,
        formConfig: ATTRIBUTES_SETTING_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: DirAbsAttributeSettingDto) => {
        this._store.dispatch(
          AdmCreateAttributesSettingAction({
            paginationData: this.params,
            data: {
              ...this.newDirAbsAttributeSettingDto,
              ...attributesBeforeRequest,
              created: new Date(),
              changedByUsername: this.currentUserData.username
            }
          })
        );
      }
    );
  }

  selectedItem(attribute: DirAbsAttributeSetting) {
    const dirAbsAttributeSettingDto: DirAbsAttributeSettingDto = new DirAbsAttributeSettingDto(attribute);

    this.showDialog(
      {
        title: 'Modals.Title.EditAttributeSetting',
        dataInfo: dirAbsAttributeSettingDto,
        formConfig: ATTRIBUTES_SETTING_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      val => {
        this._store.dispatch(
          AdmUpdateAttributesSettingAction({
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
    data: AdministrationBaseModalData<DirAbsAttributeSettingDto, Options>,
    callback: (val: DirAbsAttributeSettingDto) => void
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
    this._store.dispatch(AdmSetAttributesSettingAction({ data: { ...this.params } }));
  }
}
