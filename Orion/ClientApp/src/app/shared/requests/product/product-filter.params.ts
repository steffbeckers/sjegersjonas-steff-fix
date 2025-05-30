import {FilterParam} from "../../infrastructure/queries/filter/filter-param";


export class ProductFilterParams {
  id?: FilterParam<number[]>;
  name?: FilterParam<string>;
  code?: FilterParam<string>;
  productCategoryId?: FilterParam<number>;
}
