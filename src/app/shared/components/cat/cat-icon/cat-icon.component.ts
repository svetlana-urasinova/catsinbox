import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Cat } from '../../../types';

@Component({
  standalone: true,
  selector: 'cat-icon',
  imports: [CommonModule],
  templateUrl: './cat-icon.component.html',
  styleUrls: ['./cat-icon.component.scss'],
})
export class CatIconComponent implements OnInit {
  @Input() public cat: Cat;
  @Input() public selected = false;

  public imgPath = 'assets/img/cats/';

  constructor() {}

  ngOnInit() {}
}
