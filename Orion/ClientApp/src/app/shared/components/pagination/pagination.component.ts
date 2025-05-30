import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Pagination} from "../../infrastructure/queries/pagination/pagination.interface";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() pagination: Pagination = { page: 1, totalPages: 1, totalItems: 1, pageSize: 1 };
  @Output() pageChanged = new EventEmitter<number>();
  pages: number[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pagesToShow();
  }

  private pagesToShow() {
    this.pages = [];
    const activePage = this.pagination.page;
    const totalPages = this.pagination.totalPages || 1;

    this.addPage(1);

    if(activePage === totalPages - 1) {
      this.addPage((activePage - 2));
    }

    if(activePage === totalPages) {
      this.addPage((activePage - 3), (activePage - 2));
    }

    this.addPage((activePage - 1), activePage, (activePage + 1));

    if(activePage === 1 || activePage === 2) {
      this.addPage(3, 4);
    }

    this.addPage(totalPages);
  }

  private addPage(...pages: number[]) {
    pages.forEach(page => {
      if(page > 0 && page <= this.pagination.totalPages && !this.pages.includes(page)) {
        this.pages.push(page);
      }
    })
  }

  emitPageChanged(page: number) {
    if(page === this.pagination.page) { return; }
    this.pageChanged.emit(page);
  }

}
