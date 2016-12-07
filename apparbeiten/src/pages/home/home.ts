import { Component } from '@angular/core';
import { AppService } from '../service/appService';
import { TaskModalPage } from '../../modals/task/task-modal';
import { CreateTaskPage } from '../../modals/createTask/createTask'
import { CreateVorhabenPage } from '../../modals/createVorhaben/createVorhaben'
import {ModalController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AppService]
})
export class HomePage {
  tasks: Array<any>;
  aufgaben: Array<any>;

  constructor(public modalCtrl: ModalController,  private appService: AppService) {

    this.appService.getVorhaben().subscribe(
          data => {
              this.tasks = data;
              this.aufgaben = []; 
              data.forEach((ele) => {
                  if (ele.aufgaben) {
                    ele.aufgaben.forEach(element => {
                      this.aufgaben.push(element);
                    });
                  }
              })
              console.log("data:", data);
          },
          err => {
              console.log(err);
          },
          () => console.log('Complete')

      );
  }

  openModal(item) {

    let modal = this.modalCtrl.create(TaskModalPage, item);
    modal.present();
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

