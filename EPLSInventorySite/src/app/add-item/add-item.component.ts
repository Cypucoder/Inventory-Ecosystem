import { Component, OnInit } from '@angular/core';
import { AdditService } from "../addit.service";
import { inventory } from "../interface/inventory";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  barcode = "";
  descript = "";
  make = "";
  model = "";
  location = "Central";
  type = "Computers";
  processing = false;
  a:inventory = this.addit.curItem;
  addItemVers = this.addit.version;
  baseImg;
  aId;
  img;
  sendImg;
  imgChange = false;
  base64String = "unchanged";
  come = [];
  com;
    
  constructor(private addit: AdditService, private router: Router) {
    console.log("Location"+this.location);
        console.log("A: "+this.a);
        console.log("edit: "+this.addItemVers);
        if (this.addItemVers == "Edit"){
            //const a = this.addit.curItem;
            console.log("50 additem "+this.a);
            console.log(this.addit.url);
            console.log(this.a.v_barcode);
            this.location = this.a.v_location;
            this.barcode = this.a.v_barcode;
            //this.baseImg = this.addit.url+this.a.v_image;
            this.model = this.a.v_model;
            this.make = this.a.v_make;
            this.descript = this.a.v_descript;
            this.type = this.a.v_type;
            this.aId = this.a.v_idItem;
            this.img = this.addit.url+'/assets/img/uploads/'+this.a.v_idItem+'.jpg';
            console.log(this.img);
            this.getComment();
        }
  }

  ngOnInit() {
  }

     onSelectFile(event) { // called each time file input changes
        let that = this;
        if (event.target.files && event.target.files[0]) {
          that.imgChange = true;
          console.log("Image Changed: "+ that.imgChange);
          var reader = new FileReader();
          var second = new FileReader();
          reader.readAsDataURL(event.target.files[0]); // read file as data url

          reader.onload = (event) => { // called once readAsDataURL is completed
            //this.img = reader.result;
            //console.log(this.img);
            this.img = reader.result;
            //console.log(this.img);
          }
          
          second.readAsBinaryString(event.target.files[0]); // read file as data url

          second.onload = (event) => { // called once readAsDataURL is completed
            //this.img = reader.result;
            //console.log(this.sendImg);
            this.sendImg = second.result;
            //console.log(this.sendImg);
          }
        }
    }
  onSave() {
        console.log("Saving");
        this.processing = true;
        let that = this;
        /*const img = imageSourceModule.fromFile(this.imageAssets[0]._android);
        const base64String = img.toBase64String("png");
        console.log(base64String);*/
        
        var a = {
            img: btoa(this.sendImg),
            location: this.location,
            barcode: this.barcode,
            type: this.type,
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
                console.log("Success");
                alert("Success");
                that.router.navigate(['/']);
            } else if (res == "d"){
                alert("Barcode exists");
                console.log("barcode exists");
                //that.Note.alert("This barcode has been used");
            }
        });
    }
    
    onUpdate() {
        console.log("Updating");
        this.processing = true;
        let that = this;
        if(this.imgChange == true){
            let img = this.sendImg;
            this.base64String = btoa(this.sendImg);
            console.log("changed image");
            console.log(this.sendImg);
            //console.log(base64String);
        } else {
            this.base64String = "unchanged";
        }
        
        var a = {
            id: this.aId,
            img: this.base64String,
            location: this.location,
            barcode: this.barcode,
            type: this.type,
            descript: this.descript,
            make: this.make,
            model: this.model
        }
        console.log("A: "+a);
        console.log("Make "+this.make); 
        console.log("Model "+this.model);
        this.addit.updInv(a, function(res){
            console.log(res);
            that.processing = false;
            if(res == "a"){
                that.router.navigate(['/']);
            } else if (res == "d"){
                console.log("barcode doesn't exist");
                alert("Barcode not found");
                //that.changeLoc("/home");
            }
        });
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
    
    ChangingValue(event){
        let a = event.target.value;
        console.log(a);
        this.location = a;
    }
    
    ChangingValue2(event){
        let a = event.target.value;
        console.log(a);
        this.type = a;
    }

}
