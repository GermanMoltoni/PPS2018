import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule,ReactiveFormsModule}   from '@angular/forms';

export var config = {
  apiKey: "AIzaSyDw81dYicIrmPnn0NTIJ9qu2ibQVYOrjOU",
  authDomain: "cargacreditopps2018.firebaseapp.com",
  databaseURL: "https://cargacreditopps2018.firebaseio.com",
  projectId: "cargacreditopps2018",
  storageBucket: "cargacreditopps2018.appspot.com",
  messagingSenderId: "433306208270"
};
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
})
export class LoginPageModule {}
