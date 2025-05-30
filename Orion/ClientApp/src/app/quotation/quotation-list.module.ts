import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationListRoutingModule } from './quotation-list-routing.module';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { AddQuotationModalComponent } from './add-quotation-modal/add-quotation-modal.component';
import { QuotationDetailsComponent } from './quotation-details/quotation-details.component';
import {StoreModule} from "@ngrx/store";
import {reducer} from "../relation/store/relation.reducer";
import {EffectsModule} from "@ngrx/effects";
import {QuotationEffects} from "./store/quotation.effects";
import { QuotationListFilterComponent } from './quotation-list-filter/quotation-list-filter.component';
import {SharedModule} from "../shared/modules/shared.module";


@NgModule({
  declarations: [
    QuotationListComponent,
    AddQuotationModalComponent,
    QuotationDetailsComponent,
    QuotationListFilterComponent
  ],
  imports: [
    SharedModule,
    QuotationListRoutingModule,
    StoreModule.forFeature('quotations', reducer),
    EffectsModule.forFeature([QuotationEffects]),
  ]
})
export class QuotationListModule { }
