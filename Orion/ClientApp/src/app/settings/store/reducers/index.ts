import {ActionReducerMap} from '@ngrx/store';
import {SettingsState} from "../states/settings.state";

import * as valueAddedTaxRateListReducer from './value-added-tax-rate.reducer';
import * as productCategoryListReducer from './product-category.reducer';
import * as productUnitListReducer from './product-unit.reducer';

export const reducers: ActionReducerMap<SettingsState> = {
  [valueAddedTaxRateListReducer.valueAddedTaxRateListFeatureKey]: valueAddedTaxRateListReducer.reducer,
  [productCategoryListReducer.productCategoryListFeatureKey]: productCategoryListReducer.reducer,
  [productUnitListReducer.productUnitListFeatureKey]: productUnitListReducer.reducer,
};
