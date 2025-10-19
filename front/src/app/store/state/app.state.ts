import { AuthState, DirectoriesState, PreapprovedUploadState, QueuesState, TasksFilterState } from '@app/_models';

import { AdministrationState } from '@app/_models/administration-models';
import { ApplicationState, DirHashState } from '@app/_models';
import { RetailDirectoriesState } from '@app/_models/api-models/retail-directories-state';
import { RouterReducerState } from '@ngrx/router-store';
import { initialAdministrationState } from '@app/store/state/administration.state';
import { initialAuthState } from '@app/store/state/auth.state';
import { initialDashboardState } from '@app/store/state/dashboard.state';
import { initialDirectoriesState } from '@app/store/state/directories.state';
import { initialPreapprovedUploadState } from './preapproved-upload.state';
import { initialQueuesState } from '@app/store/state/queues.state';
import { initialRetailDirectories } from './retail-directories.state';
import { initialTasksFilterState } from './tasks-filter.state';
import { initialDirHashState } from './dir-hash.state';

export interface IAppState {
  router?: RouterReducerState;
  auth: AuthState;
  administration: AdministrationState;
  directories: DirectoriesState;
  dashboard: ApplicationState;
  queues: QueuesState;
  preapprovedUpload: PreapprovedUploadState;
  tasksFilter: TasksFilterState;
  retailDirectories: RetailDirectoriesState;
  dirHashes: DirHashState;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  administration: initialAdministrationState,
  directories: initialDirectoriesState,
  dashboard: initialDashboardState,
  queues: initialQueuesState,
  preapprovedUpload: initialPreapprovedUploadState,
  tasksFilter: initialTasksFilterState,
  retailDirectories: initialRetailDirectories,
  dirHashes: initialDirHashState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
