import {
  AdmCreateInsuranceCompanyAction,
  AdmSetInsuranceCompaniesAction,
  AdmUpdateInsuranceCompanyAction
} from '@app/store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { INSURANCE_COMPANIES_FORM, INSURANCE_COMPANIES_HEADERS } from './constants/insurance-companies.constants';
import {
  InsuranceCompany,
  InsuranceCompanyDto,
  PageDTO,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, pluck, takeUntil, tap } from 'rxjs/operators';

import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { selectInsuranceCompanies } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-insurance-companies',
  templateUrl: './insurance-companies.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class InsuranceCompaniesComponent implements OnInit, OnDestroy {
  public totalCount: number;
  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<any>;

  public objColNameProps: TableDataHeader[] = INSURANCE_COMPANIES_HEADERS;
  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };
  public userRole: number;

  private userName: string;
  private newCompanyInfo: InsuranceCompanyDto = new InsuranceCompanyDto();

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private insuranceCompanies$: Observable<PageDTO<InsuranceCompany>> = this._store.pipe(
    select(selectInsuranceCompanies)
  );

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _store: Store<IAppState>, private dialog: MatDialog) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit() {
    this.getInsuranceCompanies();
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  selectedItem(item: InsuranceCompanyDto) {
    this.showDialog(
      {
        title: 'Administration.Titles.EditInsuranceCompany',
        dataInfo: item,
        formConfig: INSURANCE_COMPANIES_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true
      },
      (data: Partial<InsuranceCompanyDto>) => {
        this._store.dispatch(
          AdmUpdateInsuranceCompanyAction({
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
    this._store.dispatch(AdmSetInsuranceCompaniesAction({ data: { ...this.params } }));
  }

  openCreateNewDialog() {
    this.showDialog(
      {
        title: 'Administration.Titles.CreateInsuranceCompany',
        dataInfo: this.newCompanyInfo,
        formConfig: INSURANCE_COMPANIES_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false
      },
      (data: Partial<InsuranceCompanyDto>) => {
        this._store.dispatch(
          AdmCreateInsuranceCompanyAction({
            paginationData: { ...this.params },
            data: {
              ...this.newCompanyInfo,
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

  showDialog(data: AdministrationBaseModalData<InsuranceCompanyDto, any>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '30%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }

  private getInsuranceCompanies() {
    this.insuranceCompanies$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        if (res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  private getCurrentUser() {
    this.selectUserData$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res && res.username) {
        this.userName = res.username;
        this.userRole = res.authorities[0].id;
      }
    });
  }

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetInsuranceCompaniesAction({
        data: { ...this.params }
      })
    );
  }
}
