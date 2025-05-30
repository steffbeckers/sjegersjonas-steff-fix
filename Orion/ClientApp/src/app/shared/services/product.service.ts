import {Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from '../infrastructure/queries/pagination/paged-response.interface';
import { PagingParams } from '../infrastructure/queries/pagination/paging-params';
import { SortingParam } from '../infrastructure/queries/sorting/sorting-param';
import { HttpService } from '../infrastructure/services/http.service';
import { ProductList } from '../models/product/product-list';
import {ProductFilterParams} from "../requests/product/product-filter.params";
import {ProductDetails} from "../models/product/product-details";
import {AddProductRequest} from "../requests/product/add-product.request";
import {UpdateProductRequest} from "../requests/product/update-product.request";
import {ProductDetailsResponse} from "../responses/product/product-details.response";
import {AddProductPriceRequest} from "../requests/product/add-product-price.request";
import {ProductPriceList} from "../models/product/product-price-list";
import {UpdateProductPriceRequest} from "../requests/product/update-product-price.request";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl;

  constructor(private http: HttpService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/products';
  }

  getProductList(filterParams: ProductFilterParams, sortParam: SortingParam | null, pagingParams: PagingParams): Observable<PagedResponse<ProductList[]>> {
    return this.http.pagedRequest(`${this.baseUrl}`, filterParams, sortParam, pagingParams);
  }

  getProductById(productId: string): Observable<ProductDetails> {
    return this.http.get(`${this.baseUrl}/${productId}`);
  }

  getProductDetailsVm(productId: string): Observable<ProductDetailsResponse> {
    return this.http.get(`${this.baseUrl}/${productId}/details-vm`);
  }

  addProduct(request: AddProductRequest): Observable<ProductDetails> {
    return this.http.post(`${this.baseUrl}`, request);
  }

  addProductPrice(request: AddProductPriceRequest): Observable<ProductPriceList> {
    return this.http.post(`${this.baseUrl}/add-product-price`, request);
  }

  updateProduct(request: UpdateProductRequest): Observable<ProductDetails> {
    return this.http.put(`${this.baseUrl}`, request);
  }

  updateProductPrice(request: UpdateProductPriceRequest): Observable<ProductPriceList> {
    return this.http.put(`${this.baseUrl}/product-prices`, request);
  }

  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteProductPrice(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/product-prices/${id}`);
  }

}
