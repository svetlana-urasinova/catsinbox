import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, CatSelect } from '../../store';
import { Cat } from '../../types';
import { CatComponent } from '../cat/cat.component';

@Component({
  standalone: true,
  selector: 'cat-grid',
  imports: [CommonModule, CatComponent],
  templateUrl: './cat-grid.component.html',
  styleUrls: ['./cat-grid.component.scss'],
})
export class CatGridComponent {
  @Input() cats: Cat[] = [];
  @Input() selected: Cat | null;
  @Input() width = 2;

  constructor(private readonly store: Store<AppState>) {}

  public handleClick(cat: Cat): void {
    this.selected?.id === cat.id
      ? this.store.dispatch(new CatSelect(null))
      : this.store.dispatch(new CatSelect(cat.id));
  }
}
