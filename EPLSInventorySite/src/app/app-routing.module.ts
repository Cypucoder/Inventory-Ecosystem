import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddItemComponent } from './add-item/add-item.component';


const routes: Routes = [
    { path:'', component: HomeComponent },
    { path:'add', component: AddItemComponent }
];

/*{ path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.component#HomeComponent" },
    { path: "addItem", loadChildren: "./add-item/add-item.component#AddItemModule" }*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
