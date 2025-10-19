import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkFlowHistoryControllerService } from '@app/api';
import { TableData, TableDataHeader, WorkFlowHistoryDto } from '@app/_models';
import { TranslateService } from '@ngx-translate/core';

class ModalData {
  applicationId: string;
}

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss', '../close-modal-btn.scss']
})
export class HistoryModalComponent implements OnInit {
  title: string = 'Modals.Title.HistoryProcess';
  isCurrentLang: string = this.translateService.currentLang;

  historyNameProps: TableDataHeader[] = [
    new TableDataHeader('id', 'Modals.TableHeaders.Id', 'string'),
    new TableDataHeader(
      this.isCurrentLang === 'am' ? 'prevStage.nameAm' : 'prevStage.nameRu',
      'Modals.TableHeaders.FromStage',
      'string'
    ),
    new TableDataHeader(
      this.isCurrentLang === 'am' ? 'stage.nameAm' : 'stage.nameRu',
      'Modals.TableHeaders.ToStage',
      'string'
    ),
    new TableDataHeader(
      this.isCurrentLang === 'am' ? 'status.nameAm' : 'status.nameRu',
      'Modals.TableHeaders.Status',
      'string'
    ),

    new TableDataHeader('changeDate', 'Modals.TableHeaders.TransitionDateAndTime', 'dateAndTime'),
    new TableDataHeader('creditManager.username', 'Modals.TableHeaders.CreditManager', 'string'),

    new TableDataHeader('verifier.username', 'Modals.TableHeaders.BusinessVerifier', 'string'),
    new TableDataHeader('verifierDecision.nameRu', 'Modals.TableHeaders.BusinessVerifierDecision', 'string'),

    new TableDataHeader('decisionMaker.username', 'Modals.TableHeaders.RiskManager', 'string'),
    new TableDataHeader('decisionMakerDecision.nameRu', 'Modals.TableHeaders.RiskManagerDecision', 'string'),
    new TableDataHeader('decisionMakerDeclineReason.nameRu', 'Modals.TableHeaders.RiskManagerRefusal', 'string')

    // new TableDataHeader('dsaUtm.username', 'DSA привлеченец', 'string')
  ];

  historyInfoData: TableData<WorkFlowHistoryDto> = new TableData(this.historyNameProps, []);
  isLoading: boolean = true;
  itemLimit: number = 20;
  totalCount: number = 1;

  constructor(
    private translateService: TranslateService,
    public dialogRef: MatDialogRef<HistoryModalComponent>,
    private workFlowHistoryService: WorkFlowHistoryControllerService,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  ngOnInit() {
    this.workFlowHistoryService.getByApplicationId(this.data.applicationId).subscribe((res: WorkFlowHistoryDto[]) => {
      this.historyInfoData = new TableData(this.historyNameProps, res);
      this.isLoading = false;
    });
  }
}
