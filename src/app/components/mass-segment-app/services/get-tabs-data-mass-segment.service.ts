import * as Api from '@app/api';
import * as _ from 'lodash';

import { AccountControllerService } from '@app/api/account-controller.service';
import { Application } from '../../../_models/api-models/application';
import { BusinessInspectionControllerService } from '@app/api/massegment-api';
import { Injectable } from '@angular/core';
import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';
import { Observable } from 'rxjs';
import { TabsDataNames } from '@app/components/constants/tabs-status-mass-segment';
import { TabsStatesList } from '@app/components/constants/tab-status-models';
import { UserControllerService } from '@app/api/user-controller.service';
import { VerificationControllerService } from '@app/api/verification-controller.service';
import { VisualAssessmentChecklistController } from '@app/api/visual-assessment-checklist-controller.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class GetTabsDataMassSegmentService {
  constructor(
    private verificationControllerService: VerificationControllerService,
    private accountService: Api.AccountIssueControllerService,
    private visualAssessmentChecklistController: VisualAssessmentChecklistController,
    private accountControllerService: AccountControllerService,
    private applicantIncomeTypeService: Api.ApplicantIncomeTypeControllerService,
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
    private integrationService: Api.IntegrationInterfaceControllerService,
    private applicationControllerService: Api.ApplicationControllerService,
    private relativesService: Api.RelativesControllerService,

    private businessInspectionService: BusinessInspectionControllerService
  ) {}

  getArrayOfFunctions(application: Application, tabList: TabsStatesList<TabsDataNames, MassSegmentDirectoriesNames>) {
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

      [TabsDataNames.IntegrationInterface]: this.integrationService /* 1 */
        .getById(application.applicant.integrationInterfaceId.toString())
        .pipe(catchError(() => of(''))),

      [TabsDataNames.PreApprovedDto]: this.applicationControllerService /* 2 */
        .getPreApprovedCreditInfo(application.id)
        .pipe(catchError(() => of(''))),

      // relatives: this.relativesService /* 3 */
      //   .getRelativesByApplicantId(application.applicant.id)
      //   .pipe(catchError(() => of(''))),

      [TabsDataNames.VerifierInfo]: application.verifier /* 4 */
        ? this.userControllerService.getUserById(application.verifier.id).pipe(catchError(() => of('')))
        : of(''),

      // decisionMaker: application.decisionMaker /* 5 */
      //   ? this.userControllerService.getUserById(application.decisionMaker.id).pipe(catchError(() => of('')))
      //   : of(''),

      [TabsDataNames.VerificationData]: this.verificationControllerService
        .getVerification(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 7 */,

      [TabsDataNames.VisualAssessment]: this.visualAssessmentChecklistController
        .getAllByApplicantIdAndApplicationIdOrInit(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 8 */,

      // accountCardsInfo: this.accountControllerService
      //   .getOkCards(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 9 */,

      // accountsInfo: this.accountControllerService
      //   .getOkAccounts(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 10 */,

      // accountIssue: this.accountService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 11 */,

      // applicantIncomeInfo: this.applicantIncomeTypeService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 12 */,

      // applicantOperationInfo: this.operationTypeService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 13 */,

      // applicantOperationFreqInfo: this.operationFreqTypeService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 14 */,

      // applicantIpdl: this.applicantIpdlService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 15 */,

      // applicantIpdlRelativesInfo: this.applicantIpdlRelativeService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 16 */,

      // applicantIpdlOperationsInfo: this.applicantIpdlOperationService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 17 */,

      // applicantFatcaInfo: this.applicantFatcaService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 18 */,

      // applicantFatcaCountryInfo: this.applicantFatcaCountryService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 19 */,

      // applicantTaxCountryInfo: this.applicantTaxCountryService
      //   .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
      //   .pipe(catchError(() => of(''))) /* 20 */,

      [TabsDataNames.ApplicantPhotoInfo]: this.applicantPhotoService
        .getByApplicantIdAndApplicationId(application.applicant.id.toString(), application.id.toString())
        .pipe(catchError(() => of(''))) /* 21*/,

      [TabsDataNames.BusinessInspection]: this.businessInspectionService
        .getByApplicantAndApplication(application.applicant.id, application.id)
        .pipe(catchError(() => of(''))) /* 22 */,

      [TabsDataNames.ClientManagerInfo]: application.clientManager
        ? this.userControllerService.getUserById(application.clientManager.id).pipe(catchError(() => of('')))
        : of('') /* 23 */
    };

    if (!!tabsDataNameList.length) {
      return tabsDataNameList.map((dataName: string) => functions[dataName]);
    }
    return [];
  }
}
