import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cat, CatPosition } from '../../types';
import { CatsState } from '../state';

export const getCatsState = createFeatureSelector<CatsState>('cats');

export const getCats = createSelector(
  getCatsState,
  (state: CatsState): Cat[] => state.cats
);

export const getSelectedCat = createSelector(
  getCatsState,
  (state: CatsState): Cat | null =>
    state.cats.find((cat: Cat) => cat.id === state.selected_id) ?? null
);

export const getCatsByPosition = (position: CatPosition) =>
  createSelector(getCatsState, (state: CatsState): Cat[] =>
    state.cats.filter((cat: Cat) => cat.position === position)
  );

export const getCatsError = createSelector(
  getCatsState,
  (state: CatsState): string | null => state.error
);
