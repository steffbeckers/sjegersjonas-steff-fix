import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function idValidator(): ValidatorFn {
  // return (control: AbstractControl): ValidationErrors | null => { // for int
  //   let isNumber = /^\d+$/.test(control.value);
  //   const id = parseInt(control.value);
  //   return (isNumber && !isNaN(id) && Number.isInteger(id) && id > 0) ? null : {id: {value: control.value}};
  // };
  return (control: AbstractControl): ValidationErrors | null => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(control.value) ? null : {id: {value: control.value}};
  };
}
