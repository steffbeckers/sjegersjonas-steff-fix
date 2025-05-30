import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {ProductState} from './product.state';
import * as productSelectors from './product.selectors';
import * as productActions from './product.actions';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ProductList} from "../../shared/models/product/product-list";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {ProductFilterParams} from "../../shared/requests/product/product-filter.params";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {ProductDetails} from "../../shared/models/product/product-details";
import {AddProductRequest} from "../../shared/requests/product/add-product.request";
import {UpdateProductRequest} from "../../shared/requests/product/update-product.request";
import {ProductPriceList} from "../../shared/models/product/product-price-list";
import {AddProductPriceRequest} from "../../shared/requests/product/add-product-price.request";
import {UpdateProductPriceRequest} from "../../shared/requests/product/update-product-price.request";
import {getIsFilterActive} from "./product.selectors";

@Injectable({
  providedIn: 'root'
})

export class ProductFacade {

  selectList$: Observable<ProductList[]> = this.store.select(productSelectors.getAllProducts);
  selectPagination$: Observable<Pagination> = this.store.select(productSelectors.getProductPaginationData);
  selectFilters$: Observable<ProductFilterParams> = this.store.select(productSelectors.getProductFilterData);
  selectIsFilterActive$: Observable<boolean> = this.store.select(productSelectors.getIsFilterActive);
  selectSort$: Observable<SortingParam | null> = this.store.select(productSelectors.getProductSortData);
  selectProductDetails$: Observable<ProductDetails | null> = this.store.select(productSelectors.getProductDetails);
  selectProductPrices$: Observable<ProductPriceList[]> = this.store.select(productSelectors.getProductPrices);
  selectProductPricePagination$: Observable<Pagination> = this.store.select(productSelectors.getProductPricePagination);

  constructor(private store: Store<ProductState>) { }

  loadProducts(): void {
    const filterParams$ = this.store.select(productSelectors.getProductFilterData);
    const sortParam$ = this.store.select(productSelectors.getProductSortData);
    const pagingParams$ = this.store.select(productSelectors.getProductPaginationData);
    combineLatest([filterParams$, sortParam$, pagingParams$]).pipe(
      take(1),
      map(([a, b, c]) => ({
        filterParams: a,
        sortParam: b,
        pagingParams: c,
      }))
    ).subscribe((res) => {
      const {filterParams, sortParam, pagingParams} = res;
      this.store.dispatch(productActions.loadProducts({ filterParams, sortParam, pagingParams}));
    });
  }

  addProduct(request: AddProductRequest): void {
    this.store.dispatch(productActions.addProduct({ request }));
  }

  addProductPrice(request: AddProductPriceRequest): void {
    this.store.dispatch(productActions.addProductPrice({ request }));
  }

  updateProduct(request: UpdateProductRequest): void {
    this.store.dispatch(productActions.updateProduct({ request }));
  }

  updateProductPrice(request: UpdateProductPriceRequest): void {
    this.store.dispatch(productActions.updateProductPrice({ request }));
  }

  deleteProduct(id: string): void {
    this.store.dispatch(productActions.deleteProduct({ id }));
  }

  deleteProductPrice(id: string): void {
    this.store.dispatch(productActions.deleteProductPrice({ id }));
  }

  clearDetails(): void {
    this.store.dispatch(productActions.clearDetails());
  }

  loadProduct(id: string | null): void {
    if (id) {
      this.store.dispatch(productActions.loadProductVm({ id }));
    }
  }

  changePage(page: number): void {
    this.store.dispatch(productActions.changePage({ page }));
  }

  sortChange(sortingParam: SortingParam | null): void {
    this.store.dispatch(productActions.sortChange({ sortingParam }));
  }

  updateFilters(filterParams: ProductFilterParams): void {
    this.store.dispatch(productActions.updateFilters({ filterParams }));
  }

}
