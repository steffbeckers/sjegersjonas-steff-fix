import {createAction, props} from "@ngrx/store";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {PagedResponse} from "../../../shared/infrastructure/queries/pagination/paged-response.interface";
import {
  ValueAddedTaxRateFilterParams
} from "../../../shared/requests/value-added-tax-rate/value-added-tax-rate-filter.params";
import {ValueAddedTaxRateList} from "../../../shared/models/value-added-tax-rate/value-added-tax-rate-list";
import {
  AddValueAddedTaxRateRequest
} from "../../../shared/requests/value-added-tax-rate/add-value-added-tax-rate.request";


export const loadValueAddedTaxRateList = createAction('[Settings/API] Load ValueAddedTaxRateList', props<{
  filterParams: ValueAddedTaxRateFilterParams,
  sortParam: SortingParam | null,
  pagingParams: Pagination
}>());

export const loadValueAddedTaxRateListSuccess = createAction('[Settings/API] Load ValueAddedTaxRateList Success', props<{
  pagedResponse: PagedResponse<ValueAddedTaxRateList[]>
}>());
export const loadValueAddedTaxRateListFailure = createAction('[Settings/API] Load ValueAddedTaxRateList Failure', props<{ error: any }>());

export const addValueAddedTaxRate = createAction('[Settings] Add ValueAddedTaxRate', props<{ request: AddValueAddedTaxRateRequest }>());
export const addValueAddedTaxRateSuccess = createAction('[Settings/API] Add ValueAddedTaxRate Success');
export const addValueAddedTaxRateFailure = createAction('[Settings/API] Add ValueAddedTaxRate Failure', props<{ error: any }>());

export const deleteValueAddedTaxRate = createAction('[Settings] Delete ValueAddedTaxRate', props<{ id: string }>());
export const deleteValueAddedTaxRateSuccess = createAction('[Settings/API] Delete ValueAddedTaxRate Success', props<{ id: string }>());
export const deleteValueAddedTaxRateFailure = createAction('[Settings/API] Delete ValueAddedTaxRate Failure', props<{ error: any }>());

export const updateValueAddedTaxRateFilters = createAction('Update ValueAddedTaxRate Filters', props<{ filterParams: ValueAddedTaxRateFilterParams }>());
