import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {ProductCategoryList} from "../../shared/models/product-category/product-category-list";
import {ProductCategoryListFacade} from "../store/facades/product-category-list.facade";
import {AddProductCategoryRequest} from "../../shared/requests/product-category/add-product-category.request";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
    selector: 'app-product-category-settings',
    templateUrl: './product-category-settings.component.html',
    styleUrls: ['./product-category-settings.component.scss'],
    standalone: false
})
export class ProductCategorySettingsComponent implements OnInit {

  addProductCategoryForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  productCategoryList$: Observable<ProductCategoryList[]>;
  productCategoryListPagination$: Observable<Pagination>;

  constructor(private fb: UntypedFormBuilder,
              private productCategoryListFacade: ProductCategoryListFacade) {
    this.productCategoryList$ = this.productCategoryListFacade.selectList$;
    this.productCategoryListPagination$ = this.productCategoryListFacade.selectPagination$;
  }

  ngOnInit(): void {
    this.productCategoryListFacade.loadProductCategories();
  }

  addProductCategory() {
    const request = new AddProductCategoryRequest(
      this.addProductCategoryForm.get('name')?.value.trim(),
      this.addProductCategoryForm.get('description')?.value.trim().length === 0 ? null : this.addProductCategoryForm.get('description')?.value.trim()
    );
    this.productCategoryListFacade.addProductCategory(request);
    this.addProductCategoryForm.patchValue({ name: '', description: '' });
  }

  removeProductCategory(id: string) {
    this.productCategoryListFacade.deleteProductCategory(id.toString());
  }

  onPaginate(event: PageChangedEvent) {
    this.productCategoryListFacade.changePage(event.page);
    this.productCategoryListFacade.loadProductCategories();
  }

}
