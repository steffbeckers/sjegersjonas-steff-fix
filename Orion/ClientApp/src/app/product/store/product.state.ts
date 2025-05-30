import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {SortOrder} from "../../shared/infrastructure/enums/sort-order.enum";

import {ProductList} from "../../shared/models/product/product-list";
import {ProductFilterParams} from "../../shared/requests/product/product-filter.params";
import {ProductDetails} from "../../shared/models/product/product-details";
import {ProductPriceList} from "../../shared/models/product/product-price-list";

export interface ProductState extends EntityState<ProductList> {
  filters: ProductFilterParams;
  details: {
    details: ProductDetails | null;
    prices: {
      entities: ProductPriceList[];
      pagination: Pagination;
    }
  }
  pagination: Pagination;
  sort: SortingParam | null;
}

export const adapter: EntityAdapter<ProductList> = createEntityAdapter<ProductList>({
  selectId: (product: ProductList) => product.productId,
  sortComparer: false,
});

export const initialProductState: ProductState = adapter.getInitialState({
  filters: new ProductFilterParams(),
  details: {
    details: null,
    prices: {
      entities: [],
      pagination: {
        page: 1,
        pageSize: 4,
        totalItems: 0,
        totalPages: 1,
      }
    }
  },
  pagination: {
    page: 1,
    pageSize: 4,
    totalItems: 0,
    totalPages: 0,
  },
  sort: null
});
