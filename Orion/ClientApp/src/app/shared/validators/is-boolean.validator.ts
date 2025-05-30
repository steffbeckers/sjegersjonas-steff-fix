import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function isBooleanValidator(nullable: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const checkNullable = (nullable && control.value === null);
    const bool = parseInt(control.value);
    return (bool === 0 || bool === 1 || checkNullable) ? null : {isBoolean: {value: control.value}};
  };
}
