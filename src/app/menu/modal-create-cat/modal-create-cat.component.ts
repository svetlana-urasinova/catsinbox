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
  CatComponent,
  InputComponent,
} from '../../shared/components';
import { ModalService } from '../../shared/services';
import { Cat, CatCreatePayload } from '../../shared/types';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatComponent,
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
    const payload: CatCreatePayload = { ...this.cat, ...this.form.value };

    this.modalService.close({ payload });
  }

  public createRandomCat(): void {
    this.cat = new Cat({});
  }

  public cancel(): void {
    this.modalService.close();
  }
}
