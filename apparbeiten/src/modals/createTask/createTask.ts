/**
 * Created by roody on 07.12.16.
 */
import {
  Platform, NavParams, ViewController, ModalController, ActionSheetController,
  ToastController
} from 'ionic-angular';
import { Component } from '@angular/core';
import {AppService} from "../../pages/service/appService";
import { PickPersonsPage } from '../../modals/pickPersons/pickPersons'

@Component({
  templateUrl: 'createTask.html',
  providers: [AppService]
})

export class CreateTaskPage {
  taskName;
  dueDate;
  tasks: Array<any>;
  vorhaben;
  selectedPersons:Array<any>;


  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private appService: AppService,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {

    this.refresh(null);

    this.platform.registerBackButtonAction(() => {
      try {
        this.viewCtrl.dismiss()
      }
      catch(e) {
        console.log(e)
      }
    })
  }

  saveTask(){

    var task =
      {
        name: this.taskName,
        endDatum: this.dueDate,
        beteiligtePersonen:this.selectedPersons
      }




    if (this.vorhaben.aufgaben != null)
    this.vorhaben.aufgaben.push(task);
    else
    this.vorhaben.aufgaben = [task];

    console.log(JSON.stringify(this.vorhaben));

    this.appService.updateVorhaben(this.vorhaben);

    this.presentToast();
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  refresh(refresher) {
    this.appService.getVorhaben().subscribe(
      data => {
        this.tasks = data;
        console.log("data:", data);
        if (refresher)
          refresher.complete();
      },
      err => {
        console.log(err);
      },
      () => console.log('Complete')
    );
  }

  openPersonSelector(){
    let modal = this.modalCtrl.create(PickPersonsPage);

    modal.present();

    modal.onDidDismiss(data=> this.selectedPersons=data)


  }

  changeRACI(person){
    console.log("changeRACI");
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Rolle Wählen',
      buttons: [
        {
          text: 'Responsible',
          handler: () => {
            person.taskStatus="Responsible";
          }
        },{
          text: 'Accountable',
          handler: () => {
            person.taskStatus="Accountable";
          }
        },{
          text: 'Consultable',
          role: 'cancel',
          handler: () => {
            person.taskStatus="Consultable";
          }
        },{
          text: 'Informable',
          handler: () => {
            person.taskStatus="Informable";
          }
        }
      ]
    });
    actionSheet.present();

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Aufgabe angelegt',
      duration: 3000
    });
    toast.present();
  }



}
/**
 * Created by roody on 07.12.16.
 */
