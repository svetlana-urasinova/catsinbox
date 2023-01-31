import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent, ButtonColor } from '../..';
import { ModalService } from '../../../services';

@Component({
  selector: 'styled-modal-confirm',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent {
  @Input() public title: string;
  @Input() public id: string;

  public ButtonColor = ButtonColor;

  constructor(private readonly modalService: ModalService) {}

  public confirm(): void {
    this.modalService.close({ confirm: true, id: this.id });
  }

  public cancel(): void {
    this.modalService.close({ confirm: false });
  }
}
