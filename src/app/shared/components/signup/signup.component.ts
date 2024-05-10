import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from '../../validators/confirm-password';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form = this.nfb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      nick: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(8)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validators: [confirmPasswordValidator] },
  );

  constructor(
    private auth: AuthService,
    private nfb: NonNullableFormBuilder,
  ) {}

  onSignup() {
    if (this.form.invalid) return;
    const { passwordConfirm, ...data } = this.form.getRawValue();
    this.auth.signup(data);
  }
}
