import * as AdministrationActions from '@app/store/actions/administration.actions';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { PaginationAndSortingDto, TableData, TableDataHeader, UserDto } from '@app/_models';
import { Store, select } from '@ngrx/store';
import { map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { CredentialsService } from '@app/services/authentication';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { NotificationSetting } from '@app/_models/api-models/notification-setting';
import { NotificationSettingControllerService } from '@app/api/notification-setting-controller.service';
import { NotificationSettingModalComponent } from '@app/shared/components/modals/notification-modal/notification-setting-modal.component';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { selectNotificationSetting } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { AllowEditDirective } from '@app/pages/administration/administration-base/base-page';

@Component({
  selector: 'app-notification-setting-page',
  templateUrl: './notification-setting-page.component.html',
  styleUrls: ['./notification-setting-page.component.scss']
})
export class NotificationSettingPageComponent extends AllowEditDirective implements OnInit, OnDestroy {
  dataSource: TableData<NotificationSetting>;
  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('key', 'Administration.TableHeaders.Key', 'string', 'key'),
    new TableDataHeader('nameRu', 'Administration.TableHeaders.Parameter', 'ru', 'nameRu'),
    new TableDataHeader('nameAm', 'Administration.TableHeaders.Parameter', 'am', 'nameAm'),
    new TableDataHeader('valueAm', 'Administration.TableHeaders.Notifications.ValueAm', 'string', 'valueAm'),
    new TableDataHeader('valueRu', 'Administration.TableHeaders.Notifications.ValueRu', 'string', 'valueRu'),
    new TableDataHeader('valueEn', 'Administration.TableHeaders.Notifications.ValueEn', 'string', 'valueEn'),
    new TableDataHeader('changedByUsername', 'Administration.TableHeaders.UpdatedBy', 'string', 'updatedBy')
  ];
  totalCount: number;
  currentUserData: UserDto;
  selectedPage: number = 0;
  itemLimit: number = 20;
  notificationSettingSelector$ = this._store.pipe(select(selectNotificationSetting));
  selectCurrentUserData$: Observable<any> = this._store.pipe(select(selectUserData));
  changePage: Subject<number> = new Subject<number>();
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  isAdmin: boolean = false;
  isVerifier: boolean = false;
  isDecisionMaker: boolean = false;
  isVerifierBoss: boolean = false;
  isDecisionMakerBoss: boolean = false;

  private destroy: Subject<boolean> = new Subject<boolean>();
  private fileName: string = 'Administration.Aside.Notifications';
  private extension: string = 'xlsx';

  constructor(
    private dialog: MatDialog,
    private _store: Store<IAppState>,
    protected readonly credentialsService: CredentialsService,
    private fileService: DownloadUploadFileService,
    private notificationSettingService: NotificationSettingControllerService,
    private translateService: TranslateService
  ) {
    super(credentialsService);
    this.dispatchSortAndPaginationAction();
  }

  ngOnInit() {
    this.setCredentialValues();

    this.notificationSettingSelector$
      .pipe(
        tap(data => {
          this.totalCount = data.totalElements;
        }),
        pluck('content'),
        switchMap(res => {
          return this.selectCurrentUserData$.pipe(map(userData => ({ res, userData })));
        })
      )
      .subscribe(({ res, userData }) => {
        this.currentUserData = userData;
        if (!!res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  dispatchSortAndPaginationAction() {
    this._store.dispatch(AdministrationActions.AdmSetNotificationSettingAction({ data: { ...this.params } }));
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  downloadExcel() {
    forkJoin([this.notificationSettingService.download(), this.translateService.get(this.fileName)])
      .pipe(takeUntil(this.destroy))
      .subscribe(([res, translatedName]) => {
        const fileName = `${translatedName}.${this.extension}` || `${this.fileName}.${this.extension}`;
        this.fileService.downloadFile(res, fileName);
      });
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString(),
        value: inputVal
      };
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('value')) {
      delete this.params.value;
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('value')) {
      delete this.params.value;
      this.changePage.next(1);
    }
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    if (this.params.hasOwnProperty('value')) {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString(),
        value: this.params.value
      };
    } else {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString()
      };
    }
    this.dispatchSortAndPaginationAction();
  }

  sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params.page = this.selectedPage.toString();
    this.params.sort = sortStr;
    this.dispatchSortAndPaginationAction();
  }

  onSelectItem(item: NotificationSetting) {
    const dialogRef = this.dialog.open(NotificationSettingModalComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'custom-panel-cls',
      data: {
        setting: {
          nameRu: item.nameRu,
          nameAm: item.nameAm,
          nameEn: item.nameEn,
          key: item.key,
          valueRu: item.valueRu,
          valueAm: item.valueAm,
          valueEn: item.valueEn,
          extErrorMsg: item.extErrorMsg
        }
      }
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy)).subscribe(data => {
      this._store.dispatch(
        AdministrationActions.AdmSaveNotificationSettingAction({
          paginationData: this.params,
          data: {
            ...item,
            ...data,
            updated: new Date()
          }
        })
      );
    });
  }

  private setCredentialValues(): void {
    this.isAdmin = this.credentialsService.isAdmin;
    this.isVerifier = this.credentialsService.isVerifier;
    this.isDecisionMaker = this.credentialsService.isDecisionMaker;
    this.isVerifierBoss = this.credentialsService.isVerifierBoss;
    this.isDecisionMakerBoss = this.credentialsService.isDecisionMakerBoss;
  }
}
