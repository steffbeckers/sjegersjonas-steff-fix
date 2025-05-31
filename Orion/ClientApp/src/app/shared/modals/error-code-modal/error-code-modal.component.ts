import { Component } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
    selector: 'app-error-code-modal',
    templateUrl: './error-code-modal.component.html',
    styleUrls: ['./error-code-modal.component.scss'],
    standalone: false
})
export class ErrorCodeModalComponent {

  errorCode: string = 'E9999';
  message: string = 'It looks like something went wrong.';

  constructor(public modalRef: BsModalRef) { }

}
