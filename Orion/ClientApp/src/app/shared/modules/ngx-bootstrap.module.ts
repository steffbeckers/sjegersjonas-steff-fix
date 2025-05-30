import { NgModule } from '@angular/core';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {AlertModule} from 'ngx-bootstrap/alert';
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {ModalModule} from "ngx-bootstrap/modal";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [],
  imports: [
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CollapseModule,
    PaginationModule,
    BsDropdownModule
  ],
  providers: []
})
export class AppNgxBootstrapModule { }
