import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePage } from '@app/pages/administration/administration-base/base-page';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { CreditProductService } from '@app/api/credit-product.service';
import {
  CREDIT_PROGRAM_FORM,
  CREDIT_PROGRAM_HEADERS
} from '@app/pages/administration/administration-page/credit-program/config';
import {
  CreditProgramDto,
  DirTradingCompanyDto
} from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import { combineLatest, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { DirCurrencyControllerService, ProductCategoryControllerService } from '@app/api';
import { AttachmentSaveData, AuthState, DirCreditProgramDtoView, DirGoodsDtoView, ModalData } from '@app/_models';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { MimeTypes } from '@app/components/constants/mime-types';
import {CredentialsService} from "@app/services/authentication";
import {
  GoodsGroupResourceService
} from "@app/pages/administration/administration-page/goods-group/goods-group-page/goods-group-resource.service";

@Component({
  selector: 'ngx-credit-program-page',
  templateUrl: './credit-program-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class CreditProgramPageComponent  extends BasePage<CreditProgramDto> implements OnInit, OnDestroy{

  selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));

  private optionsList: Record<string, any[]> = {
    currency: [],
    products: [],
    goodsGroup: [],
  };

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private fileService: DownloadUploadFileService,
    private creditProductService: CreditProductService,
    protected readonly credentialsService: CredentialsService,
    private dirCurrencyControllerService: DirCurrencyControllerService,
    protected readonly goodsGroupResourceService:GoodsGroupResourceService,
    private productCategoryControllerService: ProductCategoryControllerService,
  ) {
    super(CREDIT_PROGRAM_HEADERS, creditProductService, credentialsService )
  }

  ngOnInit(): void {
    this.getDirections();
    this.defaultMapper = DirCreditProgramDtoView;
    this.fetchList();
    // this.fetchList(DirCreditProgramDtoView);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  selectedItem(event: CreditProgramDto) {
    this.updateCreate(event, true);
  }

  createNew() {
    this.updateCreate({
      active: true,
      dirGoodsGroups: [],
    } as any);
  }

  downloadExcel(){
    this.creditProductService.download();
  }

  uploadExcel(){
    const params: ModalData = {
      accept: [MimeTypes.XLS, MimeTypes.XLSX],
      pathTitle: 'Modals.Buttons.ChooseFile',
      returnString: false
    };

    this.fileService
      .openDialog(params)
      .afterClosed()
      .subscribe((result: AttachmentSaveData | 'close') => {
        if (result && result !== 'close') {
          this.creditProductService
            .upload(result)
            .pipe(
              tap(() => {
                this.fetchList();
              })
            )
            .subscribe();
        }
      });
  }

  private getDirections() {
    combineLatest([
      this.dirCurrencyControllerService.getList(),
      this.productCategoryControllerService.getPosProducts(),
      this.goodsGroupResourceService.getList(),
    ]).pipe(tap(([currency, products, goodsGroup]) => {
      this.optionsList = {
        ...this.optionsList,
        currency,
        products,
        goodsGroup
      };
    })).subscribe();
  }


  private updateCreate = (data: CreditProgramDto | any, isUpdate?: boolean) => {

    if(isUpdate) {
      data.productCode = this.optionsList.products.find(el => el.code === data.productCode);
    }


    this.showDialog(
      {
        title: isUpdate ? 'Редактирование кредитной программы' : 'Создание кредитной программы',
        dataInfo: data,
        formConfig: CREDIT_PROGRAM_FORM,
        showSaveButton: isUpdate,
        showCreateButton: !isUpdate,
        disabledFields: isUpdate,
        optionsList: this.optionsList,
        showEditActivateDeactivateButtons: this.allowActivatePos,
        activateDeactivateProp: 'active',
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: CreditProgramDto | any) => {

        attributesBeforeRequest.changedByUsername = null;

        const request = {
          ...attributesBeforeRequest,
          productCode: attributesBeforeRequest.product.code
        };

        this.creditProductService[`${isUpdate ? 'update' : 'create'}`](request)
          .pipe(tap(() => {
            this.fetchList();
            // this.fetchList(DirCreditProgramDtoView);
          })).subscribe();


      });
  };

  private showDialog(data: AdministrationBaseModalData<DirTradingCompanyDto, any>, callback: (val: DirTradingCompanyDto) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy$)).subscribe(callback);
    dialogRef.componentInstance.emitActivateData.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }


}
