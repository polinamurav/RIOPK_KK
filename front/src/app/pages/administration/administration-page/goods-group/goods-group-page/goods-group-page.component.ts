import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePage } from '@app/pages/administration/administration-base/base-page';
import { combineLatest, Observable } from 'rxjs';
import { AuthState, BaseDir, Dir, DirGoodsGroup } from '@app/_models';
import { select, Store } from '@ngrx/store';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil, tap } from 'rxjs/operators';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import {
  GOODS_GROUP_FORM,
  GOODS_GROUP_HEADERS
} from '@app/pages/administration/administration-page/goods-group/config';
import { GoodsGroupResourceService } from '@app/pages/administration/administration-page/goods-group/goods-group-page/goods-group-resource.service';
import { CredentialsService } from '@app/services/authentication';
import { GoodsResourceService } from '@app/pages/administration/administration-page/goods/goods-page/goods-resource.service';

@Component({
  selector: 'ngx-goods-group-page',
  templateUrl: './goods-group-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class GoodsGroupPageComponent extends BasePage<DirGoodsGroup> implements OnInit, OnDestroy {
  selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));

  private optionsList: Record<string, any[]> = {
    goods: []
  };

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    protected readonly goodsGroupResourceService: GoodsGroupResourceService,
    protected readonly goodsResourceService: GoodsResourceService,
    protected readonly credentialsService: CredentialsService
  ) {
    super(GOODS_GROUP_HEADERS, goodsGroupResourceService, credentialsService);
  }

  ngOnInit(): void {
    this.getDirections();
    this.fetchList();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  selectedItem(event: DirGoodsGroup) {
    console.log('event', event);
    this.updateCreate(event, true);
  }

  createNew() {
    this.updateCreate({
      active: this.allowSelectItemForPos,
      dirGoods: []
    } as any);
  }

  private getDirections() {
    combineLatest([this.goodsResourceService.getList()])
      .pipe(
        tap(([goods]) => {
          this.optionsList = {
            ...this.optionsList,
            goods
          };
        })
      )
      .subscribe();
  }

  private updateCreate = (data: any, isUpdate?: boolean) => {
    this.showDialog(
      {
        title: isUpdate ? 'Редактирование Группы товаров' : 'Создание Группы товаров',
        dataInfo: data,
        formConfig: GOODS_GROUP_FORM,
        showSaveButton: isUpdate,
        showCreateButton: !isUpdate,
        disabledFields: isUpdate,
        optionsList: this.optionsList,
        showEditActivateDeactivateButtons: this.allowSelectItemForPos,
        activateDeactivateProp: 'active',
        updateFormOnActivateDeactivate: true,
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: DirGoodsGroup) => {
        const cloneParams = Object.assign({}, this.params);

        attributesBeforeRequest.nameAm = attributesBeforeRequest.nameRu;
        attributesBeforeRequest.changedByUsername = null;
        this.goodsGroupResourceService[`${isUpdate ? 'update' : 'create'}`](attributesBeforeRequest)
          .pipe(
            tap(() => {
              this.fetchList();
            })
          )
          .subscribe();

        console.log('attributesBeforeRequest', attributesBeforeRequest);
      }
    );
  };

  private showDialog(data: AdministrationBaseModalData<any, any>, callback: (val: DirGoodsGroup) => void) {
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
