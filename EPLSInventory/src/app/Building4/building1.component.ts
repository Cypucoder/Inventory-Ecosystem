import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AdditService } from "../services/addit.service";
import { initializeOnAngular } from 'nativescript-image-cache';

@Component({
    selector: "Building4",
    moduleId: module.id,
    templateUrl: "./building4.component.html"
})
export class Building4Component implements OnInit {
    location = "Building4";
    route = "building4";
    inventory;
    server = this.addit.url;
    category = this.addit.type;
    
    constructor(private router: Router, private routerExtensions: RouterExtensions, private addit: AdditService) {
        // Use the component constructor to inject providers.
        initializeOnAngular();
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.addit.getInv(this.location, (res) => {
            //console.log(res);
            this.inventory = res;
        })
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
    onItemTap(val) {
        console.log("Item Clicked");
        //console.log(val);
        //const item = this.inventory[val.index];
        //this.addit.curItem = this.inventory[val.index];
        console.log("56 index "+this.inventory[val.index].v_barcode);
        this.addit.item(this.inventory[val.index].v_barcode, (res) =>{
            console.log("59 central "+this.addit.curItem);
            this.addit.version = "Edit";
            this.routerExtensions.navigate(["additem"], {
                transition: {
                    name: "fade"
                }
            });
        });
    }
    
    
    onAddTap(): void {
        console.log("Add item" + this.location);
        this.addit.location = this.location;
        this.addit.version = "Add";
        this.routerExtensions.navigate(["additem"], {
            transition: {
                name: "fade"
            }
        });
    }
    
    choosecat() {
        console.log("do something");
        this.addit.location = this.location;
        this.addit.lastLoc = this.route;
        this.routerExtensions.navigate(["groupsel"], {
            transition: {
                name: "flip"
            }
        });
    }
}
