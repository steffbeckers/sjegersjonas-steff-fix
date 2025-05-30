import {SortOrder} from "../../enums/sort-order.enum";


export class SortingParam {
  [todo: string]: any;

  columnName: string;
  order: SortOrder;

  constructor(columnName: string,
              order: SortOrder) {
    this.columnName = columnName;
    this.order = order;
  }

  toString(): string {
    return this.columnName.concat(',', this.order.toString());
  }
}
