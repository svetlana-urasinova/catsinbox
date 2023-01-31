import { Cat } from '../../types';
import {
  CatsActions,
  CATS_CLEAR_ERROR,
  CATS_FETCH,
  CATS_FETCH_FAILED,
  CATS_LOADED,
  CAT_CREATE,
  CAT_CREATED,
  CAT_CREATE_FAILED,
  CAT_DELETE,
  CAT_DELETED,
  CAT_DELETE_FAILED,
  CAT_SELECT,
  CAT_MOVE,
  CAT_MOVED,
  CAT_MOVE_FAILED,
  CAT_IDLE,
} from '../actions';
import { CatsState } from '../state';

const initialState: CatsState = {
  cats: [],
  selected_id: null,
  error: null,
};

export function catsReducer(
  state = initialState,
  action: CatsActions
): CatsState {
  switch (action.type) {
    case CATS_LOADED:
      return { ...state, cats: action.cats };
    case CAT_CREATED:
      return { ...state, cats: [...state.cats, action.cat] };
    case CAT_MOVED:
      return {
        ...state,
        cats: [
          ...state.cats.filter((cat: Cat) => cat.id !== action.cat.id),
          action.cat,
        ],
      };
    case CAT_DELETED:
      return {
        ...state,
        cats: [...state.cats.filter((cat: Cat) => cat.id !== action.id)],
      };
    case CAT_SELECT:
      return { ...state, selected_id: action.payload };
    case CATS_FETCH_FAILED:
    case CAT_CREATE_FAILED:
    case CAT_MOVE_FAILED:
    case CAT_DELETE_FAILED:
      return { ...state, error: action.error };
    case CATS_CLEAR_ERROR:
      return { ...state, error: null };
    case CATS_FETCH:
    case CAT_CREATE:
    case CAT_MOVE:
    case CAT_DELETE:
    case CAT_IDLE:
    default:
      return { ...state };
  }
}
