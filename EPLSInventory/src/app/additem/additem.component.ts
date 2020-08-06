import { Component, OnInit, Inject } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { AdditService } from "../services/addit.service";
import { NotifyService } from "../services/notify.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { initializeOnAngular } from 'nativescript-image-cache';

// feature access
import { BarcodeScanner } from "nativescript-barcodescanner";
/*import { registerElement } from "nativescript-angular/element-registry";
registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);*/
import * as imagepicker from "nativescript-imagepicker";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import { inventory } from "../interface/inventory";
const imageSourceModule = require("tns-core-modules/image-source");

// Change location 
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Additem",
    moduleId: module.id,
    templateUrl: "./additem.component.html"
})
export class AdditemComponent implements OnInit {
    location = this.addit.location;
    barcode = "";
    imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = false;
    thumbSize: number = 80;
    previewSize: number = 300;
    index: number;
    locationList = ["Building1", "Building2", "Building3", "Building4", "Building5", "Building6"];
    locationF;
    groupList = ["Computers", "Monitors", "Printers", "Keyboards"];
    groupF;
    descript;
    make;
    model;
    addItemVers = this.addit.version;
    a:inventory = this.addit.curItem;
    baseImg = "https://maxdigital.com/img/inventory-management-max-digital.jpg";
    processing = false;
    imgChange = false;
    aId;
    come = [];
    com;
    
    constructor(private addit: AdditService, private barcodeScanner: BarcodeScanner, private router: Router, private routerExtensions: RouterExtensions, private Note: NotifyService) {
        // Use the component constructor to inject providers.
        initializeOnAngular();
        console.log("Location"+this.location);
        console.log("A: "+this.a);
        console.log("edit: "+this.addItemVers);
        if (this.addItemVers == "Edit"){
            //const a = this.addit.curItem;
            console.log("50 additem "+this.a);
            console.log(this.addit.url);
            console.log(this.a.v_barcode);
            //this.location = a.v_location;
            this.barcode = this.a.v_barcode;
            this.baseImg = this.addit.url+"/assets/img/uploads/"+this.a.v_idItem+".jpg";
            this.model = this.a.v_model;
            this.make = this.a.v_make;
            this.descript = this.a.v_descript;
            this.groupF = this.a.v_type;
            this.aId = this.a.v_idItem;
            this.getComment();
            /*switch(a.v_type){
                case "Computers":{
                    this.groupF = 
                    break;
                }
            }*/
            
        }else{
            
        }
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
            this.barcode = result.text;
        });
    }
    
    
    // Image capture
    onSelectMultipleTap() {
        this.isSingleMode = false;

        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    startSelection(context) {
        let that = this;

        context
        .authorize()
        .then(() => {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done: " + JSON.stringify(selection));
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });

            that.imageAssets = selection;
        }).catch(function (e) {
            console.log(e);
        });
    }

    selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        this.locationF = this.locationList[picker.selectedIndex];
        //console.log(this.locationF);
    }

    selectedIndexChanged2(args) {
        let picker = <ListPicker>args.object;
        this.groupF = this.groupList[picker.selectedIndex];
        //console.log(this.groupF);
    }
    
    onSave() {
        console.log("Saving");
        this.processing = true;
        let that = this;
        /*let picker = <ListPicker>args.object;
        this.char = this.characters[picker.selectedIndex];*/
        const img = imageSourceModule.fromFile(this.imageAssets[0]._android);
        const base64String = img.toBase64String("png");
        console.log(base64String);
        
        var a = {
            img: base64String,
            location: this.locationF,
            barcode: this.barcode,
            type: this.groupF,
            descript: this.descript,
            make: this.make,
            model: this.model
        }
        console.log(a);
        console.log("Make "+this.make); 
        console.log("Model "+this.model);
        this.addit.saveInv(a, function(res){
            console.log(res);
            that.processing = false;
            if(res == "a"){
                that.changeLoc("/home");
            } else if (res == "d"){
                console.log("barcode exists");
                that.Note.alert("This barcode has been used");
            }
        });
    }
    
    onUpdate() {
        console.log("Updating");
        this.processing = true;
        let that = this;
        /*let picker = <ListPicker>args.object;
        this.char = this.characters[picker.selectedIndex];*/
        let base64String = "unchanged";
        if(this.imgChange == true){
            let img = imageSourceModule.fromFile(this.imageAssets[0]._android);
            base64String = img.toBase64String("png");
            console.log(base64String);
        }
        
        var a = {
            id: this.aId,
            img: base64String,
            location: this.locationF,
            barcode: this.barcode,
            type: this.groupF,
            descript: this.descript,
            make: this.make,
            model: this.model
        }
        console.log(a);
        console.log("Make "+this.make); 
        console.log("Model "+this.model);
        this.addit.updInv(a, function(res){
            console.log(res);
            that.processing = false;
            if(res == "a"){
                that.changeLoc("/home");
            } else if (res == "d"){
                console.log("barcode doesn't exist");
                that.Note.alert("Barcode not found");
                //that.changeLoc("/home");
            }
        });
    }
    
    useCamera(){
        console.log("Camera");
        this.isSingleMode = true;
        camera.takePicture().
            then((imageAsset) => {
                console.log("Result is an image asset instance from camera");
                var image = new Image();
                image.src = imageAsset;
                this.imageSrc = imageAsset;
                this.imageAssets = [imageAsset];
                this.imgChange = true;
                console.log("ImageSrc = "+JSON.stringify(this.imageSrc));
            }).catch((err) => {
                console.log("Error -> " + err.message);
                this.imgChange = false;
            });
    }

    changeLoc(navItemRoute): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        /*const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();*/
    }
        
    addComment(com) {
        console.log(com);
        this.addit.addComment(com, this.a.v_idItem, (res) =>{
            console.log(res);
            if(res == "a"){
                console.log("Success");
                this.getComment();
            }else{
                console.log("Failed")
            }
        });
    }
    
    getComment() {
        this.addit.getComment(this.a.v_idItem, (res) => {
            if (res != "b") {
                this.come = res;
                this.com = "";
                console.log(res);
            } else {
                alert("Something went wrong. Please try again or refresh the page in a few seconds.");
            } 
        });
    }
    
    updCom(item) {
        this.addit.updCom(item, (res) => {
            console.log(res);
        });
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
