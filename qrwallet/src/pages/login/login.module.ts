import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule,ReactiveFormsModule}   from '@angular/forms';

export  var firebaseConf = {
  apiKey: "AIzaSyB1Jp7ZmMLOAXjcKSw0qnQXR7CMtdbCOtw",
    authDomain: "appuno-86e39.firebaseapp.com",
    databaseURL: "https://appuno-86e39.firebaseio.com",
    projectId: "appuno-86e39",
    storageBucket: "",
    messagingSenderId: "1052709344588"
};
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConf), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
})
export class LoginPageModule {}
