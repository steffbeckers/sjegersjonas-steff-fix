import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ValueAddedTaxRateList} from "../../../shared/models/value-added-tax-rate/value-added-tax-rate-list";
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";
import {
  ValueAddedTaxRateFilterParams
} from "../../../shared/requests/value-added-tax-rate/value-added-tax-rate-filter.params";
import {SortOrder} from "../../../shared/infrastructure/enums/sort-order.enum";

export interface ValueAddedTaxRateListState extends EntityState<ValueAddedTaxRateList> {
  filters: ValueAddedTaxRateFilterParams;
  pagination: Pagination;
  sort: SortingParam | null;
}

export const adapter: EntityAdapter<ValueAddedTaxRateList> = createEntityAdapter<ValueAddedTaxRateList>({
  selectId: (valueAddedTaxRateList: ValueAddedTaxRateList) => valueAddedTaxRateList.valueAddedTaxRateId,
  sortComparer: false,
});

export const initialValueAddedTaxRateListState: ValueAddedTaxRateListState = adapter.getInitialState({
  filters: new ValueAddedTaxRateFilterParams(),
  pagination: {
    page: 1,
    pageSize: 100,
    totalItems: 0,
    totalPages: 0,
  },
  sort: new SortingParam('percentage', SortOrder.Asc)
});
