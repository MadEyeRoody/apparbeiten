import { Component } from '@angular/core';

import {NavController, ModalController, AlertController} from 'ionic-angular';
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
    public appService: AppService,
    public alertCtrl: AlertController
  ) {

  this.loadVorhaben();

  }

  loadVorhaben(refresher?) {

    this.appService.getVorhaben().subscribe(
      data => {

        var dingens = [];
        for (var item of data){
          for (var item2 of item.aufgaben){
            for(var item3 of item2.beteiligtePersonen){
              if(item3.username == "John Snow"){
                dingens.push(item2);

                console.log(JSON.stringify(item2))
              }
            }

          }

        }

        this.tasks=dingens;


        if (refresher)
          refresher.complete();

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

  checkAufgabe(task){
    var index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
  }

  cancelTask(task){

      let prompt = this.alertCtrl.create({
        title: 'Zurückweisen',
        inputs: [
          {
            name: 'Begründung',
            placeholder: 'Begründung'
          },
        ],
        buttons: [
          {
            text: 'Abbrechen',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Zurückweisen',
            handler: data => {
              var index = this.tasks.indexOf(task);
              this.tasks.splice(index, 1);
            }
          }
        ]
      });
      prompt.present();


    }






}
