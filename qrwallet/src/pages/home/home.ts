import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {FirebaseProvider} from "../../providers/firebase/firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  qr:any;
  resultado:any;
  qr_list:{code:string,mount:number}[] = [];
  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,
              private firebase:FirebaseProvider,private navParams:NavParams) {
    console.log(this.navParams);
    this.firebase.getDatos('codigos').snapshotChanges().subscribe(res=>{
    res.forEach((a)=>{
        this.qr_list[a.key] = a.payload.val()
    });
      });

  }
  scanQr(){
    this.barcodeScanner.scan().then(barcodeData => {
        if(this.qr_list[barcodeData.text] != undefined)
          this.resultado = this.qr_list[barcodeData.text];
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
