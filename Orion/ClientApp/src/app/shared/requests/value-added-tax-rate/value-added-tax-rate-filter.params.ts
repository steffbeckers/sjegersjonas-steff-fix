import {FilterParam} from "../../infrastructure/queries/filter/filter-param";


export class ValueAddedTaxRateFilterParams {
  id?: FilterParam<number[]> | null;
  percentage?: FilterParam<number> | null;
}
