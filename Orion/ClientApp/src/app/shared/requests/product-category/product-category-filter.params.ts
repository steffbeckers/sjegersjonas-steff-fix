import {FilterParam} from "../../infrastructure/queries/filter/filter-param";

export class ProductCategoryFilterParams {
  id?: FilterParam<number[]>;
  name?: FilterParam<string>;
}
