import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColor, ButtonType } from './types';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'styled-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public color: ButtonColor = ButtonColor.Primary;
  @Input() public disabled = false;
  @Input() public type: ButtonType = ButtonType.Button;

  @Output() public onClick: EventEmitter<MouseEvent> = new EventEmitter();

  public ButtonType = ButtonType;

  public handleClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
