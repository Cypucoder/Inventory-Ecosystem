import { NgModule, NO_ERRORS_SCHEMA, ValueProvider } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Access http and server
import { HttpClientModule } from '@angular/common/http'; 

// barcode
import { BarcodeScanner } from 'nativescript-barcodescanner';

// services
import { AdditService } from "./services/addit.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule,
        NativeScriptFormsModule,
        HttpClientModule
    ],
    providers: [
        BarcodeScanner,
        AdditService
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
