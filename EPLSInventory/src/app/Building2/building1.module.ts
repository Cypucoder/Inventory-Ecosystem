import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { Building1RoutingModule } from "./building1-routing.module";
import { Building1Component } from "./building1.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Building1RoutingModule
    ],
    declarations: [
        Building1Component
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class Building1Module { }
