import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {AppNgxBootstrapModule} from "./ngx-bootstrap.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdvancedTableComponent} from "../components/advanced-table/advanced-table.component";
import {RouterModule} from "@angular/router";
import {PaginationComponent} from "../components/pagination/pagination.component";
import {SelectSearchComponent, SelectSearchRefDirective} from "../components/select-search/select-search.component";
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FormFieldErrorComponent,
  FormFieldErrorDirective
} from "../components/form-field-error/form-field-error.component";
import {ErrorCodeModalComponent} from "../modals/error-code-modal/error-code-modal.component";

@NgModule({
  declarations: [
    AdvancedTableComponent,
    PaginationComponent,
    SelectSearchComponent,
    SelectSearchRefDirective,
    FormFieldErrorComponent,
    FormFieldErrorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgxBootstrapModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgxBootstrapModule,
    AdvancedTableComponent,
    PaginationComponent,
    SelectSearchComponent,
    SelectSearchRefDirective,
    FormFieldErrorComponent,
    FormFieldErrorDirective,

  ],
  providers: [CurrencyPipe]
})
export class SharedModule { }
