import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
    standalone: false
})
export class ConfirmationModalComponent {

  @Output() decision: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public modalRef: BsModalRef) { }

  onDecision(decision: boolean) {
    this.decision.emit(decision);
    this.modalRef.hide();
  }

}
