import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";

import {SearchProductCategoryState} from "../states/product-category-search.state";
import * as productCategorySearchSelectors from "../selectors/product-category-search.selectors";
import {ProductCategoryList} from "../../shared/models/product-category/product-category-list";
import * as productCategorySearchActions from "../actions/product-category-search.actions";
import {SearchParam} from "../../shared/infrastructure/queries/filter/search-param";

@Injectable({
  providedIn: 'root'
})

export class ProductCategorySearchFacade {

  selectProductCategories$: Observable<ProductCategoryList[]> = this.store.select(productCategorySearchSelectors.selectAll);

  constructor(private store: Store<SearchProductCategoryState>) { }

  searchProductCategory(searchParams: SearchParam): void {
    this.store.dispatch(productCategorySearchActions.searchProductCategory({ searchParams }));
  }

}
