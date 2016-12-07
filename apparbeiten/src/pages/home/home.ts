import { Component } from '@angular/core';
import { AppService } from '../service/appService';
import { CreateTaskPage } from '../../modals/createTask/createTask'
import { CreateVorhabenPage } from '../../modals/createVorhaben/createVorhaben'
import { ModalController, NavController} from 'ionic-angular';
import { VorhabenDetailsPage } from '../vorhaben-details/vorhaben-details';
import { ActionSheetController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AppService,]
})

export class HomePage {
  favTasks: Array<any>;
  tasks: Array<any>;
  aufgaben: Array<any>;

  constructor(public modalCtrl: ModalController,  private appService: AppService,
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController) {

    this.appService.getVorhaben().subscribe(
          data => {
              let i = 0;
              this.tasks = data;
              this.favTasks = [];
              this.aufgaben = [];
              data.forEach((ele) => {
                  if (ele.aufgaben) {
                    ele.aufgaben.forEach(element => {
                      i++;

                      if (i < 4)
                        this.favTasks.push(element);
                      else
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

  nav(data) {
    this.navCtrl.push(VorhabenDetailsPage, {
    vorhaben: data
    });
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

