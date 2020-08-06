import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ItemRoutingModule } from "./item-routing.module";
import { ItemComponent } from "./item.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ItemRoutingModule
    ],
    declarations: [
        ItemComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ItemModule { }
