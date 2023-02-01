import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MAX_CATS_IN_BOX, MAX_CATS, HUNGER_LOW_LVL } from '../../constants';
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
  CatMove,
  CAT_CREATE,
  CAT_DELETE,
  CAT_MOVE,
  CAT_SAVE,
  CatSave,
  CAT_CREATED,
  CAT_DELETED,
  CATS_RESET,
  CAT_UPDATED,
  CatUpdateFailed,
  CatUpdated,
  CAT_UPDATE,
  CatUpdate,
  CAT_FEED,
} from '../actions';
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
      ofType(CATS_FETCH),
      switchMap(() => {
        return this.catsService.fetchCats().pipe(
          map((response: Cat[] | null) => {
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
        if (cats.find((cat: Cat) => cat.name === action.cat.name)) {
          return of(new CatCreateFailed('Cat with this name already exists.'));
        }

        if (!action.cat.name || !action.cat.name.length) {
          return of(new CatCreateFailed('Every cat must have a name.'));
        }

        if (cats.length === MAX_CATS) {
          return of(
            new CatCreateFailed(
              'You are not allowed to have so many cats! Please give one away before adopting a new one.'
            )
          );
        }

        return this.catsService.createCat(action.cat).pipe(
          map((response: { id: string }) => {
            const { id } = response;

            const updatedCat = new Cat({ ...action.cat, id });

            this.store.dispatch(new CatSelect(id));

            return new CatCreated(updatedCat);
          }),
          catchError((error: any) => of(new CatCreateFailed(error.message)))
        );
      })
    )
  );

  public catCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CAT_CREATED),
        tap(() => {
          this.store.dispatch(new CatSave());
        })
      ),
    {
      dispatch: false,
    }
  );

  public moveCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CAT_MOVE),
      withLatestFrom(this.store.select(getCatsByPosition(CatPosition.Box))),
      switchMap(([action, catsInBox]: [CatMove, Cat[]]) => {
        if (
          action.cat.position !== CatPosition.Box &&
          catsInBox.length === MAX_CATS_IN_BOX
        ) {
          of(new CatUpdateFailed('The box is full!'));
        }

        return this.catsService.moveCat(action.cat).pipe(
          map((response: Cat) => new CatUpdated(response)),
          catchError((error: any) => of(new CatUpdateFailed(error.message)))
        );
      })
    )
  );

  public feedCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CAT_FEED),
      withLatestFrom(this.store.select(getSelectedCat)),
      switchMap(([_, cat]: [CatMove, Cat | null]) => {
        if (!cat) {
          return of(new CatUpdateFailed('No cat is selected'));
        }

        if (cat.hunger < HUNGER_LOW_LVL) {
          return of(new CatUpdateFailed('This cat is not hungry.'));
        }

        const updatedCat = new Cat({ ...cat });
        updatedCat.feed();

        return of(new CatUpdate(updatedCat));
      })
    )
  );

  public updateCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CAT_UPDATE),
      switchMap((action: CatUpdate) => of(new CatUpdated(action.cat)))
    )
  );

  public catUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CAT_UPDATED),
        tap(() => {
          this.store.dispatch(new CatSave());
        })
      ),
    {
      dispatch: false,
    }
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

  public catDeleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CAT_DELETED),
        tap(() => {
          this.store.dispatch(new CatSave());
        })
      ),
    {
      dispatch: false,
    }
  );

  public saveCat$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CAT_SAVE),
        withLatestFrom(this.store.select(getCats)),
        tap(([_, cats]: [CatSave, Cat[]]) => {
          this.catsService.saveToLocalStorage(cats);
        })
      ),
    { dispatch: false }
  );

  public resetCats$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CATS_RESET),
        tap(() => this.store.dispatch(new CatSave()))
      ),
    { dispatch: false }
  );
}
