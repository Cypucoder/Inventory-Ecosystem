import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { AdditService } from "../services/addit.service";

@Component({
    selector: "Item",
    moduleId: module.id,
    templateUrl: "./item.component.html"
})
export class ItemComponent implements OnInit {
    item = this.addit.curItem;
    constructor(private addit: AdditService) {
        // Use the component constructor to inject providers.
        /*this.addit.item((res) => {
            this.item = res;
        });*/
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
    onSave() {
        console.log("Testing save");
    }
}
