import { AdmSetPartnersAction, AdmUpdatePartnersAction } from '@app/store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DIR_PARTNERS_FORM,
  DIR_PARTNERS_HEADERS
} from '@app/pages/administration/administration-page/partners/contains/partners.contains';
import { InsuranceCompanyDto, PaginationAndSortingDto, TableData, TableDataHeader, User } from '@app/_models';
import { Store, select } from '@ngrx/store';
import { pluck, takeUntil, tap } from 'rxjs/operators';

import { DirPartner } from '@app/_models/api-models/dir-partner';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { selectPartners } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit, OnDestroy {
  objColNameProps: TableDataHeader[] = DIR_PARTNERS_HEADERS;
  dataSource;
  newPartner: DirPartner = new DirPartner();
  userName: string;
  selectUserData$ = this._store.pipe(select(selectUserData));
  selectPartners$ = this._store.pipe(select(selectPartners));
  params: PaginationAndSortingDto;
  isAdmin: boolean = false;
  selectedPage: number = 0;

  itemLimit: number = 20;

  totalCount: number;
  userRole: number;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private _store: Store<IAppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this._store.dispatch(AdmSetPartnersAction({ data: this.params }));
    this.selectUserData$.pipe(takeUntil(this.destroy)).subscribe(user => {
      if (user && user.username) {
        this.userName = user.username;
        this.userRole = user.authorities[0].id;
      }
      this.isAdmin = user.authorities[0].authority === 'ADMIN';
    });

    this.selectPartners$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        pluck('content'),
        takeUntil(this.destroy)
      )
      .subscribe(data => {
        this.dataSource = new TableData(this.objColNameProps, data);
      });
  }

  dispatchSortAndPaginationAction() {
    this._store.dispatch(AdmSetPartnersAction({ data: this.params }));
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this.dispatchSortAndPaginationAction();
  }

  selectedItem(selectedItem: DirPartner) {
    if (!!this.isAdmin) {
      this.showDialog(
        {
          title: 'Редактировать партнёра',
          dataInfo: selectedItem,
          formConfig: DIR_PARTNERS_FORM,
          showSaveButton: true,
          showCreateButton: false,
          disabledFields: true
        },
        (data: Partial<DirPartner>) => {
          this.updatedDispaеch(data, selectedItem);
        }
      );
    }
  }

  updatedDispaеch(data: Partial<DirPartner>, selectedItem?: DirPartner) {
    this._store.dispatch(
      AdmUpdatePartnersAction({
        paginationData: { ...this.params },
        data: {
          ...selectedItem,
          ...data,
          created: selectedItem ? null : new Date(),
          changedByUsername: this.userName,
          updated: selectedItem ? new Date() : null
        }
      })
    );
  }

  openCreateNewDialog() {
    this.showDialog(
      {
        title: 'Создать партнёра',
        dataInfo: this.newPartner,
        formConfig: DIR_PARTNERS_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false
      },
      (data: Partial<DirPartner>) => {
        this.updatedDispaеch(data);
      }
    );
  }

  showDialog(data: AdministrationBaseModalData<DirPartner, any>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '30%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy)).subscribe(callback);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
