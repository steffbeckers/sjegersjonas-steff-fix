import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RelationFacade} from "../store/relation.facade";
import {UntypedFormBuilder} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FilterOperator} from "../../shared/infrastructure/enums/filter-operator.enum";
import {ProductFilterParams} from "../../shared/requests/product/product-filter.params";
import {FilterParam} from "../../shared/infrastructure/queries/filter/filter-param";
import {StringHelper} from "../../shared/helpers/string.helper";
import {SubSink} from "subsink";
import {skip, take} from "rxjs/operators";
import {RelationFilterParams} from "../../shared/requests/relation/relation-filter.params";

@Component({
  selector: 'app-relation-list-filter[show]',
  templateUrl: './relation-list-filter.component.html',
  styleUrls: ['./relation-list-filter.component.scss']
})
export class RelationListFilterComponent implements OnInit, OnDestroy {

  @Input() show: boolean = false;
  private subs = new SubSink();

  searchFrom = this.fb.group({
    column: ['1'],
    searchText: ['']
  });
  filters: RelationFilterParams | null = null;
  constructor(private fb: UntypedFormBuilder,
              private relationFacade: RelationFacade) { }

  ngOnInit(): void {
    this.relationFacade.loadRelations();
    this.addColumnListener();
    this.addSearchTextListener();
    this.subs.sink = this.relationFacade.selectFilters$.pipe(take(1)).subscribe((filters: RelationFilterParams) => {
      this.filters = filters;
      this.patchFormWithFilters(filters);
    });
  }

  private patchFormWithFilters(filters: RelationFilterParams) {
    if(filters.hasOwnProperty('name')) {
      this.searchFrom.patchValue({
        searchText: filters.name?.value || '',
        column: '1'
      });
    } else if(filters.hasOwnProperty('vatNumber')) {
      this.searchFrom.patchValue({
        searchText: filters.vatNumber?.value || '',
        column: '1'
      });
    } else if(filters.hasOwnProperty('street')) {
      this.searchFrom.patchValue({
        searchText: filters.street?.value || '',
        column: '1'
      });
    } else if(filters.hasOwnProperty('postalCode')) {
      this.searchFrom.patchValue({
        searchText: filters.postalCode?.value || '',
        column: '1'
      });
    } else if(filters.hasOwnProperty('city')) {
      this.searchFrom.patchValue({
        searchText: filters.city?.value || '',
        column: '1'
      });
    } else if(filters.hasOwnProperty('country')) {
      this.searchFrom.patchValue({
        searchText: filters.country?.value || '',
        column: '1'
      });
    } else if(filters.hasOwnProperty('language')) {
      this.searchFrom.patchValue({
        searchText: filters.language?.value || '',
        column: '1'
      });
    } else if(filters.hasOwnProperty('email')) {
      this.searchFrom.patchValue({
        searchText: filters.email?.value || '',
        column: '1'
      });
    }
  }

  private addSearchTextListener() {
    this.subs.sink = this.searchFrom.get('searchText')?.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe((searchText: string) => {
      const column = this.searchFrom.get('column')?.value;

      const relationFilterParams = new RelationFilterParams();
      searchText = searchText.trim();
      switch(column) {
        case '1':
          relationFilterParams.name = new FilterParam<string>(searchText, FilterOperator.Contains);
          break;
        case '2':
          relationFilterParams.vatNumber = new FilterParam<string>(searchText, FilterOperator.Contains);
          break;
        case '3':
          relationFilterParams.street = new FilterParam<string>(searchText, FilterOperator.Contains);
          break;
        case '4':
          relationFilterParams.postalCode = new FilterParam<string>(searchText, FilterOperator.Contains);
          break;
        case '5':
          relationFilterParams.city = new FilterParam<string>(searchText, FilterOperator.Contains);
          break;
        case '6':
          relationFilterParams.country = new FilterParam<string>(searchText, FilterOperator.Contains);
          break;
        case '7':
          relationFilterParams.language = new FilterParam<string>(searchText, FilterOperator.Contains);
          break;
        case '8':
          relationFilterParams.email = new FilterParam<string>(searchText, FilterOperator.Contains);
          break;
      }
      this.updateFilters(relationFilterParams);
    });
  }

  private addColumnListener() {
    this.subs.sink = this.searchFrom.get('column')?.valueChanges.pipe(
      distinctUntilChanged(),
      skip(1)
    ).subscribe((column: string) => {
      this.searchFrom.patchValue({
        searchText: '',
        category: null
      });
      this.updateFilters(new ProductFilterParams());
    });
  }

  private updateFilters(filters: RelationFilterParams) {
    if(JSON.stringify(filters) === JSON.stringify(this.filters)) { return; }
    this.filters = filters;
    this.relationFacade.updateFilters(filters);
    this.relationFacade.loadRelations();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
