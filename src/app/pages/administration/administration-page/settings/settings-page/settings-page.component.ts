import * as AdministrationActions from '@app/store/actions/administration.actions';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { PaginationAndSortingDto, TableData, TableDataHeader, UserDto } from '@app/_models';
import { Store, select } from '@ngrx/store';
import { map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { CredentialsService } from '@app/services/authentication';
import { CustomSettingsControllerService } from '@app/api/custom-settings-controller.service';
import { CustomSettingsDto } from '@app/_models/api-models/custom-settings';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { SettingsModalComponent } from '@app/shared/modals/settings-modal/settings-modal.component';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { selectSettings } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  dataSource: TableData<CustomSettingsDto>;
  objColNameProps: TableDataHeader[];
  totalCount: number;
  currentUserData: UserDto;
  selectedPage: number = 0;
  itemLimit: number = 20;
  customSettingsSelector$ = this._store.pipe(select(selectSettings));
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
  private fileName: string = 'Administration.Aside.Settings';
  private extension: string = 'xlsx';

  constructor(
    private dialog: MatDialog,
    private _store: Store<IAppState>,
    private credentialsService: CredentialsService,
    private fileService: DownloadUploadFileService,
    private customSettingsService: CustomSettingsControllerService,
    private translateService: TranslateService
  ) {
    this.dispatchSortAndPaginationAction();
  }

  ngOnInit() {
    this.setCredentialValues();

    this.objColNameProps = [
      new TableDataHeader('key', 'Administration.TableHeaders.Key', 'string', 'key'),
      new TableDataHeader('nameRu', 'Administration.TableHeaders.Parameter', 'ru', 'nameRu'),
      new TableDataHeader('nameGe', 'Administration.TableHeaders.Parameter', 'ge', 'nameGe'),
      new TableDataHeader('parameter', 'Administration.TableHeaders.Value', 'string', 'parameter'),
      new TableDataHeader('changedByUsername', 'Administration.TableHeaders.UpdatedBy', 'string', 'updatedBy')
    ];

    this.customSettingsSelector$
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
          const transformedRes: CustomSettingsDto[] = res.map((item: CustomSettingsDto) => ({
            ...item,
            parameter: ''
          }));

          transformedRes.forEach((item: CustomSettingsDto) => {
            if (item.parameterInt !== null) {
              item.parameter = item.parameterInt;
            } else if (item.parameterString !== null) {
              item.parameter = item.parameterString;
            } else if (item.parameterDouble !== null) {
              item.parameter = item.parameterDouble;
            } else if (item.parameterBoolean !== null) {
              item.parameter = item.parameterBoolean;
            }
          });
          this.dataSource = new TableData(this.objColNameProps, transformedRes);
        }
      });
  }

  dispatchSortAndPaginationAction() {
    this._store.dispatch(AdministrationActions.AdmSetSettingAction({ data: { ...this.params } }));
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  downloadExcel() {
    forkJoin([this.customSettingsService.download(), this.translateService.get(this.fileName)])
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
      this.params = {
        page: this.params.page,
        size: this.params.size
      };
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('value')) {
      this.params = {
        page: this.params.page,
        size: this.params.size
      };
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

  onSelectItem(item: CustomSettingsDto) {
    const dialogRef = this.dialog.open(SettingsModalComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'custom-panel-cls',
      data: {
        setting: {
          nameRu: item.nameRu,
          key: item.key,
          parameterBoolean: item.parameterBoolean,
          parameterInt: item.parameterInt,
          parameterString: item.parameterString,
          parameterDouble: item.parameterDouble
        }
      }
    });
    (dialogRef.componentInstance as SettingsModalComponent).emitData.pipe(takeUntil(this.destroy)).subscribe(data => {
      this._store.dispatch(
        AdministrationActions.AdmSaveSettingAction({
          paginationData: this.params,
          data: {
            ...data,
            created: item.created,
            id: item.id,
            updatedBy: this.currentUserData.id,
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
