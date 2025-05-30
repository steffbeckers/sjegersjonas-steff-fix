import {createAction, props} from '@ngrx/store';
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {PagedResponse} from "../../shared/infrastructure/queries/pagination/paged-response.interface";

import {RelationList} from "../../shared/models/relation/relation-list";
import {AddRelationRequest} from "../../shared/requests/relation/add-relation.request";
import {RelationDetails} from "../../shared/models/relation/relation-details";
import {UpdateRelationRequest} from "../../shared/requests/relation/update-relation.request";
import {RelationFilterParams} from "../../shared/requests/relation/relation-filter.params";

export const loadRelations = createAction('[Relation/API] Load Relations', props<{
  filterParams: RelationFilterParams,
  sortParam: SortingParam | null,
  pagingParams: Pagination
}>());
export const loadRelationsSuccess = createAction('[Relation/API] Load Relations Success', props<{
  pagedResponse: PagedResponse<RelationList[]>
}>());
export const loadRelationsFailure = createAction('[Relation/API] Load Relations Failure', props<{ error: any }>());

export const addRelation = createAction('[Relation/API] Add Relation', props<{ request: AddRelationRequest }>());
export const addRelationSuccess = createAction('[Relation/API] Add Relation Success');
export const addRelationFailure = createAction('[Relation/API] Add Relation Failure', props<{ error: any }>());

export const updateRelation = createAction('[Relation/API] Update Relation', props<{ request: UpdateRelationRequest }>());
export const updateRelationSuccess = createAction('[Relation/API] Update Relation Success', props<{ relation: RelationDetails }>());
export const updateRelationFailure = createAction('[Relation/API] Update Relation Failure', props<{ error: any }>());

export const deleteRelation = createAction('[Relation/API] Delete Relation', props<{ id: string }>());
export const deleteRelationSuccess = createAction('[Relation/API] Delete Relation Success', props<{ id: string }>());
export const deleteRelationFailure = createAction('[Relation/API] Delete Relation Failure', props<{ error: any }>());

export const updateFilters = createAction('[Relation] Update Relation Filters', props<{ filterParams: RelationFilterParams }>());
export const changePage = createAction('[Relation] Relation Change Page', props<{ page: number }>());
export const sortChange = createAction('[Relation] Relation Table Sort', props<{ sortingParam: SortingParam | null }>());
export const clearDetails = createAction('[Relation] Clear Relation Details');
