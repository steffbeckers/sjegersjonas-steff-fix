import {Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from '../infrastructure/queries/pagination/paged-response.interface';
import { PagingParams } from '../infrastructure/queries/pagination/paging-params';
import { SortingParam } from '../infrastructure/queries/sorting/sorting-param';
import { HttpService } from '../infrastructure/services/http.service';

import {AddProductUnitRequest} from "../requests/product-unit/add-product-unit.request";
import {ProductUnitList} from "../models/product-unit/product-unit-list";
import {ProductUnitFilterParams} from "../requests/product-unit/product-unit-filter.params";
import {SearchParam} from "../infrastructure/queries/filter/search-param";

@Injectable({
  providedIn: 'root'
})
export class ProductUnitService {

  private baseUrl;

  constructor(private http: HttpService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/product-units';
  }

  getProductUnitList(filterParams: ProductUnitFilterParams, sortParam: SortingParam | null, pagingParams: PagingParams | null): Observable<PagedResponse<ProductUnitList[]>> {
    return this.http.pagedRequest(`${this.baseUrl}`, null, sortParam, pagingParams);
  }

  addProductUnit(request: AddProductUnitRequest): Observable<ProductUnitList> {
    return this.http.post(`${this.baseUrl}`, request);
  }

  deleteProductUnit(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchProductUnit(searchParams: SearchParam): Observable<ProductUnitList[]> {
    return this.http.get(`${this.baseUrl}/search`, { name: searchParams.searchText, id: searchParams.id })
  }

}
