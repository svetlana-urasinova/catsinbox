import { v5 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Cat, CatDeletePayload } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  // this class emulates http requests

  public fetchCats(): Observable<Cat[] | null> {
    const showError = this.getRandomNumber(10) === 1;

    if (showError) {
      return throwError(
        () => new Error('Cannot fetch cats. Try to reload the page.')
      );
    }

    return of(this.getFromLocalStorage());
  }

  public createCat(cat: Cat): Observable<{ id: string }> {
    const id = this.generateId(cat.name);

    return of({ id });
  }

  public moveCat(cat: Cat): Observable<Cat> {
    const showError = this.getRandomNumber(5) === 1;

    if (showError) {
      return throwError(
        () => new Error("Cat doesn't want to move. Please try again.")
      );
    }

    return of(cat);
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

    return <Cat[]>(
      JSON.parse(cats).map((catPayload: Cat) => new Cat(catPayload))
    );
  }

  public saveToLocalStorage(cats: Cat[]): void {
    localStorage.setItem('cats', JSON.stringify(cats));
  }

  private generateId(name: string): string {
    return uuid(name + Date.now().toString(), uuid.DNS);
  }

  private getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
