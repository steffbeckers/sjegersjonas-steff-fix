import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ProductUnitList} from "../../shared/models/product-unit/product-unit-list";

export interface SearchProductUnitState extends EntityState<ProductUnitList> {
  filterText: string;
}

export const adapter: EntityAdapter<ProductUnitList> = createEntityAdapter<ProductUnitList>({
  selectId: (productUnitList: ProductUnitList) => productUnitList.productUnitId,
  sortComparer: false,
});

export const initialSearchProductUnitState: SearchProductUnitState = adapter.getInitialState({
  filterText: ''
});
