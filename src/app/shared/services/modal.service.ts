import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ModalData } from '../types';

@Injectable({ providedIn: 'root' })
export class ModalService {
  public modal: EventEmitter<ModalData> = new EventEmitter();

  public result$: Subject<any> = new Subject();

  private isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private isPropagationStopped = false;

  public isOpen(): BehaviorSubject<boolean> {
    return this.isOpen$;
  }

  public open(component: any, data?: any): void {
    this.stopPropagation();
    this.isOpen$.next(true);
    this.modal.emit({ component, data });
  }

  public close(result?: any): void {
    if (!this.isPropagationStopped) {
      this.isOpen$.next(false);
      this.result$.next(result);
    }
  }

  private stopPropagation(): void {
    this.isPropagationStopped = true;

    setTimeout(() => {
      this.isPropagationStopped = false;
    }, 30);
  }
}
