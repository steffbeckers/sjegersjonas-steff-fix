import {Inject, Injectable} from '@angular/core';
import {HttpService} from "../infrastructure/services/http.service";
import {RelationFilterParams} from "../requests/relation/relation-filter.params";
import {SortingParam} from "../infrastructure/queries/sorting/sorting-param";
import {PagingParams} from "../infrastructure/queries/pagination/paging-params";
import {Observable} from "rxjs";
import {PagedResponse} from "../infrastructure/queries/pagination/paged-response.interface";
import {RelationList} from "../models/relation/relation-list";
import {AddProductRequest} from "../requests/product/add-product.request";
import {ProductDetails} from "../models/product/product-details";
import {AddRelationRequest} from "../requests/relation/add-relation.request";
import {RelationDetails} from "../models/relation/relation-details";
import {UpdateProductRequest} from "../requests/product/update-product.request";
import {UpdateRelationRequest} from "../requests/relation/update-relation.request";

@Injectable({
  providedIn: 'root'
})
export class RelationService {

  private baseUrl;

  constructor(private http: HttpService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/relations';
  }

  getRelationList(filterParams: RelationFilterParams, sortParam: SortingParam | null, pagingParams: PagingParams): Observable<PagedResponse<RelationList[]>> {
    return this.http.pagedRequest(`${this.baseUrl}`, filterParams, sortParam, pagingParams);
  }

  addRelation(request: AddRelationRequest): Observable<RelationDetails> {
    return this.http.post(`${this.baseUrl}`, request);
  }

  updateRelation(request: UpdateRelationRequest): Observable<RelationDetails> {
    return this.http.put(`${this.baseUrl}`, request);
  }

  deleteRelation(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
