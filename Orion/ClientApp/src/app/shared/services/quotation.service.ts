import {Inject, Injectable} from '@angular/core';
import {HttpService} from "../infrastructure/services/http.service";
import {QuotationFilterParams} from "../requests/quotation/quotation-filter.params";
import {SortingParam} from "../infrastructure/queries/sorting/sorting-param";
import {PagingParams} from "../infrastructure/queries/pagination/paging-params";
import {Observable} from "rxjs";
import {PagedResponse} from "../infrastructure/queries/pagination/paged-response.interface";
import {QuotationList} from "../models/quotation/quotation-list";
import {AddProductRequest} from "../requests/product/add-product.request";
import {ProductDetails} from "../models/product/product-details";
import {AddQuotationRequest} from "../requests/quotation/add-quotation.request";
import {QuotationDetails} from "../models/quotation/quotation-details";
import {UpdateProductRequest} from "../requests/product/update-product.request";
import {UpdateQuotationRequest} from "../requests/quotation/update-quotation.request";

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private baseUrl;

  constructor(private http: HttpService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/quotations';
  }

  getQuotationList(filterParams: QuotationFilterParams, sortParam: SortingParam | null, pagingParams: PagingParams): Observable<PagedResponse<QuotationList[]>> {
    return this.http.pagedRequest(`${this.baseUrl}`, filterParams, sortParam, pagingParams);
  }

  addQuotation(request: AddQuotationRequest): Observable<QuotationDetails> {
    return this.http.post(`${this.baseUrl}`, request);
  }

  updateQuotation(request: UpdateQuotationRequest): Observable<QuotationDetails> {
    return this.http.put(`${this.baseUrl}`, request);
  }

  deleteQuotation(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
