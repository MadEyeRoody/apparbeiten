import { Component } from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {CreateVorhabenPage} from "../../modals/createVorhaben/createVorhaben";
import {CreateTaskPage} from "../../../.tmp/modals/createTask/createTask";

@Component({
  selector: 'page-contact',
  templateUrl: 'aufgaben.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {

  }

  createTask(){
    let modal = this.modalCtrl.create(CreateTaskPage);

    modal.present();
  }

  createVorhaben(){
    let modal = this.modalCtrl.create(CreateVorhabenPage);

    modal.present();
  }


}
