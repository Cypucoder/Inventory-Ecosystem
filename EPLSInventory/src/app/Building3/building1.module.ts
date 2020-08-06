import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { Building3RoutingModule } from "./building3-routing.module";
import { Building3Component } from "./building3.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Building3RoutingModule
    ],
    declarations: [
        Building3Component
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class Building3Module { }
