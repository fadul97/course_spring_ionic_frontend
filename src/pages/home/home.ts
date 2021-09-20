import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredentialsDTO } from '../../models/credentials.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriesPage');
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }
}
