import {createAction, props} from '@ngrx/store';
import {ProductUnitList} from "../../shared/models/product-unit/product-unit-list";
import {SearchParam} from "../../shared/infrastructure/queries/filter/search-param";

export const searchProductUnit = createAction('[ProductUnit/Search] Search Product Unit', props<{ searchParams: SearchParam }>());
export const searchProductUnitSuccess = createAction('[ProductUnit/Search] Search Product Unit Success', props<{ res: ProductUnitList[] }>());
export const searchProductUnitFailure = createAction('[ProductUnit/Search] Search Product Unit Failure', props<{ error: any }>());
