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
  meinUser;

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

      this.meinUser = {
        username: "John Snow",
        role: "Beobachter",
        email: "john@nightwatch.com",
        image: "http://pixel.nymag.com/imgs/daily/vulture/2015/09/15/15-kit-harington-got-snow.w529.h529.jpg",
        unternehmen: "Teambank"
      };
      //this.refresh(null);
  }

  toggleAufgabe(clickedAufgabe, selected) {
    var aktiveVorhaben;

    console.info('toggleAufgabe', clickedAufgabe, selected);

    //clickedAufgabe.selected = !selected;

    if (!selected){
      clickedAufgabe.selected = true;

      this.aufgaben.push(clickedAufgabe);
    }

    // if (!selected) {
    //     this.tasks.forEach((vorhaben) => {
    //       if (vorhaben.aufgaben) {
    //           vorhaben.aufgaben.forEach((aufgabe) => {
    //             if (aufgabe.name == clickedAufgabe.name) {
    //                 aktiveVorhaben = vorhaben;

    //                 if (aufgabe.beteiligtePersonen) {
    //                   aufgabe.beteiligtePersonen.push(this.meinUser);
    //                 } else {
    //                   aufgabe.beteiligtePersonen = [this.meinUser];
    //                 } 

    //                 console.info("aktiveVorhaben", aktiveVorhaben);
    //                 this.appService.updateVorhaben(aktiveVorhaben);
    //                 this.refresh(null);
    //             }
    //           })
    //       }
    //     });
    // }
    
    
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
              if (x && x.username == this.meinUser.username)
                isMember = true;
            });
          }

          element.selected = isMember;

          if (i < 4 && !isMember) {
            i++;
            this.favTasks.push(element);
          }
          else //if (isMember)
            this.aufgaben.push(element);
        });
        }
    })
    console.log("data:", data);
  }

  refresh(refresher) {

      this.appService.getVorhaben().subscribe(
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

  createTask(){
    let modal = this.modalCtrl.create(CreateTaskPage);

    modal.present();
  }

  createVorhaben(){
    let modal = this.modalCtrl.create(CreateVorhabenPage);

    modal.present();
  }

}

