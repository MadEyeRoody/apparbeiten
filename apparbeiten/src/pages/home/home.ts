import { Component } from '@angular/core';
import { AppService } from '../service/appService';
import { TaskModalPage } from '../../modals/task/task-modal';
import { CreateTaskPage } from '../../modals/createTask/createTask'
import { CreateVorhabenPage } from '../../modals/createVorhaben/createVorhaben'
import { ModalController, NavController} from 'ionic-angular';
import { VorhabenDetailsPage } from '../vorhaben-details/vorhaben-details';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AppService]
})

export class HomePage {
  favTasks: Array<any>;
  tasks: Array<any>;
  aufgaben: Array<any>;

  meinName: 'John Snow';

  constructor(public modalCtrl: ModalController,  private appService: AppService, 
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController) {

      this.appService.getVorhaben().subscribe(
          data => {
              this.setVerschiedeneTasks(data);
          },
          err => {
              console.log(err);
          },
          () => console.log('Complete')
      );

      //this.refresh(null);
  }

  setVerschiedeneTasks(data) {
    let i = 0;
    this.tasks = data;
    this.favTasks = [];
    this.aufgaben = [];
    data.forEach((ele) => {
      if (ele.aufgaben) {
        ele.aufgaben.forEach(element => {
          i++;

          let isMember = false;

          if (element.beteiligtePersonen) {
            element.beteiligtePersonen.forEach((x) => {
              if (x.name == this.meinName)
                isMember = true;
            });
          }

          if (i < 4 && !isMember) {
            i++;
            this.favTasks.push(element);
          }
          else if (isMember)
            this.aufgaben.push(element);
        });
        }
    })
    console.log("data:", data);
  }

  refresh(refresher) {

      this.appService.getVorhabenPoll().subscribe(
              data => {
                  this.setVerschiedeneTasks(data);
                  if (refresher)
                    refresher.complete();
              },
              err => {
                  console.log(err);
              },
              () => console.log('Complete')

          );
  }

  nav(data) {
    this.navCtrl.push(VorhabenDetailsPage, {
    vorhaben: data
    });
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

