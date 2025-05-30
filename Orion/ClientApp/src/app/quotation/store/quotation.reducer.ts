import {Action, createReducer, on} from '@ngrx/store';

import {QuotationState, initialQuotationState, adapter} from './quotation.state';
import * as actions from './quotation.actions';

const stateReducer = createReducer(initialQuotationState,
  on(
    actions.loadQuotationsSuccess, (state, { pagedResponse }) => {
      const newState: QuotationState = {
        ...state,
        pagination: {
          page: pagedResponse.pagination.page,
          pageSize: pagedResponse.pagination.pageSize,
          totalItems: pagedResponse.pagination.totalItems,
          totalPages: pagedResponse.pagination.totalPages,
        }
      };
      return adapter.setAll(pagedResponse.data, newState);
    }
  ),
  on(actions.updateQuotationSuccess, (state, { quotation }) => ({
    ...state,
    details: {
      ...state.details,
      details: quotation
    }
  })),
  on(
    actions.clearDetails, (state) => ({
      ...state,
      details: initialQuotationState.details
    })
  ),
  on(
    actions.changePage, (state, { page }) => ({
      ...state,
      pagination: {
        ...state.pagination,
        page
      }
    })
  ),
  on(
    actions.updateFilters, (state, { filterParams }) => ({
      ...state,
      filters: filterParams,
      pagination: {
        ...state.pagination,
        page: 1
      }
    })
  ),
  on(
    actions.sortChange, (state, { sortingParam }) => ({
      ...state,
      sort: sortingParam,
      pagination: {
        ...state.pagination,
        page: 1
      }
    })
  )
);

export function reducer(state: QuotationState | undefined, action: Action): QuotationState {
  return stateReducer(state, action);
}
