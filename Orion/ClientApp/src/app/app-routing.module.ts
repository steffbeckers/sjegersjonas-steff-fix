import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FetchDataComponent} from "./fetch-data/fetch-data.component";

const routes: Routes = [
  {
    path: '',
    component: FetchDataComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'relations',
    loadChildren: () => import('./relation/relation.module').then(m => m.RelationModule),
  },
  {
    path: 'quotations',
    loadChildren: () => import('./quotation/quotation-list.module').then(m => m.QuotationListModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
