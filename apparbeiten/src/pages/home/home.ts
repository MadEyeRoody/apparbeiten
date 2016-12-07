import { Component } from '@angular/core';

import { TaskModalPage } from '../../modals/task/task-modal';
import { CreateTaskPage } from '../../modals/createTask/createTask'
import {ModalController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController) {

  }

  openModal(item) {

    let modal = this.modalCtrl.create(TaskModalPage, item);
    modal.present();
  }

  createTask(){
    let modal = this.modalCtrl.create(CreateTaskPage);

    modal.present();
  }

}

