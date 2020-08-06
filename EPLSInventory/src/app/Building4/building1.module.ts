import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { Building4RoutingModule } from "./building4-routing.module";
import { Building4Component } from "./building4.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Building4RoutingModule
    ],
    declarations: [
        Building4Component
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class Building4Module { }
