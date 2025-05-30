import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Pagination} from "../../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../../shared/infrastructure/queries/sorting/sorting-param";
import {SortOrder} from "../../../shared/infrastructure/enums/sort-order.enum";

import {ProductCategoryList} from "../../../shared/models/product-category/product-category-list";
import {ProductCategoryFilterParams} from "../../../shared/requests/product-category/product-category-filter.params";


export interface ProductCategoryListState extends EntityState<ProductCategoryList> {
  filters: ProductCategoryFilterParams;
  pagination: Pagination;
  sort: SortingParam | null;
}

export const adapter: EntityAdapter<ProductCategoryList> = createEntityAdapter<ProductCategoryList>({
  selectId: (productCategoryList: ProductCategoryList) => productCategoryList.productCategoryId,
  sortComparer: false,
});

export const initialProductCategoryListState: ProductCategoryListState = adapter.getInitialState({
  filters: new ProductCategoryFilterParams(),
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  sort: new SortingParam('name', SortOrder.Asc)
});
