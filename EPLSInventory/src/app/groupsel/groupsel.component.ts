import { Component, OnInit, Inject } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListPicker } from "tns-core-modules/ui/list-picker";

// Change location 
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AdditService } from "../services/addit.service";

@Component({
    selector: "Groupsel",
    moduleId: module.id,
    templateUrl: "./groupsel.component.html"
})
export class GroupselComponent implements OnInit {
    groupList = ["All", "Computers", "Monitors", "Printers", "Keyboards"];
    groupF;
    
    constructor(private router: Router, private routerExtensions: RouterExtensions, private addit: AdditService) {
        // Use the component constructor to inject providers.
        
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
    
    selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        this.groupF = this.groupList[picker.selectedIndex];
        //console.log(this.groupF);
    }
    
    onSave() {
        console.log("saving choice");
        this.addit.type = this.groupF;
        this.routerExtensions.navigate([this.addit.lastLoc], {
            transition: {
                name: "flipLeft"
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
