import * as AdministrationActions from '@app/store/actions/administration.actions';

import {
  AbsCommissionConfigControllerService,
  AuditLogControllerService,
  DirChecklistControllerService,
  DirSalesChannelControllerService,
  InsuranceCompanyControllerService,
  InsuranceConditionControllerService,
  ProductCategoryControllerService,
  ProductDiscountConditionControllerService,
  StopListAbsControllerService
} from '@app/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { BrmsRuleControllerService } from '@app/api/brms-rule-front-controller.service';
import { CompanyControllerService } from '@app/api/company-controller.service';
import { ConditionControllerService } from '@app/api/condition-controller.service';
import { CustomSettingsControllerService } from '@app/api/custom-settings-controller.service';
import { DirPartnerService } from '@app/api/massegment-api/dir-partner.service';
import { DirVisualAssessmentControllerService } from '@app/api/dir-visual-assessment-controller.service';
import { Injectable } from '@angular/core';
import { IntegrationLogControllerService } from '@app/api/integration-log-controller.service';
import { IntegrationSettingControllerService } from '@app/api/integration-setting-controller.service';
import { NotificationSettingControllerService } from '@app/api/notification-setting-controller.service';
import { PaginationAndSortingDto } from '@app/_models';
import { PrintingFormControllerService } from '@app/api/printing-form-controller.service';
import { PrintingFormStageSettingControllerService } from '@app/api/printing-form-stage-setting-controller.service';
import { UserControllerService } from '@app/api/user-controller.service';
import { of } from 'rxjs';
import {DirAbsAttributeControllerService} from "@app/api/dir-abs-attribute-controller.service";
import {DirAbsAttributeSettingControllerService} from "@app/api/dir-abs-attribute-setting-controller.service";
import {DirAccountProductControllerService} from "@app/api/dir-account-product-controller.service";
import {AbsExpenseSettingControllerService} from "@app/api/abs-expense-setting-controller.service";
import {BlacklistControllerService} from "@app/api/blacklist-controller.service";

@Injectable()
export class AdministrationEffects {
  getCondition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetConditionAction),
      switchMap(({ data }) => {
        return this.conditionController.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetConditionSuccessAction({ data }));
      })
    );
  });

  updateCondition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateConditionAction),
      switchMap(({ data }) => {
        return this.conditionController.createOrUpdate(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmUpdateConditionSuccessAction({ data }));
      })
    );
  });

  createCondition$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateConditionAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.conditionController.createOrUpdate(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetConditionAction({ data: paginData }));
      })
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetUserAction),
      switchMap(({ data }) => {
        return this.userControllerService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetUserSuccessAction({ data }));
      })
    );
  });

  createUser$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateUserAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.userControllerService.createOrUpdate(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetUserAction({ data: paginData }));
      })
    );
  });

  updateUser$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateUserAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.userControllerService.createOrUpdate(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetUserAction({ data: paginData }));
      })
    );
  });

  getSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetSettingAction),
      switchMap(({ data }) => {
        return this.customSettingsControllerService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetSettingsSuccessAction({ data }));
      })
    );
  });

  saveSetting$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSaveSettingAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.customSettingsControllerService.save(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetSettingAction({ data: paginData }));
      })
    );
  });

  getNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetNotificationSettingAction),
      switchMap(({ data }) => {
        return this.notificationSettingControllerService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetNotificationSettingSuccessAction({ data }));
      })
    );
  });

  saveNotification$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSaveNotificationSettingAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.notificationSettingControllerService.save(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetNotificationSettingAction({ data: paginData }));
      })
    );
  });

  getPrintingForm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetPrintingFormAction),
      switchMap(({ data }) => {
        return this.printingFormControllerService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetPrintingFormSuccessAction({ data }));
      })
    );
  });

  setPrintingForm$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUploadPrintingFormAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.printingFormControllerService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetPrintingFormAction({ data }));
      })
    );
  });

  // Integration:
  getIntegration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetIntegrationAction),
      switchMap(({ data }) => {
        return this.integrationSettingControllerService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetIntegrationSuccessAction({ data }));
      })
    );
  });

  updateIntegration$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateIntegrationAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.integrationSettingControllerService.update(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetIntegrationAction({ data: paginData }));
      })
    );
  });

  // IntegrationLog:
  getIntegrationLog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetIntegrationLogAction),
      switchMap(({ data }) => {
        return this.integrationLogControllerService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetIntegrationLogSuccessAction({ data }));
      })
    );
  });

  getCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetCompanyListAction),
      switchMap(({ data }) => {
        return this.companyService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetCompanyListSuccessAction({ data }));
      })
    );
  });

  createCompany$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateCompanyListAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.companyService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetCompanyListAction({ data: paginData }));
      })
    );
  });

  updateCompany$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateCompanyListAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.companyService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetCompanyListAction({ data: paginData }));
      })
    );
  });

  getSalesChanel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetSalesChanelAction),
      switchMap(({ data }) => {
        return this.salesChannelService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetSalesChanelSuccessAction({ data }));
      })
    );
  });

  setSalesChanel$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUploadSalesChanelAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.salesChannelService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetSalesChanelAction({ data }));
      })
    );
  });

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetProductAction),
      switchMap(({ data }) => {
        return this.productService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetProductSuccessAction({ data }));
      })
    );
  });

  createProduct$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateProductAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.productService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetProductAction({ data: paginData }));
      })
    );
  });

  updateProduct$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateProductAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.productService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetProductAction({ data: paginData }));
      })
    );
  });

  getStopList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetStopListAction),
      switchMap(({ data }) => {
        return this.stopListService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetStopListSuccessAction({ data }));
      })
    );
  });

  insuranceCompanies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetInsuranceCompaniesAction),
      switchMap(({ data }) => {
        return this.insuranceCompanyService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetInsuranceCompaniesSuccessAction({ data }));
      })
    );
  });

  createInsuranceCompany$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateInsuranceCompanyAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.insuranceCompanyService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetInsuranceCompaniesAction({ data: paginData }));
      })
    );
  });

  updateInsuranceCompany$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateInsuranceCompanyAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.insuranceCompanyService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetInsuranceCompaniesAction({ data: paginData }));
      })
    );
  });

  getInsuranceCondition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetInsuranceConditionsAction),
      switchMap(({ data }) => {
        return this.insuranceConditionService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetInsuranceConditionsSuccessAction({ data }));
      })
    );
  });

  createInsuranceCondition$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateInsuranceConditionAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.insuranceConditionService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetInsuranceConditionsAction({ data: paginData }));
      })
    );
  });

  updateInsuranceCondition$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateInsuranceConditionAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.insuranceConditionService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetInsuranceConditionsAction({ data: paginData }));
      })
    );
  });

  visualAssessments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetVisualAssessmentAction),
      switchMap(({ data }) => {
        return this.dirVisualAssessmentService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetVisualAssessmentSuccessAction({ data }));
      })
    );
  });

  createVisualAssessment$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateVisualAssessmentAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirVisualAssessmentService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetVisualAssessmentAction({ data: paginData }));
      })
    );
  });

  updateVisualAssessment$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateVisualAssessmentAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirVisualAssessmentService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetVisualAssessmentAction({ data: paginData }));
      })
    );
  });

  underChecklists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetUnderChecklistAction),
      switchMap(({ data }) => {
        return this.dirChecklistService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetUnderChecklistSuccessAction({ data }));
      })
    );
  });

  createUnderChecklist$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateUnderChecklistAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirChecklistService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetUnderChecklistAction({ data: paginData }));
      })
    );
  });

  updateUnderChecklist$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateUnderChecklistAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirChecklistService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetUnderChecklistAction({ data: paginData }));
      })
    );
  });

  getBrmsRules$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetBrmsRuleAction),
      switchMap(({ data }) => {
        return this.brmsRuleControllerService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetBrmsRuleSuccessAction({ data }));
      })
    );
  });

  updateBrmsRules$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateBrmsRuleAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.brmsRuleControllerService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetBrmsRuleAction({ data: paginData }));
      })
    );
  });

  discountCondition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetDiscountConditionAction),
      switchMap(({ data }) => {
        return this.productDiscountConditionService.getByPage(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetDiscountConditionSuccessAction({ data }));
      })
    );
  });

  createDiscountCondition$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateDiscountConditionAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.productDiscountConditionService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetDiscountConditionAction({ data: paginData }));
      })
    );
  });

  updateDiscountCondition$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateDiscountConditionAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.productDiscountConditionService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetDiscountConditionAction({ data: paginData }));
      })
    );
  });

  auditLog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetAuditLogAction),
      switchMap(({ data }) => {
        return this.auditLogService.getByPage(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetAuditLogSuccessAction({ data }));
      })
    );
  });

  commissionConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetCommissionConfigAction),
      switchMap(({ data }) => {
        return this.absCommissionConfigService.getByPage(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetCommissionConfigSuccessAction({ data }));
      })
    );
  });

  createCommissionConfig$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateCommissionConfigAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.absCommissionConfigService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetCommissionConfigAction({ data: paginData }));
      })
    );
  });

  updateCommissionConfig$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateCommissionConfigAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.absCommissionConfigService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetCommissionConfigAction({ data: paginData }));
      })
    );
  });

  printingFormStageSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetPrintingFormStageSettingAction),
      switchMap(({ data }) => {
        return this.printingFormStageSettingService.getByPage(data);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetPrintingFormStageSettingSuccessAction({ data }));
      })
    );
  });

  createPrintingFormStageSetting$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreatePrintingFormStageSettingAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.printingFormStageSettingService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetPrintingFormStageSettingAction({ data: paginData }));
      })
    );
  });

  updatePrintingFormStageSetting$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdatePrintingFormStageSettingAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.printingFormStageSettingService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetPrintingFormStageSettingAction({ data: paginData }));
      })
    );
  });

  // Partners:
  getPartners$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetPartnersAction),
      switchMap(({ data }) => {
        return this.dirPartnerService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetPartnersSuccessAction({ data }));
      })
    );
  });

  updatePartners$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdatePartnersAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        if (data.id) {
          return this.dirPartnerService.update(data);
        } else {
          return this.dirPartnerService.create(data);
        }
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetPartnersAction({ data: paginData }));
      })
    );
  });

  // attributes:
  getAttributes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetAttributesAction),
      switchMap(({ data }) => {
        return this.dirAbsAttributeService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetAttributesSuccessAction({ data }));
      })
    );
  });

  createAttributes$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateAttributesAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirAbsAttributeService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetAttributesAction({ data: paginData }));
      })
    );
  });

  updateAttributes$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateAttributesAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirAbsAttributeService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetAttributesAction({ data: paginData }));
      })
    );
  });

  // AttributesSetting:
  getAttributesSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetAttributesSettingAction),
      switchMap(({ data }) => {
        return this.dirAbsAttributeSettingService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetAttributesSettingSuccessAction({ data }));
      })
    );
  });

  createAttributesSetting$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateAttributesSettingAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirAbsAttributeSettingService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetAttributesSettingAction({ data: paginData }));
      })
    );
  });

  updateAttributesSetting$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateAttributesSettingAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirAbsAttributeSettingService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetAttributesSettingAction({ data: paginData }));
      })
    );
  });

  // AccountProduct:
  getAccountProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetAccountProductAction),
      switchMap(({ data }) => {
        return this.dirAccountProductService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetAccountProductSuccessAction({ data }));
      })
    );
  });

  createAccountProduct$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateAccountProductAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirAccountProductService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetAccountProductAction({ data: paginData }));
      })
    );
  });

  updateAccountProduct$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateAccountProductAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.dirAccountProductService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetAccountProductAction({ data: paginData }));
      })
    );
  });

  // ExpenseSetting:
  getExpenseSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetExpenseSettingAction),
      switchMap(({ data }) => {
        return this.absExpenseSettingService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetExpenseSettingSuccessAction({ data }));
      })
    );
  });

  createExpenseSetting$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateExpenseSettingAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.absExpenseSettingService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetExpenseSettingAction({ data: paginData }));
      })
    );
  });

  updateExpenseSetting$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateExpenseSettingAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.absExpenseSettingService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetExpenseSettingAction({ data: paginData }));
      })
    );
  });

  // Blacklist:
  getBlacklist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmSetBlacklistAction),
      switchMap(({ data }) => {
        return this.blacklistService.getByPage(data as PaginationAndSortingDto);
      }),
      switchMap(data => {
        return of(AdministrationActions.AdmSetBlacklistSuccessAction({ data }));
      })
    );
  });

  createBlacklist$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmCreateBlacklistAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.blacklistService.create(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetBlacklistAction({ data: paginData }));
      })
    );
  });

  updateBlacklist$ = createEffect(() => {
    let paginData: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(AdministrationActions.AdmUpdateBlacklistAction),
      switchMap(({ data, paginationData }) => {
        paginData = paginationData;
        return this.blacklistService.update(data);
      }),
      switchMap(() => {
        return of(AdministrationActions.AdmSetBlacklistAction({ data: paginData }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private conditionController: ConditionControllerService,
    private printingFormControllerService: PrintingFormControllerService,
    private userControllerService: UserControllerService,
    private customSettingsControllerService: CustomSettingsControllerService,
    private notificationSettingControllerService: NotificationSettingControllerService,
    private integrationSettingControllerService: IntegrationSettingControllerService,
    private integrationLogControllerService: IntegrationLogControllerService,
    private companyService: CompanyControllerService,
    private salesChannelService: DirSalesChannelControllerService,
    private productService: ProductCategoryControllerService,
    private stopListService: StopListAbsControllerService,
    private insuranceCompanyService: InsuranceCompanyControllerService,
    private insuranceConditionService: InsuranceConditionControllerService,
    private dirVisualAssessmentService: DirVisualAssessmentControllerService,
    private dirChecklistService: DirChecklistControllerService,
    private brmsRuleControllerService: BrmsRuleControllerService,
    private dirPartnerService: DirPartnerService,
    private productDiscountConditionService: ProductDiscountConditionControllerService,
    private auditLogService: AuditLogControllerService,
    private absCommissionConfigService: AbsCommissionConfigControllerService,
    private printingFormStageSettingService: PrintingFormStageSettingControllerService,
    private dirAbsAttributeService: DirAbsAttributeControllerService,
    private dirAbsAttributeSettingService: DirAbsAttributeSettingControllerService,
    private dirAccountProductService: DirAccountProductControllerService,
    private absExpenseSettingService: AbsExpenseSettingControllerService,
    private blacklistService: BlacklistControllerService
  ) {}
}
