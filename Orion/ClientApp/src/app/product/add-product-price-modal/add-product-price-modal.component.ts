import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {EmptyStringValidator} from "../../shared/validators/empty-string.validator";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {idValidator} from "../../shared/validators/id.validator";
import {ProductUnitSearchFacade} from "../../app-store/facades/product-unit-search.facade";
import {positiveNumberValidator} from "../../shared/validators/positive-number.validator";
import {UpdateProductRequest} from "../../shared/requests/product/update-product.request";
import {AddProductUnitRequest} from "../../shared/requests/product-unit/add-product-unit.request";
import {AddProductPriceRequest} from "../../shared/requests/product/add-product-price.request";
import {CurrencyHelper} from "../../shared/helpers/currency-helper";
import {ProductFacade} from "../store/product.facade";
import {ofType} from "@ngrx/effects";
import {addProductPriceSuccess, addProductPriceFailure} from "../store/product.actions";
import {Action, ActionsSubject} from "@ngrx/store";
import {SubSink} from "subsink";

@Component({
  selector: 'app-add-product-price-modal',
  templateUrl: './add-product-price-modal.component.html',
  styleUrls: ['./add-product-price-modal.component.scss']
})
export class AddProductPriceModalComponent implements OnDestroy {

  @Input() productId!: string;

  private subs = new SubSink();
  addProductPriceFrom = this.fb.group({
    productUnit: [null, [idValidator()]],
    price: [0, [positiveNumberValidator()]],
  });

  isFormSubmit: boolean = false;
  disableSubmit: boolean = false;

  constructor(public modalRef: BsModalRef,
              private fb: UntypedFormBuilder,
              private productFacade: ProductFacade,
              public productUnitSearchFacade: ProductUnitSearchFacade,
              private actionListener$: ActionsSubject) { }

  onSubmit(): void {
    this.isFormSubmit = true;
    if(!this.addProductPriceFrom.valid) { return; }
    if(!this.productId) { return; }
    this.disableSubmit = true;
    const request = new AddProductPriceRequest(
      this.productId,
      this.addProductPriceFrom.get('productUnit')?.value,
      CurrencyHelper.euroToCents(this.addProductPriceFrom.get('price')?.value),
    )
    this.subscribeToActions();
    this.productFacade.addProductPrice(request);
  }

  private subscribeToActions() {
    this.subs.sink = this.actionListener$.pipe(
      ofType(addProductPriceSuccess, addProductPriceFailure),
    ).subscribe((action: Action) => {
      if(action.type === addProductPriceSuccess.type) {
        this.modalRef.hide();
      } else {
        this.disableSubmit = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
