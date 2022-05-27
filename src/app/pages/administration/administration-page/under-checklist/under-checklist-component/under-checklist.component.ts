import {
  AdmCreateUnderChecklistAction,
  AdmSetUnderChecklistAction,
  AdmUpdateUnderChecklistAction
} from '@app/store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DirChecklist, PageDTO, PaginationAndSortingDto, TableData, TableDataHeader } from '@app/_models';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UNDER_CHECKLIST_FORM, UNDER_CHECKLIST_HEADERS } from './constants/under-checklist.constants';
import { filter, pluck, tap } from 'rxjs/operators';

import { DirProductGroup } from '@app/_models/api-models-mass-segment/product-group';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { ProductGroupControllerService } from '@app/api/massegment-api';
import { selectUnderChecklist } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-under-checklist',
  templateUrl: './under-checklist.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class UnderChecklistComponent implements OnInit, OnDestroy {
  public totalCount: number;
  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<any>;
  public userRole: number;

  public objColNameProps: TableDataHeader[] = UNDER_CHECKLIST_HEADERS;
  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };
  public createButtonName = 'Добавить фактор';

  private userName: string;
  private underChecklist: DirChecklist = new DirChecklist();
  private optionsList: Record<string, DirProductGroup[]> = {
    productGroup: []
  };

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private underChecklists$: Observable<PageDTO<DirChecklist>> = this._store.pipe(select(selectUnderChecklist));
  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private productGroupService: ProductGroupControllerService
  ) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit() {
    this.getDirectories();
    this.getUnderChecklists();
  }

  ngOnDestroy(): void {}

  selectedItem(item: DirChecklist) {
    this.showDialog(
      {
        title: 'Редактировать фактор',
        dataInfo: item,
        formConfig: UNDER_CHECKLIST_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList
      },
      (data: DirChecklist) => {
        this._store.dispatch(
          AdmUpdateUnderChecklistAction({
            paginationData: { ...this.params },
            data: {
              ...item,
              ...data,
              changedByUsername: this.userName,
              updated: new Date()
            }
          })
        );
      }
    );
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this._store.dispatch(AdmSetUnderChecklistAction({ data: { ...this.params } }));
  }

  openCreateNewDialog() {
    this.showDialog(
      {
        title: 'Создать фактор',
        dataInfo: this.underChecklist,
        formConfig: UNDER_CHECKLIST_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList
      },
      (data: DirChecklist) => {
        this._store.dispatch(
          AdmCreateUnderChecklistAction({
            paginationData: { ...this.params },
            data: {
              ...this.underChecklist,
              ...data,
              created: new Date(),
              changedByUsername: this.userName,
              updated: null
            }
          })
        );
      }
    );
  }

  showDialog(data: AdministrationBaseModalData<DirChecklist, DirProductGroup>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(callback);
  }

  private getUnderChecklists() {
    this.underChecklists$
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

  private getDirectories() {
    combineLatest([this.selectUserData$, this.productGroupService.getList()])
      .pipe(untilDestroyed(this))
      .subscribe(([userData, productGroupList]) => {
        if (userData && userData.username) {
          this.userName = userData.username;
          this.userRole = userData.authorities[0].id;
        }

        this.optionsList.productGroup = productGroupList;
      });

    this.selectUserData$.pipe(untilDestroyed(this)).subscribe(res => {
      if (res && res.username) {
        this.userName = res.username;
        this.userRole = res.authorities[0].id;
      }
    });
  }

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetUnderChecklistAction({
        data: { ...this.params }
      })
    );
  }
}
