import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/modules/shared.module";

import { RelationRoutingModule } from './relation-routing.module';
import { RelationListComponent } from './relation-list/relation-list.component';
import { RelationListFilterComponent } from './relation-list-filter/relation-list-filter.component';
import { AddRelationModalComponent } from './add-relation-modal/add-relation-modal.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {reducer} from "./store/relation.reducer";
import {RelationEffects} from "./store/relation.effects";
import { RelationDetailsComponent } from './relation-details/relation-details.component';

@NgModule({
  declarations: [
    RelationListComponent,
    RelationListFilterComponent,
    AddRelationModalComponent,
    RelationDetailsComponent
  ],
  imports: [
    SharedModule,
    RelationRoutingModule,
    StoreModule.forFeature('relations', reducer),
    EffectsModule.forFeature([RelationEffects]),
  ]
})
export class RelationModule { }
