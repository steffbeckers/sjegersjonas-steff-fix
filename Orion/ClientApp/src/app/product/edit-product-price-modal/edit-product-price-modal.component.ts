import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from "subsink";
import {idValidator} from "../../shared/validators/id.validator";
import {positiveNumberValidator} from "../../shared/validators/positive-number.validator";
import {BsModalRef} from "ngx-bootstrap/modal";
import {UntypedFormBuilder} from "@angular/forms";
import {ProductFacade} from "../store/product.facade";
import {ProductUnitSearchFacade} from "../../app-store/facades/product-unit-search.facade";
import {Action, ActionsSubject} from "@ngrx/store";
import {AddProductPriceRequest} from "../../shared/requests/product/add-product-price.request";
import {CurrencyHelper} from "../../shared/helpers/currency-helper";
import {ofType} from "@ngrx/effects";
import {updateProductPriceSuccess, updateProductPriceFailure} from "../store/product.actions";
import {ProductPriceList} from "../../shared/models/product/product-price-list";
import {UpdateProductPriceRequest} from "../../shared/requests/product/update-product-price.request";

@Component({
  selector: 'app-edit-product-price-modal',
  templateUrl: './edit-product-price-modal.component.html',
  styleUrls: ['./edit-product-price-modal.component.scss']
})
export class EditProductPriceModalComponent implements OnInit, OnDestroy {

  @Input() productPrice!: ProductPriceList;

  private subs = new SubSink();
  editProductPriceFrom = this.fb.group({
    productUnit: [{value: '', disabled: true}],
    price: [0, [positiveNumberValidator()]],
  });

  isFormSubmit: boolean = false;
  disableSubmit: boolean = false;

  constructor(public modalRef: BsModalRef,
              private fb: UntypedFormBuilder,
              private productFacade: ProductFacade,
              public productUnitSearchFacade: ProductUnitSearchFacade,
              private actionListener$: ActionsSubject) { }

  ngOnInit(): void {
    this.editProductPriceFrom.patchValue({
      productUnit: this.productPrice.productUnitName,
      price: CurrencyHelper.formatCents(this.productPrice.price)
    });
  }

  onSubmit(): void {
    this.isFormSubmit = true;
    if(!this.editProductPriceFrom.valid) { return; }
    if(!this.productPrice.productProductUnitId) { return; }
    this.disableSubmit = true;
    const request = new UpdateProductPriceRequest(
      this.productPrice.productProductUnitId,
      CurrencyHelper.euroToCents(this.editProductPriceFrom.get('price')?.value),
    )
    this.subscribeToActions();
    this.productFacade.updateProductPrice(request);
  }

  private subscribeToActions() {
    this.subs.sink = this.actionListener$.pipe(
      ofType(updateProductPriceSuccess, updateProductPriceFailure),
    ).subscribe((action: Action) => {
      if(action.type === updateProductPriceSuccess.type) {
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
