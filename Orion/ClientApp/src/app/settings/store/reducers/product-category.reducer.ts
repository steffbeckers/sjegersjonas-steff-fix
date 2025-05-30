import {Action, createReducer, on} from "@ngrx/store";
import * as productCategoryListState from '../states/product-category-list.state';
import {ProductCategoryListState} from "../states/product-category-list.state";
import * as productCategoryListActions from '../actions/product-category-list.actions';

export const productCategoryListFeatureKey = 'productCategoryList';

const productCategoryListReducer = createReducer(productCategoryListState.initialProductCategoryListState,
  on(
    productCategoryListActions.loadProductCategoryListSuccess, (state, { pagedResponse }) => {
      const newState: ProductCategoryListState = {
        ...state,
        pagination: {
          page: pagedResponse.pagination.page,
          pageSize: pagedResponse.pagination.pageSize,
          totalItems: pagedResponse.pagination.totalItems,
          totalPages: pagedResponse.pagination.totalPages,
        }
      };
      return productCategoryListState.adapter.setAll(pagedResponse.data, newState);
    }
  ),
  on(
    productCategoryListActions.changePage, (state, { page }) => ({
      ...state,
      pagination: {
        ...state.pagination,
        page
      }
    })
  ),
);

export function reducer(state: ProductCategoryListState | undefined, action: Action): ProductCategoryListState {
  return productCategoryListReducer(state, action);
}
