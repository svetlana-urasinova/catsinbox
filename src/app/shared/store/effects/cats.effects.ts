import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MAX_CATS_IN_BOX, MAX_CATS, HUNGER_LOW_LVL } from '../../constants';
import { CatsService } from '../../services';
import { Cat, CatDeletePayload, CatPosition } from '../../types';
import * as catsActions from '../actions';
import { getCats, getCatsByPosition, getSelectedCat } from '../selectors';
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
      ofType(catsActions.CatsFetch),
      switchMap(() => {
        return this.catsService.fetchCats().pipe(
          map((response: Cat[] | null) => {
            return catsActions.CatsLoaded({ cats: response });
          }),
          catchError((error: Error) => {
            return of(catsActions.CatsFetchFailed({ message: error.message }));
          })
        );
      })
    )
  );

  public createCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsActions.CatCreate),
      withLatestFrom(this.store.select(getCats)),
      switchMap(([payload, cats]: [Cat, Cat[]]) => {
        if (!payload.name?.length) {
          return of(
            catsActions.CatCreateFailed({
              message: 'Every cat must have a name.',
            })
          );
        }

        if (cats.find((cat: Cat) => cat.name === payload.name)) {
          return of(
            catsActions.CatCreateFailed({
              message: 'Cat with this name already exists.',
            })
          );
        }

        if (cats.length === MAX_CATS) {
          return of(
            catsActions.CatCreateFailed({
              message:
                'You cannot have so many cats! Please give one away before adopting a new one.',
            })
          );
        }

        return this.catsService.createCat(payload).pipe(
          map((response: { id: string }) => {
            const { id } = response;

            const updatedCat = new Cat({ ...payload, id });

            this.store.dispatch(catsActions.CatSelect({ id }));

            return catsActions.CatCreated(updatedCat);
          })
        );
      })
    )
  );

  public catCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catsActions.CatCreated),
        tap(() => {
          this.store.dispatch(catsActions.CatsSave());
        })
      ),
    {
      dispatch: false,
    }
  );

  public moveCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsActions.CatMove),
      withLatestFrom(this.store.select(getCatsByPosition(CatPosition.Box))),
      switchMap(([payload, catsInBox]: [Cat, Cat[]]) => {
        if (
          payload.position !== CatPosition.Box &&
          catsInBox.length === MAX_CATS_IN_BOX
        ) {
          of(catsActions.CatUpdateFailed({ message: 'The box is full!' }));
        }

        return this.catsService.moveCat(payload).pipe(
          map((response: Cat) => catsActions.CatUpdated(response)),
          catchError((error: Error) =>
            of(catsActions.CatUpdateFailed({ message: error.message }))
          )
        );
      })
    )
  );

  public feedCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsActions.CatFeed),
      withLatestFrom(this.store.select(getSelectedCat)),
      switchMap(([_, cat]: [any, Cat | null]) => {
        if (!cat) {
          return of(
            catsActions.CatUpdateFailed({ message: 'No cat is selected' })
          );
        }

        if (cat.hunger < HUNGER_LOW_LVL) {
          return of(
            catsActions.CatUpdateFailed({ message: 'This cat is not hungry.' })
          );
        }

        const updatedCat = new Cat({ ...cat });

        updatedCat.feed();

        return of(catsActions.CatUpdate(updatedCat));
      })
    )
  );

  public updateCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsActions.CatUpdate),
      switchMap((payload: Cat) => of(catsActions.CatUpdated(payload)))
    )
  );

  public catUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catsActions.CatUpdated),
        tap(() => {
          this.store.dispatch(catsActions.CatsSave());
        })
      ),
    {
      dispatch: false,
    }
  );

  public deleteCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catsActions.CatDelete),
      switchMap((payload: CatDeletePayload) => {
        return this.catsService.deleteCat(payload).pipe(
          map((id: string) => catsActions.CatDeleted({ id })),
          catchError((error: Error) =>
            of(catsActions.CatDeleteFailed({ message: error.message }))
          )
        );
      })
    )
  );

  public catDeleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catsActions.CatDeleted),
        tap(() => {
          this.store.dispatch(catsActions.CatsSave());
        })
      ),
    {
      dispatch: false,
    }
  );

  public saveCats$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catsActions.CatsSave),
        withLatestFrom(this.store.select(getCats)),
        tap(([_, cats]: [any, Cat[]]) => {
          this.catsService.saveToLocalStorage(cats);
        })
      ),
    { dispatch: false }
  );

  public resetCats$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catsActions.CatsReset),
        tap(() => this.store.dispatch(catsActions.CatsSave()))
      ),
    { dispatch: false }
  );
}
