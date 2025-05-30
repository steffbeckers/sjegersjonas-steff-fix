import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState, adapter} from './product.state';
import {ProductFilterParams} from "../../shared/requests/product/product-filter.params";

const productsState = createFeatureSelector<ProductState>('products');

export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = adapter.getSelectors(productsState);

export const getProductPaginationData = createSelector(
  productsState,
  (state: ProductState) => {
    return state.pagination;
  }
);

export const getProductSortData = createSelector(
  productsState,
  (state: ProductState) => {
    return state.sort;
  }
);

export const getProductFilterData = createSelector(
  productsState,
  (state: ProductState) => {
    return state.filters;
  }
);

export const getIsFilterActive = createSelector(
  productsState,
  (state: ProductState) => {
    return (JSON.stringify(state.filters) !== JSON.stringify(new ProductFilterParams()));
  }
);

export const getProductDetails = createSelector(
  productsState,
  (state: ProductState) => {
    return state.details.details;
  }
);

export const getProductPrices = createSelector(
  productsState,
  (state: ProductState) => {
    return state.details.prices.entities;
  }
);

export const getProductPricePagination = createSelector(
  productsState,
  (state: ProductState) => {
    return state.details.prices.pagination;
  }
);
