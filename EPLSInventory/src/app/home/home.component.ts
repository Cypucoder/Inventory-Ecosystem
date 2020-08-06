import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { BarcodeScanner } from "nativescript-barcodescanner";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AdditService } from "../services/addit.service";
import { NotifyService } from "../services/notify.service";
 
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    location = "Home";
    route = "home";
    barcode = "";
    processing = false;
    button = true;
    btext = "Scan Barcode"
    
    constructor(private router: Router, private routerExtensions: RouterExtensions, private barcodeScanner: BarcodeScanner, private addit: AdditService, private Note: NotifyService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
    // Barcode actions   
    public onScanTap() {
        this.barcodeScanner.scan({
            formats: "QR_CODE, AZTEC, EAN_13, CODE_39, CODE_93, CODE_128, DATA_MATRIX, EAN_8, EAN_13, UPC_E, MAXICODE, RSS_14, UPC_A",   // Pass in of you want to restrict scanning to certain types
            cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
            cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
            message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
            showFlipCameraButton: true,   // default false
            preferFrontCamera: false,     // default false
            showTorchButton: true,        // default false
            beepOnScan: true,             // Play or Suppress beep on scan (default true)
            torchOn: false,               // launch with the flashlight on (default false)
            closeCallback: function () { console.log("Scanner closed"); }, // invoked when the scanner was closed (success or abort)
            resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
            orientation: "portrait",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
        }).then((result) => {
            this.onCheckTap(result.text);
        });
    }
    
    onCheckTap(res){
        this.processing = true;
        this.btext = "Finding Item";
        this.barcode = res;
        console.log(this.barcode);
        this.addit.item(res, (res) =>{
            if (res != null){
                console.log("59 central "+this.addit.curItem);
                this.addit.version = "Edit";
                this.processing = false;
                this.button = true;
                this.btext = "Scan Barcode"
                this.routerExtensions.navigate(["additem"], {
                    transition: {
                        name: "fade"
                    }
                });   
            } else {
                console.log("barcode not found");
                this.processing = false;
                this.button = false;
                this.btext = "Scan Barcode";
                this.Note.alert("Barcode not found");
            }
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
}
