import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GroupselRoutingModule } from "./groupsel-routing.module";
import { GroupselComponent } from "./groupsel.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GroupselRoutingModule
    ],
    declarations: [
        GroupselComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GroupselModule { }
