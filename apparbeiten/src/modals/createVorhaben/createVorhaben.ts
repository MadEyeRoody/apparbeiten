/**
 * Created by roody on 07.12.16.
 */
import {Platform, NavParams, ViewController, ToastController, ModalController} from 'ionic-angular';
import { Component } from '@angular/core';
import { AppService } from '../../pages/service/appService';
import {Http} from '@angular/http';
import {PickPersonsPage} from "../pickPersons/pickPersons";

@Component({
  templateUrl: 'createVorhaben.html',
  providers: [AppService]
})

export class CreateVorhabenPage {
  users;
  data;
  selectedPersons:Array<any>;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private appService: AppService,
    private http: Http,
    private modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {

    this.data = {};
    this.data.name = '';
    this.data.users = [];
    this.data.beschreibung = '';
    this.data.aufgaben = [];
    this.selectedPersons = [];
    this.refresh();

    this.platform.registerBackButtonAction(() => {
      try {
        this.viewCtrl.dismiss()
      }
      catch(e) {
        console.log(e)
      }
    })
  }

  addOrRemovePerson(person){

    var index = this.selectedPersons.indexOf(person);
    if(index > -1) {
      this.selectedPersons.splice(index, 1);
      person.selected = false;
      console.log("removed");
    } else {
      this.selectedPersons.push(person);
      person.selected = true;
      console.log("added");
    }
  }

    refresh() {
        this.appService.getUsers().subscribe(
                data => {
                    this.users = data;
                    console.log("data:", data);

                },
                err => {
                    console.log(err);
                },
                () => console.log('Complete')

            );
   }

  save() {

      var link = 'http://apparbeiten.eu-gb.mybluemix.net/api/createVorhaben';
      this.data.users = this.selectedPersons;
        var data = {'vorhaben': this.data};//JSON.stringify({'vorhaben': this.data});

        console.log('data to post:', {'vorhaben': this.data});

        this.http.post(link, data)
        .subscribe(data => {
          console.log(data);
        }, error => {
            console.warn("fehler:" , error);
        });

    this.presentToast();
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Vorhaben angelegt',
      duration: 3000
    });
    toast.present();
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
