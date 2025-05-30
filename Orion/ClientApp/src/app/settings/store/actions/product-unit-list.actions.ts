import {createAction, props} from "@ngrx/store";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {PagedResponse} from "../../../shared/infrastructure/queries/pagination/paged-response.interface";
import {ProductUnitFilterParams} from "../../../shared/requests/product-unit/product-unit-filter.params";
import {ProductUnitList} from "../../../shared/models/product-unit/product-unit-list";
import {AddProductUnitRequest} from "../../../shared/requests/product-unit/add-product-unit.request";


export const loadProductUnitList = createAction('[Settings/API] Load ProductUnitList', props<{
  filterParams: ProductUnitFilterParams,
  sortParam: SortingParam | null,
  pagingParams: Pagination
}>());

export const loadProductUnitListSuccess = createAction('[Settings/API] Load ProductUnitList Success', props<{
  pagedResponse: PagedResponse<ProductUnitList[]>
}>());
export const loadProductUnitListFailure = createAction('[Settings/API] Load ProductUnitList Failure', props<{ error: any }>());

export const addProductUnit = createAction('[Settings] Add ProductUnit', props<{ request: AddProductUnitRequest }>());
export const addProductUnitSuccess = createAction('[Settings/API] Add ProductUnit Success');
export const addProductUnitFailure = createAction('[Settings/API] Add ProductUnit Failure', props<{ error: any }>());

export const deleteProductUnit = createAction('[Settings] Delete ProductUnit', props<{ id: string }>());
export const deleteProductUnitSuccess = createAction('[Settings/API] Delete ProductUnit Success', props<{ id: string }>());
export const deleteProductUnitFailure = createAction('[Settings/API] Delete ProductUnit Failure', props<{ error: any }>());

export const changePage = createAction('[Settings] Change ProductUnit Page', props<{ page: number }>());
