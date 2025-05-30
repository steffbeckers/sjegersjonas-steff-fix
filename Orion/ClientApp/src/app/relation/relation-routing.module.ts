import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RelationListComponent} from "./relation-list/relation-list.component";
import {RoutesConfig} from "../shared/routes-config";

const routes: Routes = [
  {
    path: RoutesConfig.relation.relationList.path,
    component: RelationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationRoutingModule { }
