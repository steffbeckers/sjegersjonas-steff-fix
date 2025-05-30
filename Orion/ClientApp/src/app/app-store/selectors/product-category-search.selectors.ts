import {createFeatureSelector} from "@ngrx/store";
import {SearchProductCategoryState, adapter} from "../states/product-category-search.state";

import {searchProductCategoryFeatureKey} from '../reducers/product-category-search.reducer';

const searchProductCategoryState = createFeatureSelector<SearchProductCategoryState>(searchProductCategoryFeatureKey);

export const {
  selectAll,
} = adapter.getSelectors(searchProductCategoryState);
