import { Component, OnInit, Inject } from '@angular/core';
import { BRMS2ResponseDto, BRMS3ResponseDto } from '@app/_models/api-models/brms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BrmsDecisionFrontControllerService } from '@app/api';
import { ScoringAttribute, ScoringFactor, ScoringResponse, TableData, TableDataHeader } from '@app/_models';
import {
  SCORING_FACTOR_HEADERS,
  SCORING_ATTRIBUTE_HEADERS
} from '@app/components/tabs/brms-decision/constants/brms-decision.constants';

@Component({
  selector: 'app-brms-decision-modal',
  templateUrl: './brms-decision-modal.component.html',
  styleUrls: ['./brms-decision-modal.component.scss']
})
export class BrmsDecisionModalComponent implements OnInit {
  itemLimit: number = 20;
  totalCount: number = 0;
  brmsDecisionData: BRMS2ResponseDto | BRMS3ResponseDto;
  brmsForm: FormGroup;
  score: number;
  probabilityOfDefault: number;
  scoringFactors: ScoringFactor[];
  scoringAttributes: ScoringAttribute[];

  scoringFactorsColNameProps: TableDataHeader[] = SCORING_FACTOR_HEADERS;
  scoringAttributesColNameProps: TableDataHeader[] = SCORING_ATTRIBUTE_HEADERS;

  scoringFactorsColmTableData: TableData<ScoringFactor> = new TableData(this.scoringFactorsColNameProps, []);
  scoringAttributesColmTableData: TableData<ScoringAttribute> = new TableData(this.scoringAttributesColNameProps, []);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BRMS2ResponseDto | BRMS3ResponseDto,
    public fb: FormBuilder,
    private brmsDecisionService: BrmsDecisionFrontControllerService
  ) {
    if (!!data) {
      this.brmsDecisionData = data;
    }
  }

  ngOnInit() {
    this.brmsFormCreate();
    this.brmsForm.disable();

    if (this.brmsDecisionData.brms === 'brms2' && !!this.brmsDecisionData.id) {
      this.brmsDecisionService
        .getByBrms2ResponseId({ brms2ResponseId: this.brmsDecisionData.id })
        .subscribe((result: ScoringResponse[]) => {
          if (result[0]) {
            this.score = result[0].score;
            this.probabilityOfDefault = result[0].probabilityOfDefault;
            this.brmsForm.get('score').setValue(this.score);
            this.brmsForm.get('probabilityOfDefault').setValue(this.probabilityOfDefault);

            this.scoringFactors = result[0].scoringFactors;
            this.scoringFactorsColmTableData = new TableData(
              this.scoringFactorsColNameProps,
              !!this.scoringFactors ? this.scoringFactors : []
            );

            this.scoringAttributes = result[0].scoringAttributes;
            this.scoringAttributesColmTableData = new TableData(
              this.scoringAttributesColNameProps,
              !!this.scoringAttributes ? this.scoringAttributes : []
            );
          }
        });
    }
    if (this.brmsDecisionData.brms === 'brms3' && !!this.brmsDecisionData.id) {
      this.brmsDecisionService
        .getByBrms3ResponseId({ brms3ResponseId: this.brmsDecisionData.id })
        .subscribe((result: ScoringResponse[]) => {
          if (result[0]) {
            this.score = result[0].score;
            this.probabilityOfDefault = result[0].probabilityOfDefault;
            this.brmsForm.get('score').setValue(this.score);
            this.brmsForm.get('probabilityOfDefault').setValue(this.probabilityOfDefault);

            this.scoringFactors = result[0].scoringFactors;
            this.scoringFactorsColmTableData = new TableData(
              this.scoringFactorsColNameProps,
              !!this.scoringFactors ? this.scoringFactors : []
            );

            this.scoringAttributes = result[0].scoringAttributes;
            this.scoringAttributesColmTableData = new TableData(
              this.scoringAttributesColNameProps,
              !!this.scoringAttributes ? this.scoringAttributes : []
            );
          }
        });
    }
  }

  private brmsFormCreate() {
    this.brmsForm = this.fb.group({
      score: '',
      probabilityOfDefault: ''
    });
  }
}
