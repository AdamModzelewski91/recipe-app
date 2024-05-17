import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

export function minLengthArray(min: number): ValidatorFn | any {
  return (control: AbstractControl[]) => {
    if (!(control instanceof FormArray)) return;
    return control.length < min ? { minLength: true } : null;
  };
}
