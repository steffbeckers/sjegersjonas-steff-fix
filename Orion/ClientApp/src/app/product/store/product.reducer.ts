import {Action, createReducer, on} from '@ngrx/store';

import {ProductState, initialProductState, adapter} from './product.state';
import * as actions from './product.actions';

const stateReducer = createReducer(initialProductState,
  on(
    actions.loadProductsSuccess, (state, { pagedResponse }) => {
      const newState: ProductState = {
        ...state,
        pagination: {
          page: pagedResponse.pagination.page,
          pageSize: pagedResponse.pagination.pageSize,
          totalItems: pagedResponse.pagination.totalItems,
          totalPages: pagedResponse.pagination.totalPages,
        }
      };
      return adapter.setAll(pagedResponse.data, newState);
    }
  ),
  on(
    actions.loadProductVmSuccess, (state, { productDetailsResponse }) => ({
      ...state,
      details: {
        ...state.details,
        details: productDetailsResponse?.productDetails || null,
        prices: {
          entities: productDetailsResponse?.productPrices.data || [],
          pagination: {
            page: productDetailsResponse?.productPrices.pagination.page || initialProductState.details.prices.pagination.page,
            pageSize: productDetailsResponse?.productPrices.pagination.pageSize || initialProductState.details.prices.pagination.pageSize,
            totalItems: productDetailsResponse?.productPrices.pagination.totalItems || initialProductState.details.prices.pagination.totalItems,
            totalPages: productDetailsResponse?.productPrices.pagination.totalPages || initialProductState.details.prices.pagination.totalPages,
          }
        },
      }
    })
  ),
  on(
    actions.addProductPriceSuccess, (state, { res }) => ({
        ...state,
        details: {
          ...state.details,
          prices: {
            ...state.details.prices,
            entities: [...state.details.prices.entities, res]
          }
        }
    })),
  on(
    actions.deleteProductPriceSuccess, (state, { id }) => ({
      ...state,
      details: {
        ...state.details,
        prices: {
          ...state.details.prices,
          entities: [...state.details.prices.entities.filter(pp => pp.productProductUnitId !== id)]
        }
      }
    })),
  on(
    actions.updateProductPriceSuccess, (state, { res }) => ({
      ...state,
      details: {
        ...state.details,
        prices: {
          ...state.details.prices,
          entities: [...state.details.prices.entities.filter(pp => pp.productProductUnitId !== res.productProductUnitId), res]
        }
      }
    })),
  on(actions.updateProductSuccess, (state, { product }) => ({
    ...state,
    details: {
      ...state.details,
      details: product
    }
  })),
  on(
    actions.clearDetails, (state) => ({
      ...state,
      details: initialProductState.details
    })
  ),
  on(
    actions.changePage, (state, { page }) => ({
      ...state,
      pagination: {
        ...state.pagination,
        page
      }
    })
  ),
  on(
    actions.updateFilters, (state, { filterParams }) => ({
      ...state,
      filters: filterParams,
      pagination: {
        ...state.pagination,
        page: 1
      }
    })
  ),
  on(
    actions.sortChange, (state, { sortingParam }) => ({
      ...state,
      sort: sortingParam,
      pagination: {
        ...state.pagination,
        page: 1
      }
    })
  )
);

export function reducer(state: ProductState | undefined, action: Action): ProductState {
  return stateReducer(state, action);
}
