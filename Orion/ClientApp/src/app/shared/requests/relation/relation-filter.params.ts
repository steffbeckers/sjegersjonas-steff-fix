import {FilterParam} from "../../infrastructure/queries/filter/filter-param";


export class RelationFilterParams {
  id?: FilterParam<number[]>;
  name?: FilterParam<string>;
  vatNumber?: FilterParam<string>;
  street?: FilterParam<string>;
  postalCode?: FilterParam<string>;
  city?: FilterParam<string>;
  country?: FilterParam<string>;
  language?: FilterParam<string>;
  email?: FilterParam<string>;
  isCompany?: FilterParam<boolean>;
}
