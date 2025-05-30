import * as valueAddedTaxRateListState from './value-added-tax-rate-list.state';
import * as valueAddedTaxRateListReducer from '../reducers/value-added-tax-rate.reducer';

import * as productCategoryListState from './product-category-list.state';
import * as productCategoryListReducer from '../reducers/product-category.reducer';

import * as productUnitListState from './product-unit-list.state';
import * as productUnitListReducer from '../reducers/product-unit.reducer';

export interface SettingsState {
  [valueAddedTaxRateListReducer.valueAddedTaxRateListFeatureKey]: valueAddedTaxRateListState.ValueAddedTaxRateListState;
  [productCategoryListReducer.productCategoryListFeatureKey]: productCategoryListState.ProductCategoryListState;
  [productUnitListReducer.productUnitListFeatureKey]: productUnitListState.ProductUnitListState;
}
