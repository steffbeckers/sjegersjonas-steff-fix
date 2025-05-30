import {FilterOperator} from "../../enums/filter-operator.enum";


export class FilterParam<T> {
  value: T;
  operator: FilterOperator;

  constructor(value: T, operator: FilterOperator = FilterOperator.Equals ) {
    this.value = value;
    this.operator = operator;
  }

  toString(): string | any[] | null {
    if (typeof(this.value) === 'string') {
      return this.operator.concat(this.value);
    } else if (typeof(this.value) === 'number') {
      return this.operator.concat(this.value.toString());
    } else if(Array.isArray(this.value)) {
      return this.value;
    }
    return null;
  }
}
