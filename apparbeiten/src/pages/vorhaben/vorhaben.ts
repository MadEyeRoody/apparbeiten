import { Component } from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import { AppService } from '../service/appService';
import { ActionSheetController } from 'ionic-angular';
import { VorhabenDetailsPage } from '../vorhaben-details/vorhaben-details';
import {CreateTaskPage} from "../../modals/createTask/createTask";
import {CreateVorhabenPage} from "../../modals/createVorhaben/createVorhaben";

@Component({
  selector: 'page-about',
  templateUrl: 'vorhaben.html',
  providers: [AppService]
})
export class AboutPage {

  tasks: Array<any>;

  nav(data) {
    this.navCtrl.push(VorhabenDetailsPage, {
    vorhaben: data
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Vorhaben bearbeiten',
      buttons: [
        {
          text: 'Vorhaben veröffentlichen',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Vorhaben bearbeiten',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Vorhaben löschen',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  refresh(refresher) {


        this.appService.getVorhabenPoll().subscribe(
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

  constructor(public navCtrl: NavController,
              private appService: AppService,
              public actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController
  ) {

    this.refresh(null);


    this.appService.getVorhaben().subscribe(
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
