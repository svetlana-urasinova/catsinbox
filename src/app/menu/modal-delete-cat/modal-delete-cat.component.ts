import { Component, Input } from '@angular/core';
import { CatComponent } from '../../shared/components';
import { ModalConfirmComponent } from '../../shared/components/modal/modal-confirm/modal-conrifm.component';
import { Cat } from '../../shared/types';

@Component({
  standalone: true,
  imports: [ModalConfirmComponent, CatComponent],
  templateUrl: './modal-delete-cat.component.html',
  styleUrls: ['./modal-delete-cat.component.scss'],
})
export class ModalDeleteCatComponent {
  @Input() public data: { cat: Cat };
}
