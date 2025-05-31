import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProductDetails} from "../../shared/models/product/product-details";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ProductCategorySearchFacade} from "../../app-store/facades/product-category-search.facade";
import {UpdateProductRequest} from "../../shared/requests/product/update-product.request";
import {ProductFacade} from "../store/product.facade";
import {EmptyStringValidator} from "../../shared/validators/empty-string.validator";
import {idValidator} from "../../shared/validators/id.validator";
import {Action, ActionsSubject} from "@ngrx/store";
import {ofType} from "@ngrx/effects";
import { updateProductSuccess, updateProductFailure } from "../store/product.actions";
import {SubSink} from "subsink";

@Component({
    selector: 'app-product-details-edit[product]',
    templateUrl: './product-details-edit.component.html',
    styleUrls: ['./product-details-edit.component.scss'],
    standalone: false
})
export class ProductDetailsEditComponent implements OnInit, OnDestroy {

  @Input() product!: ProductDetails;
  @Output() updated: EventEmitter<boolean> = new EventEmitter();

  isFormSubmit = false;
  disableSubmit = false;
  private subs = new SubSink();

  editFrom = this.fb.group({
    name: ['', [EmptyStringValidator(), Validators.maxLength(50)]],
    code: ['', [EmptyStringValidator(), Validators.maxLength(30)]],
    category: [null, [idValidator()]],
    description: ['', [Validators.maxLength(100)]],
  });

  constructor(private fb: UntypedFormBuilder,
              private productFacade: ProductFacade,
              public productCategorySearchFacade: ProductCategorySearchFacade,
              private actionListener$: ActionsSubject,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.editFrom.patchValue({
      name: this.product.name,
      code: this.product.code,
      category: this.product.productCategoryId,
      description: this.product.description
    });
    this.cdr.detectChanges();
  }

  onSubmit() {
    this.isFormSubmit = true;
    if(!this.editFrom.valid) { return; }
    this.disableSubmit = true;
    const request = new UpdateProductRequest(
      this.product.productId,
      this.editFrom.get('name')?.value.trim(),
      this.editFrom.get('code')?.value.trim(),
      this.editFrom.get('description')?.value,
      this.editFrom.get('category')?.value
    );
    this.subscribeToActions();
    this.productFacade.updateProduct(request);

  }

  private subscribeToActions() {
    this.subs.sink = this.actionListener$.pipe(
      ofType(updateProductSuccess, updateProductFailure),
    ).subscribe((action: Action) => {
      if(action.type === updateProductSuccess.type) {
        this.updated.emit(true);
      } else {
        this.disableSubmit = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
