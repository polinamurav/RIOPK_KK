import { TableDataHeader } from '@app/_models';

export const BRMS_RESULT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('brmsRule.id', 'BRMSDecision.TableHeaders.RuleCode', 'string', 'brmsRule.id'),
  new TableDataHeader('brmsRule.nameRu', 'BRMSDecision.TableHeaders.RuleName', 'ru', 'brmsRule.nameRu'),
  new TableDataHeader('brmsRule.nameGe', 'BRMSDecision.TableHeaders.RuleName', 'ge', 'brmsRule.nameRu')
];

export const BRMS_RESULT_HEADERS_DECISION_MAKER: TableDataHeader[] = [
  new TableDataHeader('brmsRule.id', 'BRMSDecision.TableHeaders.RuleCode', 'string', 'brmsRule.id'),
  new TableDataHeader('brmsRule.nameRu', 'BRMSDecision.TableHeaders.RuleName', 'ru', 'brmsRule.nameRu'),
  new TableDataHeader('brmsRule.nameGe', 'BRMSDecision.TableHeaders.RuleName', 'ge', 'brmsRule.nameRu'),
  new TableDataHeader('description', 'BRMSDecision.TableHeaders.Description', 'string', 'Description')
];

export const SCORING_FACTOR_HEADERS: TableDataHeader[] = [
  new TableDataHeader('factorNumber', 'BRMSDecision.TableHeaders.FactorNumber', 'string', 'factorNumber'),
  new TableDataHeader('factorName', 'BRMSDecision.TableHeaders.FactorName', 'ru', 'factorName'),
  new TableDataHeader('factorNameGe', 'BRMSDecision.TableHeaders.FactorName', 'ge', 'factorName'),
  new TableDataHeader('categoryName', 'BRMSDecision.TableHeaders.CategoryName', 'ru', 'categoryName'),
  new TableDataHeader('categoryNameGe', 'BRMSDecision.TableHeaders.CategoryName', 'ge', 'categoryName'),
  new TableDataHeader('scoreFactor', 'BRMSDecision.TableHeaders.ScoreFactor', 'string', 'scoreFactor')
];

export const SCORING_ATTRIBUTE_HEADERS: TableDataHeader[] = [
  new TableDataHeader('attributeNameGe', 'BRMSDecision.TableHeaders.AttributeName', 'ge', 'attributeName'),
  new TableDataHeader('attributeNameRu', 'BRMSDecision.TableHeaders.AttributeName', 'ru', 'attributeName'),
  new TableDataHeader('attributeValue', 'BRMSDecision.TableHeaders.AttributeValue', 'string', 'attributeValue')
];
