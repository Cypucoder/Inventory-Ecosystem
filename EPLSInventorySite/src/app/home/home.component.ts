import { Component, OnInit } from '@angular/core';
import { AdditService } from "../addit.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    url = this.addit.url;
    inventory;
    location = "All";
    search = "";
    
    headElements = ["", "ID", "location", "barcode", "type", "descript", "make", "model"]

    constructor(private addit: AdditService, private router: Router) {
        this.addit.getInv(this.location, (res) => {
            //console.log(res);
            this.inventory = res;
            //this.processing = false;
        })
    }

    ngOnInit() {

    }

    ChangingValue(event){
        let a = event.target.value;
        console.log(a);
        this.location = a;
        
        this.addit.getInv(this.location, (res) => {
            //console.log(res);
            this.inventory = res;
            //this.processing = false;
        })
    }
    
    onSearch(inp){
        this.search = inp;
        console.log(this.search);
    }
    
    onAdd(){
        console.log("test");
        this.addit.version = "Add";
        this.router.navigate(['/add']);
    }
    
    onItemTap(val) {
        console.log("Item Clicked");
        //console.log(val);
        //const item = val;
        //this.addit.curItem = val;
        console.log("56 index "+val.v_barcode);
        this.addit.item(val.v_barcode, (res) =>{
            console.log("59 central "+this.addit.curItem);
            this.addit.version = "Edit";
            this.router.navigate(['/add']);
            /*this.routerExtensions.navigate(["additem"], {
                transition: {
                    name: "fade"
                }
            });*/
        });
    }
}
