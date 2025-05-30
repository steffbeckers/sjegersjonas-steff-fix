import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SettingsState} from "../states/settings.state";

import * as productCategoryListReducers from '../reducers/product-category.reducer';
import * as productCategoryListState from '../states/product-category-list.state';

const settingsState = createFeatureSelector<SettingsState>('settings');

export const getProductCategoryListState = createSelector(
  settingsState,
  (state: SettingsState) => state[productCategoryListReducers.productCategoryListFeatureKey]
);

export const {
  selectIds: getProductCategoryListIds,
  selectEntities: getProductCategoryListEntities,
  selectAll: getAllProductCategoryLists,
  selectTotal: getTotalProductCategoryList,
} = productCategoryListState.adapter.getSelectors(getProductCategoryListState);

export const getProductCategoryListPaginationData = createSelector(
  getProductCategoryListState,
  (state: productCategoryListState.ProductCategoryListState) => {
    return state.pagination;
  }
);

export const getProductCategoryListSortData = createSelector(
  getProductCategoryListState,
  (state: productCategoryListState.ProductCategoryListState) => {
    return state.sort;
  }
);

export const getProductCategoryListFilterData = createSelector(
  getProductCategoryListState,
  (state: productCategoryListState.ProductCategoryListState) => {
    return state.filters;
  }
);
