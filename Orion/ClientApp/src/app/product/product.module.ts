import { NgModule } from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {reducer} from './store/product.reducer';
import {ProductEffects} from './store/product.effects';
import { ProductRoutingModule } from './product-routing.module';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {SharedModule} from "../shared/modules/shared.module";
import { ProductDetailsEditComponent } from './product-details-edit/product-details-edit.component';
import { ProductDetailsPricesComponent } from './product-details-prices/product-details-prices.component';
import { AddProductPriceModalComponent } from './add-product-price-modal/add-product-price-modal.component';
import { EditProductPriceModalComponent } from './edit-product-price-modal/edit-product-price-modal.component';
import { ProductListFilterComponent } from './product-list-filter/product-list-filter.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductDetailsEditComponent,
    ProductDetailsPricesComponent,
    AddProductPriceModalComponent,
    EditProductPriceModalComponent,
    ProductListFilterComponent,
    AddProductModalComponent,
  ],
  imports: [
    SharedModule,
    ProductRoutingModule,
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductEffects]),
  ]
})
export class ProductModule { }
