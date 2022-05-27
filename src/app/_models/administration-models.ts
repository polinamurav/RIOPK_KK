import {
  AbsCommissionConfig,
  AuditLog,
  Company,
  DirChecklist,
  Directory,
  InsuranceCompany,
  PrintingFormStageSetting,
  ProductDiscountCondition,
  ProductRes,
  StopListAbsDto
} from '.';

import { BRMSRule } from './api-models/brms-rule-type';
import { Condition } from '@app/_models/api-models/condition-dto';
import { CustomSettingsDto } from '@app/_models/api-models/custom-settings';
import { DirPartner } from '@app/_models/api-models/dir-partner';
import { DirVisualAssessment } from './api-models/visual-assessment';
import { InsuranceCondition } from './api-models/insurance-condition';
import { IntegrationLog } from '@app/_models/api-models/integration-log';
import { IntegrationSetting } from '@app/_models/api-models/integration-interface';
import { NotificationSetting } from '@app/_models/api-models/notification-setting';
import { PageDTO } from '@app/_models/page-dto';
import { PrintingForm } from '@app/_models/api-models/printing-form';
import { UserDto } from '@app/_models/api-models/user';
import {DirAbsAttribute} from "@app/_models/api-models/dir-abs-attribute";
import {DirAbsAttributeSetting} from "@app/_models/api-models/dir-abs-attribute-setting";
import {DirAccountProduct} from "@app/_models/api-models/dir-account-product";
import {AbsExpenseSetting} from "@app/_models/api-models/abs-expense-setting";
import {Blacklist} from "@app/_models/api-models/blacklist";

// TODO  исправить any
export class AdministrationState {
  settings: PageDTO<CustomSettingsDto>;
  notificationSetting: PageDTO<NotificationSetting>;
  printingForms: PageDTO<PrintingForm>;
  users: PageDTO<UserDto>;
  conditions: PageDTO<Condition>;
  roles: PageDTO<any>;
  integration: PageDTO<IntegrationSetting>;
  integrationLog: PageDTO<IntegrationLog>;
  companyList: PageDTO<Company>;
  salesChanel: PageDTO<Directory>;
  product: PageDTO<ProductRes>;
  stopList: PageDTO<StopListAbsDto>;
  insuranceCompanies: PageDTO<InsuranceCompany>;
  insuranceConditions: PageDTO<InsuranceCondition>;
  visualAssessments: PageDTO<DirVisualAssessment>;
  underChecklist: PageDTO<DirChecklist>;
  brmsRule: PageDTO<BRMSRule>;
  discount: PageDTO<ProductDiscountCondition>;
  auditLog: PageDTO<AuditLog>;
  commission: PageDTO<AbsCommissionConfig>;
  printingFormStageSetting: PageDTO<PrintingFormStageSetting>;
  partners: PageDTO<DirPartner>;
  attributes: PageDTO<DirAbsAttribute>;
  attributesSetting: PageDTO<DirAbsAttributeSetting>;
  accountProduct: PageDTO<DirAccountProduct>;
  expenseSetting: PageDTO<AbsExpenseSetting>;
  blacklist: PageDTO<Blacklist>;
}

export interface ILogger {
  created: string;
  id: number | string;
  logType: LogType;
  login: string;
  text: string;
  updated: string;
}

export interface LogType {
  code: string;
  created: string;
  id: number | string;
  name: string;
  updated: string;
}

export interface IAdministrationJournalDataSource {
  created: string;
  id: number | string;
  logType: string;
  login: string;
  text: string;
  updated: string;
}
