import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RelationState, adapter} from './relation.state';
import {RelationFilterParams} from "../../shared/requests/relation/relation-filter.params";

const relationsState = createFeatureSelector<RelationState>('relations');

export const {
  selectIds: getRelationIds,
  selectEntities: getRelationEntities,
  selectAll: getAllRelations,
  selectTotal: getTotalRelations,
} = adapter.getSelectors(relationsState);

export const getRelationPaginationData = createSelector(
  relationsState,
  (state: RelationState) => {
    return state.pagination;
  }
);

export const getRelationSortData = createSelector(
  relationsState,
  (state: RelationState) => {
    return state.sort;
  }
);

export const getRelationFilterData = createSelector(
  relationsState,
  (state: RelationState) => {
    return state.filters;
  }
);

export const getIsFilterActive = createSelector(
  relationsState,
  (state: RelationState) => {
    return (JSON.stringify(state.filters) !== JSON.stringify(new RelationFilterParams()));
  }
);

export const getRelationDetails = createSelector(
  relationsState,
  (state: RelationState) => {
    return state.details;
  }
);
