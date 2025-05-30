import {ActionReducerMap} from "@ngrx/store";
import {AppState} from '../states/app.state';

import * as layoutReducer from './layout.reducer';
import * as productCategorySearchReducer from './product-category-search.reducer';
import * as fromProductUnitSearchReducer from './product-unit-search.reducer';

export const reducers: ActionReducerMap<AppState> = {
  [layoutReducer.layoutFeatureKey]: layoutReducer.reducer,
  [productCategorySearchReducer.searchProductCategoryFeatureKey]: productCategorySearchReducer.reducer,
  [fromProductUnitSearchReducer.searchProductUnitFeatureKey]: fromProductUnitSearchReducer.reducer,
};
