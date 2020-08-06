import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { Building6RoutingModule } from "./building6-routing.module";
import { Building6Component } from "./building6.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Building6RoutingModule
    ],
    declarations: [
        Building6Component
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class Building6Module { }
