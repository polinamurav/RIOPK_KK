import { Component, OnInit, Inject } from '@angular/core';
import { BRMS2ResponseDto, BRMS3ResponseDto, BRMS5ResponseDto } from '@app/_models/api-models/brms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BrmsDecisionFrontControllerService } from '@app/api';
import {
  BrmsScoreCharacteristicDto,
  BrmsScoringDto,
  ScoringAttribute,
  ScoringFactor,
  ScoringResponse,
  TableData,
  TableDataHeader
} from '@app/_models';
import {
  SCORING_FACTOR_HEADERS,
  SCORING_ATTRIBUTE_HEADERS
} from '@app/components/tabs/brms-decision/constants/brms-decision.constants';
import { TranslateService } from '@ngx-translate/core';
import { ELanguageType } from '@app/constants/language';
import { MatTabChangeEvent } from '@angular/material/tabs';

const TABS = [];

export interface BrmsDecisionModalConfig {
  brmsDecisionData: BRMS2ResponseDto | BRMS5ResponseDto | any;
  applicantId: number;
}

@Component({
  selector: 'app-brms-decision-modal',
  templateUrl: './brms-decision-modal.component.html',
  styleUrls: ['./brms-decision-modal.component.scss']
})
export class BrmsDecisionModalComponent implements OnInit {
  itemLimit: number = 10;
  totalCount: number = 0;
  brmsDecisionData: BRMS2ResponseDto | BRMS5ResponseDto;
  brmsForm: FormGroup;
  score: number;
  probabilityOfDefault: number;
  riskGrade: string;
  scoringFactors: BrmsScoreCharacteristicDto[];
  scoringAttributes: ScoringAttribute[];

  tabs = TABS;

  scoringFactorsColNameProps: TableDataHeader[] = SCORING_FACTOR_HEADERS;
  scoringAttributesColNameProps: TableDataHeader[] = SCORING_ATTRIBUTE_HEADERS;

  scoringFactorsColmTableData: TableData<BrmsScoreCharacteristicDto> = new TableData(
    this.scoringFactorsColNameProps,
    []
  );
  scoringAttributesColmTableData: TableData<ScoringAttribute> = new TableData(this.scoringAttributesColNameProps, []);

  private scoringResponse: BrmsScoringDto[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BrmsDecisionModalConfig,
    public fb: FormBuilder,
    private translateService: TranslateService,
    private brmsDecisionService: BrmsDecisionFrontControllerService
  ) {
    if (!!data) {
      this.brmsDecisionData = data.brmsDecisionData;
    }
  }

  ngOnInit() {
    this.brmsFormCreate();
    this.brmsForm.disable();
    this.fetchScoringInfo();
  }

  onTabSelect(e: MatTabChangeEvent) {
    this.getCurrentResult(e.index);
  }

  private fetchScoringInfo = (): void => {
    this.brmsDecisionService
      .getCharacteristicById(this.data.applicantId, this.brmsDecisionData.brmsTypeId)
      .subscribe(this.setResults);
  };

  private setResults = (result: BrmsScoringDto[]): void => {
    this.scoringResponse = result;
    this.fetchTabs();
    this.getCurrentResult(0);
  };

  private fetchTabs = (): void => {
    this.tabs = this.scoringResponse.map((el, i) => ({ name: el[ELanguageType[this.translateService.currentLang]] }));
  };

  private getCurrentResult = (index: number): void => {
    const result = this.scoringResponse[index];
    if (result) {
      this.score = result.score;
      this.probabilityOfDefault = result.pd;
      this.riskGrade = result.riskGrade;
      this.brmsForm.get('score').setValue(this.score);
      this.brmsForm.get('probabilityOfDefault').setValue(this.probabilityOfDefault);
      this.brmsForm.get('riskGrade').setValue(this.riskGrade);

      this.scoringFactors = result.scoreCharacteristics;
      this.setIndexToScoring();
      this.scoringFactorsColmTableData = new TableData(
        this.scoringFactorsColNameProps,
        !!this.scoringFactors ? this.scoringFactors : []
      );

      // this.scoringAttributes = result.scoringAttributes;
      // this.scoringAttributesColmTableData = new TableData(
      //   this.scoringAttributesColNameProps,
      //   !!this.scoringAttributes ? this.scoringAttributes : []
      // );
    }
  };

  private setIndexToScoring = (): void => {
    this.scoringFactors.forEach((el, index) => {
      el.index = index + 1;
    });
  };

  private brmsFormCreate() {
    this.brmsForm = this.fb.group({
      score: '',
      probabilityOfDefault: '',
      riskGrade: ''
    });
  }
}
