import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';
import { MassSegmentDirectoriesState } from '@app/_models/api-models/mass-segment-directories-state';

function getMassSegmentDirectoriesState(): MassSegmentDirectoriesState {
  const directoriesState = {} as MassSegmentDirectoriesState;

  const keys: (keyof typeof MassSegmentDirectoriesNames)[] = Object.keys(
    MassSegmentDirectoriesNames
  ) as (keyof typeof MassSegmentDirectoriesNames)[];

  for (const key of keys) {
    const name: string = MassSegmentDirectoriesNames[key];
    directoriesState[name] = [];
  }

  return directoriesState;
}

export const initialMassSegmentDirectories: MassSegmentDirectoriesState = getMassSegmentDirectoriesState();
