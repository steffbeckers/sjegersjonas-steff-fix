import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductFacade} from "../store/product.facade";
import {FormBuilder, Validators} from "@angular/forms";
import {SubSink} from "subsink";
import {skip, take, tap} from "rxjs/operators";
import {ProductFilterParams} from "../../shared/requests/product/product-filter.params";
import {FilterParam} from "../../shared/infrastructure/queries/filter/filter-param";
import {FilterOperator} from "../../shared/infrastructure/enums/filter-operator.enum";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {ProductCategorySearchFacade} from "../../app-store/facades/product-category-search.facade";
import {StringHelper} from "../../shared/helpers/string.helper";

@Component({
  selector: 'app-product-list-filter[show]',
  templateUrl: './product-list-filter.component.html',
  styleUrls: ['./product-list-filter.component.scss']
})
export class ProductListFilterComponent implements OnInit, OnDestroy {

  @Input() show: boolean = false;
  private subs = new SubSink();

  searchFrom = this.fb.group({
    column: ['1'],
    searchText: [''],
    category: [null],
  });
  filters: ProductFilterParams | null = null;
  constructor(private fb: FormBuilder,
              private productFacade: ProductFacade,
              public productCategorySearchFacade: ProductCategorySearchFacade) { }

  ngOnInit(): void {
    this.productFacade.loadProducts();
    this.addColumnListener();
    this.addSearchTextListener();
    this.addCategoryListener();
    this.subs.sink = this.productFacade.selectFilters$.pipe(take(1)).subscribe((filters: ProductFilterParams) => {
      this.filters = filters;
      this.patchFormWithFilters(filters);
    });
  }

  private patchFormWithFilters(filters: ProductFilterParams) {
    if(filters.hasOwnProperty('code')) {
      this.searchFrom.patchValue({
        searchText: filters.code?.value || '',
        column: '1'
      });
    } else if(filters.hasOwnProperty('name')) {
      this.searchFrom.patchValue({
        searchText: filters.name?.value || '',
      });
      this.searchFrom.patchValue({
        column: '2'
      });
    } else if(filters.hasOwnProperty('productCategoryId')) {
      this.searchFrom.patchValue({
        category: filters.productCategoryId?.value ? filters.productCategoryId?.value.toString() : null,
        column: '3'
      });
    } else  {
      this.searchFrom.patchValue({
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
      if(column !== '1' && column !== '2') { return; }

      const productFilterParams = new ProductFilterParams();
      if(column === '1' && !StringHelper.isEmptyOrNull(searchText)) {
        productFilterParams.code = new FilterParam<string>(searchText, FilterOperator.Contains);
      } else if(column === '2' && !StringHelper.isEmptyOrNull(searchText)) {
        productFilterParams.name = new FilterParam<string>(searchText, FilterOperator.Contains);
      }
      this.updateFilters(productFilterParams);
    });
  }

  private addCategoryListener() {
    this.subs.sink = this.searchFrom.get('category')?.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe((category: string | null) => {
      const column = this.searchFrom.get('column')?.value;
      if(column !== '3') { return; }
      const productFilterParams = new ProductFilterParams();
      if(category) {
        productFilterParams.productCategoryId = new FilterParam<number>(parseInt(category), FilterOperator.Equals);
      }
      this.updateFilters(productFilterParams);
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

  private updateFilters(filters: ProductFilterParams) {
    if(JSON.stringify(filters) === JSON.stringify(this.filters)) { return; }
    this.filters = filters;
    this.productFacade.updateFilters(filters);
    this.productFacade.loadProducts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
