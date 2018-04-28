import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators,FormBuilder,FormControl,FormGroup }   from '@angular/forms';
import { AlertController } from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    public user:any;
  public mail:FormControl =  new FormControl('',[Validators.required,Validators.email]);
  public password:FormControl = new FormControl('',[Validators.required,Validators.minLength(8)]);
  public loginForm:FormGroup = this.builder.group({
      mail: this.mail,
      password: this.password
    });
  
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams,public builder:FormBuilder, public firebase: FirebaseProvider) {
  }
  onClick(){
    let mail = this.loginForm.get('mail').value;
    let password = this.loginForm.get('password').value;
    this.firebase.login(mail,password).then(res=>{
        this.user =res;
        this.navCtrl.push(HomePage);
    }).catch(err=>{
        this.alertCtrl.create(this.firebase.capturaError(err)).present();

    });
   }
   SocialLogin(redSocial:string){
    this.firebase.socialLogin(redSocial);
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
