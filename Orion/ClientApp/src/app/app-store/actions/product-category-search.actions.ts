import {createAction, props} from '@ngrx/store';
import {ProductCategoryList} from "../../shared/models/product-category/product-category-list";
import {SearchParam} from "../../shared/infrastructure/queries/filter/search-param";

export const searchProductCategory = createAction('[ProductCategory/Search] Search Product Category', props<{ searchParams: SearchParam }>());
export const searchProductCategorySuccess = createAction('[ProductCategory/Search] Search Product Category Success', props<{ res: ProductCategoryList[] }>());
export const searchProductCategoryFailure = createAction('[ProductCategory/Search] Search Product Category Failure', props<{ error: any }>());

