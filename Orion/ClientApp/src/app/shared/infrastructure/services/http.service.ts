import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SortingParam} from "../queries/sorting/sorting-param";
import {PagingParams} from "../queries/pagination/paging-params";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, params?: any): Observable<T> {
    const options = this.getHttpOptions();
    if (params) {
      for (const [key] of Object.entries(params)) {
        if(params[key]) {
          options.params = {
            ...options.params,
            [key]: params[key].toString()
          };
        }
      }
    }
    return this.httpClient.get(url, options).pipe(
      map((res: any) => {
        return res.body;
      })
    );
  }

  pagedRequest<T>(url: string, filterParams: any, sortParams: SortingParam | null, pagingParams: PagingParams | null): Observable<T> {
    const options = this.getHttpOptions();
    options.params = {};
    if (filterParams) {
      for (const [key, value] of Object.entries(filterParams)) {
        options.params = {
          ...options.params,
          [key]: filterParams[key].toString()
        };
      }
    }

    if (sortParams) {
      options.params = {
        ...options.params,
        sort: sortParams.toString()
      };
    }
    if (pagingParams) {
      for (const [key, value] of Object.entries(pagingParams)) {
        options.params = {
          ...options.params,
          [key]: value
        };
      }
    }

    return this.httpClient.get(url, options).pipe(
      map((res: any) => {
        return res.body;
      })
    );
  }

  post<T, U>(url: string, data: T): Observable<U> {
    return this.httpClient.post(url, data, this.getHttpOptions())
      .pipe(
        map((res: any) => res.body)
      );
  }

  put<T, U>(url: string, data: T): Observable<U> {
    return this.httpClient.put(url, data, this.getHttpOptions())
      .pipe(
        map((res: any) => res.body)
      );
  }

  delete<T>(url: string): Observable<boolean> {
    return this.httpClient.delete(url)
      .pipe(
        map((res: any) => true)
      );
  }

  private getHttpOptions(): any {
    return  {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response',
    };
  }

}
