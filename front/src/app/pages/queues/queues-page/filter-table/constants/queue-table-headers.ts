import { TableDataHeader } from '@app/_models';

export const all: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const allWithManagerPos: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
];


export const allWithRefreshApp: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'staticIconButton')
];


export const monitoring: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'fullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('absApplicationId', 'TableHeader.LoanAgreement', 'string', 'numDog'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('decisionName', 'TableHeader.Result', 'ru', 'decisionName'),
  new TableDataHeader('decisionNameAm', 'TableHeader.Result', 'am', 'decisionNameAm'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'refresh')
];

export const verifier: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const creditManagerBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const accepter: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const callCenterBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const verifierBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const decisionMakerBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const dsaBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const videoBankBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
];

export const adminDeclines: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'iconButton'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')
];

export const adminITDeclines: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'iconButton'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')
];

export const verifierDeclines: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isAvailForDeactivation', 'TableHeader.Deactivation', 'deactivation')
];

export const adminArchived: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'staticIconButton'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')
];

export const adminAll: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')

];

export const adminITAll: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')

];


export const adminIT: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'staticIconButton'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')
];

export const error: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.RestartFromErrors', 'staticIconButton')
];

export const errorWithManagerPos: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('refresh', 'TableHeader.RestartFromErrors', 'staticIconButton')
];


export const errorWithAllBtns: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('refresh', 'TableHeader.RestartFromErrors', 'staticIconButton'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'iconButton')
];

export const verifierErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const creditManagerBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const accepterErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const callCenterBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const verifierBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const decisionMakerBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const dsaBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const adminErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')
];

export const adminErrorsWithManagerPos: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('refresh', 'TableHeader.RestartFromErrors', 'staticIconButton'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'iconButton'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')
];

export const adminITErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('refresh', 'TableHeader.RestartFromErrors', 'staticIconButton'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'iconButton'),
  new TableDataHeader('cloud_download', 'Скачать логи', 'iconButton')
];

export const declines: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.Status', 'am', 'statusNameAm'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('isAvailForDeactivation', 'TableHeader.Deactivation', 'deactivation')
];

export const declines_rm: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
];

export const declines_rm_boss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
  new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
  new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
  new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
  new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMakerDisplay'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
  new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal-OPIC', 'declineAdmin'),
  new TableDataHeader('restart-process', 'TableHeader.RestartProcess', 'iconButton')
];
