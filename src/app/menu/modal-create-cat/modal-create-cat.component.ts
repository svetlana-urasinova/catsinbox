import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  ButtonColor,
  ButtonComponent,
  InputComponent,
  CatIconComponent,
} from '../../shared/components';
import { ModalService } from '../../shared/services';
import { Cat } from '../../shared/types';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatIconComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './modal-create-cat.component.html',
  styleUrls: ['./modal-create-cat.component.scss'],
})
export class ModalCreateCatComponent implements OnInit {
  public cat: Cat;

  public ButtonColor = ButtonColor;

  public form: UntypedFormGroup;

  public iconPath = 'assets/img/icons/';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalService: ModalService
  ) {}

  public ngOnInit() {
    this.form = this.formBuilder.group({ name: [null, [Validators.required]] });

    this.cat = new Cat({});
  }

  public save(): void {
    this.cat.name = this.form.value.name;

    this.modalService.close({ cat: this.cat });
  }

  public createRandomCat(): void {
    this.cat = new Cat({});
  }

  public cancel(): void {
    this.modalService.close();
  }
}
