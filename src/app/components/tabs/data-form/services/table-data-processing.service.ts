import { Actions, ofType } from '@ngrx/effects';
import {
  ApplicantIncomeGetDto,
  ApplicantIncomePostDto,
  ApplicantLoanGetDto,
  ApplicantLoanPostDto,
  Company
} from '@app/_models';
import { RetailDirectoriesActions, SetDirectoryNextPartActions } from '@app/store/actions/retail-directories.actions';

import { Applicant } from '@app/_models/api-models/applicant';
import { ApplicantContactPersonControllerService, ApplicantIncomeControllerService } from '@app/api';
import { ApplicantLoanControllerService } from '@app/api/applicant-loan-controller.service';
import { Application } from '@app/_models';
import { CompanyControllerService } from '@app/api/company-controller.service';
import { FullFormGroupKeys } from '../constants/data-form-config';
import { DecisionMakingGroupKeys } from '@app/components/tabs/decision-making/constants/decision-making.config';
import { IAppState } from '@app/store/state/app.state';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { FinalDecisionGroupKeys } from '@app/components/tabs/final-decision/constants/final-decision.config';
import { ApplicantContactPerson, ApplicantContactPersonDto } from '@app/_models/api-models/applicant-contact-person';
import {CreditInfoControllerService} from "@app/api/credit-info-controller.service";
import {VerificationGroupKeys} from "@app/components/tabs/verification/constants/verification-constants";

@Injectable()
export class TableDataProcessingService {
  constructor(
    private _store: Store<IAppState>,
    private updates$: Actions,
    private companyService: CompanyControllerService,
    private applicantIncomeService: ApplicantIncomeControllerService,
    private applicantLoanService: ApplicantLoanControllerService,
    private applicantContactPersonControllerService: ApplicantContactPersonControllerService,
    private creditInfoService: CreditInfoControllerService
  ) {}

  public nextPartEvent(page: number): Observable<any> {
    this._store.dispatch(
      SetDirectoryNextPartActions({
        propertyName: RetailDirectoriesNames.companies,
        sortAndPage: { page, size: 20 }
      })
    );

    return this.updates$.pipe(ofType(RetailDirectoriesActions.SetDirectoryNextPartSuccess));
  }

  public searchPartEvent(value: string): Observable<Company[]> {
    return this.companyService.getByPage({ value }).pipe(pluck('content'));
  }

  public saveRow<T>(applicationData: Application, rowValue: T, groupName: string): Observable<T> {
    const obj: { [key: string]: () => any } = {
      [FullFormGroupKeys.IncomeInfo]: () => this.createIncomeInfo(applicationData, rowValue),
      [FullFormGroupKeys.CreditDetails]: () => this.createLoanInfo(applicationData, rowValue, groupName),
      [FullFormGroupKeys.Guarantee]: () => this.createLoanInfo(applicationData, rowValue, groupName),
      [FinalDecisionGroupKeys.ContactPersons]: () => this.createContactPerson(applicationData, rowValue),
      [DecisionMakingGroupKeys.ApplicantIncome]: () => this.createIncomeInfo(applicationData, rowValue),
      [DecisionMakingGroupKeys.ApplicantLoan]: () => this.createLoanInfo(applicationData, rowValue, groupName),
      [DecisionMakingGroupKeys.ApplicantGuarantorLoan]: () => this.createLoanInfo(applicationData, rowValue, groupName),
    };

    return obj[groupName]();
  }

  public editedRow<T>(rowValue: any, groupName: string): Observable<T> {
    return this.getService(groupName).update(rowValue);
  }

  public removeRow<T>(rowValue: any, groupName: string): Observable<T> {
    return this.getService(groupName).delete(rowValue.id);
  }

  public updateIncomeInfo(applicationData: Application, stageId: string): Observable<ApplicantIncomeGetDto[]> {
    return this.applicantIncomeService.getByApplicantIdAndApplicationId(
      applicationData.applicant.id.toString(),
      applicationData.id.toString(),
      stageId
    );
  }

  public updateContactPersonInfo(applicationData: Application): Observable<ApplicantContactPerson[]> {
    return this.applicantContactPersonControllerService.getByApplicantIdAndApplicationId(
      applicationData.applicant.id.toString(),
      applicationData.id.toString()
    );
  }

  public updateCreditDetailsInfo(applicationData: Application, stageId: string): Observable<ApplicantLoanGetDto[]> {
    return this.applicantLoanService.getByApplicantIdAndApplicationId(
      applicationData.applicant.id.toString(),
      applicationData.id.toString(),
      stageId
    );
  }

  public getJobExpDefaultValueByApplicantAge(applicant: Applicant) {
    const defaultValue = 48;
    const minAgeValue = 22;
    const applicantAge = new Date().getFullYear() - new Date(applicant.birthDate).getFullYear();

    return applicantAge < minAgeValue ? this.getMonths(applicant.birthDate) : defaultValue;
  }

  private getMonths(birthDate: string) {
    const startDate = new Date(birthDate);
    const endDate = new Date();
    const age18 = 18;

    return Math.max(
      (endDate.getFullYear() - startDate.getFullYear() - age18) * 12 + endDate.getMonth() - startDate.getMonth(),
      0
    );
  }

  private getService(groupName: string) {
    const obj: { [key: string]: () => any } = {
      [FullFormGroupKeys.IncomeInfo]: () => this.applicantIncomeService,
      [FullFormGroupKeys.CreditDetails]: () => this.applicantLoanService,
      [FullFormGroupKeys.Guarantee]: () => this.applicantLoanService,
      [DecisionMakingGroupKeys.ApplicantIncome]: () => this.applicantIncomeService,
      [DecisionMakingGroupKeys.ApplicantLoan]: () => this.applicantLoanService,
      [DecisionMakingGroupKeys.ApplicantGuarantorLoan]: () => this.applicantLoanService,
      [FinalDecisionGroupKeys.ContactPersons]: () => this.applicantContactPersonControllerService,
      [VerificationGroupKeys.VerifiedCreditInfo]: () => this.creditInfoService
    };

    return obj[groupName]();
  }

  private createIncomeInfo(applicationData: Application, rowValue: Partial<ApplicantIncomePostDto>) {
    const incomeInfoGet = {
      ...rowValue,
      applicantId: applicationData.applicant.id,
      applicationId: applicationData.id,
      stageId: applicationData.stage.id
    } as ApplicantIncomePostDto;

    return this.applicantIncomeService.create(incomeInfoGet);
  }

  private createLoanInfo(applicationData: Application, rowValue: Partial<ApplicantLoanPostDto>, groupName: string) {
    const loanInfo = {
      ...rowValue,
      applicantId: applicationData.applicant.id,
      applicationId: applicationData.id,
      stageId: applicationData.stage.id,
      isBorrower: groupName === FullFormGroupKeys.CreditDetails || groupName === DecisionMakingGroupKeys.ApplicantLoan
    } as ApplicantLoanPostDto;

    return this.applicantLoanService.create(loanInfo);
  }

  private createContactPerson(applicationData: Application, rowValue: Partial<ApplicantContactPerson>) {
    const contactPerson: Partial<ApplicantContactPersonDto> = {
      ...rowValue,
      applicantId: applicationData.applicant.id,
      applicationId: applicationData.id
    };

    return this.applicantContactPersonControllerService.create(contactPerson);
  }
}
