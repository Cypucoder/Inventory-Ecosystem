import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { Building5RoutingModule } from "./building5-routing.module";
import { Building5Component } from "./building5.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Building5RoutingModule
    ],
    declarations: [
        Building5Component
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class Building5Module { }
