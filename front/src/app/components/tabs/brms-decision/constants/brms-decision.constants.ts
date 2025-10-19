import { TableDataHeader } from '@app/_models';

export const BRMS_RESULT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('brmsRule.id', 'BRMSDecision.TableHeaders.RuleCode', 'string', 'brmsRule.id'),
  new TableDataHeader('brmsRule.nameRu', 'BRMSDecision.TableHeaders.RuleName', 'ru', 'brmsRule.nameRu'),
  new TableDataHeader('brmsRule.nameAm', 'BRMSDecision.TableHeaders.RuleName', 'am', 'brmsRule.nameAm'),
  new TableDataHeader('brmsRule.brmsRuleGroup.nameRu', 'BRMSDecision.TableHeaders.RuleGroup', 'ru', 'brmsRule.nameRu'),
  new TableDataHeader('brmsRule.brmsRuleGroup.nameAm', 'BRMSDecision.TableHeaders.RuleGroup', 'am', 'brmsRule.nameAm')
];

export const BRMS_RESULT_HEADERS_DECISION_MAKER: TableDataHeader[] = [
  new TableDataHeader('brmsRule.id', 'BRMSDecision.TableHeaders.RuleCode', 'string', 'brmsRule.id'),
  new TableDataHeader('brmsRule.nameRu', 'BRMSDecision.TableHeaders.RuleName', 'ru', 'brmsRule.nameRu'),
  new TableDataHeader('brmsRule.nameAm', 'BRMSDecision.TableHeaders.RuleName', 'am', 'brmsRule.nameRu'),
  new TableDataHeader('description', 'BRMSDecision.TableHeaders.Description', 'string', 'Description')
];

export const SCORING_FACTOR_HEADERS: TableDataHeader[] = [
  new TableDataHeader('index', 'BRMSDecision.TableHeaders.Number', 'string', 'index'),
  new TableDataHeader('characteristicRu', 'BRMSDecision.TableHeaders.Characteristic', 'ru', 'characteristicRu'),
  new TableDataHeader('characteristicAm', 'BRMSDecision.TableHeaders.Characteristic', 'am', 'characteristicAm'),
  new TableDataHeader('binRu', 'BRMSDecision.TableHeaders.Range', 'ru', 'binRu'),
  new TableDataHeader('binAm', 'BRMSDecision.TableHeaders.Range', 'am', 'binAm'),
  new TableDataHeader('partialScore', 'BRMSDecision.TableHeaders.ScoreFactor', 'string', 'partialScore')
];

export const SCORING_ATTRIBUTE_HEADERS: TableDataHeader[] = [
  new TableDataHeader('attributeNameAm', 'BRMSDecision.TableHeaders.AttributeName', 'am', 'attributeName'),
  new TableDataHeader('attributeNameRu', 'BRMSDecision.TableHeaders.AttributeName', 'ru', 'attributeName'),
  new TableDataHeader('attributeValue', 'BRMSDecision.TableHeaders.AttributeValue', 'string', 'attributeValue')
];

export const MATRIX_LIMIT_DETAIL_HEADERS: TableDataHeader[] = [
  new TableDataHeader('productNameAm', 'Продукт', 'am', 'productNameAm'),
  new TableDataHeader('productNameRu', 'Продукт', 'ru', 'productNameRu'),
  new TableDataHeader('creditLimitCoefficient', 'Кратность', 'string', 'creditLimitCoefficient'),
  new TableDataHeader('oti', 'OTI', 'string', 'oti'),
  new TableDataHeader('maxLimitIncomeBased', 'Лимит по Доходу', 'string', 'maxLimitIncomeBased')
];
