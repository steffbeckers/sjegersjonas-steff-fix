import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoutesConfig} from "../shared/routes-config";
import {QuotationListComponent} from "./quotation-list/quotation-list.component";

const routes: Routes = [
  {
    path: RoutesConfig.quotation.quotationList.path,
    component: QuotationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationListRoutingModule { }
