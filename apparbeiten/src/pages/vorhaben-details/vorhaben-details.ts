import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
/*
  Generated class for the VorhabenDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-vorhaben-details',
  templateUrl: 'vorhaben-details.html'
})
export class VorhabenDetailsPage {
  task;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = this.navParams.get('vorhaben');
  }


  ionViewDidLoad() {
    console.log('Hello VorhabenDetailsPage Page');
  }

}
