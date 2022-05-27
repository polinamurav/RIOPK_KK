import { Component, Input, OnInit } from '@angular/core';
import { SelectedConditionReq, SelectedConditionRes } from '@app/_models/api-models/selected-condition';
import { TableData, TableDataHeader, UserDto } from '@app/_models';
import {
  VisualAssessmentChecklist,
  VisualAssessmentChecklistDtoModel
} from '@app/_models/api-models/visual-assessment';

import { BRMSResponse } from '@app/_models/api-models/brms';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { MatDialog } from '@angular/material';
import { SelectedConditionController } from '@app/api/selected-condition-controller.service';
import { SelectedConditionModalComponent } from './selected-condition-modal/selected-condition-modal.component';
import { VisualAssessmentChecklistController } from '@app/api/visual-assessment-checklist-controller.service';

@Component({
  selector: 'app-selected-condition',
  templateUrl: './selected-condition.component.html',
  styleUrls: ['./selected-condition.component.scss']
})
export class SelectedConditionComponent implements OnInit {
  @Input() brmsResponse: BRMSResponse;
  @Input() managerInfo: UserDto;

  footerConfigSource = 'common.selectedCondition';
  itemLimit: number = 20;
  totalCount: number = 1;

  isLoading: boolean = false;

  visualAssessment: VisualAssessmentChecklist[] = [];

  possibleCreditColNameProps: TableDataHeader[] = [
    new TableDataHeader('productType', 'ВИД ПРОДУКТА', 'string'),
    new TableDataHeader('maxCreditSum', 'СУММА КРЕДИТА', 'number'),
    new TableDataHeader('currency', 'ВАЛЮТА', 'string'),
    new TableDataHeader('rate', 'СТАВКА', 'string'),
    new TableDataHeader('annPayment', 'АННУИТЕТНЫЙ ПЛАТЕЖ', 'number'),
    new TableDataHeader('minTerm', 'СРОК КРЕДИТОВАНИЯ', 'string')
  ];

  selectedConditionColNameProps: TableDataHeader[] = [
    new TableDataHeader('product.nameRu', 'ПРОДУКТ', 'string'),
    new TableDataHeader('sum', 'СУММА КРЕДИТА', 'number'),
    new TableDataHeader('currency', 'ВАЛЮТА', 'string'),
    new TableDataHeader('annualInterestRate', 'СТАВКА', 'string'),
    new TableDataHeader('minTerm', 'СРОК, мес', 'string'),
    new TableDataHeader('annuityPayment', 'АННУИТЕТНЫЙ ПЛАТЕЖ', 'number'),
    new TableDataHeader('delete', 'УДАЛИТЬ', 'deleted')
    // new TableDataHeader('minTerm', 'ОБЕСПЕЧЕНИЕ', 'string')
  ];

  possibleCreditInfoData: TableData<BRMSResponse> = new TableData(this.possibleCreditColNameProps, []);
  selectedConditionData: TableData<SelectedConditionRes> = new TableData(this.selectedConditionColNameProps, []);

  selectedConditionList: SelectedConditionRes[] = [];

  constructor(
    private selectedConditionController: SelectedConditionController,
    private dialog: MatDialog,
    private visualAssessmentChecklistController: VisualAssessmentChecklistController
  ) {}

  ngOnInit() {
    this.selectedConditionController.getAllByApplicantIdAndApplicationId('608', '617').subscribe(res => {
      this.selectedConditionList = res;
      this.selectedConditionData = new TableData(this.selectedConditionColNameProps, this.selectedConditionList);
    });

    this.visualAssessmentChecklistController
      .getAllByApplicantIdAndApplicationIdOrInit('608', '617')
      .subscribe(visualAssessment => {
        this.visualAssessment = visualAssessment;
      });

    if (!!this.brmsResponse) {
      this.possibleCreditInfoData = new TableData(this.possibleCreditColNameProps, [this.brmsResponse]);
    }
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'delay': {
        this.submitForm();
        break;
      }
      case 'cancel': {
        this.submitForm();
        break;
      }
      default: {
        break;
      }
    }
  }

  deletedCondition(item: SelectedConditionRes) {
    this.selectedConditionController.delete(item.id).subscribe(res => {
      this.selectedConditionList = this.selectedConditionList.filter(val => val.id !== item.id);
      this.selectedConditionData = new TableData(this.selectedConditionColNameProps, this.selectedConditionList);
    });
  }

  selectedItem(item: BRMSResponse) {
    const dialogRef = this.dialog.open(SelectedConditionModalComponent, {
      width: '1000px',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: item
    });

    dialogRef.afterClosed().subscribe((res: SelectedConditionReq) => {
      this.selectedConditionController
        .save({ ...res, createdBy: this.managerInfo.id, applicantId: 608 })
        .subscribe(resp => {
          this.selectedConditionList.push(resp);
          this.selectedConditionData = new TableData(this.selectedConditionColNameProps, this.selectedConditionList);
        });
    });
  }

  submitForm() {
    this.visualAssessmentChecklistController
      .saveAll({
        visualAssessmentChecklistDtoList: this.visualAssessment.map(item => new VisualAssessmentChecklistDtoModel(item))
      })
      .subscribe();
  }
}
