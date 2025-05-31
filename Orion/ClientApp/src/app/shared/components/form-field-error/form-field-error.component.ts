import {
  AfterContentInit,
  Component,
  ContentChild,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {ValidatorErrorService} from "../../validators/validator-error.service";

@Directive({
    selector: '[formFieldError]',
    standalone: false
})
export class FormFieldErrorDirective {
  constructor(public  control: NgControl) {}
}

@Component({
    selector: 'app-form-field-error[isSubmitted]',
    templateUrl: './form-field-error.component.html',
    styleUrls: ['./form-field-error.component.scss'],
    standalone: false
})
export class FormFieldErrorComponent implements OnChanges, AfterContentInit, OnDestroy {
  @ContentChild(FormFieldErrorDirective) contentChild!: FormFieldErrorDirective;
  @Input() isSubmitted: boolean = false;

  isAfterContentInit: boolean = false;
  subscription: Subscription | undefined;
  errorMessage: string | null = null;

  constructor(private validatorErrorService: ValidatorErrorService) { }

  ngAfterContentInit(): void {
    this.isAfterContentInit = true;
    this.showOrRemoveError();
    this.subscription = this.contentChild.control.valueChanges?.subscribe((value: any) => {
      this.showOrRemoveError();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isAfterContentInit) {
      this.showOrRemoveError();
    }
  }

  showOrRemoveError() {
    const errors = this.contentChild.control.control?.errors

    if(errors) {
      const key = Object.keys(errors)[0];
      this.errorMessage = this.validatorErrorService.getValidationMessage(key, errors[key]);
    } else {
      this.errorMessage = null;
    }
  }

}
