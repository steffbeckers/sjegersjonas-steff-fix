import {Action, createReducer, on} from '@ngrx/store';

import {RelationState, initialRelationState, adapter} from './relation.state';
import * as actions from './relation.actions';

const stateReducer = createReducer(initialRelationState,
  on(
    actions.loadRelationsSuccess, (state, { pagedResponse }) => {
      const newState: RelationState = {
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
  on(actions.updateRelationSuccess, (state, { relation }) => ({
    ...state,
    details: {
      ...state.details,
      details: relation
    }
  })),
  on(
    actions.clearDetails, (state) => ({
      ...state,
      details: initialRelationState.details
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

export function reducer(state: RelationState | undefined, action: Action): RelationState {
  return stateReducer(state, action);
}
