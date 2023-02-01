import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CatComponent } from '../../shared/components';
import { ModalConfirmComponent } from '../../shared/components/modal/modal-confirm/modal-conrifm.component';
import { Cat } from '../../shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, ModalConfirmComponent, CatComponent],
  templateUrl: './modal-reset-cats.component.html',
  styleUrls: ['./modal-reset-cats.component.scss'],
})
export class ModalResetCatsComponent {
  @Input() public data: { cats: Cat[] };
}
