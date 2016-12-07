/**
 * Created by roody on 07.12.16.
 */
import {Platform, NavParams, ViewController, ModalController} from 'ionic-angular';
import { Component } from '@angular/core';
import {AppService} from "../../pages/service/appService";
import { PickPersonsPage } from '../../modals/pickPersons/pickPersons'

@Component({
  templateUrl: 'createTask.html',
  providers: [AppService]
})

export class CreateTaskPage {
  participants;
  newTask;
  tasks: Array<any>;
  vorhaben: Array<any>;
  selectedPersons:Array<any>;


  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private appService: AppService,
    public modalCtrl: ModalController
  ) {



    var newTask = [
      {
        name:'',
        dueTime:''
      }
    ]

    var participants = [
      {
        name: 'Gollum',
        role: 'Responsible',
      },
      {
        name: '',
        role: 'Responsible',
      },

    ];

    this.participants = participants;
    this.newTask=newTask;

    this.refresh(null);
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
}
/**
 * Created by roody on 07.12.16.
 */
