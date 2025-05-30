import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {StringHelper} from "../helpers/string.helper";

export function EmptyStringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return StringHelper.isEmptyOrNull(control.value) ? {emptyString: {value: control.value}} : null;
  };
}
