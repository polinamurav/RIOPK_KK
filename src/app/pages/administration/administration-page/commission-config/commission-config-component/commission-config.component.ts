import {
  AbsCommissionConfig,
  AbsCommissionConfigDto,
  AuthState,
  CustomOptionList,
  Dir,
  EmptyAbsCommissionConfigDto,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import {
  AbsCommissionControllerService,
  InsuranceCompanyControllerService,
  ProductCategoryControllerService
} from '@app/api';
import {
  AdmCreateCommissionConfigAction,
  AdmSetCommissionConfigAction,
  AdmUpdateCommissionConfigAction
} from './../../../../../store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import {
  COMMISSION_CONFIG_FORM,
  COMMISSION_CONFIG_HEADERS,
  commissionExistsOptions
} from '../constants/commission-config.constants';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, combineLatest } from 'rxjs';
import { filter, pluck, tap } from 'rxjs/operators';

import { DirInsuranceTypeControllerService } from '@app/api/dir-insurance-type-controller.service';
import { IAppState } from '@app/store/state/app.state';
import { InsuranceCompany } from './../../../../../_models/api-models/insurance-company';
import { MatDialog } from '@angular/material';
import { ProductRes } from './../../../../../_models/api-models/product';
import { selectCommissionConfig } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

type Options = ProductRes | Dir | InsuranceCompany | CustomOptionList;

@Component({
  selector: 'app-commission-config',
  templateUrl: './commission-config.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class CommissionConfigComponent implements OnInit, OnDestroy {
  public totalCount: number;
  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<any>;
  public userRole: number;

  public objColNameProps: TableDataHeader[] = COMMISSION_CONFIG_HEADERS;
  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  private userName: string;
  private optionsList: Record<string, Options[]> = {
    productCategory: [],
    commission: [],
    insuranceType: [],
    insuranceCompany: [],
    commissionExists: commissionExistsOptions
  };

  private selectUserData$ = this.store.pipe(select(selectUserData));
  private commissionConfig$ = this.store.pipe(select(selectCommissionConfig));

  constructor(
    private store: Store<IAppState>,
    private dialog: MatDialog,
    private productCategoryControllerService: ProductCategoryControllerService,
    private absCommissionService: AbsCommissionControllerService,
    private dirInsuranceTypeService: DirInsuranceTypeControllerService,
    private insuranceCompanyService: InsuranceCompanyControllerService
  ) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit(): void {
    this.getDiscountCondition();
    this.getDataAndDirectories();
  }

  ngOnDestroy(): void {}

  selectedItem(item: AbsCommissionConfig) {
    this.showDialog(
      {
        title: 'Administration.Titles.EditCommission',
        dataInfo: item,
        formConfig: COMMISSION_CONFIG_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList
      },
      (data: AbsCommissionConfigDto) => {
        this.store.dispatch(
          AdmUpdateCommissionConfigAction({
            paginationData: { ...this.params },
            data: {
              ...item,
              ...data,
              commissionExists: this.getCommissionExistsObject(data.commissionExists).value,
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
    this.store.dispatch(AdmSetCommissionConfigAction({ data: { ...this.params } }));
  }

  openCreateNewDialog() {
    const emptyAbsCommissionConfigDto: AbsCommissionConfigDto = new EmptyAbsCommissionConfigDto();
    this.showDialog(
      {
        title: 'Administration.Titles.CreateCommission',
        dataInfo: emptyAbsCommissionConfigDto,
        formConfig: COMMISSION_CONFIG_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList
      },
      (data: AbsCommissionConfigDto) => {
        this.store.dispatch(
          AdmCreateCommissionConfigAction({
            paginationData: { ...this.params },
            data: {
              ...emptyAbsCommissionConfigDto,
              ...data,
              commissionExists: this.getCommissionExistsObject(data.commissionExists).value,
              created: new Date(),
              changedByUsername: this.userName
            }
          })
        );
      }
    );
  }

  showDialog(data: AdministrationBaseModalData<AbsCommissionConfigDto, Options>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(callback);
  }

  private getDirectoryFromListById(directory: Options[], id: number | string, parameterName: string): Options {
    return directory.find((item: Options) => item[parameterName] === id);
  }

  private getCommissionExistsObject(commissionExistsId: number): CustomOptionList {
    return this.getDirectoryFromListById(
      this.optionsList.commissionExists,
      commissionExistsId,
      'id'
    ) as CustomOptionList;
  }

  private getDiscountCondition() {
    this.commissionConfig$
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

  private getDataAndDirectories() {
    combineLatest([
      this.selectUserData$,
      this.productCategoryControllerService.getAllActive(),
      this.absCommissionService.getAll(),
      this.dirInsuranceTypeService.getList(),
      this.insuranceCompanyService.getAll()
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([userData, productCategory, commission, insuranceType, insuranceCompany]) => {
        this.getCurrentUser(userData);
        this.optionsList.productCategory = productCategory;
        this.optionsList.commission = commission;
        this.optionsList.insuranceType = insuranceType;
        this.optionsList.insuranceCompany = insuranceCompany;
      });
  }

  private getCurrentUser(userData: AuthState) {
    if (userData && userData.username) {
      this.userName = userData.username;
      this.userRole = userData.authorities[0].id;
    }
  }

  private dispatchSortAndPaginationData() {
    this.store.dispatch(
      AdmSetCommissionConfigAction({
        data: { ...this.params }
      })
    );
  }
}
