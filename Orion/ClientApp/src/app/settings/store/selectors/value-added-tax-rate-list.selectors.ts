import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SettingsState} from "../states/settings.state";

import * as valueAddedTaxRateListReducers from '../reducers/value-added-tax-rate.reducer';
import * as valueAddedTaxRateListState from '../states/value-added-tax-rate-list.state';

const settingsState = createFeatureSelector<SettingsState>('settings');

export const getValueAddedTaxRateListState = createSelector(
  settingsState,
  (state: SettingsState) => state[valueAddedTaxRateListReducers.valueAddedTaxRateListFeatureKey]
);

export const {
  selectIds: getValueAddedTaxRateListIds,
  selectEntities: getValueAddedTaxRateListEntities,
  selectAll: getAllValueAddedTaxRateLists,
  selectTotal: getTotalValueAddedTaxRateList,
} = valueAddedTaxRateListState.adapter.getSelectors(getValueAddedTaxRateListState);

export const getValueAddedTaxRateListPaginationData = createSelector(
  getValueAddedTaxRateListState,
  (state: valueAddedTaxRateListState.ValueAddedTaxRateListState) => {
    return state.pagination;
  }
);

export const getValueAddedTaxRateListSortData = createSelector(
  getValueAddedTaxRateListState,
  (state: valueAddedTaxRateListState.ValueAddedTaxRateListState) => {
    return state.sort;
  }
);

export const getValueAddedTaxRateListFilterData = createSelector(
  getValueAddedTaxRateListState,
  (state: valueAddedTaxRateListState.ValueAddedTaxRateListState) => {
    return state.filters;
  }
);
