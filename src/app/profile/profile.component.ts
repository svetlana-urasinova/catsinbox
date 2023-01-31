import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CatComponent } from '../shared/components';
import { AppState, getSelectedCat } from '../shared/store';
import { Cat, CatBreedMap } from '../shared/types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CatComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public selected: Cat | null;
  public breedName: string | undefined;

  private component$: Subject<void> = new Subject();

  constructor(private store: Store<AppState>) {}

  public ngOnInit() {
    this.store
      .select(getSelectedCat)
      .pipe(takeUntil(this.component$))
      .subscribe((selected: Cat | null) => {
        this.selected = selected;

        if (selected?.breed) {
          this.breedName = CatBreedMap.get(selected.breed);
        }
      });
  }

  public ngOnDestroy(): void {
    this.component$.next();
    this.component$.complete();
  }
}
