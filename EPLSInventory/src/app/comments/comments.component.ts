import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AdditService } from "../services/addit.service";
import { initializeOnAngular } from 'nativescript-image-cache';

@Component({
    selector: "Comments",
    moduleId: module.id,
    templateUrl: "./comments.component.html"
})
export class CommentsComponent implements OnInit {
    location = "Comments";
    route = "comments";
    server = this.addit.url;
    category = this.addit.type;
    processing = true;
    item = this.addit.curItem;
    come = []
    com;
    edit = false;
    add = false;
    comItem = {v_comment:""};
    
    constructor(private router: Router, private routerExtensions: RouterExtensions, private addit: AdditService) {
        // Use the component constructor to inject providers.
        console.log("Item: "+ JSON.stringify(this.item));
        initializeOnAngular();
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.getComments();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
    onItemTap(val) {
        console.log("Item Clicked");
        console.log(this.come[val.index].v_id);
        this.edit = true;
        this.add = false;
        this.comItem = this.come[val.index];
        
        //console.log(val);
        //const item = this.inventory[val.index];
        //this.addit.curItem = this.inventory[val.index];
        //console.log("56 index "+this.inventory[val.index].v_barcode);
        /*this.addit.item(this.inventory[val.index].v_barcode, (res) =>{
            console.log("59 Comments "+this.addit.curItem);
            this.addit.version = "Edit";
            this.routerExtensions.navigate(["additem"], {
                transition: {
                    name: "fade"
                }
            });
        });*/
    }
    
    
    onAddTap(): void {
        console.log("Add comment");
        this.edit = false;
        this.add = true;
        this.comItem = {v_comment:""};
        /*this.addit.location = this.location;
        this.addit.version = "Add";
        this.routerExtensions.navigate(["additem"], {
            transition: {
                name: "fade"
            }
        });*/
    }

    onSave() {
        this.onBack();
        this.addit.addComment(this.comItem["v_comment"], this.item["v_idItem"], (res) => {
            this.getComments();
        });
    }

    onUpdate() {
        this.onBack()
        this.addit.updCom({v_comment:this.comItem["v_comment"], v_id: this.comItem["v_id"]}, (res) => {
            this.getComments();            
        });
    }

    getComments() {
        this.addit.getComment(this.item["v_idItem"], (res) => {
            this.come = res.reverse();
            this.processing = false;
        }) 
    }

    onBack(){
        this.edit = false;
        this.add = false;
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
