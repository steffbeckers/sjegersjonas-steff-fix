import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ValidatorErrorService {
  public getValidationMessage(key: string, value: any): string {
    switch(key) {
      case 'maxlength':
        return this.handleMaxLength(value);
        break;
    }
    // Search static messages
    if(key in this.staticErrorMessages) {
      return this.staticErrorMessages.id;
    }
    // Default
    console.log('key', key);
    console.log('value', value);
    return 'This field is required..'
  }

  private staticErrorMessages = {
    'id':             'This field is required.',
    'emptyString':    'This field is required.',
    'positiveNumber': 'This field must be a positive number.',
    'isBoolean': 'This field is required.',
  }

  private handleMaxLength(value: { requiredLength: number, actualLength: number }): string {
    return `This field cannot be longer than ${value.requiredLength} characters.`;
  }
}
