import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";

import {RelationList} from "../../shared/models/relation/relation-list";
import {RelationFilterParams} from "../../shared/requests/relation/relation-filter.params";
import {RelationDetails} from "../../shared/models/relation/relation-details";

export interface RelationState extends EntityState<RelationList> {
  filters: RelationFilterParams;
  details: RelationDetails | null;
  pagination: Pagination;
  sort: SortingParam | null;
}

export const adapter: EntityAdapter<RelationList> = createEntityAdapter<RelationList>({
  selectId: (relation: RelationList) => relation.relationId,
  sortComparer: false,
});

export const initialRelationState: RelationState = adapter.getInitialState({
  filters: new RelationFilterParams(),
  details: null,
  pagination: {
    page: 1,
    pageSize: 4,
    totalItems: 0,
    totalPages: 0,
  },
  sort: null
});
