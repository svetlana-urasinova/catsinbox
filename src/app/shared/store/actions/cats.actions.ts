import { Action } from '@ngrx/store';
import {
  Cat,
  CatCreatePayload,
  CatDeletePayload,
  CatMovePayload,
} from '../../types';

export const CATS_FETCH = '[CATS] Fetch';
export const CATS_LOADED = '[CATS] Loaded';
export const CATS_FETCH_FAILED = '[CATS] Fetch failed';
export const CAT_CREATE = '[CATS] Create';
export const CAT_CREATED = '[CATS] Created';
export const CAT_CREATE_FAILED = '[CATS] Creation failed';
export const CAT_MOVE = '[CATS] Move';
export const CAT_MOVED = '[CATS] Moved';
export const CAT_MOVE_FAILED = '[CATS] Move failed';
export const CAT_DELETE = '[CATS] Delete';
export const CAT_DELETED = '[CATS] Deleted';
export const CAT_DELETE_FAILED = '[CATS] Delete failed';
export const CAT_SELECT = '[CATS] Select';
export const CAT_IDLE = '[CATS] Idle';
export const CAT_SAVE = '[CATS] Save';
export const CATS_CLEAR_ERROR = '[CATS] Clear error';

export class CatsFetch implements Action {
  readonly type = CATS_FETCH;
}

export class CatsLoaded implements Action {
  readonly type = CATS_LOADED;

  constructor(public cats: Cat[]) {}
}

export class CatsFetchFailed implements Action {
  readonly type = CATS_FETCH_FAILED;

  constructor(public error: string) {}
}

export class CatCreate implements Action {
  readonly type = CAT_CREATE;

  constructor(public payload: CatCreatePayload) {}
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

  constructor(public payload: CatMovePayload) {}
}

export class CatMoved implements Action {
  readonly type = CAT_MOVED;

  constructor(public cat: Cat) {}
}

export class CatMoveFailed implements Action {
  readonly type = CAT_MOVE_FAILED;

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

export class CatIdle implements Action {
  readonly type = CAT_IDLE;
}

export class CatSave implements Action {
  readonly type = CAT_SAVE;
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
  | CatMoved
  | CatMoveFailed
  | CatDelete
  | CatDeleted
  | CatDeleteFailed
  | CatSelect
  | CatIdle
  | CatSave
  | CatsClearError;
