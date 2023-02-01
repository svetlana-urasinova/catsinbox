import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { ButtonColor, ButtonComponent, ButtonType } from '../shared/components';
import { ModalService } from '../shared/services';
import {
  AppState,
  CatCreate,
  CatDelete,
  CatsClearError,
  CatSelect,
  getSelectedCat,
  getCats,
  CatsReset,
  CatMove,
} from '../shared/store';
import { Cat, CatPosition } from '../shared/types';
import { ErrorComponent } from '../error/error.component';
import { ModalCreateCatComponent } from './modal-create-cat/modal-create-cat.component';
import { ModalDeleteCatComponent } from './modal-delete-cat/modal-delete-cat.component';
import { ModalResetCatsComponent } from './modal-reset-cats/modal-reset-cats.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ErrorComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  public selected: Cat | null = null;
  public cats: Cat[] = [];

  public iconPath = 'assets/img/icons/';

  public CatPosition = CatPosition;

  public ButtonColor = ButtonColor;
  public ButtonType = ButtonType;

  private component$: Subject<void> = new Subject();

  constructor(
    private readonly modalService: ModalService,
    private readonly store: Store<AppState>
  ) {}

  public ngOnInit() {
    this.store
      .select(getSelectedCat)
      .pipe(takeUntil(this.component$))
      .subscribe((selected: Cat | null) => {
        this.selected = selected;
      });

    this.store
      .select(getCats)
      .pipe(takeUntil(this.component$))
      .subscribe((cats: Cat[]) => {
        this.cats = cats;
      });
  }

  public ngOnDestroy(): void {
    this.component$.next();
    this.component$.complete();
  }

  public handleCreate(): void {
    this.clearError();

    this.store.dispatch(new CatSelect(null));

    this.modalService.open(ModalCreateCatComponent);

    this.modalService.result$
      .pipe(take(1), takeUntil(this.component$))
      .subscribe((result?: { cat: Cat }) => {
        if (result?.cat) {
          this.store.dispatch(new CatCreate(result.cat));
        }
      });
  }

  public handleMove(): void {
    if (!this.selected) {
      return;
    }

    const updatedCat = new Cat({ ...this.selected });
    updatedCat.move();

    this.clearError();

    this.store.dispatch(new CatMove(updatedCat));
  }

  public handleDelete(): void {
    if (!this.selected?.id) {
      return;
    }

    this.clearError();

    const cat = this.selected;
    const id = this.selected.id;

    this.modalService.open(ModalDeleteCatComponent, { cat });

    this.modalService.result$
      .pipe(take(1), takeUntil(this.component$))
      .subscribe((result?: { confirm: boolean }) => {
        if (result?.confirm) {
          this.store.dispatch(new CatDelete({ id }));
        }
      });
  }

  public handleReset(): void {
    this.modalService.open(ModalResetCatsComponent, { cats: this.cats });

    this.modalService.result$
      .pipe(take(1), takeUntil(this.component$))
      .subscribe((result?: { confirm: boolean }) => {
        if (result?.confirm) {
          this.store.dispatch(new CatsReset());
        }
      });
  }

  private clearError(): void {
    this.store.dispatch(new CatsClearError());
  }
}
