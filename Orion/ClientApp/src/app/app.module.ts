import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductModule } from './product/product.module';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import { SettingsModule } from './settings/settings.module';
import {reducers} from "./app-store/reducers";
import { MainSidebarComponent } from './shared/templates/main-sidebar/main-sidebar.component';
import {SharedModule} from "./shared/modules/shared.module";
import { RelationModule } from './relation/relation.module';
import { MainNavbarComponent } from './shared/templates/main-navbar/main-navbar.component';
import {appEffects} from "./app-store/effects";
import {httpInterceptorProviders} from "./shared/interceptors";
import {ErrorCodeModalComponent} from "./shared/modals/error-code-modal/error-code-modal.component";
import { ConfirmationModalComponent } from './shared/modals/confirmation-modal/confirmation-modal.component';
import { QuotationListModule } from './quotation/quotation-list.module';

@NgModule({
    declarations: [
        AppComponent,
        FetchDataComponent,
        MainSidebarComponent,
        MainNavbarComponent,
        ErrorCodeModalComponent,
        ConfirmationModalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        StoreModule.forRoot(reducers, {}),
        EffectsModule.forRoot(appEffects),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        ProductModule,
        SettingsModule,
        RelationModule,
        QuotationListModule
    ],
    providers: [httpInterceptorProviders],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
