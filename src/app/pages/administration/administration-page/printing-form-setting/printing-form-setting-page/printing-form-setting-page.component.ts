import {
  AdmCreatePrintingFormStageSettingAction,
  AdmUpdatePrintingFormStageSettingAction
} from './../../../../../store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import {
  AuthState,
  DirStage,
  EmptyPrintingFormStageSetting,
  PaginationAndSortingDto,
  PrintingForm,
  PrintingFormStageSetting,
  PrintingFormStageSettingDto,
  ProductRes,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  PRINTING_FORM_SETTING_FORM,
  PRINTING_FORM_SETTING_HEADERS
} from '../constants/printing-form-setting.constants';
import { PrintingFormControllerService, ProductCategoryControllerService, StageControllerService } from '@app/api';
import { Store, select } from '@ngrx/store';
import { Subject, combineLatest } from 'rxjs';
import { filter, pluck, tap } from 'rxjs/operators';

import { AdmSetPrintingFormStageSettingAction } from '@app/store/actions/administration.actions';
import { DirProductGroup } from '@app/_models/api-models-mass-segment/product-group';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { ProductGroupControllerService } from '@app/api/massegment-api';
import { printingFormStageSetting } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

type Options = PrintingForm | ProductRes | DirStage | DirProductGroup;

@Component({
  selector: 'app-printing-form-setting',
  templateUrl: './printing-form-setting-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class PrintingFormSettingPageComponent implements OnInit, OnDestroy {
  public totalCount: number;
  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<any>;
  public userRole: number;

  public objColNameProps: TableDataHeader[] = PRINTING_FORM_SETTING_HEADERS;
  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  private userName: string;
  private emptyPrintingFormStageSettingDto: EmptyPrintingFormStageSetting = new EmptyPrintingFormStageSetting();
  private optionsList: Record<string, Options[]> = {
    productCategory: [],
    printingForm: [],
    stage: [],
    productGroup: []
  };

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private printingFormStageSetting$ = this._store.pipe(select(printingFormStageSetting));

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private productCategoryService: ProductCategoryControllerService,
    private productGroupService: ProductGroupControllerService,
    private stageService: StageControllerService,
    private printingFormService: PrintingFormControllerService
  ) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit(): void {
    this.getFormsSettingsList();
    this.getDataAndDirectories();
  }

  ngOnDestroy(): void {}

  selectedItem(item: PrintingFormStageSetting) {
    const itemDto: PrintingFormStageSettingDto = new PrintingFormStageSettingDto(item);

    this.showDialog(
      {
        title: 'Administration.Titles.EditPrintingForm',
        dataInfo: itemDto,
        formConfig: PRINTING_FORM_SETTING_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList
      },
      (data: PrintingFormStageSettingDto) => {
        this._store.dispatch(
          AdmUpdatePrintingFormStageSettingAction({
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
    this._store.dispatch(AdmSetPrintingFormStageSettingAction({ data: { ...this.params } }));
  }

  openCreateNewDialog() {
    this.showDialog(
      {
        title: 'Administration.Titles.CreatePrintingForm',
        dataInfo: this.emptyPrintingFormStageSettingDto,
        formConfig: PRINTING_FORM_SETTING_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList
      },
      (data: PrintingFormStageSettingDto) => {
        this._store.dispatch(
          AdmCreatePrintingFormStageSettingAction({
            paginationData: { ...this.params },
            data: {
              ...this.emptyPrintingFormStageSettingDto,
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

  showDialog(data: AdministrationBaseModalData<PrintingFormStageSettingDto, Options>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(callback);
  }

  getDataAndDirectories() {
    combineLatest([
      this.selectUserData$,
      this.productCategoryService.getAllActive(),
      this.productGroupService.getList(),
      this.stageService.getStagesDir(),
      this.printingFormService.getList()
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([userData, productCategory, productGroup, stages, printingForm]) => {
        this.getCurrentUser(userData);
        this.optionsList.productCategory = productCategory;
        this.optionsList.productGroup = productGroup;
        this.optionsList.stage = stages;
        this.optionsList.printingForm = printingForm;
      });
  }

  private getFormsSettingsList() {
    this.printingFormStageSetting$
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

  private getCurrentUser(userData: AuthState) {
    if (userData && userData.username) {
      this.userName = userData.username;
      this.userRole = userData.authorities[0].id;
    }
  }

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetPrintingFormStageSettingAction({
        data: { ...this.params }
      })
    );
  }
}
