import * as Api from '@app/api';
import * as _ from 'lodash';

import { AccountControllerService } from '@app/api/account-controller.service';
import { Application } from '@app/_models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { TabsDataNames } from '../../constants/tabs-status';
import { TabsStatesList } from '@app/components/constants/tab-status-models';
import { UserControllerService } from '@app/api/user-controller.service';
import { VerificationControllerService } from '@app/api/verification-controller.service';
import { VisualAssessmentChecklistController } from '@app/api/visual-assessment-checklist-controller.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { BorrowerControllerService } from '@app/api/borrower-controller.service';

@Injectable({
  providedIn: 'root'
})
export class GetTabsDataService {
  constructor(
    private verificationControllerService: VerificationControllerService,
    private accountService: Api.AccountIssueControllerService,
    private visualAssessmentChecklistController: VisualAssessmentChecklistController,
    private accountControllerService: AccountControllerService,
    private borrowerControllerService: BorrowerControllerService,
    private applicantIncomeService: Api.ApplicantIncomeControllerService,
    private operationTypeService: Api.ApplicantOperationTypeControllerService,
    private operationFreqTypeService: Api.ApplicantOperationFreqTypeControllerService,
    private applicantIpdlService: Api.ApplicantIpdlControllerService,
    private applicantIpdlRelativeService: Api.ApplicantIpdlRelativeControllerService,
    private applicantIpdlOperationService: Api.ApplicantIpdlOperationControllerService,
    private applicantFatcaService: Api.ApplicantFatcaControllerService,
    private applicantFatcaCountryService: Api.ApplicantFatcaCountryControllerService,
    private applicantTaxCountryService: Api.ApplicantTaxCountryControllerService,
    private applicantPhotoService: Api.ApplicantPhotoControllerService,
    private userControllerService: UserControllerService,
    private integrationAcraControllerService: Api.IntegrationAcraControllerService,
    private applicationControllerService: Api.ApplicationControllerService,
    private integrationNorqControllerService: Api.IntegrationNorqControllerService,
    private relativesService: Api.RelativesControllerService,
    private goodsControllerService: Api.GoodsControllerService,
    private applicantLoanService: Api.ApplicantLoanControllerService,
    private innerInformationControllerService: Api.InnerInformationControllerService,
    private applicantContactPersonService: Api.ApplicantContactPersonControllerService,
    private insuranceProductControllerService: Api.InsuranceProductControllerService,
    private absSearchClientControllerService: Api.AbsSearchClientControllerService
  ) {}

  getArrayOfFunctions(application: Application, tabList: TabsStatesList<TabsDataNames, RetailDirectoriesNames>) {
    const data = {
      dataNameArr: [],
      functionArr: []
    };
    Object.keys(tabList).forEach((tabName: string) => {
      if (tabList[tabName].isVisible) {
        data.dataNameArr = _.union(data.dataNameArr, tabList[tabName].tabDataNamesList);
      }
    });
    data.functionArr = this.getFunctions(data.dataNameArr, application);

    return data;
  }

  getFunctions<T>(tabsDataNameList: TabsDataNames[], application: Application): Observable<T>[] {
    const creditManagerId = application.creditManager ? application.creditManager.id : null;
    const createdBy = application.createdBy ? application.createdBy.id : null;
    const userId = createdBy || creditManagerId;

    const functions = {
      [TabsDataNames.ManagerInfo]: userId /* 0 */
        ? this.userControllerService.getUserById(userId).pipe(catchError(() => of('')))
        : of(''),

      [TabsDataNames.AcraCreditInfo]: this.integrationAcraControllerService
        .getById(application.id)
        .pipe(catchError(() => of(''))),

      [TabsDataNames.EmploymentInfo]: this.integrationNorqControllerService
        .getById(application.id)
        .pipe(catchError(() => of(''))),

      [TabsDataNames.SummaryIndividualsInfo]: this.innerInformationControllerService
        .getInnerInfo(application.id, application.applicant.socCard ? application.applicant.socCard.id : null)
        .pipe(catchError(() => of(''))),

      [TabsDataNames.ApplicationsAppTheOPZTab]: this.innerInformationControllerService
        .getInnerInfo(
          application.id,
          application.applicant.socCard ? application.applicant.socCard.id : null,
          new Date()
        )
        .pipe(catchError(() => of(''))),

      // [TabsDataNames.IntegrationInterface]: this.integrationService /* 1 */
      //   .getById(application.applicant.integrationInterfaceId.toString())
      //   .pipe(catchError(() => of(''))),

      [TabsDataNames.Relatives]: this.relativesService /* 3 */
        .getRelativesByApplicantId(application.applicant.id)
        .pipe(catchError(() => of(''))),

      [TabsDataNames.VerifierInfo]: application.verifier /* 4 */
        ? this.userControllerService.getUserById(application.verifier.id).pipe(catchError(() => of('')))
        : of(''),

      [TabsDataNames.DecisionMaker]: application.decisionMaker /* 5 */
        ? this.userControllerService.getUserById(application.decisionMaker.id).pipe(catchError(() => of([])))
        : of(''),

      [TabsDataNames.VerificationData]: this.verificationControllerService
        .getVerification(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 7 */,

      [TabsDataNames.VisualAssessment]: this.visualAssessmentChecklistController
        .getAllByApplicantIdAndApplicationIdOrInit(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 8 */,

      // [TabsDataNames.AccountCardsInfo]: this.accountControllerService
      //  .getOkCards(application.applicant.id.toString(), application.id.toString())
      //  .pipe(catchError(() => of(''))) /* 9 */,

      [TabsDataNames.BorrowerInfo]: this.borrowerControllerService
        .getOpz(application.id.toString())
        .pipe(catchError(() => of(''))) /* 10 */,

      [TabsDataNames.EmployersApplications]: this.absSearchClientControllerService
        .getEmployerApplications(application.id.toString())
        .pipe(catchError(() => of(''))) /* 100 */,

      [TabsDataNames.EmployersBlackList]: this.absSearchClientControllerService
        .getEmployerBlacklist(application.id.toString())
        .pipe(catchError(() => of(''))) /* 101 */,

      [TabsDataNames.AccountIssue]: this.accountService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 11 */,

      // [TabsDataNames.ApplicantIncomeInfoFF]: this.applicantIncomeService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString(), 'FULL_FORM')
      //   .pipe(catchError(() => of(''))) /* 12 */,

      [TabsDataNames.ApplicantOperationInfo]: this.operationTypeService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 13 */,

      [TabsDataNames.ApplicantOperationFreqInfo]: this.operationFreqTypeService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 14 */,

      [TabsDataNames.ApplicantIpdl]: this.applicantIpdlService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 15 */,

      [TabsDataNames.ApplicantIpdlRelativesInfo]: this.applicantIpdlRelativeService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 16 */,

      [TabsDataNames.ApplicantIpdlOperationsInfo]: this.applicantIpdlOperationService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 17 */,

      [TabsDataNames.ApplicantFatcaInfo]: this.applicantFatcaService
        .getByAdditionalFatca(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 18 */,

      [TabsDataNames.ApplicantFatcaCountryInfo]: this.applicantFatcaCountryService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 19 */,

      [TabsDataNames.ApplicantTaxCountryInfo]: this.applicantTaxCountryService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 20 */,

      [TabsDataNames.ApplicantPhotoInfo]: this.applicantPhotoService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 21*/,

      [TabsDataNames.PartnerGoodsList]: this.goodsControllerService
        .getByApplicationAndApplicant(application.id, application.applicant.id)
        .pipe(catchError(() => of(''))) /* 22*/,

      [TabsDataNames.ApplicantLoanObligationsInfo]: this.applicantLoanService
        .getLoanObligationsOfApplicant(application.applicant.applicationId, { applicationId: application.applicant.id })
        .pipe(catchError(() => of(''))),

      // [TabsDataNames.ApplicantLoanInfoFF]: this.applicantLoanService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString(), 'FULL_FORM')
      //   .pipe(catchError(() => of(''))) /* 23*/,

      [TabsDataNames.ApplicantIncomeInfoDM]: this.applicantIncomeService
        .getByApplicantIdAndApplicationId(application.id.toString())
        .pipe(catchError(() => of(''))) /* 24*/,

      //  [TabsDataNames.ApplicantLoanInfoDM]: of(''), // for desigionMacing
      // this.applicantLoanService
      //     .getByApplicantIdAndApplicationId(
      //       application.applicant.id.toString(),
      //       application.id.toString(),
      //       'DECISION_MAKING'
      //     )
      //     .pipe(catchError(() => of(''))) /* 25*/,

      [TabsDataNames.ApplicantContactPersonInfo]: this.applicantContactPersonService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 26*/
    };

    if (!!tabsDataNameList.length) {
      const functionsList = tabsDataNameList.map((dataName: string) => functions[dataName]);
      return functionsList.filter(el => !!el);
    }
    return [];
  }
}
