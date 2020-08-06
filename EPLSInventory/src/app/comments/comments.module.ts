import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CommentsRoutingModule } from "./comments-routing.module";
import { CommentsComponent } from "./comments.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CommentsRoutingModule
    ],
    declarations: [
        CommentsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CommentsModule { }
