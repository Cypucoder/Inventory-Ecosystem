import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdditService {
    location = "blank";
    group = "Choose category";
    url = "http://your_Server_IP:3006";
    lastLoc = "";
    type = "All";
    curItem: Object;
    barcode;
    version = "add";
    constructor(private http: HttpClient) { }
    
    getInv(a, callback){
        console.log(this.url + '/inv/');
        console.log(a);
        var b = {
            location: a,
            type: this.type
        }
        console.log(b);
        this.http.post(this.url + '/inv/', b).subscribe((res) => {
            //console.log(res);
            callback(res);
        });
    }
    
    saveInv(a, callback){
        console.log(this.url + '/save/');
        console.log(a);
        this.http.post(this.url + '/save/', a).subscribe((res) => {
            //console.log(res);
            callback(res);
        });
    }
    
    updInv(a, callback){
        console.log(this.url + '/update/');
        console.log(a);
        this.http.post(this.url + '/update/', a).subscribe((res) => {
            //console.log(res);
            callback(res);
        });
    }
    
    item(barcode, callback) {
        console.log("barcode in addit "+barcode);
        this.http.post(this.url + '/ite', {barcode: barcode}).subscribe((res)=> {
            console.log("40 item "+JSON.stringify(res));
            this.curItem = res;
            console.log("curItem: "+this.curItem);
            callback(this.curItem);
        })
    }
    
    addComment(com, ite, callback) {        
        this.http.post(this.url + '/comment', {com: com, ite: ite}).subscribe((res) => {
            callback(res);
        })
    }
    
    getComment(item, callback){
        this.http.post(this.url + '/getComment', {item:item}).subscribe((res) => {
            callback(res);
            //console.log(res);
        })
    }
    
    updCom(item, callback) {
        this.http.post(this.url + '/updCom', {item:item}).subscribe((res) => {
            callback(res);
        })
    }
}