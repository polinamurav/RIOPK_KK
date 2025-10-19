import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { RetailDirectoriesState } from '@app/_models/api-models/retail-directories-state';

function getRetailDirectoriesState(): RetailDirectoriesState {
  const directoriesState = {} as RetailDirectoriesState;

  const keys: (keyof typeof RetailDirectoriesNames)[] = Object.keys(
    RetailDirectoriesNames
  ) as (keyof typeof RetailDirectoriesNames)[];

  for (const key of keys) {
    const name: string = RetailDirectoriesNames[key];
    directoriesState[name] = [];
  }

  return directoriesState;
}

export const initialRetailDirectories: RetailDirectoriesState = getRetailDirectoriesState();
// export const initialRetailDirectories: RetailDirectoriesState = {
//   [RetailDirectoriesNames.paymentCards]: [],
//   [RetailDirectoriesNames.accepterDecisionList]: [],
//   [RetailDirectoriesNames.paperworkDecisionList]: [],
//   [RetailDirectoriesNames.declineReasons]: [],
//   [RetailDirectoriesNames.declineReasonsCallCenter]: [],
//   [RetailDirectoriesNames.currencies]: [],
//   [RetailDirectoriesNames.insuranceCompany]: [],
//   [RetailDirectoriesNames.insuranceType]: [],
//   [RetailDirectoriesNames.insuranceConditions]: [],
//   [RetailDirectoriesNames.communicationType]: [],
//   [RetailDirectoriesNames.countries]: [],
//   [RetailDirectoriesNames.regions]: [],
//   [RetailDirectoriesNames.cities]: [],
//   [RetailDirectoriesNames.employmentActivity]: [],
//   [RetailDirectoriesNames.incomeType]: [],
//   [RetailDirectoriesNames.ipdlType]: [],
//   [RetailDirectoriesNames.relationships]: [],
//   [RetailDirectoriesNames.fatca]: [],
//   [RetailDirectoriesNames.innAbsenceReason]: [],
//   [RetailDirectoriesNames.passportType]: [],
//   [RetailDirectoriesNames.dirLimitOwnerDecisionList]: [],
//   [RetailDirectoriesNames.stopListAbsStatusList]: [],
//   [RetailDirectoriesNames.dirUnderDecisionList]: [],
//   [RetailDirectoriesNames.dirUnderDeclineReasonList]: [],
//   [RetailDirectoriesNames.statusData]: [],
//   [RetailDirectoriesNames.militaryDutyDir]: [],
//   [RetailDirectoriesNames.status]: [],
//   [RetailDirectoriesNames.productCategories]: [],
//   [RetailDirectoriesNames.gender]: [],
//   [RetailDirectoriesNames.maritalStatuses]: [],
//   [RetailDirectoriesNames.creditPurpose]: [],
//   [RetailDirectoriesNames.numberEmployee]: [],
//   [RetailDirectoriesNames.accommodationType]: [],
//   [RetailDirectoriesNames.employmentLegalStructure]: []
// };
