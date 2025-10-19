import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AuthState,
  PageDTO,
  PaginationAndSortingDto,
  PrintingFormStageSettingDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import {
  LEVELS_PM_FORM,
  LEVELS_PM_HEADERS
} from '@app/pages/administration/administration-page/levels-pm/levels-pm-page/levelxPM-constant';
import { combineLatest, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { levelsPm } from '@app/store/selectors/administration.selector';
import { tap } from 'rxjs/operators';
import { DirCompetenceLevel } from '@app/_models/api-models/dir-competence-level';
import {
  AdmCreateLevelsPMAction,
  AdmCreatePrintingFormStageSettingAction,
  AdmLevelsPMAction,
  AdmLevelsPMUpdateAction,
  AdmUpdatePrintingFormStageSettingAction
} from '@app/store/actions/administration.actions';
import { untilDestroyed } from '@app/core';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { CredentialsService } from '@app/services/authentication';
import { AllowEditDirective } from '@app/pages/administration/administration-base/base-page';

@Component({
  selector: 'app-levels-pm-page',
  templateUrl: './levels-pm-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class LevelsPMPageComponent extends AllowEditDirective implements OnInit, OnDestroy {
  objColNameProps: TableDataHeader[] = LEVELS_PM_HEADERS;

  public dataSource: TableData<any>;

  public userRole: number;
  private userName: string;

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private selectLevelsPmData$ = this._store.pipe(select(levelsPm));

  constructor(
    protected readonly credentialsService: CredentialsService,
    private _store: Store<IAppState>,
    private dialog: MatDialog
  ) {
    super(credentialsService);
  }

  ngOnInit(): void {
    this.getList();
    this.getDataAndDirectories();
  }

  ngOnDestroy() {}

  selectedItem(event: DirCompetenceLevel) {
    this.emitOpenModal(event, true);
  }

  openCreateNewDialog() {
    this.emitOpenModal(new DirCompetenceLevel());
  }

  private emitOpenModal(dataInfo: DirCompetenceLevel, isEdit?: boolean): void {
    const title = 'Administration.Titles.' + (isEdit ? 'UpdateLevelPM' : 'CreateLevelPM');
    this.showDialog(
      {
        title,
        dataInfo,
        formConfig: LEVELS_PM_FORM,
        showSaveButton: isEdit,
        showCreateButton: !isEdit,
        disabledFields: isEdit
      },
      (data: DirCompetenceLevel) => {
        this.createUpdateLevel(data, isEdit);
      }
    );
  }

  private createUpdateLevel(data: DirCompetenceLevel, isEdit: boolean): void {
    this._store.dispatch(
      isEdit
        ? AdmLevelsPMUpdateAction({
            data: {
              ...data,
              changedByUsername: this.userName
            }
          })
        : AdmCreateLevelsPMAction({ data })
    );
  }

  private showDialog(data: AdministrationBaseModalData<any, any>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(callback);
  }

  private getDataAndDirectories() {
    combineLatest([this.selectUserData$])
      .pipe(untilDestroyed(this))
      .subscribe(([userData]) => {
        this.getCurrentUser(userData);
      });
  }

  private getCurrentUser(userData: AuthState) {
    if (userData && userData.username) {
      this.userName = userData.username;
      this.userRole = userData.authorities[0].id;
    }
  }

  private getList() {
    this._store.dispatch(AdmLevelsPMAction(null));
    this.selectLevelsPmData$.pipe(tap(this.setTableData)).subscribe();
  }

  private setTableData = (data: DirCompetenceLevel[]): void => {
    if (data) {
      this.dataSource = new TableData(this.objColNameProps, data);
    }
  };
}
