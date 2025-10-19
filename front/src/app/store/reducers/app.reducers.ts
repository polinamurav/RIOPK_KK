import * as administrationReducer from '@app/store/reducers/administration.reducers';
import * as authReducer from '@app/store/reducers/auth.reducers';
import * as dashboardReducer from '@app/store/reducers/dashboard.reducers';
import * as directoriesReducer from '@app/store/reducers/directories.reducers';
import * as preapprovedUpload from '@app/store/reducers/preapproved-upload.reducers';
import * as queuesReducer from '@app/store/reducers/queues.reducers';
import * as retailDirectories from '@app/store/reducers/retail-directories.reducers';
import * as tasksFilterReducer from '@app/store/reducers/tasks-filter.reducers';
import * as dirHashReducer from '@app/store/reducers/dir-hash.reducers';

import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { routerReducer } from '@ngrx/router-store';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  auth: authReducer.reducer,
  administration: administrationReducer.reducer,
  directories: directoriesReducer.reducer,
  dashboard: dashboardReducer.reducer,
  queues: queuesReducer.reducer,
  preapprovedUpload: preapprovedUpload.reducer,
  tasksFilter: tasksFilterReducer.reducer,
  retailDirectories: retailDirectories.reducer,
  dirHashes: dirHashReducer.reducer
};
