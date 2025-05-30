import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";

import {ProductCategoryListState} from '../states/product-category-list.state';
import * as productCategoryListSelectors from '../selectors/product-category-list.selectors';
import * as productCategoryListActions from '../actions/product-category-list.actions';
import {ProductCategoryList} from "../../../shared/models/product-category/product-category-list";
import {ProductCategoryFilterParams} from "../../../shared/requests/product-category/product-category-filter.params";
import {AddProductCategoryRequest} from "../../../shared/requests/product-category/add-product-category.request";

@Injectable({
  providedIn: 'root'
})

export class ProductCategoryListFacade {

  selectList$: Observable<ProductCategoryList[]> = this.store.select(productCategoryListSelectors.getAllProductCategoryLists);
  selectPagination$: Observable<Pagination> = this.store.select(productCategoryListSelectors.getProductCategoryListPaginationData);
  selectFilters$: Observable<ProductCategoryFilterParams> = this.store.select(productCategoryListSelectors.getProductCategoryListFilterData);
  selectSort$: Observable<SortingParam | null> = this.store.select(productCategoryListSelectors.getProductCategoryListSortData);

  constructor(private store: Store<ProductCategoryListState>) { }

  loadProductCategories(): void {
    combineLatest([this.selectFilters$, this.selectSort$, this.selectPagination$]).pipe(
      take(1),
      map(([a, b, c]) => ({
        filterParams: a,
        sortParam: b,
        pagingParams: c,
      }))
    ).subscribe((res) => {
      const {filterParams, sortParam, pagingParams} = res;
      this.store.dispatch(productCategoryListActions.loadProductCategoryList({ filterParams, sortParam, pagingParams}));
    });
  }

  addProductCategory(request: AddProductCategoryRequest): void {
    this.store.dispatch(productCategoryListActions.addProductCategory({ request }));
  }

  deleteProductCategory(id: string): void {
    this.store.dispatch(productCategoryListActions.deleteProductCategory({ id }));
  }

  changePage(page: number): void {
    this.store.dispatch(productCategoryListActions.changePage({ page }));
  }

}
