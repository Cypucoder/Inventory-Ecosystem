import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AdditemRoutingModule } from "./additem-routing.module";
import { AdditemComponent } from "./additem.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AdditemRoutingModule
    ],
    declarations: [
        AdditemComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AdditemModule { }
