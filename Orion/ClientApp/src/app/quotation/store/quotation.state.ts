import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";

import {QuotationList} from "../../shared/models/quotation/quotation-list";
import {QuotationFilterParams} from "../../shared/requests/quotation/quotation-filter.params";
import {QuotationDetails} from "../../shared/models/quotation/quotation-details";

export interface QuotationState extends EntityState<QuotationList> {
  filters: QuotationFilterParams;
  details: QuotationDetails | null;
  pagination: Pagination;
  sort: SortingParam | null;
}

export const adapter: EntityAdapter<QuotationList> = createEntityAdapter<QuotationList>({
  selectId: (quotation: QuotationList) => quotation.quotationId,
  sortComparer: false,
});

export const initialQuotationState: QuotationState = adapter.getInitialState({
  filters: new QuotationFilterParams(),
  details: null,
  pagination: {
    page: 1,
    pageSize: 4,
    totalItems: 0,
    totalPages: 0,
  },
  sort: null
});
