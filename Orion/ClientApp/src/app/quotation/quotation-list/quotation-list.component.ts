import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {ColumnHeaderInfo} from "../../shared/components/advanced-table/column-header-info";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {map} from "rxjs/operators";
import {QuotationList} from "../../shared/models/quotation/quotation-list";
import {AddQuotationModalComponent} from "../add-quotation-modal/add-quotation-modal.component";
import {QuotationFacade} from "../store/quotation.facade";

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit {

  isFilterOpen = false;
  data$: Observable<any>;
  pagination$: Observable<Pagination>;
  sort$: Observable<SortingParam | null>;
  isFilterActive$: Observable<boolean>;

  columnHeaderInfo: ColumnHeaderInfo[] = [
    { displayName: 'Name', columnDef: 'name', clickableDef: 'link', sortable: true },
    { displayName: 'Email', columnDef: 'email', sortable: true },
  ];

  constructor(private quotationFacade: QuotationFacade,
              private modalService: BsModalService) {
    this.data$ = this.quotationFacade.selectList$.pipe(
      map((quotations: QuotationList[]) => {
        return quotations.map(quotation => {
          return { ...quotation, link: quotation.quotationId }
        })
      })
    );
    this.pagination$ = this.quotationFacade.selectPagination$;
    this.sort$ = this.quotationFacade.selectSort$;
    this.isFilterActive$ = this.quotationFacade.selectIsFilterActive$;
  }

  ngOnInit(): void {
  }

  onAddQuotation() {
    const options: ModalOptions = {
      class: 'modal-lg modal-fullscreen-lg-down'
    }
    this.modalService.show(AddQuotationModalComponent, options);
  }

  changePage(page: number): void {
    this.quotationFacade.changePage(page);
    this.quotationFacade.loadQuotations();
  }

  onSortChange(sortingParam: SortingParam | null): void {
    this.quotationFacade.sortChange(sortingParam);
    this.quotationFacade.loadQuotations();
  }

  onPageChanged(page: number) {
    this.quotationFacade.changePage(page);
    this.quotationFacade.loadQuotations();
  }

}
