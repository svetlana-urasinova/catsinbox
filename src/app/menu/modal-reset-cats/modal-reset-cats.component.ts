import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  CatIconComponent,
  ModalConfirmComponent,
} from '../../shared/components';
import { Cat } from '../../shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, ModalConfirmComponent, CatIconComponent],
  templateUrl: './modal-reset-cats.component.html',
  styleUrls: ['./modal-reset-cats.component.scss'],
})
export class ModalResetCatsComponent {
  @Input() public data: { cats: Cat[] };
}
