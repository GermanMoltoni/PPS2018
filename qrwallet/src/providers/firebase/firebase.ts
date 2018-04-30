import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

import * as firebase from 'firebase/app';
import {AngularFireDatabase} from "angularfire2/database";
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
    usuario;
  constructor(public afAuth: AngularFireAuth,public af:AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  } 
  login(mail:string,password:string){
    return firebase.auth().signInWithEmailAndPassword(mail, password).then(this.capturaUsuario);//.catch(this.capturaError);
  }
  socialLogin(redSocial:string){
      switch (redSocial) {
          case 'facebook':
              this.afAuth.auth
                  .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                  .then(res => {
                      //this.user = res;

                  })
                  .catch();
              //this.navCtrl.push(HomePage);
              break;
          case 'google':
             // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => this.user = res);
              //this.navCtrl.push(HomePage);
              break;
          case 'twitter':
            //  this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(res => this.user = res);
              //this.navCtrl.push(HomePage);
              break;
          default:
              break;
      }
  }
  capturaUsuario(datos:any){
    return datos;
  }

  getUsuarios(){
    return this.getDatos('usuarios').snapshotChanges();
  }
  getDatos(db_name){
    return this.af.list(db_name);

  }
 
  private _capturaError(error:any){
      let opciones;
      switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/wrong-password':
              opciones = {
                  title: 'Inicio de Sesión',
                  subTitle: 'Clave o Correo inválido',
                  buttons: ['Volver']
              };
              break;
          case 'auth/user-disabled':
          case 'auth/user-not-found':
              opciones = {
                  title: 'Inicio de Sesión',
                  subTitle: 'Usuario no habilitado',
                  buttons: ['Volver']
              };
              break;
          default:
              opciones = {
                  title: 'Inicio de Sesión',
                  subTitle: 'Consultar ',
                  buttons: ['Volver']
              };
              break;
      }
      return opciones;

  }
}
