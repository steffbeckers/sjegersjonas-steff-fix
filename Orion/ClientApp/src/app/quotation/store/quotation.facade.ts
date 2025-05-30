import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {QuotationState} from './quotation.state';
import * as quotationSelectors from './quotation.selectors';
import * as quotationActions from './quotation.actions';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {QuotationList} from "../../shared/models/quotation/quotation-list";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {QuotationFilterParams} from "../../shared/requests/quotation/quotation-filter.params";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {QuotationDetails} from "../../shared/models/quotation/quotation-details";
import {AddQuotationRequest} from "../../shared/requests/quotation/add-quotation.request";
import {UpdateQuotationRequest} from "../../shared/requests/quotation/update-quotation.request";

@Injectable({
  providedIn: 'root'
})

export class QuotationFacade {

  selectList$: Observable<QuotationList[]> = this.store.select(quotationSelectors.getAllQuotations);
  selectPagination$: Observable<Pagination> = this.store.select(quotationSelectors.getQuotationPaginationData);
  selectFilters$: Observable<QuotationFilterParams> = this.store.select(quotationSelectors.getQuotationFilterData);
  selectIsFilterActive$: Observable<boolean> = this.store.select(quotationSelectors.getIsFilterActive);
  selectSort$: Observable<SortingParam | null> = this.store.select(quotationSelectors.getQuotationSortData);
  selectQuotationDetails$: Observable<QuotationDetails | null> = this.store.select(quotationSelectors.getQuotationDetails);

  constructor(private store: Store<QuotationState>) { }

  loadQuotations(): void {
    const filterParams$ = this.store.select(quotationSelectors.getQuotationFilterData);
    const sortParam$ = this.store.select(quotationSelectors.getQuotationSortData);
    const pagingParams$ = this.store.select(quotationSelectors.getQuotationPaginationData);
    combineLatest([filterParams$, sortParam$, pagingParams$]).pipe(
      take(1),
      map(([a, b, c]) => ({
        filterParams: a,
        sortParam: b,
        pagingParams: c,
      }))
    ).subscribe((res) => {
      const {filterParams, sortParam, pagingParams} = res;
      this.store.dispatch(quotationActions.loadQuotations({ filterParams, sortParam, pagingParams}));
    });
  }

  addQuotation(request: AddQuotationRequest): void {
    this.store.dispatch(quotationActions.addQuotation({ request }));
  }

  updateQuotation(request: UpdateQuotationRequest): void {
    this.store.dispatch(quotationActions.updateQuotation({ request }));
  }

  deleteQuotation(id: string): void {
    this.store.dispatch(quotationActions.deleteQuotation({ id }));
  }

  clearDetails(): void {
    this.store.dispatch(quotationActions.clearDetails());
  }

  changePage(page: number): void {
    this.store.dispatch(quotationActions.changePage({ page }));
  }

  sortChange(sortingParam: SortingParam | null): void {
    this.store.dispatch(quotationActions.sortChange({ sortingParam }));
  }

  updateFilters(filterParams: QuotationFilterParams): void {
    this.store.dispatch(quotationActions.updateFilters({ filterParams }));
  }

}
