import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ingredients.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IngredientsComponent),
      multi: true,
    },
  ],
  styleUrl: './ingredients.component.scss',
})
export class IngredientsComponent implements ControlValueAccessor {
  formControl = input.required<FormControl>();

  writeValue(val: string): void {}
  registerOnChange(fn: (ing: string) => void): void {}
  registerOnTouched(fn: () => void): void {}
}
