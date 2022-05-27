import { TableDataHeader } from '@app/_models';

export const all: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const monitoring: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'fullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('absApplicationId', 'TableHeader.LoanAgreement', 'string', 'numDog'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('decisionName', 'TableHeader.Result', 'ru', 'decisionName'),
  new TableDataHeader('decisionNameGe', 'TableHeader.Result', 'ge', 'decisionNameGe'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'refresh')
];

export const verifier: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'userReassignment', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const creditManagerBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'userReassignment', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'userReassignment', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const accepter: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'userReassignment', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const callCenterBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'userReassignment', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const verifierBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'userReassignment', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const decisionMakerBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const dsaBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'userReassignment', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const videoBankBoss: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'userReassignment', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const adminDeclines: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'userReassignment', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'userReassignment', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'userReassignment', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'userReassignment', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'userReassignment', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('isAvailForDeactivation', 'TableHeader.Deactivation', 'deactivation'),
];

export const verifierDeclines: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'userReassignment', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('isAvailForDeactivation', 'TableHeader.Deactivation', 'deactivation')
];

export const adminArchived: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'userReassignment', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'userReassignment', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'userReassignment', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'userReassignment', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'userReassignment', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete')
];

export const error: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const verifierErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'userReassignment', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const creditManagerBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'userReassignment', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'userReassignment', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const accepterErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'userReassignment', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const callCenterBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'userReassignment', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const verifierBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'userReassignment', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const decisionMakerBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const dsaBossErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'userReassignment', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton')
];

export const adminErrors: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'userReassignment', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'userReassignment', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'userReassignment', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'userReassignment', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'userReassignment', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'userReassignment', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('refresh', 'TableHeader.Restart', 'staticIconButton'),
  new TableDataHeader('declineAdmin', 'TableHeader.Refusal', 'declineAdmin')
];

export const declines: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
  new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
  new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
  new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
  new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
  new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
  new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
  new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
  new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
  new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
  new TableDataHeader('countReturnFullForm', 'TableHeader.FormRevisionCycles', 'string', 'countReturnFullForm'),
  new TableDataHeader(
    'countReturnVerification',
    'TableHeader.UnderwritingRevisionCycles',
    'string',
    'countReturnVerification'
  ),
  new TableDataHeader(
    'countReturnFinalDecision',
    'TableHeader.DocumentRevisionCycles',
    'string',
    'countReturnFinalDecision'
  ),
  new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
  new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
  new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter'),
  new TableDataHeader('verifier', 'TableHeader.Verifier', 'string', 'verifier'),
  new TableDataHeader('decisionMaker', 'TableHeader.DecisionMaker', 'string', 'decisionMaker'),
  new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
  new TableDataHeader('dsaUtm', 'TableHeader.DSASeller', 'string', 'dsaUtm'),
  new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter'),
  new TableDataHeader('isArchiveComplete', 'TableHeader.ArchiveComplete', 'status', 'isArchiveComplete'),
  new TableDataHeader('isAvailForDeactivation', 'TableHeader.Deactivation', 'deactivation')
];
