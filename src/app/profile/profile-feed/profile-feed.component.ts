import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ButtonColor,
  ButtonComponent,
  ButtonType,
} from '../../shared/components';
import { AppState, CatFeed } from '../../shared/store';
import { Cat } from '../../shared/types';

@Component({
  standalone: true,
  selector: 'app-profile-feed',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent {
  @Input() selected: Cat;

  public imgPath = 'assets/img/food/';

  public ButtonColor = ButtonColor;
  public ButtonType = ButtonType;

  constructor(private store: Store<AppState>) {}

  public feed(): void {
    if (this.selected) {
      this.store.dispatch(new CatFeed(this.selected));
    }
  }
}
