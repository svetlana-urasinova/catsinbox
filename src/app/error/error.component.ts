import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ERROR_CLEAR_TIMEOUT } from '../shared/constants';
import { AppState, CatsClearError, getCatsError } from '../shared/store';

@Component({
  standalone: true,
  selector: 'app-error',
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  public error: string | null;

  private component$: Subject<void> = new Subject();

  constructor(private readonly store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store
      .select(getCatsError)
      .pipe(takeUntil(this.component$))
      .subscribe((error: string | null) => {
        this.error = error;

        if (error) {
          console.error(error);

          setTimeout(() => {
            this.store.dispatch(CatsClearError());
          }, ERROR_CLEAR_TIMEOUT);
        }
      });
  }

  public ngOnDestroy(): void {
    this.component$.next();
    this.component$.complete();
  }
}
