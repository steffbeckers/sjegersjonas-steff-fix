import {SortingParam} from './sorting-param';

export class SortingParams {
  sort: SortingParam | null;

  constructor(sort: SortingParam) {
    this.sort = sort;
  }
}

