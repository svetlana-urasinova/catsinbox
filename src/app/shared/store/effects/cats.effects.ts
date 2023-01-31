import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { MAX_CATS_IN_BOX_NUMBER, MAX_CATS_NUMBER } from '../../constants';
import { CatsService } from '../../services';
import { Cat, CatPosition } from '../../types';
import {
  CatCreate,
  CatCreated,
  CatCreateFailed,
  CatDelete,
  CatDeleted,
  CatDeleteFailed,
  CatSelect,
  CatsFetchFailed,
  CatsLoaded,
  CATS_FETCH,
  CatUpdate,
  CatUpdated,
  CatUpdateFailed,
  CAT_CREATE,
  CAT_DELETE,
  CAT_UPDATE,
} from '../actions';
import { getCats, getCatsByPosition } from '../selectors';
import { AppState } from '../state';

@Injectable()
export class CatsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly catsService: CatsService,
    private readonly store: Store<AppState>
  ) {}

  public fetchCats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CATS_FETCH),
      switchMap(() => {
        return this.catsService.fetchCats().pipe(
          map((response: Cat[]) => {
            return new CatsLoaded(response);
          }),
          catchError((error: any) => {
            return of(new CatsFetchFailed(error.message));
          })
        );
      })
    )
  );

  public createCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CAT_CREATE),
      withLatestFrom(this.store.select(getCats)),
      switchMap(([action, cats]: [CatCreate, Cat[]]) => {
        if (cats.find((cat: Cat) => cat.name === action.payload.name)) {
          return of(new CatCreateFailed('Cat with this name already exists.'));
        }

        if (cats.length === MAX_CATS_NUMBER) {
          return of(
            new CatCreateFailed(
              'You are not allowed have so many cats! Please give one away before adopting a new one.'
            )
          );
        }

        return this.catsService.createCat(action.payload).pipe(
          map((response: Cat) => {
            this.store.dispatch(new CatSelect(response.id));

            return new CatCreated(response);
          }),
          catchError((error: any) => of(new CatCreateFailed(error.message)))
        );
      })
    )
  );

  public updateCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CAT_UPDATE),
      withLatestFrom(this.store.select(getCatsByPosition(CatPosition.Box))),
      switchMap(([action, catsInBox]: [CatUpdate, Cat[]]) => {
        if (
          action.cat.position !== CatPosition.Box &&
          catsInBox.length === MAX_CATS_IN_BOX_NUMBER
        ) {
          return of(new CatUpdateFailed('The box is full!'));
        }

        return this.catsService.updateCat(action.cat).pipe(
          map((response: Cat) => new CatUpdated(response)),
          catchError((error: any) => of(new CatUpdateFailed(error.message)))
        );
      })
    )
  );

  public deleteCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CAT_DELETE),
      switchMap((action: CatDelete) => {
        return this.catsService.deleteCat(action.payload).pipe(
          map((response: string) => new CatDeleted(response)),
          catchError((error: any) => of(new CatDeleteFailed(error.message)))
        );
      })
    )
  );
}
