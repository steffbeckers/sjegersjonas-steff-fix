import {createAction, props} from '@ngrx/store';
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {PagedResponse} from "../../shared/infrastructure/queries/pagination/paged-response.interface";

import {QuotationList} from "../../shared/models/quotation/quotation-list";
import {AddQuotationRequest} from "../../shared/requests/quotation/add-quotation.request";
import {QuotationDetails} from "../../shared/models/quotation/quotation-details";
import {UpdateQuotationRequest} from "../../shared/requests/quotation/update-quotation.request";
import {QuotationFilterParams} from "../../shared/requests/quotation/quotation-filter.params";

export const loadQuotations = createAction('[Quotation/API] Load Quotations', props<{
  filterParams: QuotationFilterParams,
  sortParam: SortingParam | null,
  pagingParams: Pagination
}>());
export const loadQuotationsSuccess = createAction('[Quotation/API] Load Quotations Success', props<{
  pagedResponse: PagedResponse<QuotationList[]>
}>());
export const loadQuotationsFailure = createAction('[Quotation/API] Load Quotations Failure', props<{ error: any }>());

export const addQuotation = createAction('[Quotation/API] Add Quotation', props<{ request: AddQuotationRequest }>());
export const addQuotationSuccess = createAction('[Quotation/API] Add Quotation Success');
export const addQuotationFailure = createAction('[Quotation/API] Add Quotation Failure', props<{ error: any }>());

export const updateQuotation = createAction('[Quotation/API] Update Quotation', props<{ request: UpdateQuotationRequest }>());
export const updateQuotationSuccess = createAction('[Quotation/API] Update Quotation Success', props<{ quotation: QuotationDetails }>());
export const updateQuotationFailure = createAction('[Quotation/API] Update Quotation Failure', props<{ error: any }>());

export const deleteQuotation = createAction('[Quotation/API] Delete Quotation', props<{ id: string }>());
export const deleteQuotationSuccess = createAction('[Quotation/API] Delete Quotation Success', props<{ id: string }>());
export const deleteQuotationFailure = createAction('[Quotation/API] Delete Quotation Failure', props<{ error: any }>());

export const updateFilters = createAction('[Quotation] Update Quotation Filters', props<{ filterParams: QuotationFilterParams }>());
export const changePage = createAction('[Quotation] Quotation Change Page', props<{ page: number }>());
export const sortChange = createAction('[Quotation] Quotation Table Sort', props<{ sortingParam: SortingParam | null }>());
export const clearDetails = createAction('[Quotation] Clear Quotation Details');
