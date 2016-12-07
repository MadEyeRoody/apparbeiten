/**
 * Created by roody on 07.12.16.
 */
import {Platform, NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AppService } from '../../pages/service/appService';
import {Http} from '@angular/http';

@Component({
  templateUrl: 'createVorhaben.html',
  providers: [AppService]
})

export class CreateVorhabenPage {
  users;
  data;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
     private appService: AppService,
     private http: Http
  ) {

      this.data = {};
      this.data.name = '';
       this.data.users = [];
      this.data.beschreibung = '';
    
    this.refresh();
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
        var data = {'vorhaben': this.data};//JSON.stringify({'vorhaben': this.data});
        
        console.log('data to post:', {'vorhaben': this.data});

        this.http.post(link, data)
        .subscribe(data => {
          console.log(data);
        }, error => {
            console.warn("fehler:" , error);
        });

    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
/**
 * Created by roody on 07.12.16.
 */
