import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CatGridComponent } from '../shared/components';
import { AppState, getCatsByPosition, getSelectedCat } from '../shared/store';
import { Cat, CatPosition } from '../shared/types';

@Component({
  standalone: true,
  selector: 'app-bed',
  imports: [CommonModule, CatGridComponent],
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss'],
})
export class BedComponent implements OnInit, OnDestroy {
  public cats: Cat[] = [];
  public selected: Cat | null = null;

  private component$: Subject<void> = new Subject();

  constructor(private readonly store: Store<AppState>) {}

  public ngOnInit() {
    this.store
      .select(getCatsByPosition(CatPosition.Bed))
      .pipe(takeUntil(this.component$))
      .subscribe((cats: Cat[]) => (this.cats = cats));

    this.store
      .select(getSelectedCat)
      .pipe(takeUntil(this.component$))
      .subscribe((selected: Cat | null) => (this.selected = selected));
  }

  public ngOnDestroy(): void {
    this.component$.next();
    this.component$.complete();
  }
}
