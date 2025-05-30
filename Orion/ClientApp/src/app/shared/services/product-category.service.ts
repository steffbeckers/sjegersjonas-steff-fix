import {Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from '../infrastructure/queries/pagination/paged-response.interface';
import { PagingParams } from '../infrastructure/queries/pagination/paging-params';
import { SortingParam } from '../infrastructure/queries/sorting/sorting-param';
import { HttpService } from '../infrastructure/services/http.service';

import {AddProductCategoryRequest} from "../requests/product-category/add-product-category.request";
import {ProductCategoryList} from "../models/product-category/product-category-list";
import {ProductCategoryFilterParams} from "../requests/product-category/product-category-filter.params";
import {SearchParam} from "../infrastructure/queries/filter/search-param";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl;

  constructor(private http: HttpService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/product-categories';
  }

  getProductCategoryList(filterParams: ProductCategoryFilterParams, sortParam: SortingParam | null, pagingParams: PagingParams | null): Observable<PagedResponse<ProductCategoryList[]>> {
    return this.http.pagedRequest(`${this.baseUrl}`, null, sortParam, pagingParams);
  }

  addProductCategory(request: AddProductCategoryRequest): Observable<ProductCategoryList> {
    return this.http.post(`${this.baseUrl}`, request);
  }

  deleteProductCategory(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchProductCategory(searchParams: SearchParam): Observable<ProductCategoryList[]> {
    return this.http.get(`${this.baseUrl}/search`, { name: searchParams.searchText, id: searchParams.id })
  }
}
