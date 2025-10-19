import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePage} from "@app/pages/administration/administration-base/base-page";
import { AttachmentSaveData, AuthState, Dir, DirGoodsDtoView, DirGoodsGroup, ModalData, UserPosForTable } from '@app/_models';
import {select, Store} from "@ngrx/store";
import {IAppState} from "@app/store/state/app.state";
import {MatDialog} from "@angular/material/dialog";
import {
  GoodsResourceService
} from "@app/pages/administration/administration-page/goods/goods-page/goods-resource.service";
import {CredentialsService} from "@app/services/authentication";
import {GOODS_FORM, GOODS_HEADERS} from "@app/pages/administration/administration-page/goods/config";
import {takeUntil, tap} from "rxjs/operators";
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from "@app/shared/components/modals/administration-base-modal/administration-base-modal.component";
import {combineLatest, Observable} from "rxjs";
import {selectUserData} from "@app/store/selectors/auth.selector";
import {
  GoodsGroupResourceService
} from "@app/pages/administration/administration-page/goods-group/goods-group-page/goods-group-resource.service";
import {MimeTypes} from "@app/components/constants/mime-types";
import {DownloadUploadFileService} from "@app/services/download-upload-file.service";

@Component({
  selector: 'ngx-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class GoodsPageComponent  extends BasePage<Dir> implements OnInit , OnDestroy {

  selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));

  private optionsList: Record<string, any[]> = {
    goodsGroup: [],
  };

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private fileService: DownloadUploadFileService,
    protected readonly goodsGroupResourceService:GoodsGroupResourceService,
    protected readonly goodsResourceService:GoodsResourceService,
    protected readonly credentialsService: CredentialsService
  ) {
    super(GOODS_HEADERS, goodsResourceService, credentialsService )
  }

  ngOnInit(): void {
    this.getDirections();
    this.defaultMapper = DirGoodsDtoView;
    this.fetchList();
    // this.fetchList(DirGoodsDtoView);
  }


  ngOnDestroy(): void {
    this.destroy();
  }

  selectedItem(event: Dir) {
    console.log('event', event);
    this.updateCreate(event, true);
  }

  createNew() {
    this.updateCreate({
      active: this.allowSelectItemForPos,
      dirGoodsGroups: [],
    } as any);
  }

  downloadExcel() {
    this.goodsResourceService.download();
  }

  uploadExcel() {
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
          this.goodsResourceService
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
      this.goodsGroupResourceService.getList(),
    ]).pipe(tap(([goodsGroup]) => {
      this.optionsList = {
        ...this.optionsList,
        goodsGroup,
      };
    })).subscribe();
  }

  private updateCreate = (data: Dir, isUpdate?: boolean) => {
    this.showDialog(
      {
        title: isUpdate ? 'Редактирование товара' : 'Создание Группы товара',
        dataInfo: data,
        formConfig: GOODS_FORM,
        showSaveButton: isUpdate,
        showCreateButton: !isUpdate,
        disabledFields: isUpdate,
        optionsList: this.optionsList,
        showEditActivateDeactivateButtons: this.allowSelectItemForPos,
        activateDeactivateProp: 'active',
        updateFormOnActivateDeactivate: true,
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: Dir) => {
        const cloneParams = Object.assign({}, this.params);
        attributesBeforeRequest.nameAm = attributesBeforeRequest.nameRu;
        attributesBeforeRequest.changedByUsername = null;

        this.goodsResourceService[`${isUpdate ? 'update' : 'create'}`](attributesBeforeRequest)
          .pipe(tap(() => {
            this.fetchList();
            // this.fetchList(DirGoodsDtoView);
          })).subscribe();


        console.log('attributesBeforeRequest', attributesBeforeRequest);
      });
  };

  private showDialog(data: AdministrationBaseModalData<any, any>, callback: (val: Dir) => void) {
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
