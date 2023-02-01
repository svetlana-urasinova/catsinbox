import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cat, CatMood } from '../../types';
import { CatIconComponent } from './cat-icon/cat-icon.component';

@Component({
  standalone: true,
  selector: 'cat',
  imports: [CommonModule, CatIconComponent],
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent {
  @Input() public cat: Cat;
  @Input() public selected = false;

  public CatMood = CatMood;
}
