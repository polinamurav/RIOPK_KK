import { Application, RoleAuthority, TableData, TableDataHeader } from '@app/_models';
import { BRMS3ResponseRules, BRMSDto, BRMSResponseRulesDto } from '@app/_models/api-models/brms';
import { Brms2MatrixFrontControllerService, BrmsDecisionFrontControllerService } from '@app/api';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  BRMS_RESULT_HEADERS,
  BRMS_RESULT_HEADERS_DECISION_MAKER
} from '@app/components/tabs/brms-decision/constants/brms-decision.constants';
import { BrmsDecisionModalComponent } from '@app/shared/components/modals/brms-decision-modal/brms-decision-modal.component';
import { CredentialsService } from '@app/services/authentication';
import { CustomDatePipe } from '@app/pipes/pipes';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MatrixLimitDetailModalComponent } from '@app/components/modals/matrix-limit-detail-modal/matrix-limit-detail-modal.component';

@Component({
  selector: 'ng-brms-decision',
  templateUrl: './brms-decision.component.html',
  styleUrls: ['./brms-decision.component.scss'],
  providers: [CustomDatePipe]
})
export class BrmsDecisionComponent implements OnInit, OnDestroy {
  itemLimit: number = 20;
  totalCount: number = 0;
  isLoading: boolean = false;
  decisionForm: FormGroup;
  destroy$: Subject<void> = new Subject<void>();
  decisions: BRMSDto[] = [];
  // combinedSource$: Subscription;
  // isRefAcbLiabilityExists: boolean = false;
  // choosedRefinanceList: AcbLiabilityDto[] = [];
  // isChoosedProductError: boolean = false;
  // isProductAccepted: boolean = false;
  // isPreapproveBlockDisabled: boolean = false;
  // isPossibleBlockDisabled: boolean = false;
  // isCalculateButtonDisabled: boolean = true;
  // isAcceptButtonDisabled: boolean = true;
  // isChangesAccepted: boolean = false;

  isDecisionMaker: boolean;
  isVerifier: boolean;
  isRiskManager: boolean;
  isRiskManagerBoss: boolean;
  isAdmin: boolean;
  isBusinessOwner: boolean;
  showScoringParams: boolean;

  // possibleCreditColNameProps: TableDataHeader[] = POSSIBLE_CREDIT_HEADERS;

  // TODO check models and path:
  // productColNameProps: TableDataHeader[] = PRODUCT_HEADERS;

  // TODO check models and path:
  // creditInfoColNameProps: TableDataHeader[] = CREDIT_INFO_HEADERS;

  // refinanceColmTableProps: TableDataHeader[] = REFINANCE_HEADERS;

  brmsResultColNameProps: TableDataHeader[] = BRMS_RESULT_HEADERS;
  brmsResultForDecisionMakerColNameProps: TableDataHeader[] = BRMS_RESULT_HEADERS_DECISION_MAKER;

  // preapprove2CreditColmInfoData: TableData<BRMS2MatrixDto> = new TableData(this.possibleCreditColNameProps, []);
  // possible2CreditColmInfoData: TableData<BRMS2MatrixDto> = new TableData(this.possibleCreditColNameProps, []);

  // refinanceColmTableData: TableData<AcbLiabilityDto> = new TableData(this.refinanceColmTableProps, []);

  // calcProductColmTableData: TableData<BRMS2MatrixDto> = new TableData(this.productColNameProps, []);
  // choosedProductColmTableData: TableData<BRMS2MatrixDto | CreditInfo> = new TableData(this.productColNameProps, []);

  brms5resultColmTableData: TableData<BRMSResponseRulesDto> = new TableData(this.brmsResultColNameProps, []);
  brms4resultColmTableData: TableData<BRMSResponseRulesDto> = new TableData(this.brmsResultColNameProps, []);
  brms3resultColmTableData: TableData<BRMSResponseRulesDto> = new TableData(this.brmsResultColNameProps, []);
  brms2resultColmTableData: TableData<BRMSResponseRulesDto> = new TableData(this.brmsResultColNameProps, []);
  brms1resultColmTableData: TableData<BRMSResponseRulesDto> = new TableData(this.brmsResultColNameProps, []);

  // choosedPreapprovedCreditMatrix: BRMS2MatrixDto | null;
  // choosedPossibleCreditMatrix: BRMS2MatrixDto | null;

  // finalProduct: BRMS2MatrixDto[] = [];

  @Input() appDto: Application;
  @Input() readonlyForm: boolean = false;
  @Input() language: string;

  // private BRMS_RULE_TYPE = {
  //   warning: 'WARNING',
  //   refer: 'REFER'
  // };

  constructor(
    private dialog: MatDialog,
    private datePipe: CustomDatePipe,
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private brmsDecisionService: BrmsDecisionFrontControllerService,
    private brms2MatrixService: Brms2MatrixFrontControllerService
  ) {}

  ngOnInit(): void {
    this.isRiskManager = this.credentialsService.isRiskManager;
    this.isDecisionMaker = true; // this.credentialsService.isDecisionMaker;
    this.isRiskManagerBoss = this.credentialsService.isRiskManagerBoss;
    this.isAdmin = this.credentialsService.isAdmin;
    this.isBusinessOwner = this.credentialsService.isBusinessOwner;

    this.showScoringParams =
      this.credentialsService.isRiskManager ||
      this.credentialsService.isRiskManagerBoss ||
      this.credentialsService.isAdminIT;

    this.brmsDecisionService.getAll().subscribe((decisions: BRMSDto[]) => {
      this.decisions = decisions;
    });

    this.brms1resultColmTableData = new TableData(
      this.isDecisionMaker ? this.brmsResultForDecisionMakerColNameProps : this.brmsResultColNameProps,
      !!this.appDto.brms1Response && !!this.appDto.brms1Response.brmsResponseReasons
        ? this.getFilteredBrmsRules(this.appDto.brms1Response.brmsResponseReasons)
        : []
    );

    this.brms2resultColmTableData = new TableData(
      this.isDecisionMaker ? this.brmsResultForDecisionMakerColNameProps : this.brmsResultColNameProps,
      !!this.appDto.brms2Response && !!this.appDto.brms2Response.brmsResponseReasons
        ? this.getFilteredBrmsRules(this.appDto.brms2Response.brmsResponseReasons)
        : []
    );

    this.brms3resultColmTableData = new TableData(
      this.isDecisionMaker ? this.brmsResultForDecisionMakerColNameProps : this.brmsResultColNameProps,
      !!this.appDto.brms3Response && !!this.appDto.brms3Response.brmsResponseReasons
        ? this.getFilteredBrmsRules(this.appDto.brms3Response.brmsResponseReasons)
        : []
    );

    this.brms4resultColmTableData = new TableData(
      this.isDecisionMaker ? this.brmsResultForDecisionMakerColNameProps : this.brmsResultColNameProps,
      !!this.appDto.brms4Response && !!this.appDto.brms4Response.brmsResponseReasons
        ? this.getFilteredBrmsRules(this.appDto.brms4Response.brmsResponseReasons)
        : []
    );

    this.brms5resultColmTableData = new TableData(
      this.isDecisionMaker ? this.brmsResultForDecisionMakerColNameProps : this.brmsResultColNameProps,
      !!this.appDto.brms5Response && !!this.appDto.brms5Response.brmsResponseReasons
        ? this.getFilteredBrmsRules(this.appDto.brms5Response.brmsResponseReasons)
        : []
    );

    this.createForm();
    this.checkReadonly();
  }

  getFilteredBrmsRules(brmsRulesArr: BRMSResponseRulesDto[]): BRMSResponseRulesDto[] {
    return brmsRulesArr.filter((ruleItem: BRMS3ResponseRules) => this.filterResult(ruleItem));
  }

  filterResult(ruleItem: BRMS3ResponseRules): boolean {
    if (this.isAdmin || this.isRiskManagerBoss || this.isRiskManager || this.isBusinessOwner) {
      return true;
    }

    const isTargetRole =
      this.credentialsService.isCreditManager ||
      this.credentialsService.isCallCenter ||
      this.credentialsService.isSalesDep ||
      this.credentialsService.isVideoBank ||
      this.credentialsService.isDSA;

    // const typeCondition = ruleItem.brmsRule.brmsRuleType.id !== this.BRMS_RULE_TYPE.warning;
    // const roleCondition = isTargetRole ? ruleItem.brmsRule.isVisibleForManager : true;
    //
    // return typeCondition && roleCondition;

    // return isTargetRole ? ruleItem.brmsRule.isVisibleForManager : true;
    return isTargetRole ? ruleItem.brmsRule.isVisibleForManager : false;
  }

  showParamsBrms(event) {
    this.dialog.open(BrmsDecisionModalComponent, {
      width: '80vw',
      height: '82vh',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: {
        applicantId: this.appDto.applicant.id,
        brmsDecisionData: event === 'brms2' ? this.appDto.brms2Response : this.appDto.brms5Response
      }
    });
  }

  showMatrixLimitDetail(type: string) {
    this.dialog.open(MatrixLimitDetailModalComponent, {
      width: '50vw',
      height: '60vh',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: {
        applicationId: this.appDto.id,
        applicationData: this.appDto,
        brmsDecisionType: type.toUpperCase()
      }
    });
  }

  // submitForm() {
  //   if (!this.isProductAccepted) {
  //     this.decisionForm
  //       .get('brms2')
  //       .get('choosedProduct')
  //       .setErrors({ invalid: true });
  //     this.isChoosedProductError = true;
  //   } else {
  //     this.decisionForm
  //       .get('brms2')
  //       .get('choosedProduct')
  //       .setErrors(null);
  //     this.isChoosedProductError = false;
  //   }
  //
  //   if (this.decisionForm.invalid) {
  //     return;
  //   }
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkReadonly() {
    if (this.readonlyForm) {
      this.decisionForm.disable();
    }
  }

  private createForm() {
    this.decisionForm = this.formBuilder.group({
      brms5: this.formBuilder.group({
        brms5Decision: [
          !!this.appDto && !!this.appDto.brms5Response
            ? { value: this.appDto.brms5Response.brmsDecisionId, disabled: true }
            : '',
          [Validators.required]
        ],
        created:
          !!this.appDto && !!this.appDto.brms5Response && !!this.appDto.brms5Response.created
            ? [
                {
                  value: this.datePipe.transform(this.appDto.brms5Response.created, 'dd-MM-yyyy HH:mm:ss'),
                  disabled: true
                }
              ]
            : ['', [Validators.required]]
      }),
      brms3: this.formBuilder.group({
        brms23Decision: [
          !!this.appDto && !!this.appDto.brms23Decision ? { value: this.appDto.brms23Decision.id, disabled: true } : '',
          [Validators.required]
        ],
        brms3Response: [
          !!this.appDto && !!this.appDto.brms3Response
            ? { value: this.appDto.brms3Response.brmsDecisionId, disabled: true }
            : '',
          [Validators.required]
        ],
        created:
          !!this.appDto && !!this.appDto.brms3Response && !!this.appDto.brms3Response.created
            ? [
                {
                  value: this.datePipe.transform(this.appDto.brms3Response.created, 'dd-MM-yyyy HH:mm:ss'),
                  disabled: true
                }
              ]
            : ['', [Validators.required]]
      }),
      brms4: this.formBuilder.group({
        brms23Decision: [
          !!this.appDto && !!this.appDto.brms23Decision ? { value: this.appDto.brms23Decision.id, disabled: true } : '',
          [Validators.required]
        ],
        brms4Response: [
          !!this.appDto && !!this.appDto.brms4Response
            ? { value: this.appDto.brms4Response.brmsDecisionId, disabled: true }
            : '',
          [Validators.required]
        ],
        created:
          !!this.appDto && !!this.appDto.brms4Response && !!this.appDto.brms4Response.created
            ? [
                {
                  value: this.datePipe.transform(this.appDto.brms4Response.created, 'dd-MM-yyyy HH:mm:ss'),
                  disabled: true
                }
              ]
            : ['', [Validators.required]]
      }),
      brms2: this.formBuilder.group({
        brms12Decision: [
          !!this.appDto && !!this.appDto.brms12Decision ? { value: this.appDto.brms12Decision.id, disabled: true } : '',
          [Validators.required]
        ],
        brms2Response: [
          !!this.appDto && !!this.appDto.brms2Response
            ? { value: this.appDto.brms2Response.brmsDecisionId, disabled: true }
            : '',
          [Validators.required]
        ],
        created:
          !!this.appDto && !!this.appDto.brms2Response && !!this.appDto.brms2Response.created
            ? [
                {
                  value: this.datePipe.transform(this.appDto.brms2Response.created, 'dd-MM-yyyy HH:mm:ss'),
                  disabled: true
                }
              ]
            : ['', [Validators.required]]
        // preapproveCalcCreditSum: '',
        // preapproveCalcCreditTerm: '',
        // defaultFreshMoney: { value: '', disabled: true },
        // freshMoney: '',
        // possibleCalcCreditSum: '',
        // possibleCalcCreditTerm: '',
        // choosedProduct: ''
      }),

      brms1: this.formBuilder.group({
        brms1Response: [
          !!this.appDto && !!this.appDto.brms1Response
            ? { value: this.appDto.brms1Response.brmsDecisionId, disabled: true }
            : '',
          [Validators.required]
        ],
        created:
          !!this.appDto && !!this.appDto.brms1Response && !!this.appDto.brms1Response.created
            ? [
                {
                  value: this.datePipe.transform(this.appDto.brms1Response.created, 'dd-MM-yyyy HH:mm:ss'),
                  disabled: true
                }
              ]
            : ['', [Validators.required]]
      })
    });
  }

  // private transformMatrixIntoBRMS2MatrixType(matrix: BRMS2MatrixDto) {
  //   const assignObj = Object.assign({}, matrix);
  //   const refObj = this.transformFromLiabilityToLiabilityId(assignObj);
  //   this.deleteRefLiabilityKeys(assignObj);
  //
  //   return {
  //     ...assignObj,
  //     ...refObj,
  //     creditSum:
  //       !!matrix && !!matrix.brmsMatrixConditionType
  //         ? this.decisionForm.get('brms2').get('preapproveCalcCreditSum').value
  //         : '',
  //     creditTerm:
  //       !!matrix && !!matrix.brmsMatrixConditionType
  //         ? this.decisionForm.get('brms2').get('preapproveCalcCreditTerm').value
  //         : '',
  //     freshMoney: !!this.decisionForm.get('brms2').get('freshMoney').value
  //       ? this.decisionForm.get('brms2').get('freshMoney').value
  //       : matrix.freshMoney
  //   };
  // }

  // private setNotNullMatrixArr(matrix: BRMS2MatrixDto) {
  //   const calculatedMatrix = this.getTransformedMatrix(matrix);
  //   const calculatedArrNotNull = [];
  //
  //   for (const key of Object.keys(calculatedMatrix)) {
  //     if (!!calculatedMatrix[key]) {
  //       calculatedArrNotNull.push({ ...calculatedMatrix[key], refNumber: key });
  //     }
  //   }
  //   return calculatedArrNotNull;
  // }

  // private isNotNullMatrixExist(matrix: BRMS2MatrixDto) {
  //   const calculatedMatrix = this.getTransformedMatrix(matrix);
  //   let isExist = false;
  //
  //   for (const key of Object.keys(calculatedMatrix)) {
  //     if (!!calculatedMatrix[key]) {
  //       isExist = true;
  //     }
  //   }
  //   return !!isExist;
  // }

  // private getTransformedMatrix(matrix: BRMS2MatrixDto) {
  //   return {
  //     ref1AcbLiability: !!matrix && !!matrix.ref1AcbLiability ? matrix.ref1AcbLiability : null,
  //     ref2AcbLiability: !!matrix && !!matrix.ref2AcbLiability ? matrix.ref2AcbLiability : null,
  //     ref3AcbLiability: !!matrix && !!matrix.ref3AcbLiability ? matrix.ref3AcbLiability : null,
  //     ref4AcbLiability: !!matrix && !!matrix.ref4AcbLiability ? matrix.ref4AcbLiability : null,
  //     ref5AcbLiability: !!matrix && !!matrix.ref5AcbLiability ? matrix.ref5AcbLiability : null,
  //     ref6AcbLiability: !!matrix && !!matrix.ref6AcbLiability ? matrix.ref6AcbLiability : null,
  //     ref7AcbLiability: !!matrix && !!matrix.ref7AcbLiability ? matrix.ref7AcbLiability : null,
  //     ref8AcbLiability: !!matrix && !!matrix.ref8AcbLiability ? matrix.ref8AcbLiability : null,
  //     ref9AcbLiability: !!matrix && !!matrix.ref9AcbLiability ? matrix.ref9AcbLiability : null,
  //     ref10AcbLiability: !!matrix && !!matrix.ref10AcbLiability ? matrix.ref10AcbLiability : null
  //   };
  // }

  // private calcRefinanceList(arr: AcbLiabilityDto[]) {
  //   let assignObj = Object.assign({}, this.choosedPreapprovedCreditMatrix);
  //   this.deleteRefLiabilityKeys(assignObj);
  //
  //   assignObj = Object.assign(assignObj, this.getTransformedMatrix(assignObj));
  //
  //   arr.forEach((elem: AcbLiabilityDto) => {
  //     if (elem.refNumber && elem.selected) {
  //       assignObj[elem.refNumber] = elem;
  //     }
  //   });
  //
  //   const refObj = this.transformFromLiabilityToLiabilityId(assignObj);
  //   this.deleteRefLiabilityKeys(assignObj);
  //
  //   return {
  //     ...assignObj,
  //     ...refObj,
  //     creditSum: this.decisionForm.get('brms2').get('preapproveCalcCreditSum').value,
  //     creditTerm: this.decisionForm.get('brms2').get('preapproveCalcCreditTerm').value,
  //     freshMoney: this.decisionForm.get('brms2').get('freshMoney').value
  //   };
  // }

  // private deleteRefLiabilityKeys(obj: BRMS2MatrixDto) {
  //   delete obj.ref1AcbLiability;
  //   delete obj.ref2AcbLiability;
  //   delete obj.ref3AcbLiability;
  //   delete obj.ref4AcbLiability;
  //   delete obj.ref5AcbLiability;
  //   delete obj.ref6AcbLiability;
  //   delete obj.ref7AcbLiability;
  //   delete obj.ref8AcbLiability;
  //   delete obj.ref9AcbLiability;
  //   delete obj.ref10AcbLiability;
  // }

  // private transformFromLiabilityToLiabilityId(obj: BRMS2MatrixDto) {
  //   return {
  //     ref1AcbLiabilityId: !!obj && !!obj.ref1AcbLiability && !!obj.ref1AcbLiability.id ? obj.ref1AcbLiability.id : null,
  //     ref2AcbLiabilityId: !!obj && !!obj.ref2AcbLiability && !!obj.ref2AcbLiability.id ? obj.ref2AcbLiability.id : null,
  //     ref3AcbLiabilityId: !!obj && !!obj.ref3AcbLiability && !!obj.ref3AcbLiability.id ? obj.ref3AcbLiability.id : null,
  //     ref4AcbLiabilityId: !!obj && !!obj.ref4AcbLiability && !!obj.ref4AcbLiability.id ? obj.ref4AcbLiability.id : null,
  //     ref5AcbLiabilityId: !!obj && !!obj.ref5AcbLiability && !!obj.ref5AcbLiability.id ? obj.ref5AcbLiability.id : null,
  //     ref6AcbLiabilityId: !!obj && !!obj.ref6AcbLiability && !!obj.ref6AcbLiability.id ? obj.ref6AcbLiability.id : null,
  //     ref7AcbLiabilityId: !!obj && !!obj.ref7AcbLiability && !!obj.ref7AcbLiability.id ? obj.ref7AcbLiability.id : null,
  //     ref8AcbLiabilityId: !!obj && !!obj.ref8AcbLiability && !!obj.ref8AcbLiability.id ? obj.ref8AcbLiability.id : null,
  //     ref9AcbLiabilityId: !!obj && !!obj.ref9AcbLiability && !!obj.ref9AcbLiability.id ? obj.ref9AcbLiability.id : null,
  //     ref10AcbLiabilityId:
  //       !!obj && !!obj.ref10AcbLiability && !!obj.ref10AcbLiability.id ? obj.ref10AcbLiability.id : null
  //   };
  // }
}
