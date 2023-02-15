import { createReducer, on } from '@ngrx/store';
import {
  Cat,
  CatBreed,
  CatDeletePayload,
  CatError,
  CatSelectPayload,
  CatsLoadedPayload,
} from '../../types';
import * as catsActions from '../actions';
import { CatsState } from '../state';

const initialCatsState: CatsState = {
  cats: [
    new Cat({ name: 'Harry', breed: CatBreed.ScottishFold, id: '1' }),
    new Cat({ name: 'Hermione', breed: CatBreed.Siamese, id: '2' }),
    new Cat({ name: 'Ron', breed: CatBreed.Persian, id: '3' }),
  ],
  selected_id: null,
  error: null,
};

export const catsReducer = createReducer(
  initialCatsState,

  on(catsActions.CatsLoaded, (state: CatsState, payload: CatsLoadedPayload) => {
    return { ...state, cats: payload.cats ?? initialCatsState.cats };
  }),

  on(catsActions.CatCreated, (state: CatsState, payload: Cat) => {
    return { ...state, cats: [...state.cats, payload] };
  }),

  on(catsActions.CatUpdated, (state: CatsState, payload: Cat) => {
    return {
      ...state,
      cats: [
        ...state.cats.filter((cat: Cat) => cat.id !== payload.id),
        payload,
      ],
    };
  }),

  on(catsActions.CatDeleted, (state: CatsState, payload: CatDeletePayload) => {
    return {
      ...state,
      cats: [...state.cats.filter((cat: Cat) => cat.id !== payload.id)],
    };
  }),

  on(catsActions.CatSelect, (state: CatsState, payload: CatSelectPayload) => {
    return { ...state, selected_id: payload.id };
  }),

  on(
    catsActions.CatsFetch,
    catsActions.CatCreate,
    catsActions.CatMove,
    catsActions.CatFeed,
    catsActions.CatUpdate,
    catsActions.CatDelete,
    catsActions.CatsSave,
    (state: CatsState) => {
      return { ...state };
    }
  ),

  on(catsActions.CatsFetchFailed, (state: CatsState, payload: CatError) => {
    return { ...state, cats: [], error: payload.message };
  }),

  on(
    catsActions.CatCreateFailed,
    catsActions.CatUpdateFailed,
    catsActions.CatDeleteFailed,
    (state: CatsState, payload: CatError) => {
      return { ...state, error: payload.message };
    }
  ),

  on(catsActions.CatsClearError, (state: CatsState) => {
    return { ...state, error: null };
  }),

  on(catsActions.CatsReset, () => {
    return { ...initialCatsState };
  })
);
