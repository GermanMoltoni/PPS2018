import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'; 
import * as firebase from 'firebase/app';
import { HomePage } from '../home/home';
import { Validators,FormBuilder,FormControl,FormGroup }   from '@angular/forms';
import { AlertController } from 'ionic-angular';
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
  
  constructor(public navCtrl: NavController,public afAuth: AngularFireAuth, public alertCtrl: AlertController,public navParams: NavParams,public builder:FormBuilder) {
  }
  onClick(){
    let mail = this.loginForm.get('mail').value;
    let password = this.loginForm.get('password').value;
    this.user = firebase.auth().signInWithEmailAndPassword(mail, password).then(data =>this.user = data).catch(function(error:any) {
      let opciones;
      let alert;
      switch (error.code) {
        case 'auth/invalid-email':
         opciones = {
          title: 'Inicio de Sesión',
          subTitle: 'Correo inválido',
          buttons: ['Volver']
        };
          break;
        case 'auth/wrong-password':
        opciones = {
          title: 'Inicio de Sesión',
          subTitle: 'Clave Incorrecta',
          buttons: ['Volver']
        };
          break;
        case 'auth/user-disabled':
        opciones = {
          title: 'Inicio de Sesión',
          subTitle: 'Usuario no habilitado',
          buttons: ['Volver']
        };
          break;
        case 'auth/user-not-found':
        opciones = {
          title: 'Inicio de Sesión',
          subTitle: 'Usuario incorrecto',
          buttons: ['Volver']
        };
          break;
        default:
          break;
      }
      
     
    });
    //this.navCtrl.push(HomePage);
   }
  SocialLogin(nombre:string){
    switch (nombre) {
      case 'facebook':
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.user = res;
        
      })
      .catch();
       //this.navCtrl.push(HomePage);
        break;
      case 'google':
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => this.user = res);
         //this.navCtrl.push(HomePage);
        break;
      case 'twitter':
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(res => this.user = res);
       //this.navCtrl.push(HomePage);
      break;
      default:
        break;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
