import * as Api from '@app/api';
import * as _ from 'lodash';

import { AccountControllerService } from '@app/api/account-controller.service';
import { Application } from '../../../_models/api-models/application';
import { BusinessInspectionControllerService } from '@app/api/massegment-api';
import { Client } from './../../../_models/api-models/client';
import { Injectable } from '@angular/core';
import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';
import { Observable } from 'rxjs';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
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
export class GetTabsDataClientsService {
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
    private relativesService: Api.RelativesControllerService
  ) {}

  getArrayOfFunctions(client: Client, tabList: TabsStatesList<TabsDataNames, RetailDirectoriesNames>) {
    const data = {
      dataNameArr: [],
      functionArr: []
    };
    Object.keys(tabList).forEach((tabName: string) => {
      if (tabList[tabName].isVisible) {
        data.dataNameArr = _.union(data.dataNameArr, tabList[tabName].tabDataNamesList);
      }
    });
    data.functionArr = this.getFunctions(data.dataNameArr, client);

    return data;
  }

  getFunctions<T>(tabsDataNameList: TabsDataNames[], client: Client): Observable<T>[] {
    const userId = client.managerId || null;

    const functions = {
      managerInfo: userId /* 0 */
        ? this.userControllerService.getUserById(userId).pipe(catchError(() => of('')))
        : of('')
    };

    if (!!tabsDataNameList.length) {
      return tabsDataNameList.map((dataName: string) => functions[dataName]);
    }
    return [];
  }
}
