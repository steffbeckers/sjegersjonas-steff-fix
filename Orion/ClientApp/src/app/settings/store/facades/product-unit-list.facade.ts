import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";

import {ProductUnitListState} from '../states/product-unit-list.state';
import * as productUnitListSelectors from '../selectors/product-unit-list.selectors';
import * as productUnitListActions from '../actions/product-unit-list.actions';
import {ProductUnitList} from "../../../shared/models/product-unit/product-unit-list";
import {ProductUnitFilterParams} from "../../../shared/requests/product-unit/product-unit-filter.params";
import {AddProductUnitRequest} from "../../../shared/requests/product-unit/add-product-unit.request";

@Injectable({
  providedIn: 'root'
})

export class ProductUnitListFacade {

  selectList$: Observable<ProductUnitList[]> = this.store.select(productUnitListSelectors.getAllProductUnitLists);
  selectPagination$: Observable<Pagination> = this.store.select(productUnitListSelectors.getProductUnitListPaginationData);
  selectFilters$: Observable<ProductUnitFilterParams> = this.store.select(productUnitListSelectors.getProductUnitListFilterData);
  selectSort$: Observable<SortingParam | null> = this.store.select(productUnitListSelectors.getProductUnitListSortData);

  constructor(private store: Store<ProductUnitListState>) { }

  loadProductUnits(): void {
    combineLatest([this.selectFilters$, this.selectSort$, this.selectPagination$]).pipe(
      take(1),
      map(([a, b, c]) => ({
        filterParams: a,
        sortParam: b,
        pagingParams: c,
      }))
    ).subscribe((res) => {
      const {filterParams, sortParam, pagingParams} = res;
      this.store.dispatch(productUnitListActions.loadProductUnitList({ filterParams, sortParam, pagingParams}));
    });
  }

  addProductUnit(request: AddProductUnitRequest): void {
    this.store.dispatch(productUnitListActions.addProductUnit({ request }));
  }

  deleteProductUnit(id: string): void {
    this.store.dispatch(productUnitListActions.deleteProductUnit({ id }));
  }

  changePage(page: number): void {
    this.store.dispatch(productUnitListActions.changePage({ page }));
  }

}
