import {FilterParam} from "../../infrastructure/queries/filter/filter-param";

export class ProductUnitFilterParams {
  id?: FilterParam<number[]>;
  name?: FilterParam<string>;
}
