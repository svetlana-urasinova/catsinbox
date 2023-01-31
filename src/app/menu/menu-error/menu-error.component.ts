import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'menu-error',
  templateUrl: './menu-error.component.html',
  styleUrls: ['./menu-error.component.scss'],
})
export class MenuErrorComponent {
  @Input() error: string | null;
}
