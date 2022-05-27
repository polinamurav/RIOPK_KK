import { AuthState, DirectoriesState, PreapprovedUploadState, QueuesState, TasksFilterState } from '@app/_models';
import { ClientsFilter, ClientsState } from '@app/_models/api-models/client';

import { AdministrationState } from '@app/_models/administration-models';
import { ApplicationState, DirHashState } from '@app/_models';
import { MassSegmentDirectoriesState } from '@app/_models/api-models/mass-segment-directories-state';
import { RetailDirectoriesState } from '@app/_models/api-models/retail-directories-state';
import { RouterReducerState } from '@ngrx/router-store';
import { initialAdministrationState } from '@app/store/state/administration.state';
import { initialAuthState } from '@app/store/state/auth.state';
import { initialClientsFilterState } from './clients-filter.state';
import { initialClientsState } from './clients.state';
import { initialDashboardState } from '@app/store/state/dashboard.state';
import { initialDirectoriesState } from '@app/store/state/directories.state';
import { initialMassSegmentDirectories } from './mass-segment-directories.state';
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
  clients: ClientsState;
  preapprovedUpload: PreapprovedUploadState;
  tasksFilter: TasksFilterState;
  clientsFilter: ClientsFilter;
  retailDirectories: RetailDirectoriesState;
  massSegmentDirectories: MassSegmentDirectoriesState;
  dirHashes: DirHashState;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  administration: initialAdministrationState,
  directories: initialDirectoriesState,
  dashboard: initialDashboardState,
  queues: initialQueuesState,
  clients: initialClientsState,
  preapprovedUpload: initialPreapprovedUploadState,
  tasksFilter: initialTasksFilterState,
  clientsFilter: initialClientsFilterState,
  retailDirectories: initialRetailDirectories,
  massSegmentDirectories: initialMassSegmentDirectories,
  dirHashes: initialDirHashState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
