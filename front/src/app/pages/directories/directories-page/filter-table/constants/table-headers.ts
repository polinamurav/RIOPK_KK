import { TableDataHeader } from '@app/_models';

export const CODE_NAME_RU_WITHOUT_VALUE: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const CODE_NAME_VALUE: TableDataHeader[] = [
  new TableDataHeader('code', 'КОД', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('value', 'ЗНАЧЕНИЕ', 'string', 'value'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'ИЗМЕНЕНО КЕМ', 'string', 'changedByUsername')
];

export const CODE_NAME_RU_GE: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const CODE_NAME_RU_GE_EN: TableDataHeader[] = [
  new TableDataHeader('code', 'КОД', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'ИЗМЕНЕНО КЕМ', 'string', 'changedByUsername')
];

export const CODE_NAME_VALUE_LANG: TableDataHeader[] = [
  new TableDataHeader('code', 'КОД', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'ИЗМЕНЕНО КЕМ', 'string', 'changedByUsername')
];

export const COUNTRIES: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('twoCharValue', 'TableHeader.TwoLetterDesignation', 'string', 'twoCharValue'),
  new TableDataHeader('threeCharValue', 'TableHeader.ThreeLetterDesignation', 'string', 'threeCharValue'),
  // new TableDataHeader('nameInternational', 'ИНТЕГРАЦИОННОЕ НАИМЕНОВАНИЕ', 'string', 'nameInternational'),
  // new TableDataHeader('nameRu', 'ПОЛНОЕ НАИМЕНОВАНИЕ', 'string', 'nameRu'),
  // new TableDataHeader('oecdMember', 'ВХОДИТ В ОЭСР', 'string', 'oecdMember'),
  new TableDataHeader('zoneType', 'TableHeader.ZoneType', 'number', 'zoneType'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const PRE_APPROVED_CREDIT: TableDataHeader[] = [
  new TableDataHeader('fio', 'КЛИЕНТ', 'string', 'fio'),
  new TableDataHeader('pin', 'PIN', 'string', 'pin'),
  new TableDataHeader('address', 'АДРЕС', 'string', 'address'),
  new TableDataHeader('productName', 'ПРОДУКТ', 'string', 'productName'),
  new TableDataHeader('currency', 'ВАЛЮТА', 'string', 'currency'),
  new TableDataHeader('agreement', 'ЕСТЬ СОГЛАСИЕ НА МКР', 'string', 'agreement'),
  new TableDataHeader('creditPayment', 'КРЕДИТ В НАШЕМ БАНКЕ, ПЛАТЕЖ', 'string', 'creditPayment'),
  new TableDataHeader('salary', ' СР. ЗАРПЛАТА ЗА 6 МЕСЯЦЕВ', 'string', 'salary'),
  new TableDataHeader('income', 'СВОБОДНЫЙ ДОХОД PTI (45%)', 'string', 'income'),
  new TableDataHeader('percent12', 'ПРОЦЕНТНАЯ СТАВКА НА 12 М.', 'string', 'percent12'),
  new TableDataHeader('percent24', 'ПРОЦЕНТНАЯ СТАВКА НА 24 М.', 'string', 'percent24'),
  new TableDataHeader('percent36', 'ПРОЦЕНТНАЯ СТАВКА НА 36 М.', 'string', 'percent36'),
  new TableDataHeader('percent48', 'ПРОЦЕНТНАЯ СТАВКА НА 48 М.', 'string', 'percent48'),
  new TableDataHeader('creditSum12', 'ПРЕДЛАГАЕМАЯ СУММА НА 12 М.', 'string', 'creditSum12'),
  new TableDataHeader('creditSum24', 'ПРЕДЛАГАЕМАЯ СУММА НА 24 М.', 'string', 'creditSum24'),
  new TableDataHeader('creditSum36', 'ПРЕДЛАГАЕМАЯ СУММА НА 36 М.', 'string', 'creditSum36'),
  new TableDataHeader('creditSum48', 'ПРЕДЛАГАЕМАЯ СУММА НА 48 М.', 'string', 'creditSum48')
];

export const CREDIT_PURPOSE: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  new TableDataHeader('absCode', 'TableHeader.AbsCode', 'string', 'absCode'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  // new TableDataHeader('suspicious', 'ПРИЗНАК ПОДОЗРИТЕЛЬНОЙ ЦЕЛИ КРЕДИТА', 'string', 'suspicious'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const SIGNER: TableDataHeader[] = [
  new TableDataHeader('code', 'КОД', 'string', 'code'),
  new TableDataHeader('dirBranch.id', 'ФИЛИАЛ', 'string', 'dirBranch.id'),
  new TableDataHeader('printingForm.id', 'ПЕЧАТНАЯ ФОРМА', 'string', 'printingForm.id'),
  new TableDataHeader('nameRu', 'НАИМЕНОВАНИЕ RU', 'string', 'nameRu'),
  new TableDataHeader('positionRu', 'ДОЛЖНОСТЬ RU', 'string', 'positionRu'),
  new TableDataHeader('nameAm', 'НАИМЕНОВАНИЕ AM', 'string', 'nameAm'),
  new TableDataHeader('positionGe', 'ДОЛЖНОСТЬ AM', 'string', 'positionGe'),
  new TableDataHeader('beginDate', 'ДАТА НАЧАЛА ПРАВА ПОДПИСИ', 'date', 'beginDate'),
  new TableDataHeader('endDate', 'ДАТА ОКОНЧАНИЯ ПРАВА ПОДПИСИ', 'date', 'endDate'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active'),
  new TableDataHeader('principal', 'ОСНОВНОЙ ПОДПИСАНТ', 'string', 'principal')
];

export const ACTIVITIES: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  // new TableDataHeader('nameRu', 'НАИМЕНОВАНИЕ', 'string', 'nameRu'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  // new TableDataHeader('abs_code', 'ЗНАЧЕНИЕ', 'string', 'abs_code'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const REGION: TableDataHeader[] = [
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('absCode', 'КОД В АБС', 'string', 'absCode'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active')
];

export const CITY: TableDataHeader[] = [
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  // new TableDataHeader('dirRegion.nameRu', 'РЕГИОН', 'string', 'dirRegion.nameRu'), // нет такого поля в модели
  new TableDataHeader('absCode', 'TableHeader.AbsCode', 'string', 'absCode'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active')
];

export const BANK_BRANCH: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.BranchCode', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active'),
  new TableDataHeader('city', 'TableHeader.City', 'string', 'city'),
  new TableDataHeader('headName', 'TableHeader.BranchHead', 'string', 'headName'),
  new TableDataHeader('license', 'TableHeader.LicenseNumber', 'string', 'license')
];

export const CALL_STATUS: TableDataHeader[] = [
  new TableDataHeader('code', 'КОД', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active')
];
export const PAYMENT_CARD: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('codeAbs', 'TableHeader.CodeAbs', 'string', 'codeAbs'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const UNDER_DECLINE_REASON: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active')
];

export const INSURANCE_TYPE: TableDataHeader[] = [
  new TableDataHeader('absCode', 'TableHeader.AbsCode', 'string', 'absCode'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active')
];

export const SEGMENTS: TableDataHeader[] = [
  new TableDataHeader('id', 'ID', 'string', 'id'),
  new TableDataHeader('nameRu', 'НАИМЕНОВАНИЕ RU', 'string', 'nameRu'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active'),
  new TableDataHeader('isCreditHistory', 'НАЛИЧИЕ КРЕДИТНОЙ ИСТОРИИ', 'status', 'isCreditHistory'),
  new TableDataHeader('isAsanEmployment', 'НАЛИЧИЕ СПРАВКИ АСАН.ЗАНЯТОСТЬ', 'status', 'isAsanEmployment'),
  new TableDataHeader('minWorkTerm', 'МИН. СТАЖ НА ТЕКУЩЕМ МЕСТЕ РАБОТЫ, МЕС', 'string', 'minWorkTerm'),
  new TableDataHeader('minIncome', 'ЧИСТЫЙ ДОХОД, GEL', 'string', 'minIncome'),
  new TableDataHeader('minAge', 'МИН. ВОЗРАСТ, ЛЕТ', 'string', 'minAge'),
  new TableDataHeader('maxAge', 'МАКС. ВОЗРАСТ, ЛЕТ', 'string', 'maxAge'),
  new TableDataHeader('minScore', 'МИН. СКОРИНГОВЫЙ БАЛЛ', 'string', 'minScore'),
  new TableDataHeader('limitSegment', 'ЛИМИТ НА СЕГМЕНТ, GEL', 'string', 'limitSegment'),
  new TableDataHeader('limitNonCollateral', 'ЛИМИТ БЕЗЗАЛОВОГОВОГО КРЕДИТОВАНИЯ, GEL', 'string', 'limitNonCollateral'),
  new TableDataHeader('priority', 'ПРИОРИТЕТ', 'string', 'priority')
];

export const INSPECTION_RESULT: TableDataHeader[] = [
  new TableDataHeader('code', 'КОД', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('brmsRuleType', 'ФАКТОР ОЦЕНКИ В BRMS', 'string', 'brmsRuleType'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active')
];

export const PREAPPROVED_FACTOR: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active')
];

export const ABS_COMMISSION: TableDataHeader[] = [
  new TableDataHeader('id', 'TableHeader.CommissionCode', 'string', 'id'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active')
];

export const DIR_ENSURE_TYPE: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'id'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('absCode', 'TableHeader.AbsCode', 'string', 'absCode'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];
export const DIR_ISSUE_TYPE: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'id'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('absCode', 'TableHeader.AbsCode', 'string', 'absCode'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const DIR_SCHEDULE_FREQUENCY: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'id'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const DIR_INCOME_FREQUENCY: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'id'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const DIR_JOB_POSITION: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'id'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];

export const DIR_TARIFF: TableDataHeader[] = [
  new TableDataHeader('id', 'TableHeader.Tariff', 'string', 'id'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('defaultTariff', 'TableHeader.Default', 'status', 'defaultTariff'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active')
];

export const DIR_RBP: TableDataHeader[] = [
  new TableDataHeader('minScore', 'TableHeader.MinScore', 'string', 'minScore'),
  new TableDataHeader('maxScore', 'TableHeader.MaxScore', 'string', 'maxScore'),
  new TableDataHeader('tariff.id', 'TableHeader.TariffByProduct', 'string', 'tariff.id'),
  new TableDataHeader('riskRate', 'TableHeader.RiskRate', 'string', 'namriskRateeGe'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active')
];

export const FATCA_REGIONS: TableDataHeader[] = [
  new TableDataHeader('code', 'TableHeader.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'TableHeader.Appellation', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'string', 'nameAm'),
  new TableDataHeader('active', 'TableHeader.Active', 'status', 'active')
];
