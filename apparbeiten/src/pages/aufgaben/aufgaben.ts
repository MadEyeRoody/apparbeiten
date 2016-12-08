import { Component } from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {CreateVorhabenPage} from "../../modals/createVorhaben/createVorhaben";
import {CreateTaskPage} from "../../modals/createTask/createTask";
import { AppService } from "../service/appService"

@Component({
  selector: 'page-contact',
  templateUrl: 'aufgaben.html',
  providers: [AppService]
})
export class ContactPage {
tasks:Array<any>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public appService: AppService
  ) {

  this.loadVorhaben();

  }

  loadVorhaben() {

    this.appService.getVorhabenPoll().subscribe(
      data => {

        

        this.tasks = data;




        console.log("data:", data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Complete')

    );

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
