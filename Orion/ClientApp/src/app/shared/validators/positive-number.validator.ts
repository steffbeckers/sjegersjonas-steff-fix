import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function positiveNumberValidator(maxValue: number = 2147483647): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const number = parseFloat(control.value);
    return (isNaN(control.value) || (number < 0 && number > maxValue)) ? {positiveNumber: {value: control.value, maxValue}} : null;
  };
}
