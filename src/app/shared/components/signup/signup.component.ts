import { Component, computed } from '@angular/core';
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
import { NickValidationService } from '../../validators/nick-validation.service';
import { EmailValidationService } from '../../validators/email-validation.service';

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
  isLoading = computed(() => this.emailValidation.isLoading());

  form = this.nfb.group(
    {
      email: this.nfb.control('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this.emailValidation.validate.bind(this.emailValidation),
        ],
        updateOn: 'blur',
      }),
      nick: this.nfb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(8),
        ],
        asyncValidators: this.nickValidation.validate.bind(this.nickValidation),
        updateOn: 'blur',
      }),
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validators: [confirmPasswordValidator] },
  );

  constructor(
    private auth: AuthService,
    private nfb: NonNullableFormBuilder,
    private emailValidation: EmailValidationService,
    private nickValidation: NickValidationService,
  ) {}

  onSignup() {
    if (this.form.invalid) return;
    const { passwordConfirm, ...data } = this.form.getRawValue();
    this.auth.signup(data);
  }
}
