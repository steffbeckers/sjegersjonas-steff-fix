import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SettingsState} from "../states/settings.state";

import * as productUnitListReducers from '../reducers/product-unit.reducer';
import * as productUnitListState from '../states/product-unit-list.state';

const settingsState = createFeatureSelector<SettingsState>('settings');

export const getProductUnitListState = createSelector(
  settingsState,
  (state: SettingsState) => state[productUnitListReducers.productUnitListFeatureKey]
);

export const {
  selectIds: getProductUnitListIds,
  selectEntities: getProductUnitListEntities,
  selectAll: getAllProductUnitLists,
  selectTotal: getTotalProductUnitList,
} = productUnitListState.adapter.getSelectors(getProductUnitListState);

export const getProductUnitListPaginationData = createSelector(
  getProductUnitListState,
  (state: productUnitListState.ProductUnitListState) => {
    return state.pagination;
  }
);

export const getProductUnitListSortData = createSelector(
  getProductUnitListState,
  (state: productUnitListState.ProductUnitListState) => {
    return state.sort;
  }
);

export const getProductUnitListFilterData = createSelector(
  getProductUnitListState,
  (state: productUnitListState.ProductUnitListState) => {
    return state.filters;
  }
);
