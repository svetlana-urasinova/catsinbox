import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs';
import { ModalData } from '../../types';
import { ButtonColor, ButtonComponent, ButtonType } from '..';
import { ModalService } from '../../services';

@Component({
  selector: 'styled-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { read: ViewContainerRef })
  public modalBody: ViewContainerRef;

  public isOpen$: Observable<boolean>;
  public animate = false;

  public ButtonColor = ButtonColor;
  public ButtonType = ButtonType;

  private component$: Subject<void> = new Subject();

  @HostListener('document:click', ['$event'])
  public handleClick($event: MouseEvent): void {
    const target = $event.target as HTMLElement;

    if (target.contains(this.modalBody?.element.nativeElement)) {
      this.close();
    }
  }

  constructor(
    private readonly modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.isOpen$ = this.modalService.isOpen();

    this.modalService.modal
      .pipe(takeUntil(this.component$))
      .subscribe((component: any) => {
        if (!component) {
          this.animate = false;
          this.close();

          return;
        }

        this.animate = true;
        this.createModalBody(component);
      });
  }

  public ngOnDestroy(): void {
    this.component$.next();
    this.component$.complete();
  }

  public close() {
    this.modalService.close();
  }

  public createModalBody(modalData: ModalData): void {
    const { component, data } = modalData;

    this.changeDetectorRef.detectChanges();

    this.modalBody.clear();

    const modalBodyRef = this.modalBody.createComponent(component);

    if (data) {
      modalBodyRef.setInput('data', data);
    }
  }
}
