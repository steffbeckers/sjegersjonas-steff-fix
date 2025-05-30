import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsLandingComponent} from "./settings-landing/settings-landing.component";
import {VatSettingsComponent} from "./vat-settings/vat-settings.component";
import {ProductCategorySettingsComponent} from "./product-category-settings/product-category-settings.component";
import {ProductUnitSettingsComponent} from "./product-unit-settings/product-unit-settings.component";

const routes: Routes = [
  {
    path: '',
    component: SettingsLandingComponent
  },
  {
    path: 'vat',
    component: VatSettingsComponent
  },
  {
    path: 'product-category',
    component: ProductCategorySettingsComponent
  },
  {
    path: 'product-unit',
    component: ProductUnitSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
