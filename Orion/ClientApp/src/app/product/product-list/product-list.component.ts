import { Component, OnInit } from '@angular/core';
import {Observable, tap} from "rxjs";

import {ProductFacade} from "../store/product.facade";
import {ProductList} from "../../shared/models/product/product-list";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {ColumnHeaderInfo} from "../../shared/components/advanced-table/column-header-info";
import {map} from "rxjs/operators";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {ProductFilterParams} from "../../shared/requests/product/product-filter.params";
import {EditProductPriceModalComponent} from "../edit-product-price-modal/edit-product-price-modal.component";
import {AddProductModalComponent} from "../add-product-modal/add-product-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";

interface Test {

}

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: false
})
export class ProductListComponent implements OnInit {
  isFilterOpen = false;
  data$: Observable<any>;
  pagination$: Observable<Pagination>;
  sort$: Observable<SortingParam | null>;
  isFilterActive$: Observable<boolean>;

  columnHeaderInfo: ColumnHeaderInfo[] = [
    { displayName: 'Code', columnDef: 'code', clickableDef: 'link', sortable: true },
    { displayName: 'Name', columnDef: 'name', sortable: true },
    { displayName: 'Category', columnDef: 'productCategory' }
  ];

  constructor(private productFacade: ProductFacade,
              private modalService: BsModalService) {
    this.data$ = this.productFacade.selectList$.pipe(
      map((products: ProductList[]) => {
        return products.map(product => {
          return { ...product, link: product.productId }
        })
      })
    );
    this.pagination$ = this.productFacade.selectPagination$;
    this.sort$ = this.productFacade.selectSort$;
    this.isFilterActive$ = this.productFacade.selectIsFilterActive$;
  }

  ngOnInit(): void {
  }

  onAddProduct() {
    this.modalService.show(AddProductModalComponent);
  }

  changePage(page: number): void {
    this.productFacade.changePage(page);
    this.productFacade.loadProducts();
  }

  onSortChange(sortingParam: SortingParam | null): void {
    this.productFacade.sortChange(sortingParam);
    this.productFacade.loadProducts();
  }

  onPageChanged(page: number) {
    this.productFacade.changePage(page);
    this.productFacade.loadProducts();
  }

}
