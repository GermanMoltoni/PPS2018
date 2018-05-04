import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
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
  private _flag:boolean = false;
  public mail:FormControl =  new FormControl('',[Validators.required,Validators.email]);
  public password:FormControl = new FormControl('',[Validators.required,Validators.minLength(2)]);
  public loginForm:FormGroup = this.builder.group({
      mail: this.mail,
      password: this.password
    });

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams,public builder:FormBuilder, public firebase: FirebaseProvider) {
  }
  onClick(){
    let mail = this.loginForm.get('mail').value;
    let password = this.loginForm.get('password').value;
    /*this.firebase.login(mail,password).then(res=>{
        this.user =res;
        this.navCtrl.push(TabsPage,res);
    }).catch(err=>{
        this.alertCtrl.create(this.firebase.capturaError()).present();

    });*/
     this.firebase.getUsuarios().subscribe(res=>{
      res.forEach((a)=>{
          let usr = a.payload.val()
          if(usr.nombre == mail){
              if(usr.clave == password){
                this.navCtrl.push(TabsPage,usr);
                this._flag = true;
              }
          }
      });
      if(!this._flag){
        this.alertCtrl.create({
          title: 'Inicio de Sesión',
          subTitle: 'Clave o Correo inválido',
          buttons: ['Volver']
      }).present();
      }
      
    });




   }
   SocialLogin(redSocial:string){
    this.firebase.socialLogin(redSocial);
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  test(){
    this.loginForm.setValue({mail:"tester@gmail.com",password:"55"});

  }

}
