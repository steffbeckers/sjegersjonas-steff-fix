import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsLandingComponent } from './settings-landing/settings-landing.component';
import { VatSettingsComponent } from './vat-settings/vat-settings.component';
import { ProductCategorySettingsComponent } from './product-category-settings/product-category-settings.component';
import {SharedModule} from "../shared/modules/shared.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {settingsEffects} from "./store/effects";
import { ProductUnitSettingsComponent } from './product-unit-settings/product-unit-settings.component';

@NgModule({
  declarations: [
    SettingsLandingComponent,
    VatSettingsComponent,
    ProductCategorySettingsComponent,
    ProductUnitSettingsComponent
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', reducers),
    EffectsModule.forFeature(settingsEffects),
  ]
})
export class SettingsModule { }
