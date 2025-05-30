import {Action, createReducer, on} from "@ngrx/store";
import * as productUnitListState from '../states/product-unit-list.state';
import {ProductUnitListState} from "../states/product-unit-list.state";
import * as productUnitListActions from '../actions/product-unit-list.actions';

export const productUnitListFeatureKey = 'productUnitList';

const productUnitListReducer = createReducer(productUnitListState.initialProductUnitListState,
  on(
    productUnitListActions.loadProductUnitListSuccess, (state, { pagedResponse }) => {
      const newState: ProductUnitListState = {
        ...state,
        pagination: {
          page: pagedResponse.pagination.page,
          pageSize: pagedResponse.pagination.pageSize,
          totalItems: pagedResponse.pagination.totalItems,
          totalPages: pagedResponse.pagination.totalPages,
        }
      };
      return productUnitListState.adapter.setAll(pagedResponse.data, newState);
    }
  ),
  on(
    productUnitListActions.changePage, (state, { page }) => ({
      ...state,
      pagination: {
        ...state.pagination,
        page
      }
    })
  ),
);

export function reducer(state: ProductUnitListState | undefined, action: Action): ProductUnitListState {
  return productUnitListReducer(state, action);
}
