import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cat } from '../../types';

@Component({
  standalone: true,
  selector: 'cat',
  imports: [CommonModule],
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent {
  @Input() public cat: Cat;
  @Input() public selected = false;

  public imgPath = 'assets/img/cats/';
}
