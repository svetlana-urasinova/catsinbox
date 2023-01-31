import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MAX_MOVE_TIMEOUT_SEC, MIN_MOVE_TIMEOUT_SEC } from '../../constants';
import { AppState, CatMove } from '../../store';
import { Cat } from '../../types';

@Component({
  standalone: true,
  selector: 'cat',
  imports: [CommonModule],
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent implements OnInit, OnDestroy {
  @Input() public cat: Cat;
  @Input() public selected = false;

  public imgPath = 'assets/img/cats/';

  private timeoutId: NodeJS.Timeout;

  constructor(private readonly store: Store<AppState>) {}

  public ngOnInit(): void {
    this.moveRandomly();
  }

  public ngOnDestroy(): void {
    this.stop();
  }

  private moveRandomly(): void {
    const timeout = this.getRandomMoveTimeoutMs();

    this.timeoutId = setTimeout(() => {
      this.store.dispatch(new CatMove({ cat: this.cat, force: true }));
    }, timeout);
  }

  private stop(): void {
    clearTimeout(this.timeoutId);
  }

  private getRandomMoveTimeoutMs(): number {
    return (
      (Math.floor(
        Math.random() * (MAX_MOVE_TIMEOUT_SEC - MIN_MOVE_TIMEOUT_SEC)
      ) +
        MIN_MOVE_TIMEOUT_SEC) *
      1000
    );
  }
}
