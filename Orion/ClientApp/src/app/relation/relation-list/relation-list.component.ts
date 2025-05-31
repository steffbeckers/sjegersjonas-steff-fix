import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {ColumnHeaderInfo} from "../../shared/components/advanced-table/column-header-info";
import {RelationFacade} from "../store/relation.facade";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {map} from "rxjs/operators";
import {RelationList} from "../../shared/models/relation/relation-list";
import {AddRelationModalComponent} from "../add-relation-modal/add-relation-modal.component";

@Component({
    selector: 'app-relation-list',
    templateUrl: './relation-list.component.html',
    styleUrls: ['./relation-list.component.scss'],
    standalone: false
})
export class RelationListComponent implements OnInit {
  isFilterOpen = false;
  data$: Observable<any>;
  pagination$: Observable<Pagination>;
  sort$: Observable<SortingParam | null>;
  isFilterActive$: Observable<boolean>;

  columnHeaderInfo: ColumnHeaderInfo[] = [
    { displayName: 'Name', columnDef: 'name', clickableDef: 'link', sortable: true },
    { displayName: 'Email', columnDef: 'email', sortable: true },
  ];

  constructor(private relationFacade: RelationFacade,
              private modalService: BsModalService) {
    this.data$ = this.relationFacade.selectList$.pipe(
      map((relations: RelationList[]) => {
        return relations.map(relation => {
          return { ...relation, link: relation.relationId }
        })
      })
    );
    this.pagination$ = this.relationFacade.selectPagination$;
    this.sort$ = this.relationFacade.selectSort$;
    this.isFilterActive$ = this.relationFacade.selectIsFilterActive$;
  }

  ngOnInit(): void {
  }

  onAddRelation() {
    const options: ModalOptions = {
      class: 'modal-lg modal-fullscreen-lg-down'
    }
    this.modalService.show(AddRelationModalComponent, options);
  }

  changePage(page: number): void {
    this.relationFacade.changePage(page);
    this.relationFacade.loadRelations();
  }

  onSortChange(sortingParam: SortingParam | null): void {
    this.relationFacade.sortChange(sortingParam);
    this.relationFacade.loadRelations();
  }

  onPageChanged(page: number) {
    this.relationFacade.changePage(page);
    this.relationFacade.loadRelations();
  }

}
