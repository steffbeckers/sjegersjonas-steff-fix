import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from "subsink";
import {EmptyStringValidator} from "../../shared/validators/empty-string.validator";
import {UntypedFormBuilder, UntypedFormControl, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {RelationFacade} from "../store/relation.facade";
import {Action, ActionsSubject} from "@ngrx/store";
import {AddRelationRequest} from "../../shared/requests/relation/add-relation.request";
import {StringHelper} from "../../shared/helpers/string.helper";
import {ofType} from "@ngrx/effects";
import {addRelationFailure, addRelationSuccess} from "../store/relation.actions";
import {isBooleanValidator} from "../../shared/validators/is-boolean.validator";

@Component({
    selector: 'app-add-relation-modal',
    templateUrl: './add-relation-modal.component.html',
    styleUrls: ['./add-relation-modal.component.scss'],
    standalone: false
})
export class AddRelationModalComponent implements OnInit, OnDestroy {


  private subs = new SubSink();
  addFrom = this.fb.group({
    name: ['', [EmptyStringValidator(), Validators.maxLength(50)]],
    code: ['', [Validators.maxLength(120)]],
    vatNumber: ['', [Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(2048)]],
    street: ['', [Validators.maxLength(95)]],
    postalCode: ['', [Validators.maxLength(10)]],
    city: ['', [Validators.maxLength(35)]],
    country: ['', [Validators.maxLength(50)]],
    language: ['', [Validators.maxLength(10)]],
    email: ['', [Validators.maxLength(62)]],
    phone: ['', [Validators.maxLength(30)]],
    mobilePhone: ['', [Validators.maxLength(30)]],
    isCompany: ['0', [isBooleanValidator()]],
  });

  isFormSubmit: boolean = false;
  disableSubmit: boolean = false;

  constructor(public modalRef: BsModalRef,
              private fb: UntypedFormBuilder,
              private relationFacade: RelationFacade,
              private actionListener$: ActionsSubject) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isFormSubmit = true;
    if(!this.addFrom.valid) { return; }
    this.disableSubmit = true;
    const request = new AddRelationRequest(
      StringHelper.trim(this.addFrom.get('name')?.value),
      StringHelper.covertToBooleanOrNull(this.addFrom.get('isCompany')?.value)!,
      StringHelper.trim(this.addFrom.get('code')?.value),
      StringHelper.trim(this.addFrom.get('vatNumber')?.value),
      StringHelper.trim(this.addFrom.get('website')?.value),
      StringHelper.trim(this.addFrom.get('street')?.value),
      StringHelper.trim(this.addFrom.get('postalCode')?.value),
      StringHelper.trim(this.addFrom.get('city')?.value),
      StringHelper.trim(this.addFrom.get('country')?.value),
      StringHelper.trim(this.addFrom.get('language')?.value),
      StringHelper.trim(this.addFrom.get('email')?.value),
      StringHelper.trim(this.addFrom.get('phone')?.value),
      StringHelper.trim(this.addFrom.get('mobilePhone')?.value)
    );
    this.subscribeToActions();
    this.relationFacade.addRelation(request);
  }

  private subscribeToActions() {
    this.subs.sink = this.actionListener$.pipe(
      ofType(addRelationSuccess, addRelationFailure),
    ).subscribe((action: Action) => {
      if(action.type === addRelationSuccess.type) {
        this.modalRef.hide();
      } else {
        this.disableSubmit = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get isCompanyControl(): UntypedFormControl {
    return this.addFrom.get('isCompany') as UntypedFormControl;
  }

}
