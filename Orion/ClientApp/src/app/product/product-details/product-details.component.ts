import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ProductDetails} from "../../shared/models/product/product-details";
import {ProductFacade} from "../store/product.facade";

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    standalone: false
})
export class ProductDetailsComponent {

  product$: Observable<ProductDetails | null>;
  productDetailsEditMode = false;


  constructor(private productFacade: ProductFacade) {
    this.product$ = this.productFacade.selectProductDetails$;
  }

  onUpdateProduct() {
    this.productDetailsEditMode = !this.productDetailsEditMode;
  }

}
