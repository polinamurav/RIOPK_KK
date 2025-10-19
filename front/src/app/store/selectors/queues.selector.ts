import { IAppState } from '@app/store/state/app.state';
import { QueuesState } from '@app/_models';
import { createSelector } from '@ngrx/store';

const selectQueues = (state: IAppState) => state.queues;

export const selectArchive = createSelector(
  selectQueues,
  (state: QueuesState) => state.archive
);

export const selectUserTasks = createSelector(
  selectQueues,
  (state: QueuesState) => state.userTasks
);

export const selectDecline = createSelector(
  selectQueues,
  (state: QueuesState) => state.decline
);

export const selectError = createSelector(
  selectQueues,
  (state: QueuesState) => state.error
);

export const selectAll = createSelector(
  selectQueues,
  (state: QueuesState) => state.all
);

export const selectMonitoring = createSelector(
  selectQueues,
  (state: QueuesState) => state.monitoring
);
