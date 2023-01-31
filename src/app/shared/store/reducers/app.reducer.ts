import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app-state';
import * as fromCats from './cats.reducer';

export const appReducer: ActionReducerMap<AppState, any> = {
  cats: fromCats.catsReducer,
};
