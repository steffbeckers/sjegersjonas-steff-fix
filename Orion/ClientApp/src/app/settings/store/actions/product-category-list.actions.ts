import {createAction, props} from "@ngrx/store";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {PagedResponse} from "../../../shared/infrastructure/queries/pagination/paged-response.interface";
import {ProductCategoryFilterParams} from "../../../shared/requests/product-category/product-category-filter.params";
import {ProductCategoryList} from "../../../shared/models/product-category/product-category-list";
import {AddProductCategoryRequest} from "../../../shared/requests/product-category/add-product-category.request";


export const loadProductCategoryList = createAction('[Settings/API] Load ProductCategoryList', props<{
  filterParams: ProductCategoryFilterParams,
  sortParam: SortingParam | null,
  pagingParams: Pagination
}>());

export const loadProductCategoryListSuccess = createAction('[Settings/API] Load ProductCategoryList Success', props<{
  pagedResponse: PagedResponse<ProductCategoryList[]>
}>());
export const loadProductCategoryListFailure = createAction('[Settings/API] Load ProductCategoryList Failure', props<{ error: any }>());

export const addProductCategory = createAction('[Settings] Add ProductCategory', props<{ request: AddProductCategoryRequest }>());
export const addProductCategorySuccess = createAction('[Settings/API] Add ProductCategory Success');
export const addProductCategoryFailure = createAction('[Settings/API] Add ProductCategory Failure', props<{ error: any }>());

export const deleteProductCategory = createAction('[Settings] Delete ProductCategory', props<{ id: string }>());
export const deleteProductCategorySuccess = createAction('[Settings/API] Delete ProductCategory Success', props<{ id: string }>());
export const deleteProductCategoryFailure = createAction('[Settings/API] Delete ProductCategory Failure', props<{ error: any }>());

export const changePage = createAction('[Settings] Change ProductCategory Page', props<{ page: number }>());
