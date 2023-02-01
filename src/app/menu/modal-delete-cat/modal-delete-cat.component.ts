import { Component, Input } from '@angular/core';
import {
  CatIconComponent,
  ModalConfirmComponent,
} from '../../shared/components';
import { Cat } from '../../shared/types';

@Component({
  standalone: true,
  imports: [ModalConfirmComponent, CatIconComponent],
  templateUrl: './modal-delete-cat.component.html',
  styleUrls: ['./modal-delete-cat.component.scss'],
})
export class ModalDeleteCatComponent {
  @Input() public data: { cat: Cat };
}
