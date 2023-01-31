import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BedComponent } from './bed/bed.component';
import { BoxComponent } from './box/box.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './shared/components';
import { AppState, CatsFetch } from './shared/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BedComponent,
    BoxComponent,
    ProfileComponent,
    MenuComponent,
    ErrorComponent,
    FooterComponent,
    ModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Cats in box';

  constructor(private readonly store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new CatsFetch());
  }
}
