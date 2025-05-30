import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ColumnHeaderInfo} from "../../shared/components/advanced-table/column-header-info";
import {map, take} from "rxjs/operators";
import {ProductPriceList} from "../../shared/models/product/product-price-list";
import {CurrencyHelper} from "../../shared/helpers/currency-helper";
import {ProductFacade} from "../store/product.facade";
import {CurrencyPipe} from "@angular/common";
import {Observable} from "rxjs";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {AddProductPriceModalComponent} from "../add-product-price-modal/add-product-price-modal.component";
import {TableActionEnum} from "../../shared/components/advanced-table/table-action.enum";
import {ConfirmationModalComponent} from "../../shared/modals/confirmation-modal/confirmation-modal.component";
import {SubSink} from "subsink";
import {EditProductPriceModalComponent} from "../edit-product-price-modal/edit-product-price-modal.component";

@Component({
  selector: 'app-product-details-prices[productId]',
  templateUrl: './product-details-prices.component.html',
  styleUrls: ['./product-details-prices.component.scss']
})
export class ProductDetailsPricesComponent implements OnInit, OnDestroy {

  @Input() productId!: string;
  private subs = new SubSink();
  productPriceData$: Observable<any>;
  productPricePagination$: Observable<Pagination>;

  columnHeaderInfo: ColumnHeaderInfo[] = [
    { displayName: 'Unit', columnDef: 'productUnitName' },
    { displayName: 'Price', columnDef: 'priceText' },
  ];

  tableActions: number[] = [TableActionEnum.Edit, TableActionEnum.Delete];

  constructor(private productFacade: ProductFacade, private currencyPipe: CurrencyPipe,
              private modalService: BsModalService) {
    this.productPriceData$ = this.productFacade.selectProductPrices$.pipe(
      map((productPrices: ProductPriceList[]) => {
        return productPrices.map((productPrice) => {
          return { ...productPrice, priceText: this.currencyPipe.transform(CurrencyHelper.formatCents(productPrice.price), '€ ') }
        })
      })
    );
    this.productPricePagination$ = this.productFacade.selectProductPricePagination$;
  }

  ngOnInit(): void {

  }

  onAddProductPrice() {
    const initialState: ModalOptions = {
      initialState: {
        productId: this.productId
      }
    };
    this.modalService.show(AddProductPriceModalComponent, initialState);
  }

  onDeleteProductPrice(productPrice: ProductPriceList): void {
    const modalRef = this.modalService.show(ConfirmationModalComponent);
    this.subs.sink = modalRef.content?.decision.pipe(take(1)).subscribe((decision: boolean) => {
      if(decision) {
        this.productFacade.deleteProductPrice(productPrice.productProductUnitId);
      }
    });
  }

  onEditProductPrice(productPrice: ProductPriceList): void {
    const initialState: ModalOptions = {
      initialState: {
        productPrice
      }
    };
    this.modalService.show(EditProductPriceModalComponent, initialState);
  }

  onPageChanged(page: number) {
    // TODO
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
