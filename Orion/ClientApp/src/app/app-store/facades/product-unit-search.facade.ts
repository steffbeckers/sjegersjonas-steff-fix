import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";

import {SearchProductUnitState} from "../states/product-unit-search.state";
import * as productUnitSearchSelectors from "../selectors/product-unit-search.selectors";
import {ProductUnitList} from "../../shared/models/product-unit/product-unit-list";
import * as productUnitSearchActions from "../actions/product-unit-search.actions";
import {SearchParam} from "../../shared/infrastructure/queries/filter/search-param";

@Injectable({
  providedIn: 'root'
})

export class ProductUnitSearchFacade {

  selectProductUnits$: Observable<ProductUnitList[]> = this.store.select(productUnitSearchSelectors.selectAll);

  constructor(private store: Store<SearchProductUnitState>) { }

  searchProductUnit(searchParams: SearchParam): void {
    this.store.dispatch(productUnitSearchActions.searchProductUnit({ searchParams }));
  }

}
