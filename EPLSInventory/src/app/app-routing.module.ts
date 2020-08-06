import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "building1", loadChildren: "~/app/building1/building1.module#building1Module" },
    { path: "building2", loadChildren: "~/app/building2/building2.module#building2Module" },
    { path: "building3", loadChildren: "~/app/building3/building3.module#building3Module" },
    { path: "building4", loadChildren: "~/app/building4/building4.module#building4Module" },
    { path: "building5", loadChildren: "~/app/building5/building5.module#building5Module" },
    { path: "building6", loadChildren: "~/app/building6/building6.module#building6Module" },
    { path: "additem", loadChildren: "~/app/additem/additem.module#AdditemModule" },
    { path: "groupsel", loadChildren: "~/app/groupsel/groupsel.module#GroupselModule" },
    { path: "item", loadChildren: "~/app/item/item.module#ItemModule" },
    { path: "comments", loadChildren: "~/app/comments/comments.module#CommentsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
