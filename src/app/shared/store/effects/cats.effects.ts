import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MAX_CATS_IN_BOX, MAX_CATS } from '../../constants';
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
  CatMoved,
  CatMoveFailed,
  CAT_CREATE,
  CAT_DELETE,
  CAT_MOVE,
  CatIdle,
  CAT_SAVE,
  CatSave,
  CAT_CREATED,
  CAT_MOVED,
  CAT_DELETED,
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

        if (cats.length === MAX_CATS) {
          return of(
            new CatCreateFailed(
              'You are not allowed to have so many cats! Please give one away before adopting a new one.'
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
        const { cat, force } = action.payload;
        if (
          cat.position !== CatPosition.Box &&
          catsInBox.length === MAX_CATS_IN_BOX
        ) {
          return force
            ? of(new CatIdle())
            : of(new CatMoveFailed('The box is full!'));
        }

        return this.catsService.updateCat(action.payload).pipe(
          map((response: Cat) => new CatMoved(response)),
          catchError((error: any) => of(new CatMoveFailed(error.message)))
        );
      })
    )
  );

  public catMoved$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CAT_MOVED),
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
}
