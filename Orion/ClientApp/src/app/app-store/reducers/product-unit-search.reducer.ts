import {Action, createReducer, on} from "@ngrx/store";
import {SearchProductUnitState, initialSearchProductUnitState, adapter} from "../states/product-unit-search.state";

import * as searchProductUnitActions from '../actions/product-unit-search.actions';

export const searchProductUnitFeatureKey = 'searchProductUnit';

const searchProductUnitReducer = createReducer(initialSearchProductUnitState,
  on(
    searchProductUnitActions.searchProductUnitSuccess, (state, { res }) => {
      return adapter.setAll(res, state);
    }
  ),
);

export function reducer(state: SearchProductUnitState | undefined, action: Action): SearchProductUnitState {
  return searchProductUnitReducer(state, action);
}
