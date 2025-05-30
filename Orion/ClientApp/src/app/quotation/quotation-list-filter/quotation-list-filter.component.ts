import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-quotation-list-filter',
  templateUrl: './quotation-list-filter.component.html',
  styleUrls: ['./quotation-list-filter.component.scss']
})
export class QuotationListFilterComponent implements OnInit {

  @Input() show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
