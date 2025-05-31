import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SortingParam} from "../../infrastructure/queries/sorting/sorting-param";
import {ColumnHeaderInfo} from "./column-header-info";
import {SortOrder} from "../../infrastructure/enums/sort-order.enum";
import {TableActionEnum} from "./table-action.enum";

@Component({
    selector: 'app-advanced-table',
    templateUrl: './advanced-table.component.html',
    styleUrls: ['./advanced-tablecomponent.scss'],
    standalone: false
})
export class AdvancedTableComponent implements OnInit {
  tableActionEnum = TableActionEnum
  sortOrder = SortOrder

  @Input() columnHeaderInfo: ColumnHeaderInfo[] = [];
  @Input() data: any = [];
  @Input() sort: SortingParam | null = null;
  @Input() actions: number[] = [];


  @Output() changePage = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<SortingParam | null>();
  @Output() actionEdit = new EventEmitter<any>();
  @Output() actionDelete = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSortChange(columnDef: string, sortable: boolean | undefined) {
    if(!sortable) { return; }
    if(this.sort === null || this.sort.columnName !== columnDef) {
      this.sortChange.emit(new SortingParam(columnDef, SortOrder.Asc));
      return;
    }

    if(this.sort.columnName === columnDef) {
      if(this.sort.order === SortOrder.Asc) {
        this.sortChange.emit(new SortingParam(columnDef, SortOrder.Desc));
      } else if(this.sort.order === SortOrder.Desc) {
        this.sortChange.emit(null);
      }
    }
  }

  onActionEdit(element: any) {
    this.actionEdit.emit(element);
  }

  onActionDelete(element: any) {
    this.actionDelete.emit(element);
  }

}
