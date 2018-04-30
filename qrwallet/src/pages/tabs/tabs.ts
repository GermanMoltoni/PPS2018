///<reference path="../login/login.ts"/>
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  //tab3Root = LoginPage;

  constructor(public navCtrl: NavController) {

  }
  loginPage(){
    this.navCtrl.setRoot(LoginPage);
  }
}
