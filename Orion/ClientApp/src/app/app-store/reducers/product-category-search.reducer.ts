import {Action, createReducer, on} from "@ngrx/store";
import {SearchProductCategoryState, initialSearchProductCategoryState, adapter} from "../states/product-category-search.state";

import * as searchProductCategoryActions from '../actions/product-category-search.actions';

export const searchProductCategoryFeatureKey = 'searchProductCategory';

const searchProductCategoryReducer = createReducer(initialSearchProductCategoryState,
  on(
    searchProductCategoryActions.searchProductCategorySuccess, (state, { res }) => {
      return adapter.setAll(res, state);
    }
  ),
);

export function reducer(state: SearchProductCategoryState | undefined, action: Action): SearchProductCategoryState {
  return searchProductCategoryReducer(state, action);
}
