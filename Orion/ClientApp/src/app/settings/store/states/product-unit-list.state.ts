import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";
import {SortOrder} from "../../../shared/infrastructure/enums/sort-order.enum";

import {ProductUnitList} from "../../../shared/models/product-unit/product-unit-list";
import {ProductUnitFilterParams} from "../../../shared/requests/product-unit/product-unit-filter.params";


export interface ProductUnitListState extends EntityState<ProductUnitList> {
  filters: ProductUnitFilterParams;
  pagination: Pagination;
  sort: SortingParam | null;
}

export const adapter: EntityAdapter<ProductUnitList> = createEntityAdapter<ProductUnitList>({
  selectId: (productUnitList: ProductUnitList) => productUnitList.productUnitId,
  sortComparer: false,
});

export const initialProductUnitListState: ProductUnitListState = adapter.getInitialState({
  filters: new ProductUnitFilterParams(),
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  sort: new SortingParam('name', SortOrder.Asc)
});
