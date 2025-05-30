import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FilterOperator } from '../shared/infrastructure/enums/filter-operator.enum';
import { SortOrder } from '../shared/infrastructure/enums/sort-order.enum';
import { FilterParam } from '../shared/infrastructure/queries/filter/filter-param';
import { PagingParams } from '../shared/infrastructure/queries/pagination/paging-params';
import { SortingParam } from '../shared/infrastructure/queries/sorting/sorting-param';
import { RelationFilterParams } from '../shared/requests/relation/relation-filter.params';
import { RelationService } from '../shared/services/relation.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];
  public relations: any[] = [];
  public cities: City[];
  public selectedCity1: City | null = null;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private relationService: RelationService) {
    // http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
    //   this.forecasts = result;
    // }, error => console.error(error));

    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];


    const filterParams = new RelationFilterParams();
    // filterParams.id = new FilterParam([1])
    filterParams.name = new FilterParam('st', FilterOperator.Contains)
    const sortingParam = new SortingParam('name', SortOrder.Desc);
    const pagingParams = new PagingParams(1, 5);

    this.relationService.getRelationList(filterParams, sortingParam, pagingParams).subscribe(result => {
      this.relations = result.data;
    }, error => console.error(error));

    //http.get<any>(baseUrl + 'api/relations').subscribe(result => {
    //  this.relations = result.data;
    //}, error => console.error(error));

  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
