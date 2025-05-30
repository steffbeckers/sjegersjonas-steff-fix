import {createFeatureSelector} from "@ngrx/store";
import {SearchProductUnitState, adapter} from "../states/product-unit-search.state";

import {searchProductUnitFeatureKey} from '../reducers/product-unit-search.reducer';

const searchProductUnitState = createFeatureSelector<SearchProductUnitState>(searchProductUnitFeatureKey);

export const {
  selectAll,
} = adapter.getSelectors(searchProductUnitState);
