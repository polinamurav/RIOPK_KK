import { DirBusinessInspectionResult, DirCountry } from '..';

import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';

export type MassSegmentDirectoriesModels = DirCountry | DirBusinessInspectionResult;
// | StaticDirectory
// | DirAbsCode
// | SystemDirectory
// | Status
// | DirCityDto
// | InsuranceCondition
// | Dir
// | InsuranceCompany
// | DirectoryVal
// | Decision
// | StopListAbsStatusDto
// | DirStatus
// | ProductRes;

export type MassSegmentDirectoriesState = Record<MassSegmentDirectoriesNames, MassSegmentDirectoriesModels[]>;
