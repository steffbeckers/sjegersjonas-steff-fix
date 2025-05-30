import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";

import {ValueAddedTaxRateListState} from '../states/value-added-tax-rate-list.state';
import * as valueAddedTaxRateListSelectors from '../selectors/value-added-tax-rate-list.selectors';
import * as valueAddedTaxRateListActions from '../actions/value-added-tax-rate-list.actions';
import {ValueAddedTaxRateList} from "../../../shared/models/value-added-tax-rate/value-added-tax-rate-list";
import {
  ValueAddedTaxRateFilterParams
} from "../../../shared/requests/value-added-tax-rate/value-added-tax-rate-filter.params";
import {
  AddValueAddedTaxRateRequest
} from "../../../shared/requests/value-added-tax-rate/add-value-added-tax-rate.request";

@Injectable({
  providedIn: 'root'
})

export class ValueAddedTaxRateListFacade {

  selectList$: Observable<ValueAddedTaxRateList[]> = this.store.select(valueAddedTaxRateListSelectors.getAllValueAddedTaxRateLists);
  selectPagination$: Observable<Pagination> = this.store.select(valueAddedTaxRateListSelectors.getValueAddedTaxRateListPaginationData);
  selectFilters$: Observable<ValueAddedTaxRateFilterParams> = this.store.select(valueAddedTaxRateListSelectors.getValueAddedTaxRateListFilterData);
  selectSort$: Observable<SortingParam | null> = this.store.select(valueAddedTaxRateListSelectors.getValueAddedTaxRateListSortData);

  constructor(private store: Store<ValueAddedTaxRateListState>) { }

  loadValueAddedTaxRates(): void {
    combineLatest([this.selectFilters$, this.selectSort$, this.selectPagination$]).pipe(
      take(1),
      map(([a, b, c]) => ({
        filterParams: a,
        sortParam: b,
        pagingParams: c,
      }))
    ).subscribe((res) => {
      const {filterParams, sortParam, pagingParams} = res;
      this.store.dispatch(valueAddedTaxRateListActions.loadValueAddedTaxRateList({ filterParams, sortParam, pagingParams}));
    });
  }

  addValueAddedTaxRate(request: AddValueAddedTaxRateRequest): void {
    this.store.dispatch(valueAddedTaxRateListActions.addValueAddedTaxRate({ request }));
  }

  deleteValueAddedTaxRate(id: string): void {
    this.store.dispatch(valueAddedTaxRateListActions.deleteValueAddedTaxRate({ id }));
  }

}
