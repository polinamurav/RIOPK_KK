import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ApplicationForShortForm,
  ShortFormParallelAppsResponse,
  STAGES_PATH,
  TableCellConfig,
  TableData
} from '@app/_models';
import { APP_DUPLICATES_TABLE } from '@app/components/modals/app-duplicates-modal/app-deplicates-table-config';
import * as _ from 'lodash';
import { AbsSearchClientControllerService, ApplicationControllerService } from '@app/api';
import * as CryptoJS from 'crypto-js';
import { CredentialsService } from '@app/services/authentication';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentAppService } from '@app/services/current-app.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-app-duplicates-modal',
  templateUrl: './app-duplicates-modal.component.html',
  styleUrls: ['./app-duplicates-modal.component.scss']
})
export class AppDuplicatesModalComponent implements OnInit {
  totalCount: number = 0;
  itemLimit: number = 7;
  appDuplicatesTableConfig: TableData<any>;
  title: string;
  isCredManager = this.credentialsService.isCreditManager || this.credentialsService.isCreditManagerBoss;

  constructor(
    private router: Router,
    private currentAppService: CurrentAppService,
    private credentialsService: CredentialsService,
    private absSearchClientService: AbsSearchClientControllerService,
    private applicationControllerService: ApplicationControllerService,
    public dialogRef: MatDialogRef<AppDuplicatesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShortFormParallelAppsResponse
  ) {}

  ngOnInit(): void {
    this.setTitleAndTable();
  }

  createNew() {
    this.dialogRef.close('CREATE_NEW');
  }

  private setTitleAndTable = (): void => {
    this.title = !this.data.createPossible ? 'ShortForm.DuplicateTitleOne' : 'ShortForm.DuplicateTitleSecond';
    this.setTableConfig();
  };

  private setTableConfig() {
    this.data.apps.forEach(el => {
      el.choose = 'Продолжить оформление';
    });

    this.appDuplicatesTableConfig = new TableData(_.cloneDeep(APP_DUPLICATES_TABLE), this.data.apps);

    if (!this.data.createPossible) {
      if (!this.isCredManager) {
        this.appDuplicatesTableConfig.tableDataHeader.pop();
      }
    }

    this.appDuplicatesTableConfig.tableDataHeader.forEach(col => {
      if (['choose'].includes(col.path)) {
        col.setCellClick(this.setOnEvent());
      }
    });
  }

  private setOnEvent = (): TableCellConfig<any> => {
    return {
      class: item => 'link',
      visible: (item: ApplicationForShortForm) => item.assignPossible,
      clickEvent: (item, e) => {
        if (item.assignPossible) {
          this.absSearchClientService
            .resignParallelApp(item.id)
            .pipe(
              tap(data => {
                this.startTaskAndGetToForm(item.id, item.stageId);
              })
            )
            .subscribe();
        }
      }
    };
  };

  private startTaskAndGetToForm(appId: number, stageId: string): void {
    const userId = this.credentialsService.userInfoDto.id.toString();
    this.currentAppService.setAppStageId({ stageId } as any);
    const cryptoHash = CryptoJS.PBKDF2(appId.toString(), userId.toString()).toString();
    const path = `/pages/dashboard/stages/${STAGES_PATH[stageId]}/${appId}/${cryptoHash}`;

    this.applicationControllerService.startTask(appId.toString(), userId).subscribe(() => {
      if (!!STAGES_PATH[stageId]) {
        this.router.navigate([path]);
        this.dialogRef.close();
      }
    });
  }
}
