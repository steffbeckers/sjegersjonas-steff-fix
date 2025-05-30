import {createFeatureSelector, createSelector} from '@ngrx/store';
import {QuotationState, adapter} from './quotation.state';
import {QuotationFilterParams} from "../../shared/requests/quotation/quotation-filter.params";

const quotationsState = createFeatureSelector<QuotationState>('quotations');

export const {
  selectIds: getQuotationIds,
  selectEntities: getQuotationEntities,
  selectAll: getAllQuotations,
  selectTotal: getTotalQuotations,
} = adapter.getSelectors(quotationsState);

export const getQuotationPaginationData = createSelector(
  quotationsState,
  (state: QuotationState) => {
    return state.pagination;
  }
);

export const getQuotationSortData = createSelector(
  quotationsState,
  (state: QuotationState) => {
    return state.sort;
  }
);

export const getQuotationFilterData = createSelector(
  quotationsState,
  (state: QuotationState) => {
    return state.filters;
  }
);

export const getIsFilterActive = createSelector(
  quotationsState,
  (state: QuotationState) => {
    return (JSON.stringify(state.filters) !== JSON.stringify(new QuotationFilterParams()));
  }
);

export const getQuotationDetails = createSelector(
  quotationsState,
  (state: QuotationState) => {
    return state.details;
  }
);
