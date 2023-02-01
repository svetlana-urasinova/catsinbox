import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  Cat,
  CatCreatePayload,
  CatDeletePayload,
  CatMovePayload,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  public fetchCats(): Observable<Cat[] | null> {
    const showError = this.getRandomNumber(10) === 1;

    if (showError) {
      return throwError(
        () => new Error('Cannot fetch cats. Try to reload the page.')
      );
    }

    return of(this.getFromLocalStorage());
  }

  public createCat(payload: CatCreatePayload): Observable<Cat> {
    const cat = new Cat(payload);

    return of(cat);
  }

  public updateCat(payload: CatMovePayload): Observable<Cat> {
    const { cat, force } = payload;

    if (!force) {
      const showError = this.getRandomNumber(5) === 1;

      if (showError) {
        return throwError(
          () => new Error("Cat doesn't want to move. Please try again.")
        );
      }
    }

    const updatedCat = new Cat(cat);
    updatedCat.move();

    return of(updatedCat);
  }

  public deleteCat(payload: CatDeletePayload): Observable<string> {
    const showError = this.getRandomNumber(3) === 1;

    if (showError) {
      return throwError(
        () => new Error(`You love your cat too much to give it away.`)
      );
    }

    return of(payload.id);
  }

  public getFromLocalStorage(): Cat[] | null {
    const cats = localStorage.getItem('cats');

    if (!cats) {
      return null;
    }

    return <Cat[]>JSON.parse(cats);
  }

  public saveToLocalStorage(cats: Cat[]): void {
    localStorage.setItem('cats', JSON.stringify(cats));
  }

  private getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
