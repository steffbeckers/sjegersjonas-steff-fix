import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ProductCategoryList} from "../../shared/models/product-category/product-category-list";

export interface SearchProductCategoryState extends EntityState<ProductCategoryList> {
  filterText: string;
}

export const adapter: EntityAdapter<ProductCategoryList> = createEntityAdapter<ProductCategoryList>({
  selectId: (productCategoryList: ProductCategoryList) => productCategoryList.productCategoryId,
  sortComparer: false,
});

export const initialSearchProductCategoryState: SearchProductCategoryState = adapter.getInitialState({
  filterText: ''
});
