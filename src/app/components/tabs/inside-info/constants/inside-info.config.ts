export enum InsideInfoGroupKeys {
  RelatedPersons = 'relatedPersons',
  InternalLoanHistory = 'internalLoanHistory',
  OverduePaymentInfo = 'overduePaymentInfo',
}

export const INSIDE_INFO_TITLES: Record<string, string> = {
  [InsideInfoGroupKeys.RelatedPersons]: 'InsideInfo.RelatedPersons',
  [InsideInfoGroupKeys.InternalLoanHistory]: 'InsideInfo.InternalLoanHistory',
  [InsideInfoGroupKeys.OverduePaymentInfo]: 'InsideInfo.OverduePaymentInfo',
};
