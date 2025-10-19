import {
  Decision,
  DirAbsCode,
  DirCityDto,
  DirCountry,
  DirStatus,
  Directory,
  DirectoryVal,
  InsuranceCompany,
  InsuranceCondition,
  ProductDto,
  StaticDirectory,
  Status,
  StopListAbsStatusDto,
  SystemDirectory
} from '..';

import { Company } from './company';
import { Dir } from '@angular/cdk/bidi';
import { RetailDirectoriesNames } from './retail-directories-names';

export type RetailDirectoriesModels =
  | StaticDirectory
  | DirAbsCode
  | SystemDirectory
  | Status
  | DirCityDto
  | InsuranceCondition
  | Dir
  | DirCountry
  | Directory
  | InsuranceCompany
  | DirectoryVal
  | Decision
  | StopListAbsStatusDto
  | DirStatus
  | ProductDto
  | Company;

export type RetailDirectoriesState = Record<RetailDirectoriesNames, RetailDirectoriesModels[]>;
