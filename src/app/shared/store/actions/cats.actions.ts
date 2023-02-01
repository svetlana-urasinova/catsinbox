import { Action } from '@ngrx/store';
import { Cat, CatDeletePayload } from '../../types';

export const CATS_FETCH = '[CATS] Fetch';
export const CATS_LOADED = '[CATS] Loaded';
export const CATS_FETCH_FAILED = '[CATS] Fetch failed';
export const CAT_CREATE = '[CATS] Create';
export const CAT_CREATED = '[CATS] Created';
export const CAT_CREATE_FAILED = '[CATS] Creation failed';
export const CAT_MOVE = '[CATS] Move';
export const CAT_FEED = '[CATS] Feed';
export const CAT_UPDATE = '[CATS] Update';
export const CAT_UPDATED = '[CATS] Updated';
export const CAT_UPDATE_FAILED = '[CATS] Update failed';
export const CAT_DELETE = '[CATS] Delete';
export const CAT_DELETED = '[CATS] Deleted';
export const CAT_DELETE_FAILED = '[CATS] Delete failed';
export const CAT_SELECT = '[CATS] Select';
export const CAT_SAVE = '[CATS] Save';
export const CATS_RESET = '[CATS] Reset';
export const CATS_CLEAR_ERROR = '[CATS] Clear error';

export class CatsFetch implements Action {
  readonly type = CATS_FETCH;
}

export class CatsLoaded implements Action {
  readonly type = CATS_LOADED;

  constructor(public cats: Cat[] | null) {}
}

export class CatsFetchFailed implements Action {
  readonly type = CATS_FETCH_FAILED;

  constructor(public error: string) {}
}

export class CatCreate implements Action {
  readonly type = CAT_CREATE;

  constructor(public cat: Cat) {}
}

export class CatCreated implements Action {
  readonly type = CAT_CREATED;

  constructor(public cat: Cat) {}
}

export class CatCreateFailed implements Action {
  readonly type = CAT_CREATE_FAILED;

  constructor(public error: string) {}
}

export class CatMove implements Action {
  readonly type = CAT_MOVE;

  constructor(public cat: Cat) {}
}

export class CatFeed implements Action {
  readonly type = CAT_FEED;

  constructor(public cat: Cat) {}
}

export class CatUpdate implements Action {
  readonly type = CAT_UPDATE;

  constructor(public cat: Cat) {}
}

export class CatUpdated implements Action {
  readonly type = CAT_UPDATED;

  constructor(public cat: Cat) {}
}

export class CatUpdateFailed implements Action {
  readonly type = CAT_UPDATE_FAILED;

  constructor(public error: string) {}
}

export class CatDelete implements Action {
  readonly type = CAT_DELETE;

  constructor(public payload: CatDeletePayload) {}
}

export class CatDeleted implements Action {
  readonly type = CAT_DELETED;

  constructor(public id: string) {}
}

export class CatDeleteFailed implements Action {
  readonly type = CAT_DELETE_FAILED;

  constructor(public error: string) {}
}

export class CatSelect implements Action {
  readonly type = CAT_SELECT;

  constructor(public payload: string | null) {}
}

export class CatSave implements Action {
  readonly type = CAT_SAVE;
}

export class CatsReset implements Action {
  readonly type = CATS_RESET;
}

export class CatsClearError implements Action {
  readonly type = CATS_CLEAR_ERROR;
}

export type CatsActions =
  | CatsFetch
  | CatsLoaded
  | CatsFetchFailed
  | CatCreate
  | CatCreated
  | CatCreateFailed
  | CatMove
  | CatFeed
  | CatUpdate
  | CatUpdated
  | CatUpdateFailed
  | CatDelete
  | CatDeleted
  | CatDeleteFailed
  | CatSelect
  | CatSave
  | CatsReset
  | CatsClearError;
