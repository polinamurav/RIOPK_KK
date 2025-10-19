import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { AttachmentSaveData, AuthState, ModalData } from '@app/_models';
import { select, Store } from '@ngrx/store';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { BasePage } from '@app/pages/administration/administration-base/base-page';
import {
  DirTradingCompanyDto,
  DirTradingCompanyPointDto
} from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import { TradingCompaniesService } from '@app/api/trading-companies.service';
import {
  TRADING_COM_FORM,
  TRADING_COM_HEADERS
} from '@app/pages/administration/administration-page/trading-company/config';
import { takeUntil, tap } from 'rxjs/operators';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { TradingCompanyPointsService } from '@app/api/trading-company-points.service';
import { CredentialsService } from '@app/services/authentication';
import { MimeTypes } from '@app/components/constants/mime-types';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';

@Component({
  selector: 'ngx-trading-company-page',
  templateUrl: './trading-company-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class TradingCompanyPageComponent extends BasePage<DirTradingCompanyDto> implements OnInit, OnDestroy {
  selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));

  private optionsList: Record<string, any[]> = {
    statuses: [],
    dirTradingCompanyPoints: []
  };

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private fileService: DownloadUploadFileService,
    protected tradingCompanyPointsService: TradingCompanyPointsService,
    protected tradingCompaniesService: TradingCompaniesService,
    protected readonly credentialsService: CredentialsService
  ) {
    super(TRADING_COM_HEADERS, tradingCompaniesService, credentialsService);
  }

  ngOnInit(): void {
    this.getDirections();
    this.fetchList();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  selectedItem(event: DirTradingCompanyDto) {
    console.log('event', event);
    this.updateCreate(event, true);
  }

  createNew() {
    this.updateCreate({
      dirTradingCompanyPoints: [],
      active: true
    } as any);
  }

  downloadExcel() {
    this.tradingCompaniesService.download();
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
          this.tradingCompaniesService
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
    combineLatest([this.tradingCompanyPointsService.getCompanyStatuses()])
      .pipe(
        tap(([statuses]) => {
          this.optionsList = {
            ...this.optionsList,
            statuses
          };
        })
      )
      .subscribe();
  }

  private updateCreate = (data: DirTradingCompanyDto, isUpdate?: boolean) => {
    // if(data.dirTradingCompanyPoints && data.dirTradingCompanyPoints.length) {
    //   this.optionsList.dirTradingCompanyPoints = [...data.dirTradingCompanyPoints];
    // } else {
    //   this.optionsList.dirTradingCompanyPoints = [];
    // }

    const formConfig = JSON.parse(JSON.stringify(TRADING_COM_FORM));

    const pointsField = formConfig.find(f => f.code === 'dirTradingCompanyPoints');
    if (pointsField) {
      pointsField.disabled = isUpdate;
      pointsField.isVisible = Boolean(isUpdate);
    }

    data.dirTradingCompanyPoints = this.pointsRemap(data.dirTradingCompanyPoints);

    this.showDialog(
      {
        title: isUpdate ? 'Редактирование торговой компании' : 'Создание торговой компании',
        dataInfo: data,
        formConfig,
        showSaveButton: isUpdate,
        showCreateButton: !isUpdate,
        showEditActivateDeactivateButtons: true,
        activateDeactivateProp: 'active',
        disabledFields: isUpdate,
        optionsList: this.optionsList,
        containerClass: 'grid-three-cols'
      },
      (attributesBeforeRequest: DirTradingCompanyDto) => {
        const cloneParams = Object.assign({}, this.params);

        attributesBeforeRequest.changedByUsername = null;

        this.tradingCompaniesService[`${isUpdate ? 'update' : 'create'}`](attributesBeforeRequest)
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

  private showDialog(
    data: AdministrationBaseModalData<DirTradingCompanyDto, any>,
    callback: (val: DirTradingCompanyDto) => void
  ) {
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

  private pointsRemap = (data: DirTradingCompanyPointDto[]) => {
    return data.map(d => {
      return {
        ...d,
        nameAm: `${d.code} ` + d.nameAm + ` ${d.address}`,
        nameRu: `${d.code} ` + d.nameRu + ` ${d.address}`,
      }
    });
  }
}
