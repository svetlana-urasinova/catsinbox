import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CatMood } from '../../shared/types';

@Component({
  standalone: true,
  selector: 'app-profile-emotion',
  imports: [CommonModule],
  templateUrl: './profile-emotion.component.html',
  styleUrls: ['./profile-emotion.component.scss'],
})
export class ProfileEmotionComponent implements OnInit, OnChanges {
  @Input() mood: CatMood;

  public imgPath = 'assets/img/emotions/';
  public img: string | null;

  public ngOnInit(): void {
    this.img = this.getImg();
  }

  public ngOnChanges(): void {
    this.img = this.getImg();
  }

  private getImg(): string | null {
    return this.mood !== CatMood.Neutral
      ? this.imgPath + this.mood + '.png'
      : null;
  }
}
