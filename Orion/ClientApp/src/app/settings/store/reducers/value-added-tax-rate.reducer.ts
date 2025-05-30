import {Action, createReducer, on} from "@ngrx/store";
import * as valueAddedTaxRateListState from '../states/value-added-tax-rate-list.state';
import {ValueAddedTaxRateListState} from "../states/value-added-tax-rate-list.state";
import * as valueAddedTaxRateListActions from '../actions/value-added-tax-rate-list.actions';

export const valueAddedTaxRateListFeatureKey = 'valueAddedTaxRateList';

const valueAddedTaxRateListReducer = createReducer(valueAddedTaxRateListState.initialValueAddedTaxRateListState,
  on(
    valueAddedTaxRateListActions.loadValueAddedTaxRateListSuccess, (state, { pagedResponse }) => {
      const newState: ValueAddedTaxRateListState = {
        ...state,
        pagination: {
          page: pagedResponse.pagination.page,
          pageSize: pagedResponse.pagination.pageSize,
          totalItems: pagedResponse.pagination.totalItems,
          totalPages: pagedResponse.pagination.totalPages,
        }
      };
      return valueAddedTaxRateListState.adapter.setAll(pagedResponse.data, newState);
    }
  )
);

export function reducer(state: ValueAddedTaxRateListState | undefined, action: Action): ValueAddedTaxRateListState {
  return valueAddedTaxRateListReducer(state, action);
}
