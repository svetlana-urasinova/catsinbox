import { createAction, props } from '@ngrx/store';
import {
  Cat,
  CatDeletePayload,
  CatError,
  CatSelectPayload,
  CatsLoadedPayload,
} from '../../types';

export const CatsFetch = createAction('[CATS] Fetch');

export const CatsLoaded = createAction(
  '[CATS] Loaded',
  props<CatsLoadedPayload>()
);

export const CatsFetchFailed = createAction(
  '[CATS] Fetch failed',
  props<CatError>()
);

export const CatCreate = createAction('[CATS] Create', props<Cat>());

export const CatCreated = createAction('[CATS] Created', props<Cat>());

export const CatCreateFailed = createAction(
  '[CATS] Creation failed',
  props<CatError>()
);
export const CatMove = createAction('[CATS] Move', props<Cat>());

export const CatFeed = createAction('[CATS] Feed');

export const CatUpdate = createAction('[CATS] Update', props<Cat>());

export const CatUpdated = createAction('[CATS] Updated', props<Cat>());

export const CatUpdateFailed = createAction(
  '[CATS] Update failed',
  props<CatError>()
);

export const CatDelete = createAction(
  '[CATS] Delete',
  props<CatDeletePayload>()
);

export const CatDeleted = createAction(
  '[CATS] Deleted',
  props<CatDeletePayload>()
);

export const CatDeleteFailed = createAction(
  '[CATS] Delete failed',
  props<CatError>()
);

export const CatSelect = createAction(
  '[CATS] Select',
  props<CatSelectPayload>()
);

export const CatsSave = createAction('[CATS] Save');

export const CatsReset = createAction('[CATS] Reset');

export const CatsClearError = createAction('[CATS] Clear error');
