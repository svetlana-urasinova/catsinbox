import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { BedComponent } from './bed/bed.component';
import { BoxComponent } from './box/box.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './shared/components';
import { MAX_TICKS_NUMBER, TICK_TIMEOUT } from './shared/constants';
import { AppState, CatsFetch, CatUpdate, getCats } from './shared/store';
import { Cat, CatAction } from './shared/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BedComponent,
    BoxComponent,
    ProfileComponent,
    MenuComponent,
    ErrorComponent,
    FooterComponent,
    ModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Cats in box';

  public tick = 0;

  private cats: Cat[];

  private loopTimeoutId: NodeJS.Timeout;

  private component$: Subject<void> = new Subject();

  constructor(private readonly store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store.dispatch(CatsFetch());

    this.store
      .select(getCats)
      .pipe(takeUntil(this.component$))
      .subscribe((cats: Cat[]) => {
        this.cats = cats;
      });

    this.startLoop();
  }

  public ngOnDestroy(): void {
    this.endLoop();

    this.component$.next();
    this.component$.complete();
  }

  private startLoop(): void {
    this.loopTimeoutId = setInterval(() => {
      this.nextTick();
    }, TICK_TIMEOUT);
  }

  private endLoop(): void {
    clearInterval(this.loopTimeoutId);
  }

  private nextTick(): void {
    this.tick = ++this.tick % MAX_TICKS_NUMBER;

    for (const cat of this.cats) {
      let updatedCat = cat;

      updatedCat = this.moveCat(updatedCat);
      updatedCat = this.starveCat(updatedCat);
      updatedCat.updateCurrentMood();

      this.store.dispatch(CatUpdate(updatedCat));
    }
  }

  private moveCat(cat: Cat): Cat {
    const updatedCat = new Cat({ ...cat });

    const ticksUntilMove = updatedCat.getTicksUntilAction(CatAction.Move);

    if (ticksUntilMove > 0) {
      updatedCat.setTicksUntilAction(CatAction.Move, ticksUntilMove - 1);

      return updatedCat;
    }

    updatedCat.move();

    return updatedCat;
  }

  private starveCat(cat: Cat): Cat {
    const updatedCat = new Cat({ ...cat });

    const ticksUntilStarve = updatedCat.getTicksUntilAction(CatAction.Starve);

    if (ticksUntilStarve > 0) {
      updatedCat.setTicksUntilAction(CatAction.Starve, ticksUntilStarve - 1);

      return updatedCat;
    }

    updatedCat.starve();

    return updatedCat;
  }
}
