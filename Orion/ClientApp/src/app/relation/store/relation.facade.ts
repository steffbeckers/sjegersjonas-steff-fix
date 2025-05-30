import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {RelationState} from './relation.state';
import * as relationSelectors from './relation.selectors';
import * as relationActions from './relation.actions';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {RelationList} from "../../shared/models/relation/relation-list";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {RelationFilterParams} from "../../shared/requests/relation/relation-filter.params";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {RelationDetails} from "../../shared/models/relation/relation-details";
import {AddRelationRequest} from "../../shared/requests/relation/add-relation.request";
import {UpdateRelationRequest} from "../../shared/requests/relation/update-relation.request";

@Injectable({
  providedIn: 'root'
})

export class RelationFacade {

  selectList$: Observable<RelationList[]> = this.store.select(relationSelectors.getAllRelations);
  selectPagination$: Observable<Pagination> = this.store.select(relationSelectors.getRelationPaginationData);
  selectFilters$: Observable<RelationFilterParams> = this.store.select(relationSelectors.getRelationFilterData);
  selectIsFilterActive$: Observable<boolean> = this.store.select(relationSelectors.getIsFilterActive);
  selectSort$: Observable<SortingParam | null> = this.store.select(relationSelectors.getRelationSortData);
  selectRelationDetails$: Observable<RelationDetails | null> = this.store.select(relationSelectors.getRelationDetails);

  constructor(private store: Store<RelationState>) { }

  loadRelations(): void {
    const filterParams$ = this.store.select(relationSelectors.getRelationFilterData);
    const sortParam$ = this.store.select(relationSelectors.getRelationSortData);
    const pagingParams$ = this.store.select(relationSelectors.getRelationPaginationData);
    combineLatest([filterParams$, sortParam$, pagingParams$]).pipe(
      take(1),
      map(([a, b, c]) => ({
        filterParams: a,
        sortParam: b,
        pagingParams: c,
      }))
    ).subscribe((res) => {
      const {filterParams, sortParam, pagingParams} = res;
      this.store.dispatch(relationActions.loadRelations({ filterParams, sortParam, pagingParams}));
    });
  }

  addRelation(request: AddRelationRequest): void {
    this.store.dispatch(relationActions.addRelation({ request }));
  }

  updateRelation(request: UpdateRelationRequest): void {
    this.store.dispatch(relationActions.updateRelation({ request }));
  }

  deleteRelation(id: string): void {
    this.store.dispatch(relationActions.deleteRelation({ id }));
  }

  clearDetails(): void {
    this.store.dispatch(relationActions.clearDetails());
  }

  changePage(page: number): void {
    this.store.dispatch(relationActions.changePage({ page }));
  }

  sortChange(sortingParam: SortingParam | null): void {
    this.store.dispatch(relationActions.sortChange({ sortingParam }));
  }

  updateFilters(filterParams: RelationFilterParams): void {
    this.store.dispatch(relationActions.updateFilters({ filterParams }));
  }

}
