import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

import {ProductUnitList} from "../../shared/models/product-unit/product-unit-list";
import {ProductUnitListFacade} from "../store/facades/product-unit-list.facade";
import {AddProductUnitRequest} from "../../shared/requests/product-unit/add-product-unit.request";


@Component({
  selector: 'app-product-unit-settings',
  templateUrl: './product-unit-settings.component.html',
  styleUrls: ['./product-unit-settings.component.scss']
})
export class ProductUnitSettingsComponent implements OnInit {

  addProductUnitForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  productUnitList$: Observable<ProductUnitList[]>;
  productUnitListPagination$: Observable<Pagination>;

  constructor(private fb: UntypedFormBuilder,
              private productUnitListFacade: ProductUnitListFacade) {
    this.productUnitList$ = this.productUnitListFacade.selectList$;
    this.productUnitListPagination$ = this.productUnitListFacade.selectPagination$;
  }

  ngOnInit(): void {
    this.productUnitListFacade.loadProductUnits();
  }

  addProductUnit() {
    const request = new AddProductUnitRequest(
      this.addProductUnitForm.get('name')?.value.trim(),
      this.addProductUnitForm.get('description')?.value.trim().length === 0 ? null : this.addProductUnitForm.get('description')?.value.trim()
    );
    this.productUnitListFacade.addProductUnit(request);
    this.addProductUnitForm.patchValue({ name: '', description: '' });
  }

  removeProductUnit(id: string) {
    this.productUnitListFacade.deleteProductUnit(id.toString());
  }

  onPaginate(event: PageChangedEvent) {
    this.productUnitListFacade.changePage(event.page);
    this.productUnitListFacade.loadProductUnits();
  }

}
