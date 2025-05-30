import {Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from '../infrastructure/queries/pagination/paged-response.interface';
import { PagingParams } from '../infrastructure/queries/pagination/paging-params';
import { SortingParam } from '../infrastructure/queries/sorting/sorting-param';
import { HttpService } from '../infrastructure/services/http.service';
import {ValueAddedTaxRateList} from "../models/value-added-tax-rate/value-added-tax-rate-list";
import {AddValueAddedTaxRateRequest} from "../requests/value-added-tax-rate/add-value-added-tax-rate.request";
import {ValueAddedTaxRateFilterParams} from "../requests/value-added-tax-rate/value-added-tax-rate-filter.params";

@Injectable({
  providedIn: 'root'
})
export class ValueAddedTaxRateService {

  private baseUrl;

  constructor(private http: HttpService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/value-added-tax-rates';
  }

  getValueAddedTaxRateList(filterParams: ValueAddedTaxRateFilterParams, sortParam: SortingParam | null, pagingParams: PagingParams | null): Observable<PagedResponse<ValueAddedTaxRateList[]>> {
    return this.http.pagedRequest(`${this.baseUrl}`, null, sortParam, pagingParams);
  }

  addValueAddedTaxRate(request: AddValueAddedTaxRateRequest): Observable<ValueAddedTaxRateList> {
    return this.http.post(`${this.baseUrl}`, request);
  }

  deleteValueAddedTaxRate(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
